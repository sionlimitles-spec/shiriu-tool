"use client";
import Link from "next/link";
import { Tool } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;

  return (
    <motion.div whileTap={{ scale: 0.95 }} className="h-full">
      <Link
        href={tool.href}
        className="group flex flex-col items-center justify-between h-full min-h-[190px] p-3 rounded-[28px] bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
      >
        <div className="mt-2 mb-3">
          <Icon size={28} className="text-white/70 drop-shadow-md" />
        </div>

        <div className="text-center flex-1 flex flex-col items-center justify-center w-full">
          <h3 className="text-[13px] font-bold text-white leading-tight mb-1">{tool.title}</h3>
          <p className="text-[10px] text-white/50 leading-tight line-clamp-2">{tool.description}</p>
        </div>

        <div className="w-full flex flex-col items-center mt-3 gap-2">
          <div className="flex gap-1 justify-center">
            {tool.tags.map((tag, i) => (
              <span key={i} className="text-[9px] font-semibold text-white/60 bg-white/10 px-2 py-0.5 rounded-md border border-white/5">
                {tag}
              </span>
            ))}
          </div>
          <ArrowRight size={16} className="text-white/50 mt-1 opacity-70 group-hover:translate-x-1 group-hover:text-white transition-all" />
        </div>
      </Link>
    </motion.div>
  );
}
