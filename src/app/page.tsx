"use client";
import { useState } from "react";
import { toolsData } from "@/lib/data";
import ToolCard from "@/components/ui/ToolCard";
import { motion } from "framer-motion";
import { Sparkles, Search } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredTools = toolsData.filter((tool) =>
    tool.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505]">
      
      {/* ================= 1. HERO SECTION (VIDEO MURNI TANPA POSTER) ================= */}
      <div className="relative w-full h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#111] via-[#050505] to-[#0a0a0a]">
        
        {/* VIDEO CATBOX */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-10 opacity-70"
        >
          <source src="https://files.catbox.moe/hfbu7d.mp4" type="video/mp4" />
        </video>

        {/* Overlay Gradient (Hitam pekat di bawah agar nyatu sama background) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-20" />

        {/* Konten Teks */}
        <div className="relative z-30 text-center px-4 max-w-2xl mt-10">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium mb-5"
          >
            <Sparkles size={12} className="text-[#00b4ff]" /> SHIRIU TOOL PREMIUM
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-white drop-shadow-xl"
          >
            Satu Platform, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Semua Kebutuhan.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-gray-300 text-sm md:text-base max-w-md mx-auto drop-shadow-md"
          >
            Download media, streaming, dan AI dalam genggaman.
          </motion.p>
        </div>
      </div>

      {/* ================= 2. SECTION TOOLS (GRID 3 KOLOM) ================= */}
      <div className="relative z-30 max-w-2xl mx-auto px-4 -mt-8 pb-20">
        
        {/* Search Bar Melayang */}
        <div className="bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 mb-8 shadow-2xl flex items-center gap-2">
          <div className="pl-3 text-gray-500">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Cari tools impianmu..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent py-3 pr-4 text-sm text-white outline-none placeholder:text-gray-500"
          />
        </div>

        {/* Grid 3 Kolom */}
        <div className="mb-5 flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pilih Tools</h2>
          <span className="text-[10px] text-gray-500 bg-white/5 px-2.5 py-1 rounded-md">{filteredTools.length} Tersedia</span>
        </div>

        <motion.div 
          initial="hidden" animate="show" 
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          {filteredTools.map((tool) => (
            <motion.div key={tool.id} variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}>
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </motion.div>
        
        {filteredTools.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-sm">Tools tidak ditemukan.</div>
        )}

        <p className="text-center text-[10px] text-gray-600 mt-16 tracking-wider">
          © 2026 SHIRIU TOOL. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  );
}
