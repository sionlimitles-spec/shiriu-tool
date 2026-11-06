// src/lib/api.ts (bagian fetchDownloadData)

export const fetchDownloadData = async (url: string): Promise<DownloadResult> => {
  const platform = detectPlatform(url);
  if (platform === "unknown") throw new Error("Platform belum didukung.");

  const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
  const json = await response.json();

  if (json.error) throw new Error(json.error);

  // btch-downloader-api mengembalikan data di dalam objek `normalized`
  const normalized = json.normalized;

  if (platform === "youtube") {
    if (!normalized || !normalized.media || normalized.media.length === 0) {
      throw new Error("Gagal memproses link YouTube.");
    }
    return {
      title: normalized.title || "YouTube Video",
      thumbnail: normalized.thumbnail || "",
      author: normalized.author || "YouTube",
      formats: normalized.media.map((m: any) => ({
        label: m.label,
        url: m.url,
        type: m.type as "video" | "audio",
      })),
    };
  }

  if (platform === "tiktok") {
    if (!normalized || !normalized.media || normalized.media.length === 0) {
      throw new Error("Gagal mengambil data TikTok.");
    }
    return {
      title: normalized.title || "TikTok Video",
      thumbnail: normalized.thumbnail || "",
      author: normalized.author || "TikTok User",
      formats: normalized.media.map((m: any) => ({
        label: m.label,
        url: m.url,
        type: m.type as "video" | "audio",
      })),
    };
  }

  throw new Error("Terjadi kesalahan yang tidak diketahui.");
};
