// src/lib/api.ts

export type DownloadResult = {
  title: string;
  thumbnail: string;
  author?: string;
  duration?: string;
  formats: {
    label: string;
    url: string;
    type: "audio" | "video";
  }[];
};

export const detectPlatform = (url: string) => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("tiktok.com")) return "tiktok";
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("pinterest.com")) return "pinterest";
  if (url.includes("spotify.com")) return "spotify";
  return "unknown";
};

export const fetchDownloadData = async (url: string): Promise<DownloadResult> => {
  const platform = detectPlatform(url);
  
  try {
    // Kita menggunakan API publik gratis sebagai backend client-side
    if (platform === "youtube") {
      const res = await fetch(`https://api.ryzendesu.vip/api/downloader/ytdl?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      
      if (!data.success) throw new Error("Gagal mengambil data YouTube");
      
      return {
        title: data.title,
        thumbnail: data.thumbnail,
        author: data.author,
        formats: [
          ...data.medias.filter((m: any) => m.type === 'video').map((v: any) => ({
            label: `MP4 ${v.quality} (${v.formattedSize})`,
            url: v.url,
            type: "video" as const, // <-- Perbaikan di sini
          })),
          ...data.medias.filter((m: any) => m.type === 'audio').map((a: any) => ({
            label: `MP3 ${a.quality} (${a.formattedSize})`,
            url: a.url,
            type: "audio" as const, // <-- Perbaikan di sini
          }))
        ]
      };
    }

    if (platform === "tiktok") {
      const res = await fetch(`https://api.ryzendesu.vip/api/downloader/ttdl?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      
      if (!data.success) throw new Error("Gagal mengambil data TikTok");
      
      return {
        title: data.title || "TikTok Video",
        thumbnail: data.thumbnail,
        author: data.author,
        formats: [
          { label: "Video (No Watermark)", url: data.video, type: "video" as const }, // <-- Perbaikan di sini
          { label: "Audio MP3", url: data.audio, type: "audio" as const } // <-- Perbaikan di sini
        ].filter(f => f.url)
      };
    }

    if (platform === "instagram") {
      const res = await fetch(`https://api.ryzendesu.vip/api/downloader/igdl?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      
      if (!data.success) throw new Error("Gagal mengambil data Instagram");
      
      return {
        title: "Instagram Media",
        thumbnail: data.thumbnail || data.data[0]?.thumbnail,
        formats: data.data.map((item: any, index: number) => ({
          label: `Download Media ${index + 1} (${item.type})`,
          url: item.url,
          type: (item.type === "video" ? "video" : "audio") as "video" | "audio", // <-- Perbaikan di sini
        }))
      };
    }

    if (platform === "spotify") {
      const res = await fetch(`https://api.ryzendesu.vip/api/downloader/spotify?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      
      if (!data.success) throw new Error("Gagal mengambil data Spotify");
      
      return {
        title: data.title,
        thumbnail: data.thumbnail,
        author: data.artist,
        duration: data.duration,
        formats: [
          { label: "Audio MP3", url: data.url, type: "audio" as const } // <-- Perbaikan di sini
        ]
      };
    }

    // Fallback untuk Pinterest / Lainnya
    throw new Error("Platform belum didukung secara penuh saat ini.");

  } catch (error: any) {
    throw new Error(error.message || "Terjadi kesalahan sistem atau API sedang down.");
  }
};
