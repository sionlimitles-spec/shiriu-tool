// src/lib/detail.ts
const TMDB_API_KEY = "95f8525a52ff1fe866572ab5d6ce1ea5"; // API KEY DARI ANDA
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

export const fetchDetail = async (type: string, id: string) => {
  if (type === "anime") {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
    const data = await res.json();
    const item = data.data;

    const epsCount = item.episodes || 12;
    const episodes = Array.from({ length: epsCount }, (_, i) => i + 1);

    return {
      id: item.mal_id.toString(),
      title: item.title_english || item.title,
      poster: item.images.webp.large_image_url,
      synopsis: item.synopsis || "Belum ada sinopsis.",
      rating: item.score || 0,
      year: item.year || item.aired?.prop?.from?.year || "N/A",
      status: item.status,
      type: "anime",
      episodes: episodes,
    };
  } else {
    const endpoint = type === "film" ? "movie" : "tv";
    const res = await fetch(`${BASE_URL}/${endpoint}/${id}?api_key=${TMDB_API_KEY}&language=id-ID`);
    const item = await res.json();

    let episodes: number[] = [1];
    if (type === "donghua" && item.number_of_episodes) {
      episodes = Array.from({ length: item.number_of_episodes }, (_, i) => i + 1);
    }

    return {
      id: item.id.toString(),
      title: item.title || item.name,
      poster: item.poster_path ? `${IMG_URL}${item.poster_path}` : "https://via.placeholder.com/500x750",
      synopsis: item.overview || "Belum ada sinopsis.",
      rating: item.vote_average ? item.vote_average.toFixed(1) : "N/A",
      year: (item.release_date || item.first_air_date || "").split("-")[0] || "N/A",
      status: "Released",
      type: type,
      episodes: episodes,
    };
  }
};
