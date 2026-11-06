"use client";
import Link from "next/link";
import { Tool } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ToolCard({ tool, index }: { tool: Tool, index: number }) {
  const Icon = tool.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }} 
      className="h-full relative group"
    >
      {/* Efek Glow Border (Lebih Terang) */}
      <div className="absolute -inset-[1.5px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 rounded-[26px] opacity-0 group-hover:opacity-60 transition duration-300 blur-sm pointer-events-none" />
      
      <Link
        href={tool.href}
        className="relative flex flex-col items-center h-full min-h-[190px] p-4 rounded-[24px] transition-all duration-300
        bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] overflow-hidden z-10"
      >
        {/* Ikon Transparan */}
        <div className="relative mt-3 mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon size={32} className="text-[var(--text)] drop-shadow-md" />
        </div>

        {/* Teks */}
        <div className="relative text-center flex-1 flex flex-col items-center w-full">
          <h3 className="text-[13px] font-bold text-[var(--text)] leading-tight mb-1 line-clamp-2">{tool.title}</h3>
          <p className="text-[10px] text-[var(--text-muted)] leading-tight line-clamp-2">{tool.description}</p>
        </div>

        {/* Tag & Panah */}
        <div className="relative w-full flex items-center justify-between mt-4 pt-3 border-t border-[var(--card-border)]">
          <div className="flex gap-1">
            {tool.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="text-[9px] font-semibold text-[var(--text-muted)] bg-[var(--card-border)] px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[var(--card-border)] group-hover:bg-[var(--text)] transition-colors duration-300">
            <ArrowRight size={12} className="text-[var(--text)] group-hover:text-[var(--bg)] transition-colors" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
