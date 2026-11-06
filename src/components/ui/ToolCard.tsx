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
      whileHover={{ y: -4 }} // Efek naik sedikit tanpa glow
      whileTap={{ scale: 0.96 }} 
      className="h-full"
    >
      <Link
        href={tool.href}
        className="group relative flex flex-col items-center h-full min-h-[190px] p-4 rounded-[24px] transition-all duration-300 overflow-hidden
        bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)]"
      >
        {/* Ikon Tanpa Kotak (Transparan) */}
        <div className="relative mt-3 mb-4 group-hover:scale-110 transition-transform duration-300">
          {/* Warna ikon mengikuti var(--icon-color) */}
          <Icon size={32} className="text-[var(--icon-color)] drop-shadow-sm" />
        </div>

        {/* Teks (Judul & Deskripsi) */}
        <div className="relative text-center flex-1 flex flex-col items-center w-full">
          <h3 className="text-[13px] font-bold text-[var(--text)] leading-tight mb-1 line-clamp-2">{tool.title}</h3>
          <p className="text-[10px] text-[var(--text-muted)] leading-tight line-clamp-2">{tool.description}</p>
        </div>

        {/* Tag & Panah Bawah */}
        <div className="relative w-full flex items-center justify-between mt-4 pt-3 border-t border-[var(--card-border)]">
          <div className="flex gap-1">
            {tool.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="text-[9px] font-semibold text-[var(--text-muted)] bg-[var(--card-border)] px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[var(--card-border)] group-hover:bg-[var(--text)] transition-colors duration-300">
            <ArrowRight size={12} className="text-[var(--text)] group-hover:text-[var(--bg)]" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
