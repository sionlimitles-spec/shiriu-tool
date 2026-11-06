"use client";
import { useState, useEffect } from "react";
import { toolsData } from "@/lib/data";
import ToolCard from "@/components/ui/ToolCard";
import BottomNav from "@/components/BottomNav";
import { Search, LayoutGrid, Moon, Sun, User, Smartphone, Battery, Crown, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const categories = ["Semua", "Media", "Hiburan", "AI"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("Semua");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) setIsDark(true);
    else setIsDark(false);
  }, []);

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
    <div className="min-h-screen transition-colors duration-500">
      
      {/* ================= 1. CINEMATIC HERO VIDEO ================= */}
      <div className="relative w-full h-[300px] overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="https://files.catbox.moe/hfbu7d.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/40 to-black/30" />
        
        <button 
          onClick={toggleTheme}
          className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/20 dark:bg-black/40 backdrop-blur-md border border-white/30 text-white shadow-lg transition-transform active:scale-90"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* ================= 2. KONTEN ================= */}
      <div className="px-4 -mt-20 relative z-30 max-w-lg mx-auto">
        
        {/* Kartu Profil Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
          className="rounded-[32px] border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-2xl p-6 shadow-2xl mb-6"
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-3 text-[var(--text-muted)]"><User size={16} /> Username</div>
              <span className="font-bold text-[var(--text)]">Tamu</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-3 text-[var(--text-muted)]"><Smartphone size={16} /> Perangkat</div>
              <span className="font-bold text-[var(--text)]">Android</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-3 text-[var(--text-muted)]"><Battery size={16} /> Baterai</div>
              <span className="font-bold text-[var(--text)]">85%</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-[var(--card-border)] pt-4 mt-1">
              <div className="flex items-center gap-3 text-[var(--text-muted)]"><Crown size={16} /> Role</div>
              <span className="font-bold text-[var(--text)] flex items-center gap-1">✦ MEMBER</span>
            </div>
          </div>
        </motion.div>

        {/* Tombol Aksi */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-3 mb-8">
          <button className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-md text-[var(--text)] font-bold shadow-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95">
            <MessageCircle size={18} /> Saluran WhatsApp
          </button>
          <button className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-md text-[var(--text)] font-bold shadow-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
            @shiriutool
          </button>
        </motion.div>

        {/* Header & Pencarian */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid size={20} className="text-[var(--text)]" />
            <h2 className="text-xl font-black text-[var(--text)] tracking-tight">Tools Populer</h2>
          </div>

          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-5 h-5" />
            <input
              type="text"
              placeholder="Cari tool impianmu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl py-4 pl-12 pr-4 text-sm text-[var(--text)] outline-none focus:border-gray-400 dark:focus:border-gray-500 backdrop-blur-xl transition-colors placeholder:text-[var(--text-muted)]"
            />
          </div>

          {/* Filter Kategori */}
          <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  activeCat === cat
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-lg scale-105"
                    : "bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--card-border)] hover:text-[var(--text)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid Tools (PERHATIKAN: index={idx} sudah ditambahkan) */}
        <motion.div layout className="grid grid-cols-3 gap-3 md:gap-4 mb-10">
          {filteredTools.map((tool, idx) => (
            <ToolCard key={tool.id} tool={tool} index={idx} />
          ))}
        </motion.div>
        
        {filteredTools.length === 0 && (
          <div className="text-center py-10 text-[var(--text-muted)] text-sm">Tool tidak ditemukan.</div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
