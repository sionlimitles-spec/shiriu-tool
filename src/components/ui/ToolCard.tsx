"use client";
import Link from "next/link";
import { Tool } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;

  return (
    <motion.div 
      whileHover={{ scale: 1.03, y: -5 }} 
      whileTap={{ scale: 0.95 }} 
      className="h-full"
    >
      <Link
        href={tool.href}
        className="group relative flex flex-col items-center justify-between h-full min-h-[190px] p-3 rounded-[28px] backdrop-blur-xl transition-all duration-300 overflow-hidden
        bg-[var(--card-bg)] border border-[var(--card-border)] hover:shadow-xl"
      >
        {/* Gradasi Efek Cahaya saat Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent dark:from-white/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative mt-2 mb-3">
          <Icon size={28} className="text-gray-800 dark:text-white/80 drop-shadow-sm group-hover:scale-110 transition-transform" />
        </div>

        <div className="relative text-center flex-1 flex flex-col items-center justify-center w-full">
          <h3 className="text-[13px] font-bold text-gray-900 dark:text-white leading-tight mb-1">{tool.title}</h3>
          <p className="text-[10px] text-gray-500 dark:text-white/50 leading-tight line-clamp-2">{tool.description}</p>
        </div>

        <div className="relative w-full flex flex-col items-center mt-3 gap-2">
          <div className="flex gap-1 justify-center">
            {tool.tags.map((tag, i) => (
              <span key={i} className="text-[9px] font-semibold text-gray-600 dark:text-white/60 bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-md border border-black/5 dark:border-white/5">
                {tag}
              </span>
            ))}
          </div>
          <ArrowRight size={16} className="text-gray-400 dark:text-white/50 mt-1 opacity-70 group-hover:translate-x-2 group-hover:text-gray-900 dark:group-hover:text-white transition-all" />
        </div>
      </Link>
    </motion.div>
  );
}
