"use client";
import Link from "next/link";
import { Tool } from "@/lib/data";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  
  return (
    <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }} className="h-full">
      <Link href={tool.href} className="group relative flex flex-col h-full min-h-[220px] p-6 rounded-3xl bg-[#0f172a] border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-2xl">
        {/* Background Glow */}
        <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${tool.bgGradient} blur-3xl opacity-50 group-hover:opacity-100 transition-opacity`} />
        
        <div className="relative z-10 flex items-start justify-between">
          <div className={`p-3 rounded-2xl bg-white/5 ${tool.color} group-hover:scale-110 transition-transform`}>
            <Icon size={28} />
          </div>
          {tool.badge && (
            <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/10 bg-white/5 ${tool.color}`}>
              {tool.badge}
            </span>
          )}
        </div>

        <div className="relative z-10 mt-6 flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{tool.description}</p>
        </div>

        <div className="relative z-10 mt-6 flex items-center justify-between pt-4 border-t border-white/5">
          <span className={`text-sm font-semibold ${tool.color}`}>Buka Tool</span>
          <ChevronRight size={18} className={`text-gray-500 group-hover:translate-x-1 transition-transform ${tool.color}`} />
        </div>
      </Link>
    </motion.div>
  );
}
