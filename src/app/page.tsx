"use client";
import { useState, useEffect } from "react";
import { toolsData } from "@/lib/data";
import ToolCard from "@/components/ui/ToolCard";
import BottomNav from "@/components/BottomNav";
import { Search, LayoutGrid, Moon, Sun, User, Smartphone, Battery, Crown } from "lucide-react";
import { motion } from "framer-motion";

const categories = ["Semua", "Media", "Hiburan", "AI"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("Semua");
  const [isDark, setIsDark] = useState(true);
  
  // State untuk baterai asli HP
  const [batteryLevel, setBatteryLevel] = useState<number | string>("...");

  useEffect(() => {
    // Cek Mode Gelap/Terang
    if (document.documentElement.classList.contains('dark')) setIsDark(true);
    else setIsDark(false);

    // Ambil data Baterai HP (Battery Status API)
    if (typeof navigator !== "undefined" && "getBattery" in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100));
        
        // Update jika baterai berubah
        battery.addEventListener("levelchange", () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      });
    } else {
      setBatteryLevel("N/A"); // Jika browser tidak mendukung
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.remove('light');
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
    <div className="min-h-screen relative pb-28">
      
      {/* ================= 1. HERO VIDEO ================= */}
      <div className="relative w-full h-[260px] overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-80">
          <source src="https://files.catbox.moe/hfbu7d.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/70 to-transparent" />
        
        <button 
          onClick={toggleTheme}
          className="absolute top-6 right-6 z-20 p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white shadow-lg transition-transform active:scale-90"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* ================= 2. KONTEN ================= */}
      <div className="px-4 -mt-12 relative z-30 max-w-lg mx-auto">
        
        {/* Kartu Profil */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
          className="rounded-[28px] border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-2xl p-5 shadow-2xl mb-8 relative overflow-hidden"
        >
          {/* Efek Cahaya Tipis di Belakang Profil */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-2xl rounded-full"></div>

          <div className="flex flex-col gap-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[var(--text-muted)]">
                <User size={18} /> <span className="text-sm font-medium">Username</span>
              </div>
              <span className="font-bold text-[var(--text)] text-sm">Tamu</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[var(--text-muted)]">
                <Smartphone size={18} /> <span className="text-sm font-medium">Perangkat</span>
              </div>
              <span className="font-bold text-[var(--text)] text-sm">Android</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-[var(--text-muted)]">
                <Battery size={18} /> <span className="text-sm font-medium">Baterai</span>
              </div>
              {/* TAMPILAN BATERAI ASLI */}
              <span className="font-bold text-[var(--text)] text-sm">{batteryLevel}%</span>
            </div>
            <div className="flex items-center justify-between border-t border-[var(--card-border)] pt-4 mt-1">
              <div className="flex items-center gap-3 text-[var(--text-muted)]">
                <Crown size={18} /> <span className="text-sm font-medium">Role</span>
              </div>
              <span className="font-bold text-[var(--text)] flex items-center gap-1 text-sm">✦ MEMBER</span>
            </div>
          </div>
        </motion.div>

        {/* Header & Pencarian */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid size={20} className="text-[var(--text)]" />
            <h2 className="text-xl font-bold text-[var(--text)] tracking-tight">Tools Populer</h2>
          </div>

          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-5 h-5" />
            <input
              type="text"
              placeholder="Cari tool impianmu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl py-4 pl-12 pr-4 text-sm text-[var(--text)] outline-none focus:border-gray-400 backdrop-blur-xl transition-colors placeholder:text-[var(--text-muted)]"
            />
          </div>

          {/* Filter Kategori */}
          <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  activeCat === cat
                    ? "bg-[var(--text)] text-[var(--bg)] shadow-lg scale-105"
                    : "bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--card-border)] hover:text-[var(--text)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid Tools */}
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
