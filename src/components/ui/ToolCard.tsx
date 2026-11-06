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
      whileHover={{ y: -5, scale: 1.03 }}
      whileTap={{ scale: 0.95 }} 
      className="h-full"
    >
      <Link
        href={tool.href}
        className="group relative flex flex-col items-center h-full min-h-[200px] p-4 rounded-[24px] transition-all duration-300 overflow-hidden
        bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]
        hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)] hover:border-white/20"
      >
        {/* Efek Gradasi Dalam Saat Hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Ikon (Kotak Kaca Elegan) */}
        <div className="relative mt-2 mb-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 group-hover:border-white/30 transition-all duration-300">
          <Icon size={24} className="text-white drop-shadow-md" />
        </div>

        {/* Teks (Judul & Deskripsi) */}
        <div className="relative text-center flex-1 flex flex-col items-center w-full">
          <h3 className="text-[13px] font-bold text-white leading-tight mb-1 line-clamp-2">{tool.title}</h3>
          <p className="text-[10px] text-gray-400 leading-tight line-clamp-2">{tool.description}</p>
        </div>

        {/* Tag & Panah */}
        <div className="relative w-full flex items-center justify-between mt-4 pt-3 border-t border-white/5">
          <div className="flex gap-1">
            {tool.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="text-[9px] font-semibold text-gray-300 bg-white/10 px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
            <ArrowRight size={12} className="text-white group-hover:text-black" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
