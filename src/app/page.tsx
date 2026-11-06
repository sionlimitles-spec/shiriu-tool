"use client";
import { useState } from "react";
import { toolsData } from "@/lib/data";
import ToolCard from "@/components/ui/ToolCard";
import BottomNav from "@/components/BottomNav";
import { Search, LayoutGrid } from "lucide-react";
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
    <div className="min-h-screen">
      {/* Hero Video */}
      <div className="relative w-full h-[240px] overflow-hidden rounded-b-[40px] border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 to-[#050505]/90 z-10" />
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-60">
          <source src="https://files.catbox.moe/hfbu7d.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="px-4 -mt-10 relative z-20">
        {/* Kartu Profil */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5 shadow-2xl mb-6">
          <div className="flex flex-col gap-3.5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/60">Username</span>
              <span className="font-semibold text-white">Tamu</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/60">Perangkat</span>
              <span className="font-semibold text-white">Android</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/60">Baterai</span>
              <span className="font-semibold text-white">85%</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-white/10 pt-3">
              <span className="text-white/60">Role</span>
              <span className="font-bold text-white flex items-center gap-1">✦ MEMBER</span>
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col gap-3 mb-8">
          <button className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-white/80 text-sm font-bold shadow-lg hover:bg-white/10 transition-all active:scale-95">
            Saluran WhatsApp
          </button>
          <button className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-white/80 text-sm font-bold shadow-lg hover:bg-white/10 transition-all active:scale-95">
            @shiriutool
          </button>
        </div>

        {/* Header & Pencarian */}
        <div className="flex items-center gap-2 mb-4">
          <LayoutGrid size={20} className="text-white/70" />
          <h2 className="text-lg font-bold text-white">Tools Populer</h2>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari tool..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-white/30 backdrop-blur-xl transition-colors placeholder:text-white/40"
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
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : "bg-white/5 text-white/50 border border-white/10 hover:text-white/80"
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
          <div className="text-center py-10 text-white/40 text-sm">Tool tidak ditemukan.</div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
