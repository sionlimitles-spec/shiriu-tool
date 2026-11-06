"use client";
import Link from "next/link";
import { Tool } from "@/lib/data";
import { motion } from "framer-motion";
import { Play, Download, Brain, Book } from "lucide-react";

export default function ToolCard({ tool }: { tool: Tool }) {
  // Warna gradasi untuk ikon (tetap menggunakan aksen warna asli tiap tool)
  const getGradient = () => {
    switch (tool.id) {
      case "nonton": return "from-red-500 to-orange-500";
      case "downloader": return "from-[#00b4ff] to-blue-600";
      case "ai": return "from-purple-500 to-indigo-500";
      case "komik": return "from-green-500 to-emerald-600";
      default: return "from-gray-500 to-gray-700";
    }
  };

  const Icon = () => {
    switch (tool.id) {
      case "nonton": return <Play size={28} className="text-white" />;
      case "downloader": return <Download size={28} className="text-white" />;
      case "ai": return <Brain size={28} className="text-white" />;
      case "komik": return <Book size={28} className="text-white" />;
      default: return <Play size={28} className="text-white" />;
    }
  };

  return (
    <motion.div whileTap={{ scale: 0.95 }} className="h-full">
      <Link 
        href={tool.href} 
        className="group flex flex-col items-center justify-center gap-3 p-3 h-full rounded-2xl bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-300 shadow-lg"
      >
        {/* Ikon dengan Efek Gradasi & Glow */}
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${getGradient()} blur-lg opacity-40 group-hover:opacity-70 transition-opacity`} />
          <div className={`relative w-14 h-14 flex items-center justify-center rounded-[18px] bg-gradient-to-br ${getGradient()} shadow-inner`}>
            <Icon />
          </div>
        </div>

        {/* Judul & Status (Dibuat ringkas) */}
        <div className="text-center mt-1">
          <h3 className="text-[13px] font-semibold text-gray-200 leading-tight line-clamp-2">
            {tool.title}
          </h3>
          {tool.badge && (
            <span className="inline-block mt-1 text-[9px] font-bold tracking-widest text-gray-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
              {tool.badge}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
