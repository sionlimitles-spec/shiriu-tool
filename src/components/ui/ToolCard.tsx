"use client";
import Link from "next/link";
import { Tool } from "@/lib/data";
import { playSound } from "@/lib/sound";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link href={tool.href} onClick={() => playSound("click")}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-bg-secondary p-6 backdrop-blur-2xl transition-colors hover:border-accent-cyan/50 hover:shadow-[0_0_30px_rgba(0,194,255,0.1)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex items-start justify-between">
          <div className="rounded-2xl bg-accent-dim p-3 text-accent-cyan transition-colors group-hover:bg-accent-cyan group-hover:text-bg-primary group-hover:shadow-[0_0_15px_rgba(0,194,255,0.4)]">
            <Icon size={24} />
          </div>
          {tool.badge && (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/70 backdrop-blur-md">
              {tool.badge}
            </span>
          )}
        </div>

        <div className="relative z-10 mt-10">
          <h3 className="text-xl font-bold text-white">{tool.title}</h3>
          <p className="mt-1.5 text-sm text-white/50 line-clamp-1">{tool.description}</p>
        </div>

        <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${tool.status === "LIVE" ? "bg-green-500 animate-pulse" : tool.status === "READY" ? "bg-accent-cyan" : "bg-yellow-500"}`} />
            <span className="text-xs font-medium text-white/50">{tool.status}</span>
          </div>
          <ChevronRight size={18} className="text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-accent-cyan" />
        </div>
      </Link>
    </motion.div>
  );
}
