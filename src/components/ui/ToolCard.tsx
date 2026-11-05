"use client";
import Link from "next/link";
import { Tool } from "@/lib/data";
import { playSound } from "@/lib/sound";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  
  const getBadgeStyle = (badge?: string) => {
    switch(badge) {
      case "LIVE": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "HOT": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "AI": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "FULL": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "VVIP": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      default: return "bg-white/10 text-white/70 border-white/20";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link href={tool.href} onClick={() => playSound("click")}
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#14141a] to-[#0d0d12] p-5 backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] ${tool.borderColor}`}
      >
        <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 transition-opacity group-hover:opacity-40 ${tool.bgColor}`} />

        <div className="relative z-10 flex items-start justify-between">
          <div className={`rounded-2xl p-3 transition-transform group-hover:scale-110 ${tool.bgColor} ${tool.color}`}>
            <Icon size={24} />
          </div>
          {tool.badge && (
            <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${getBadgeStyle(tool.badge)}`}>
              {tool.badge}
            </span>
          )}
        </div>

        {/* mt-4 untuk memberi jarak, flex-1 agar mendorong bagian bawah ke bawah */}
        <div className="relative z-10 mt-4 flex-1">
          {/* Judul dibatasi maksimal 2 baris dengan tinggi minimal yang sama */}
          <h3 className="text-lg font-bold text-white line-clamp-2 min-h-[3.5rem] leading-snug">
            {tool.title}
          </h3>
          {/* Deskripsi dibatasi 2 baris dengan warna lebih terang */}
          <p className="mt-1 text-sm text-slate-300 line-clamp-2 leading-relaxed min-h-[2.5rem]">
            {tool.description}
          </p>
        </div>

        <div className="relative z-10 mt-4 flex items-center justify-between border-t border-white/5 pt-3">
          <div className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${tool.status === "LIVE" ? "bg-green-500 animate-pulse" : tool.status === "READY" ? "bg-accent-cyan" : "bg-yellow-500"}`} />
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">{tool.status}</span>
          </div>
          <ChevronRight size={16} className={`text-slate-500 transition-transform group-hover:translate-x-1 ${tool.color}`} />
        </div>
      </Link>
    </motion.div>
  );
}
