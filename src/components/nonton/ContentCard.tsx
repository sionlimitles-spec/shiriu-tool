"use client";
import Link from "next/link";
import { Play, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toggleFavorite, isFavorite } from "@/lib/watchlist";

export type MediaItem = {
  id: string;
  title: string;
  poster: string;
  rating: string | number;
  type: string;
  episodes: string | number;
};

export default function ContentCard({ item, index }: { item: MediaItem, index: number }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(item.id));
  }, [item.id]);

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault(); 
    const newState = toggleFavorite({
      id: item.id, title: item.title, poster: item.poster, type: item.type, rating: item.rating
    });
    setFavorite(newState);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="relative group cursor-pointer">
      <Link href={`/nonton/${item.type}/${item.id}`}>
        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg)] shadow-lg">
          <img src={item.poster} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
          
          <button onClick={handleFav} className="absolute top-2 left-2 p-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 z-20 hover:scale-110 transition-transform">
            <Heart size={14} className={favorite ? "text-red-500 fill-red-500" : "text-white"} />
          </button>

          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-white/10 z-10">
            <Star size={10} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] font-bold text-white">{item.rating}</span>
          </div>

          <div className="absolute bottom-2 left-2 bg-[#00b4ff] text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shadow-md z-10">
            {item.episodes === "Movie" ? "Movie" : `Ep ${item.episodes}`}
          </div>

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-0">
             <div className="w-12 h-12 rounded-full bg-[#00b4ff] flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,180,255,0.6)] scale-75 group-hover:scale-100 transition-transform">
                <Play size={20} className="ml-1" />
             </div>
          </div>
        </div>
        <h3 className="mt-2 text-[11px] font-bold text-[var(--text)] line-clamp-2 leading-tight group-hover:text-[#00b4ff] transition-colors">{item.title}</h3>
      </Link>
    </motion.div>
  );
}
