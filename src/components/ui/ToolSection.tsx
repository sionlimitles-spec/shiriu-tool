"use client";
import { useState } from "react";
import { toolsData } from "@/lib/data";
import ToolCard from "./ToolCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

export default function ToolSection() {
  const [search, setSearch] = useState("");

  const filteredTools = toolsData.filter((tool) => 
    tool.title.toLowerCase().includes(search.toLowerCase()) || 
    tool.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full mt-6">
      {/* Search Bar */}
      <div className="relative mb-8 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-accent-cyan transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Cari tools impianmu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#14141a] border border-white/10 text-white rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all placeholder:text-slate-500"
        />
      </div>

      {/* Grid Animasi */}
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 items-stretch"
      >
        {filteredTools.map((tool) => (
          <motion.div key={tool.id} variants={item}>
            <ToolCard tool={tool} />
          </motion.div>
        ))}
      </motion.div>
      
      {filteredTools.length === 0 && (
        <div className="text-center py-20 text-slate-400">Tool tidak ditemukan. Coba kata kunci lain.</div>
      )}
    </div>
  );
}
