"use client";
import Link from "next/link";
import { Tool } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;

  return (
    <motion.div 
      whileTap={{ scale: 0.95 }}
      className="h-full"
    >
      <Link 
        href={tool.href} 
        className="group flex flex-col items-center justify-between h-full min-h-[190px] p-3 rounded-[28px] bg-white/5 border border-white/20 backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
      >
        {/* Ikon */}
        <div className="mt-2 mb-3">
          <Icon size={28} className="text-white drop-shadow-md" />
        </div>

        {/* Teks */}
        <div className="text-center flex-1 flex flex-col items-center justify-center w-full">
          <h3 className="text-[13px] font-bold text-white leading-tight mb-1">{tool.title}</h3>
          <p className="text-[10px] text-gray-300 leading-tight line-clamp-2">{tool.description}</p>
        </div>

        {/* Tag & Panah */}
        <div className="w-full flex flex-col items-center mt-3 gap-2">
          <div className="flex gap-1 justify-center">
            {tool.tags.map((tag, i) => (
              <span key={i} className="text-[9px] font-semibold text-gray-200 bg-black/30 px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>
          <ArrowRight size={16} className="text-white mt-1 opacity-70 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}
