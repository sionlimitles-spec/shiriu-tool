export type DownloadResult = {
  title: string;
  thumbnail: string;
  author?: string;
  formats: { label: string; url: string; type: "audio" | "video" }[];
};

export const detectPlatform = (url: string) => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("tiktok.com")) return "tiktok";
  if (url.includes("instagram.com")) return "instagram";
  return "unknown";
};

export const fetchDownloadData = async (url: string): Promise<DownloadResult> => {
  const platform = detectPlatform(url);

  if (platform === "youtube") {
    try {
      // API 1 (Nyxs)
      const res = await fetch(`https://api.nyxs.pw/dl/ytmp4?url=${encodeURIComponent(url)}`);
      const json = await res.json();
      if (json.status && json.result) {
        return {
          title: json.result.title,
          thumbnail: json.result.thumbnail,
          author: json.result.author,
          formats: [
            { label: "Video MP4 (HD)", url: json.result.url, type: "video" as const }
          ]
        };
      }
      throw new Error("Gagal API 1");
    } catch (e) {
      // Fallback API 2 (Siputzx)
      const res = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(url)}`);
      const json = await res.json();
      if (json.status) {
        return {
          title: json.data.title,
          thumbnail: json.data.thumbnail,
          author: json.data.author,
          formats: [
            { label: "Video MP4", url: json.data.url, type: "video" as const }
          ]
        };
      }
      throw new Error("Semua server YouTube sedang sibuk. Coba lagi nanti.");
    }
  }

  if (platform === "tiktok") {
    try {
      // API TikTok Sangat Stabil
      const res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
      const json = await res.json();
      if (json.code === 0) {
        return {
          title: json.data.title || "TikTok Video",
          thumbnail: json.data.cover,
          author: json.data.author?.nickname || "TikTok User",
          formats: [
            { label: "Video (No Watermark)", url: json.data.play, type: "video" as const },
            { label: "Audio MP3", url: json.data.music, type: "audio" as const }
          ].filter(f => f.url)
        };
      }
      throw new Error("Gagal mengambil data TikTok");
    } catch (e) {
      throw new Error("Gagal mengambil data TikTok. Pastikan link valid.");
    }
  }

  throw new Error("Platform belum didukung. Gunakan link YouTube atau TikTok.");
};
