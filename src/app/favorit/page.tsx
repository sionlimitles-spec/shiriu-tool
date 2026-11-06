"use client";

import { useState, useEffect } from "react";
import { getFavorites, FavoriteItem } from "@/lib/watchlist";
import ContentCard from "@/components/nonton/ContentCard";
import { ArrowLeft, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FavoritPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <div className="min-h-screen pb-24 bg-[var(--bg)]">
      {/* Header */}
      <div className="sticky top-0 z-50 px-4 py-4 flex items-center gap-4 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--card-border)]">
        <Link href="/nonton" className="p-2 bg-[var(--card-bg)] rounded-full border border-[var(--card-border)] text-[var(--text)] hover:text-[#00b4ff] transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-xl font-black text-[var(--text)] flex items-center gap-2">
          <Heart className="text-red-500 fill-red-500" size={20} /> List Favorit
        </h1>
      </div>

      <div className="px-4 pt-6">
        {favorites.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20 flex flex-col items-center">
            <div className="w-20 h-20 bg-[var(--card-bg)] rounded-full flex items-center justify-center mb-4 border border-[var(--card-border)]">
              <Heart size={32} className="text-[var(--text-muted)] opacity-50" />
            </div>
            <h2 className="text-lg font-bold text-[var(--text)] mb-2">Belum Ada Favorit</h2>
            <p className="text-sm text-[var(--text-muted)] max-w-xs">Klik ikon hati pada poster anime atau film untuk menyimpannya di sini.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {favorites.map((item, idx) => (
              <ContentCard 
                key={item.id} 
                item={{
                  id: item.id,
                  title: item.title,
                  poster: item.poster,
                  rating: item.rating,
                  type: item.type,
                  episodes: "?" // Dummy karena data dari localstorage
                }} 
                index={idx} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
