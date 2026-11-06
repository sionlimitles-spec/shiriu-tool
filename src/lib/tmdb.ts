// src/lib/tmdb.ts

const TMDB_API_KEY = "95f8525a52ff1fe866572ab5d6ce1ea5"; 
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

export const fetchMovies = async (type: "movie" | "donghua", query: string = "", genreId: string = "") => {
  let url = "";

  if (type === "movie") {
    if (query) url = `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}&language=id-ID`;
    else if (genreId) url = `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=id-ID`;
    else url = `${BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}&language=id-ID`;
  } else if (type === "donghua") {
    // Endpoint Donghua yang lebih stabil (Negara asal: China / zh)
    if (query) url = `${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${query}&language=id-ID`;
    else url = `${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_original_language=zh&sort_by=popularity.desc&language=id-ID`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    const results = data.results || [];
    
    return results.map((item: any) => ({
      id: item.id.toString(),
      title: item.title || item.name || "Tanpa Judul",
      poster: item.poster_path ? `${IMG_URL}${item.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image",
      rating: item.vote_average ? item.vote_average.toFixed(1) : "N/A",
      type: type === "movie" ? "film" : "donghua",
      episodes: item.number_of_episodes || "Movie",
    }));
  } catch (err) {
    return [];
  }
};
