// src/lib/jikan.ts

export const fetchAnime = async (query: string = "", genreId: string = "") => {
  let url = "https://api.jikan.moe/v4/top/anime?limit=12";
  
  if (query) {
    url = `https://api.jikan.moe/v4/anime?q=${query}&limit=12&sfw=true`;
  } else if (genreId) {
    url = `https://api.jikan.moe/v4/anime?genres=${genreId}&limit=12&sfw=true`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    
    return data.data.map((item: any) => ({
      id: item.mal_id.toString(),
      title: item.title_english || item.title,
      poster: item.images.webp.large_image_url,
      rating: item.score || 0,
      type: "anime",
      episodes: item.episodes || "?",
    }));
  } catch (err) {
    return [];
  }
};
