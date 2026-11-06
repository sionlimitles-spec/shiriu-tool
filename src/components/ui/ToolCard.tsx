"use client";
import Link from "next/link";
import { Tool } from "@/lib/data";
import { ChevronRight, Play, Download, Brain, Book } from "lucide-react";
import { motion } from "framer-motion";

export default function ToolCard({ tool }: { tool: Tool }) {
  // Memilih ikon berdasarkan tool.id agar kita tidak perlu import file gambar
  const IconComponent = () => {
    switch (tool.id) {
      case "nonton": return <Play size={24} />;
      case "downloader": return <Download size={24} />;
      case "ai": return <Brain size={24} />;
      case "komik": return <Book size={24} />;
      default: return <Play size={24} />;
    }
  };

  // Warna gradien khusus untuk setiap tool
  const getColors = () => {
    switch (tool.id) {
      case "nonton": return { text: "text-red-400", bg: "bg-red-500/10", glow: "from-red-500/20", border: "group-hover:border-red-500/50" };
      case "downloader": return { text: "text-[#00b4ff]", bg: "bg-[#00b4ff]/10", glow: "from-[#00b4ff]/20", border: "group-hover:border-[#00b4ff]/50" };
      case "ai": return { text: "text-purple-400", bg: "bg-purple-500/10", glow: "from-purple-500/20", border: "group-hover:border-purple-500/50" };
      case "komik": return { text: "text-green-400", bg: "bg-green-500/10", glow: "from-green-500/20", border: "group-hover:border-green-500/50" };
      default: return { text: "text-blue-400", bg: "bg-blue-500/10", glow: "from-blue-500/20", border: "group-hover:border-blue-500/50" };
    }
  };

  const colors = getColors();

  return (
    <motion.div 
      whileHover={{ y: -5 }} 
      whileTap={{ scale: 0.98 }} 
      className="h-full"
    >
      <Link 
        href={tool.href} 
        className={`group relative flex flex-col h-full min-h-[220px] p-6 rounded-3xl bg-gradient-to-br from-[#0f172a] to-[#0a0f1d] border border-white/5 overflow-hidden transition-all duration-300 ${colors.border} shadow-lg hover:shadow-2xl`}
      >
        {/* Efek Glow di Background */}
        <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${colors.glow} to-transparent blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Ikon & Badge */}
        <div className="relative z-10 flex items-start justify-between mb-6">
          <div className={`p-3.5 rounded-2xl ${colors.bg} ${colors.text} group-hover:scale-110 transition-transform duration-300`}>
            <IconComponent />
          </div>
          {tool.badge && (
            <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/10 bg-white/5 backdrop-blur-md ${colors.text}`}>
              {tool.badge}
            </span>
          )}
        </div>

        {/* Teks */}
        <div className="relative z-10 flex-1">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
            {tool.title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
            {tool.description}
          </p>
        </div>

        {/* Footer Card */}
        <div className="relative z-10 mt-6 flex items-center justify-between pt-4 border-t border-white/5">
          <span className={`text-sm font-semibold ${colors.text} flex items-center gap-1`}>
            Buka Tool
          </span>
          <div className={`p-1.5 rounded-full ${colors.bg} ${colors.text} group-hover:translate-x-1 transition-transform`}>
            <ChevronRight size={16} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
