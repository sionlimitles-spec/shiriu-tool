"use client";
import { WatchHistory } from "@/lib/watchlist";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ContinueWatching({ history }: { history: WatchHistory[] }) {
  if (history.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-[var(--text)] flex items-center gap-2">
          <PlayCircle size={16} className="text-[#00b4ff]" /> Lanjut Nonton
        </h2>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {history.map((item, i) => (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={item.id}>
            <Link href={`/nonton/${item.type}/${item.id}`} className="block w-[120px] shrink-0">
              <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden border border-[var(--card-border)]">
                <img src={item.poster} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <PlayCircle size={30} className="text-white drop-shadow-lg" />
                </div>
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div className="h-full bg-[#00b4ff] w-1/2"></div> {/* Dummy 50% */}
                </div>
              </div>
              <h3 className="text-[10px] font-bold text-[var(--text)] line-clamp-1 mt-1.5">{item.title}</h3>
              <p className="text-[9px] text-[#00b4ff] font-semibold">Ep {item.lastEpisode}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
