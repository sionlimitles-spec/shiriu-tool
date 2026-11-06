"use client";
import { toolsData } from "@/lib/data";
import ToolCard from "@/components/ui/ToolCard";
import { motion } from "framer-motion";
import { Sparkles, Play, Download, Book, Brain } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  // Filter sederhana untuk pencarian
  const filteredTools = toolsData.filter((tool) =>
    tool.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center">
      
      {/* ================= HERO SECTION DENGAN VIDEO ================= */}
      <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] flex items-center justify-center overflow-hidden rounded-b-3xl shadow-2xl mb-12">
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://a.top4top.io/m_3961mpi8j0.mp4" type="video/mp4" />
        </video>

        {/* Overlay Gelap agar Teks Terbaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/60 to-transparent z-10" />

        {/* Konten Hero */}
        <div className="relative z-20 text-center px-4 max-w-3xl animate-fade-in-up mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            <Sparkles size={16} className="text-[#00b4ff]" /> Platform Masa Depan
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
            Akses Semua <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4ff] to-blue-500">Kebutuhan Media</span> Kamu.
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl font-medium drop-shadow-md max-w-2xl mx-auto">
            Streaming anime, download video tanpa watermark, dan nikmati fitur canggih lainnya dalam satu platform premium.
          </p>
        </div>
      </div>

      {/* ================= TOOLS GRID SECTION ================= */}
      <div className="w-full max-w-6xl px-4 pb-20">
        
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-[#00b4ff] rounded-full inline-block"></span>
              Semua Tools
            </h2>
            <p className="text-gray-400 mt-2 text-sm">Pilih tool yang kamu butuhkan di bawah ini.</p>
          </div>
          
          <div className="w-full md:w-72 relative">
            <input 
              type="text" 
              placeholder="Cari tools..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0f172a] border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-[#00b4ff] transition-all"
            />
          </div>
        </div>

        {/* Grid Cards */}
        <motion.div 
          initial="hidden" animate="show" 
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredTools.map((tool) => (
            <motion.div key={tool.id} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </motion.div>
        
        {filteredTools.length === 0 && (
          <div className="text-center py-20 text-gray-400">Tools tidak ditemukan.</div>
        )}
      </div>
    </div>
  );
}
