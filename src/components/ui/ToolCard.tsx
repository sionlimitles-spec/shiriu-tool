"use client";
import Link from "next/link";
import { Tool } from "@/lib/data";
import { motion } from "framer-motion";
import { Play, Download, Brain, Book } from "lucide-react";

export default function ToolCard({ tool }: { tool: Tool }) {
  // Warna gradasi lembut untuk background ikon
  const getGradient = () => {
    switch (tool.id) {
      case "nonton": return "from-red-500/20 to-orange-500/5 text-red-400 border-red-500/20";
      case "downloader": return "from-[#00b4ff]/20 to-blue-600/5 text-[#00b4ff] border-[#00b4ff]/20";
      case "ai": return "from-purple-500/20 to-indigo-500/5 text-purple-400 border-purple-500/20";
      case "komik": return "from-green-500/20 to-emerald-600/5 text-green-400 border-green-500/20";
      default: return "from-gray-500/20 to-gray-700/5 text-gray-400 border-gray-500/20";
    }
  };

  const Icon = () => {
    switch (tool.id) {
      case "nonton": return <Play size={24} />;
      case "downloader": return <Download size={24} />;
      case "ai": return <Brain size={24} />;
      case "komik": return <Book size={24} />;
      default: return <Play size={24} />;
    }
  };

  return (
    <motion.div whileTap={{ scale: 0.95 }} className="h-full">
      <Link 
        href={tool.href} 
        className="group flex flex-col items-center justify-center gap-3 p-4 h-full rounded-2xl bg-gradient-to-b from-[#151515] to-[#0a0a0a] border border-white/5 hover:border-white/15 transition-all duration-300 shadow-lg"
      >
        {/* Ikon dengan Efek Kaca Berwarna */}
        <div className={`relative w-14 h-14 flex items-center justify-center rounded-[18px] bg-gradient-to-br border ${getGradient()} shadow-inner group-hover:scale-105 transition-transform`}>
          <Icon />
        </div>

        {/* Judul & Status */}
        <div className="text-center mt-1">
          <h3 className="text-[12px] sm:text-[13px] font-bold text-gray-200 leading-tight line-clamp-2">
            {tool.title}
          </h3>
          {tool.badge && (
            <span className="inline-block mt-1.5 text-[8px] font-bold tracking-widest text-gray-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
              {tool.badge}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
