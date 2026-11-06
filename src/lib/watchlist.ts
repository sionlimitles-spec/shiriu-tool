// src/lib/watchlist.ts

export type WatchHistory = {
  id: string;
  title: string;
  poster: string;
  type: string;
  lastEpisode: number;
  timestamp: number;
};

export type FavoriteItem = {
  id: string;
  title: string;
  poster: string;
  type: string;
  rating: string | number;
};

// ================= RIWAYAT (HISTORY) =================
export const getWatchHistory = (): WatchHistory[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("shiriu_watch_history");
  return data ? JSON.parse(data) : [];
};

export const saveToWatchHistory = (item: WatchHistory) => {
  const history = getWatchHistory();
  // Hapus data lama jika ada, lalu taruh paling atas
  const filtered = history.filter((h) => h.id !== item.id);
  const updated = [item, ...filtered].slice(0, 10); // Simpan maksimal 10
  localStorage.setItem("shiriu_watch_history", JSON.stringify(updated));
};

// ================= FAVORIT =================
export const getFavorites = (): FavoriteItem[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("shiriu_favorites");
  return data ? JSON.parse(data) : [];
};

export const toggleFavorite = (item: FavoriteItem): boolean => {
  const favorites = getFavorites();
  const exists = favorites.find((f) => f.id === item.id);
  
  if (exists) {
    // Hapus dari favorit
    const filtered = favorites.filter((f) => f.id !== item.id);
    localStorage.setItem("shiriu_favorites", JSON.stringify(filtered));
    return false;
  } else {
    // Tambah ke favorit
    localStorage.setItem("shiriu_favorites", JSON.stringify([item, ...favorites]));
    return true;
  }
};

export const isFavorite = (id: string): boolean => {
  const favorites = getFavorites();
  return favorites.some((f) => f.id === id);
};
