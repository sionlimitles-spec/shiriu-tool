"use client";
import { useState } from "react";
import { ListVideo } from "lucide-react";
import { saveToWatchHistory } from "@/lib/watchlist";

export default function VideoPlayer({ data }: { data: any }) {
  const [activeEp, setActiveEp] = useState(1);

  const getEmbedUrl = () => {
    // Menggunakan vidsrc.xyz yang lebih stabil
    if (data.type === "anime") return `https://vidsrc.xyz/embed/anime?mal=${data.id}&episode=${activeEp}`;
    if (data.type === "film") return `https://vidsrc.xyz/embed/movie?tmdb=${data.id}`;
    return `https://vidsrc.xyz/embed/tv?tmdb=${data.id}&season=1&episode=${activeEp}`; // Donghua
  };

  const handlePlay = (ep: number) => {
    setActiveEp(ep);
    saveToWatchHistory({
      id: data.id, title: data.title, poster: data.poster, type: data.type, lastEpisode: ep, timestamp: Date.now()
    });
  };

  return (
    <div className="w-full">
      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-[var(--card-border)] shadow-2xl mb-4">
        <iframe src={getEmbedUrl()} className="absolute inset-0 w-full h-full" allowFullScreen allow="autoplay; encrypted-media"></iframe>
      </div>

      {data.episodes.length > 0 && (
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <ListVideo size={18} className="text-[#00b4ff]" />
            <h3 className="font-bold text-[var(--text)] text-sm">Pilih Episode</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.episodes.map((ep: number) => (
              <button
                key={ep}
                onClick={() => handlePlay(ep)}
                className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                  activeEp === ep ? "bg-[#00b4ff] text-white shadow-[0_0_15px_rgba(0,180,255,0.4)] scale-110" : "bg-[var(--text-muted)]/10 text-[var(--text)] hover:bg-[var(--text-muted)]/20"
                }`}
              >
                {ep}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
