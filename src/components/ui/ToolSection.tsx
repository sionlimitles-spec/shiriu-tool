"use client";
import { useState } from "react";
import { toolsData } from "@/lib/data";
import ToolCard from "./ToolCard";
import { motion } from "framer-motion";
import { Search, LayoutGrid, Download, Film, Sparkles } from "lucide-react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

const categories = [
  { id: "all", label: "Semua", icon: LayoutGrid },
  { id: "media", label: "Media", icon: Download },
  { id: "hiburan", label: "Hiburan", icon: Film },
  { id: "ai", label: "AI", icon: Sparkles },
];

export default function ToolSection() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  const filteredTools = toolsData.filter((tool) => {
    const matchSearch = tool.title.toLowerCase().includes(search.toLowerCase()) || 
                        tool.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCat === "all" || tool.category === activeCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="w-full mt-6">
      {/* Search Bar */}
      <div className="relative mb-4 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-text-muted group-focus-within:text-brand transition-colors" />
        </div>
        <input
          type="search"
          placeholder="Cari tools impianmu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-line text-white rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all placeholder:text-text-muted"
        />
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCat === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`flex-none flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive 
                  ? "bg-brand text-bg-main border-brand shadow-[0_0_15px_rgba(0,180,255,0.3)]" 
                  : "bg-white/5 text-text-muted border border-line hover:bg-white/10"
              }`}
            >
              <Icon size={16} /> {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid Animasi */}
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 items-stretch mt-2"
      >
        {filteredTools.map((tool) => (
          <motion.div key={tool.id} variants={item}>
            <ToolCard tool={tool} />
          </motion.div>
        ))}
      </motion.div>
      
      {filteredTools.length === 0 && (
        <div className="text-center py-20 text-text-muted">Tools tidak ditemukan.</div>
      )}
    </div>
  );
}
