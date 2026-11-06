"use client";
import { useState, useEffect } from "react";
import { toolsData } from "@/lib/data";
import ToolCard from "@/components/ui/ToolCard";
import BottomNav from "@/components/BottomNav";
import { Search, LayoutGrid, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const categories = ["Semua", "Media", "Hiburan", "AI"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("Semua");
  const [isDark, setIsDark] = useState(true);

  // Cek tema saat halaman dimuat
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  // Fungsi ganti tema
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const filteredTools = toolsData.filter((tool) => {
    const matchSearch = tool.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCat === "Semua" || tool.category === activeCat.toLowerCase();
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Hero Video */}
      <div className="relative w-full h-[240px] overflow-hidden rounded-b-[40px] border-b border-gray-200 dark:border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-black z-10 opacity-80" />
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 dark:opacity-60">
          <source src="https://files.catbox.moe/hfbu7d.mp4" type="video/mp4" />
        </video>
        
        {/* Tombol Toggle Tema */}
        <button 
          onClick={toggleTheme}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/30 dark:border-white/10 text-white shadow-lg transition-transform active:scale-90"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="px-4 -mt-10 relative z-20">
        {/* Kartu Profil */}
        <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-[var(--card-bg)] backdrop-blur-2xl p-5 shadow-lg mb-6">
          <div className="flex flex-col gap-3.5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-white/60">Username</span>
              <span className="font-semibold text-gray-900 dark:text-white">Tamu</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-white/60">Perangkat</span>
              <span className="font-semibold text-gray-900 dark:text-white">Android</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-white/60">Baterai</span>
              <span className="font-semibold text-gray-900 dark:text-white">85%</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-gray-200 dark:border-white/10 pt-3">
              <span className="text-gray-500 dark:text-white/60">Role</span>
              <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1">✦ MEMBER</span>
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col gap-3 mb-8">
          <button className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-[var(--card-bg)] border border-gray-200 dark:border-white/10 backdrop-blur-md text-gray-800 dark:text-white/80 text-sm font-bold shadow-md hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95">
            Saluran WhatsApp
          </button>
          <button className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-[var(--card-bg)] border border-gray-200 dark:border-white/10 backdrop-blur-md text-gray-800 dark:text-white/80 text-sm font-bold shadow-md hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95">
            @shiriutool
          </button>
        </div>

        {/* Header & Pencarian */}
        <div className="flex items-center gap-2 mb-4">
          <LayoutGrid size={20} className="text-gray-600 dark:text-white/70" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Tools Populer</h2>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari tool..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[var(--card-bg)] border border-gray-200 dark:border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-gray-900 dark:text-white outline-none focus:border-gray-400 dark:focus:border-white/30 backdrop-blur-xl transition-colors placeholder:text-gray-400 dark:placeholder:text-white/40"
          />
        </div>

        {/* Filter Kategori */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCat === cat
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
                  : "bg-[var(--card-bg)] text-gray-600 dark:text-white/50 border border-gray-200 dark:border-white/10 hover:text-black dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Tools */}
        <motion.div layout className="grid grid-cols-3 gap-3">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </motion.div>
        {filteredTools.length === 0 && (
          <div className="text-center py-10 text-gray-500 dark:text-white/40 text-sm">Tool tidak ditemukan.</div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
