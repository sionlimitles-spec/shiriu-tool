"use client";

import { useState, useEffect } from "react";
import { fetchAnime } from "@/lib/jikan";
import { fetchMovies } from "@/lib/tmdb";
import ContentCard, { MediaItem } from "@/components/nonton/ContentCard";
import ContinueWatching from "@/components/nonton/ContinueWatching";
import { getWatchHistory, WatchHistory } from "@/lib/watchlist";
import { Search, PlayCircle, Sparkles, History, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const TABS = ["Anime", "Donghua", "Film"];
const GENRES: Record<string, {id: string, name: string}[]> = {
  Anime: [
    { id: "1", name: "Action" }, 
    { id: "22", name: "Romance" }, 
    { id: "10", name: "Fantasy" }, 
    { id: "62", name: "Isekai" }
  ],
  Film: [
    { id: "28", name: "Action" }, 
    { id: "35", name: "Comedy" }, 
    { id: "878", name: "Sci-Fi" }, 
    { id: "27", name: "Horror" }
  ],
  Donghua: []
};

export default function NontonPage() {
  const [activeTab, setActiveTab] = useState("Anime");
  const [activeGenre, setActiveGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<MediaItem[]>([]);
  const [heroData, setHeroData] = useState<MediaItem[]>([]);
  
  // State untuk Riwayat (Lanjut Nonton)
  const [history, setHistory] = useState<WatchHistory[]>([]);

  // Muat Riwayat saat halaman dibuka
  useEffect(() => {
    setHistory(getWatchHistory());
  }, []);

  // Ambil data API
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        let result: MediaItem[] = [];
        if (activeTab === "Anime") {
          result = await fetchAnime(searchQuery, activeGenre);
        } else {
          result = await fetchMovies(activeTab.toLowerCase() as "movie" | "donghua", searchQuery, activeGenre);
        }
        setData(result);
        
        if (!searchQuery && !activeGenre && heroData.length === 0) {
          setHeroData(result.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => loadData(), 500);
    return () => clearTimeout(timer);
  }, [activeTab, activeGenre, searchQuery]);

  return (
    <div className="min-h-screen pb-24">
      
      {/* ================= HEADER & SEARCH & TOMBOL NAVIGASI ================= */}
      <div className="sticky top-0 z-40 bg-[var(--bg)]/80 backdrop-blur-xl pt-4 pb-2 px-4 border-b border-[var(--card-border)]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-black text-[var(--text)] tracking-tight flex items-center gap-2">
            <PlayCircle className="text-[#00b4ff]" /> Nonton
          </h1>
          
          {/* TOMBOL NAVIGASI KE RIWAYAT & FAVORIT */}
          <div className="flex gap-2">
            <Link 
              href="/riwayat" 
              className="p-2 bg-[var(--card-bg)] rounded-full border border-[var(--card-border)] text-[var(--text-muted)] hover:text-[#00b4ff] transition-colors"
              title="Riwayat Nonton"
            >
              <History size={18}/>
            </Link>
            <Link 
              href="/favorit" 
              className="p-2 bg-[var(--card-bg)] rounded-full border border-[var(--card-border)] text-[var(--text-muted)] hover:text-red-500 transition-colors"
              title="List Favorit"
            >
              <Heart size={18}/>
            </Link>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-4 h-4" />
          <input
            type="text"
            placeholder={`Cari ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl py-2.5 pl-10 pr-4 text-xs text-[var(--text)] outline-none focus:border-[#00b4ff]"
          />
        </div>
      </div>

      <div className="px-4 pt-4">
        
        {/* SECTION LANJUT NONTON (MUNCUL JIKA ADA RIWAYAT) */}
        <ContinueWatching history={history} />

        {/* HERO CAROUSEL */}
        {!searchQuery && activeTab === "Anime" && heroData.length > 0 && (
          <div className="relative w-full h-[180px] rounded-3xl overflow-hidden mb-6 border border-[var(--card-border)] shadow-2xl group">
            <img src={heroData[0].poster} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-bold text-[#00b4ff] bg-[#00b4ff]/20 px-2 py-0.5 rounded-md mb-2 inline-block border border-[#00b4ff]/30">TRENDING #1</span>
              <h2 className="text-xl font-bold text-white leading-tight line-clamp-1">{heroData[0].title}</h2>
              <Link href={`/nonton/${heroData[0].type}/${heroData[0].id}`} className="mt-2 inline-flex bg-white text-black text-xs font-bold px-4 py-1.5 rounded-full items-center gap-1 hover:bg-gray-200 transition-colors">
                <PlayCircle size={14} /> Tonton
              </Link>
            </div>
          </div>
        )}

        {/* TABS KATEGORI UTAMA */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setActiveGenre(""); setSearchQuery(""); }}
              className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-[#00b4ff] text-white shadow-[0_0_15px_rgba(0,180,255,0.3)]"
                  : "bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--card-border)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* SUB-KATEGORI (GENRE) */}
        {GENRES[activeTab] && GENRES[activeTab].length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
            <button
              onClick={() => setActiveGenre("")}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold border transition-all ${
                activeGenre === "" ? "border-[#00b4ff] text-[#00b4ff] bg-[#00b4ff]/10" : "border-[var(--card-border)] text-[var(--text-muted)]"
              }`}
            >
              Semua
            </button>
            {GENRES[activeTab].map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGenre(g.id)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold border whitespace-nowrap transition-all ${
                  activeGenre === g.id ? "border-[#00b4ff] text-[#00b4ff] bg-[#00b4ff]/10" : "border-[var(--card-border)] text-[var(--text-muted)]"
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        )}

        {/* GRID KONTEN & SKELETON */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          <AnimatePresence>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="aspect-[2/3] rounded-2xl bg-[var(--card-border)] animate-pulse" />
                  <div className="h-3 bg-[var(--card-border)] rounded w-3/4 animate-pulse" />
                </div>
              ))
            ) : (
              data.map((item, idx) => (
                <ContentCard key={item.id} item={item} index={idx} />
              ))
            )}
          </AnimatePresence>
        </div>
        
        {!isLoading && data.length === 0 && (
          <div className="text-center py-20">
            <Sparkles className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3 opacity-50" />
            <p className="text-[var(--text-muted)] text-sm">Konten tidak ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
