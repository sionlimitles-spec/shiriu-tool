"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toolsData } from "@/lib/data";
import ToolCard from "@/components/ui/ToolCard";
import { Sparkles, Search } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredTools = toolsData.filter((tool) =>
    tool.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#05070d] text-white">
      {/* HERO SECTION DENGAN VIDEO */}
      <div className="relative w-full h-[65vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
        >
          <source src="https://a.top4top.io/m_3961mpi8j0.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/80 to-transparent z-10" />

        <div className="relative z-20 text-center px-4 max-w-3xl mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium mb-6"
          >
            <Sparkles size={14} className="text-[#00b4ff]" /> Platform Masa Depan
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6"
          >
            Akses Semua <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4ff] to-blue-500">Kebutuhan Media</span> Kamu.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-gray-300 text-base md:text-lg max-w-xl mx-auto"
          >
            Streaming anime, download video tanpa watermark, dan nikmati fitur canggih lainnya dalam satu platform premium.
          </motion.p>
        </div>
      </div>

      {/* KONTEN UTAMA */}
      <div className="relative z-30 max-w-6xl mx-auto px-4 -mt-10 pb-20">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-[#0f172a]/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-[#00b4ff] rounded-full inline-block"></span>
              Semua Tools
            </h2>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari tools..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-[#00b4ff] transition-all"
            />
          </div>
        </div>

        {/* Grid Kartu */}
        <motion.div 
          initial="hidden" animate="show" 
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredTools.map((tool) => (
            <motion.div key={tool.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
