"use client";
import { useState } from "react";
import { toolsData } from "@/lib/data";
import ToolCard from "./ToolCard";
import { Search, LayoutGrid, Download, Film, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ToolSection() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");

  const filteredTools = toolsData.filter(t => {
    const matchSearch = (t.title + " " + t.description).toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === "all" || t.category === cat;
    return matchSearch && matchCat;
  });

  return (
    <>
      <div className="w-full flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white border-l-4 border-[#00b4ff] pl-3">Semua Tools</h2>
        <span className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-gray-400">
          {filteredTools.length} Tools
        </span>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input 
          type="search" 
          placeholder="Cari tools impianmu..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0f172a] border border-white/10 rounded-2xl h-14 pl-12 pr-4 text-white outline-none focus:border-[#00b4ff] transition-colors"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-4">
        {[
          { id: "all", label: "Semua", icon: LayoutGrid },
          { id: "media", label: "Media", icon: Download },
          { id: "hiburan", label: "Hiburan", icon: Film },
          { id: "ai", label: "AI", icon: Sparkles }
        ].map((c) => (
          <button 
            key={c.id} 
            onClick={() => setCat(c.id)}
            className={`flex-none flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              cat === c.id 
                ? "bg-[#00b4ff] text-black shadow-[0_0_15px_rgba(0,180,255,0.4)]" 
                : "bg-[#0f172a] border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            <c.icon size={16} /> {c.label}
          </button>
        ))}
      </div>

      <motion.div 
        initial="hidden" animate="show" 
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        {filteredTools.map((tool) => (
          <motion.div key={tool.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
            <ToolCard tool={tool} />
          </motion.div>
        ))}
      </motion.div>
      
      {filteredTools.length === 0 && (
        <div className="text-center py-20 text-gray-400">Tools tidak ditemukan.</div>
      )}
    </>
  );
}
