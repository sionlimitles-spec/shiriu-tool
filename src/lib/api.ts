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
      const res = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      
      if (!data.status) throw new Error("Gagal mengambil data YouTube.");
      
      return {
        title: data.data.title,
        thumbnail: data.data.thumbnail,
        author: data.data.author || "YouTube",
        formats: [
          {
            label: `Video MP4 (${data.data.quality || 'HD'})`,
            url: data.data.url,
            type: "video",
          }
        ]
      };
    }

    if (platform === "tiktok") {
      const res = await fetch(`https://api.siputzx.my.id/api/d/tiktok?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      
      if (!data.status) throw new Error("Gagal mengambil data TikTok.");
      
      return {
        title: data.data.title || "TikTok Video",
        thumbnail: data.data.cover,
        author: data.data.author?.nickname || "TikTok User",
        formats: [
          { label: "Video (No Watermark)", url: data.data.video, type: "video" },
          { label: "Audio MP3", url: data.data.audio, type: "audio" }
        ].filter(f => f.url)
      };
    }

    if (platform === "instagram") {
      const res = await fetch(`https://api.siputzx.my.id/api/d/igdl?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      
      if (!data.status) throw new Error("Gagal mengambil data Instagram.");
      
      return {
        title: "Instagram Media",
        thumbnail: data.data[0]?.thumbnail || "",
        formats: data.data.map((item: any, index: number) => ({
          label: `Download Media ${index + 1}`,
          url: item.url,
          type: item.type === "video" ? "video" : "audio",
        }))
      };
    }

    throw new Error("Platform belum didukung secara penuh saat ini.");

  } catch (error: any) {
    throw new Error(error.message || "Gagal terhubung ke server. Coba lagi nanti.");
  }
};
