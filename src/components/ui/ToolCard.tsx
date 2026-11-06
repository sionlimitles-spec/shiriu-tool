"use client";

import Link from "next/link";
import { Tool } from "@/lib/data";
import { ChevronRight, Play, Download, Brain, Book } from "lucide-react";
import { motion } from "framer-motion";

export default function ToolCard({ tool }: { tool: Tool }) {
  const getTheme = () => {
    switch (tool.id) {
      case "nonton": return { color: "text-red-400", bg: "bg-red-500/10", border: "hover:border-red-500/50", glow: "from-red-500/30" };
      case "downloader": return { color: "text-[#00b4ff]", bg: "bg-[#00b4ff]/10", border: "hover:border-[#00b4ff]/50", glow: "from-[#00b4ff]/30" };
      case "ai": return { color: "text-purple-400", bg: "bg-purple-500/10", border: "hover:border-purple-500/50", glow: "from-purple-500/30" };
      case "komik": return { color: "text-green-400", bg: "bg-green-500/10", border: "hover:border-green-500/50", glow: "from-green-500/30" };
      default: return { color: "text-gray-400", bg: "bg-gray-500/10", border: "hover:border-gray-500/50", glow: "from-gray-500/30" };
    }
  };

  const theme = getTheme();

  const Icon = () => {
    switch (tool.id) {
      case "nonton": return <Play size={26} />;
      case "downloader": return <Download size={26} />;
      case "ai": return <Brain size={26} />;
      case "komik": return <Book size={26} />;
      default: return <Play size={26} />;
    }
  };

  return (
    <motion.div whileHover={{ y: -6 }} className="h-full">
      <Link 
        href={tool.href} 
        className={`group relative flex flex-col h-full min-h-[200px] p-5 rounded-2xl bg-[#0f172a] border border-white/5 transition-all duration-300 ${theme.border} hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)] overflow-hidden`}
      >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${theme.glow} to-transparent blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`} />

        <div className="relative z-10 flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl ${theme.bg} ${theme.color} group-hover:scale-110 transition-transform`}>
            <Icon />
          </div>
          {tool.badge && (
            <span className={`px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border border-white/10 bg-white/5 backdrop-blur-sm ${theme.color}`}>
              {tool.badge}
            </span>
          )}
        </div>

        <div className="relative z-10 flex-1">
          <h3 className="text-lg font-bold text-white mb-1.5">{tool.title}</h3>
          <p className="text-[13px] text-gray-400 leading-relaxed line-clamp-2">{tool.description}</p>
        </div>

        <div className="relative z-10 mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className={`text-xs font-bold ${theme.color}`}>Buka Tool</span>
          <ChevronRight size={16} className={`${theme.color} group-hover:translate-x-1 transition-transform`} />
        </div>
      </Link>
    </motion.div>
  );
}
