"use client";

import { useState, useEffect } from "react";
import { getWatchHistory, WatchHistory } from "@/lib/watchlist";
import { ArrowLeft, History, PlayCircle, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RiwayatPage() {
  const [history, setHistory] = useState<WatchHistory[]>([]);

  useEffect(() => {
    setHistory(getWatchHistory());
  }, []);

  // Fungsi format waktu (contoh: 2 jam lalu, Kemarin)
  const timeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Baru saja";
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Kemarin";
    return `${days} hari lalu`;
  };

  return (
    <div className="min-h-screen pb-24 bg-[var(--bg)]">
      {/* Header */}
      <div className="sticky top-0 z-50 px-4 py-4 flex items-center gap-4 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--card-border)]">
        <Link href="/nonton" className="p-2 bg-[var(--card-bg)] rounded-full border border-[var(--card-border)] text-[var(--text)] hover:text-[#00b4ff] transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-xl font-black text-[var(--text)] flex items-center gap-2">
          <History className="text-[#00b4ff]" size={20} /> Riwayat Nonton
        </h1>
      </div>

      <div className="px-4 pt-6 flex flex-col gap-3">
        {history.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20 flex flex-col items-center">
            <div className="w-20 h-20 bg-[var(--card-bg)] rounded-full flex items-center justify-center mb-4 border border-[var(--card-border)]">
              <History size={32} className="text-[var(--text-muted)] opacity-50" />
            </div>
            <h2 className="text-lg font-bold text-[var(--text)] mb-2">Riwayat Kosong</h2>
            <p className="text-sm text-[var(--text-muted)] max-w-xs">Tontonan yang kamu buka akan muncul di sini.</p>
          </motion.div>
        ) : (
          history.map((item, idx) => (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} key={item.id}>
              <Link href={`/nonton/${item.type}/${item.id}`} className="flex gap-3 p-3 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl hover:border-[#00b4ff]/50 transition-colors shadow-sm">
                <img src={item.poster} className="w-16 h-24 object-cover rounded-xl border border-[var(--card-border)] shrink-0" />
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[var(--text)] line-clamp-2 mb-1">{item.title}</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#00b4ff] bg-[#00b4ff]/10 px-2 py-0.5 rounded-md w-fit mb-2">
                    <PlayCircle size={10} /> Episode {item.lastEpisode}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
                    <Clock size={10} /> {timeAgo(item.timestamp)}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
