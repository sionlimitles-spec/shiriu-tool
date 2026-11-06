// src/lib/api.ts

export type DownloadResult = {
  title: string;
  thumbnail: string;
  author?: string;
  duration?: string;
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
  if (platform === "unknown") throw new Error("Platform belum didukung.");

  // Panggil API internal kita sendiri (Cloudflare Function), bukan API eksternal
  const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
  const json = await response.json();

  if (json.error) throw new Error(json.error);

  // Normalisasi data dari berbagai API menjadi format DownloadResult
  if (platform === "youtube") {
    // Siputzx biasanya mengembalikan { status: true, data: { title, thumbnail, url } }
    const item = json.data || json.result;
    if (!item || !item.url) throw new Error("Gagal memproses link YouTube.");
    return {
      title: item.title || "YouTube Video",
      thumbnail: item.thumbnail || "",
      author: item.author || "YouTube",
      formats: [{ label: "Video MP4", url: item.url, type: "video" as const }],
    };
  }

  if (platform === "tiktok") {
    // TikWM mengembalikan { code: 0, data: { title, cover, play, music } }
    if (json.code !== 0) throw new Error("Gagal mengambil data TikTok.");
    const d = json.data;
    return {
      title: d.title || "TikTok Video",
      thumbnail: d.cover || "",
      author: d.author?.nickname || "TikTok User",
      formats: [
        { label: "Video (No Watermark)", url: d.play, type: "video" as const },
        { label: "Audio MP3", url: d.music, type: "audio" as const },
      ].filter((f) => f.url),
    };
  }

  if (platform === "instagram") {
    // Siputzx IG biasanya mengembalikan { status: true, data: [ { url, type, thumbnail } ] }
    const items = json.data || [];
    if (!items.length) throw new Error("Gagal mengambil media Instagram.");
    return {
      title: "Instagram Media",
      thumbnail: items[0]?.thumbnail || "",
      formats: items.map((item: any, i: number) => ({
        label: `Download Media ${i + 1}`,
        url: item.url,
        type: (item.type === "video" ? "video" : "audio") as "video" | "audio",
      })),
    };
  }

  throw new Error("Terjadi kesalahan yang tidak diketahui.");
};
