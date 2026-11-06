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

  const filteredTools = toolsData.filter((tool) => {
    const matchSearch = tool.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCat === "Semua" || tool.category === activeCat.toLowerCase();
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* ================= BACKGROUND BLOBS (EFEK CAHAYA) ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[250px] h-[250px] bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[350px] h-[350px] bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 pb-28">
        
        {/* ================= 1. CINEMATIC HERO VIDEO ================= */}
        <div className="relative w-full h-[280px] overflow-hidden">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-80">
            <source src="https://files.catbox.moe/hfbu7d.mp4" type="video/mp4" />
          </video>
          
          {/* Overlay Gradient Ekstra Gelap agar Menyatu */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-black/30" />
        </div>

        {/* ================= 2. KONTEN ================= */}
        <div className="px-4 -mt-16 relative z-30 max-w-lg mx-auto">
          
          {/* Kartu Profil Kaca */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
            className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] mb-8"
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3 text-gray-400"><User size={16} /> Username</div>
                <span className="font-bold text-white tracking-wide">Tamu</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3 text-gray-400"><Smartphone size={16} /> Perangkat</div>
                <span className="font-bold text-white">Android</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3 text-gray-400"><Battery size={16} /> Baterai</div>
                <span className="font-bold text-white">85%</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-white/10 pt-4 mt-1">
                <div className="flex items-center gap-3 text-gray-400"><Crown size={16} /> Role</div>
                <span className="font-bold text-white flex items-center gap-1">✦ MEMBER</span>
              </div>
            </div>
          </motion.div>

          {/* Header & Pencarian */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-2 mb-4">
              <LayoutGrid size={20} className="text-white" />
              <h2 className="text-xl font-bold text-white tracking-tight">Tools Populer</h2>
            </div>

            <div className="relative mb-5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari tool impianmu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-white/30 backdrop-blur-xl transition-colors placeholder:text-gray-500"
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
                      ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:text-white"
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
            <div className="text-center py-10 text-gray-500 text-sm">Tool tidak ditemukan.</div>
          )}
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
