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
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.95 }} 
      className="h-full"
    >
      <Link
        href={tool.href}
        className="group relative flex flex-col items-center justify-between h-full min-h-[190px] p-4 rounded-[28px] transition-all duration-300 overflow-hidden
        bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--card-border)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]
        hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] dark:hover:border-white/20"
      >
        {/* Gradasi Cahaya Dalam */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative mt-2 mb-4 p-3 rounded-2xl bg-white/50 dark:bg-white/5 shadow-sm border border-black/5 dark:border-white/5 group-hover:scale-110 transition-transform duration-300">
          <Icon size={26} className="text-gray-800 dark:text-white/90" />
        </div>

        <div className="relative text-center flex-1 flex flex-col items-center justify-center w-full">
          <h3 className="text-[13px] font-bold text-[var(--text)] leading-tight mb-1">{tool.title}</h3>
          <p className="text-[10px] text-[var(--text-muted)] leading-tight line-clamp-2">{tool.description}</p>
        </div>

        <div className="relative w-full flex flex-col items-center mt-4 gap-2">
          <div className="flex gap-1.5 justify-center">
            {tool.tags.map((tag, i) => (
              <span key={i} className="text-[9px] font-bold tracking-wide text-gray-600 dark:text-gray-300 bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-full border border-black/5 dark:border-white/5">
                {tag}
              </span>
            ))}
          </div>
          <div className="w-full h-8 flex items-center justify-center mt-1">
            <ArrowRight size={16} className="text-gray-400 dark:text-gray-500 group-hover:translate-x-2 group-hover:text-black dark:group-hover:text-white transition-all duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
