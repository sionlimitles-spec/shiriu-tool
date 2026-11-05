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
  if (url.includes("spotify.com")) return "spotify";
  return "unknown";
};

export const fetchDownloadData = async (url: string): Promise<DownloadResult> => {
  const platform = detectPlatform(url);
  
  try {
    if (platform === "youtube") {
      const res = await fetch(`https://api.betabotz.eu.org/api/download/ytmp4?url=${encodeURIComponent(url)}&apikey=beta`);
      const data = await res.json();
      
      if (data.status !== 200) throw new Error("Gagal mengambil data YouTube. Pastikan link valid.");
      
      return {
        title: data.result.title,
        thumbnail: data.result.thumbnail,
        author: data.result.author,
        formats: [
          {
            label: `Video MP4 (${data.result.quality || 'HD'})`,
            url: data.result.url,
            type: "video" as const,
          }
        ]
      };
    }

    if (platform === "tiktok") {
      const res = await fetch(`https://api.betabotz.eu.org/api/download/ttdl?url=${encodeURIComponent(url)}&apikey=beta`);
      const data = await res.json();
      
      if (data.status !== 200) throw new Error("Gagal mengambil data TikTok.");
      
      return {
        title: data.result.title || "TikTok Video",
        thumbnail: data.result.thumbnail,
        author: data.result.author,
        formats: [
          { label: "Video (No Watermark)", url: data.result.video, type: "video" as const },
          { label: "Audio MP3", url: data.result.audio, type: "audio" as const }
        ].filter(f => f.url)
      };
    }

    if (platform === "instagram") {
      const res = await fetch(`https://api.betabotz.eu.org/api/download/igdl?url=${encodeURIComponent(url)}&apikey=beta`);
      const data = await res.json();
      
      if (data.status !== 200) throw new Error("Gagal mengambil data Instagram (Pastikan akun tidak diprivat).");
      
      return {
        title: "Instagram Media",
        thumbnail: data.result[0]?.thumbnail || "",
        formats: data.result.map((item: any, index: number) => ({
          label: `Download Media ${index + 1}`,
          url: item.url,
          type: (item.type === "video" ? "video" : "audio") as "video" | "audio",
        }))
      };
    }

    if (platform === "spotify") {
      const res = await fetch(`https://api.ryzendesu.vip/api/downloader/spotify?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      
      if (!data.success) throw new Error("Gagal mengambil data Spotify.");
      
      return {
        title: data.title,
        thumbnail: data.thumbnail,
        author: data.artist,
        duration: data.duration,
        formats: [
          { label: "Audio MP3", url: data.url, type: "audio" as const }
        ]
      };
    }

    throw new Error("Platform belum didukung secara penuh saat ini.");

  } catch (error: any) {
    throw new Error(error.message || "Gagal terhubung ke server API. Coba lagi nanti.");
  }
};
