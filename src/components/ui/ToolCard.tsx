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
      case "NEW": return "bg-pink-500/10 text-pink-400 border-pink-500/20";
      case "FULL": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default: return "bg-white/10 text-white/70 border-white/20";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link href={tool.href} onClick={() => playSound("click")}
        className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-[#151823] to-[#0c0e15] p-5 transition-all duration-300 hover:border-line-hover hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] active:scale-[0.97]`}
      >
        <div className={`absolute -top-10 -right-10 w-32 h-32 blur-[60px] opacity-20 transition-opacity group-hover:opacity-40 ${tool.bgColor}`} />

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

        <div className="relative z-10 mt-5 flex-1 flex flex-col justify-start">
          <h3 className="text-[17px] font-bold text-white line-clamp-2 leading-tight min-h-[3rem]">
            {tool.title}
          </h3>
          <p className="mt-2 text-[13.5px] text-text-muted line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </div>

        <div className="relative z-10 mt-4 flex items-center justify-between pt-3 border-t border-white/5">
          <span className={`text-[13px] font-semibold ${tool.color} flex items-center gap-1`}>
            Buka
          </span>
          <ChevronRight size={16} className={`text-text-muted transition-transform group-hover:translate-x-1 ${tool.color}`} />
        </div>
      </Link>
    </motion.div>
  );
}
