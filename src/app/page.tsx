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
      
      {/* ================= 1. HERO SECTION (VIDEO LEBAR PENUH) ================= */}
      <div className="relative w-full h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        {/* Fallback Gradient (Jika video gagal load, ini yang muncul) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#050505] to-[#0a0a0a] z-0" />
        
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-10 opacity-60"
        >
          <source src="https://a.top4top.io/m_3961mpi8j0.mp4" type="video/mp4" />
        </video>

        {/* Overlay Gelap agar teks terbaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-20" />

        {/* Konten Teks */}
        <div className="relative z-30 text-center px-4 max-w-2xl mt-8">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium mb-4"
          >
            <Sparkles size={12} className="text-[#00b4ff]" /> SHIRIU TOOL PREMIUM
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-3 text-white drop-shadow-md"
          >
            Satu Platform, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Semua Kebutuhan.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-gray-400 text-xs md:text-sm max-w-md mx-auto"
          >
            Download media, streaming, dan AI dalam genggaman.
          </motion.p>
        </div>
      </div>

      {/* ================= 2. SECTION TOOLS (GRID 3 KOLOM) ================= */}
      <div className="relative z-30 max-w-2xl mx-auto px-4 -mt-6 pb-20">
        
        {/* Search Bar Elegan */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-2 mb-8 shadow-2xl flex items-center gap-2">
          <div className="pl-2 text-gray-500">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Cari tools impianmu..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent py-2 pr-4 text-sm text-white outline-none placeholder:text-gray-500"
          />
        </div>

        {/* Grid 3 Kolom (Mobile-First) */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Pilih Tools</h2>
          <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded-md">{filteredTools.length} Tersedia</span>
        </div>

        <motion.div 
          initial="hidden" animate="show" 
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-3 sm:gap-4"
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

        <p className="text-center text-xs text-gray-600 mt-16">
          © 2026 SHIRIU TOOL. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
