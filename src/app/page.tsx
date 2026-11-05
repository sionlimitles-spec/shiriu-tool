"use client";
import { toolsData } from "@/lib/data";
import ToolCard from "@/components/ui/ToolCard";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center mt-10 mb-16 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00b4ff]/10 border border-[#00b4ff]/20 text-[#00b4ff] text-sm font-medium mb-6">
          <Sparkles size={16} /> Platform Masa Depan
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
          Akses Semua <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4ff] to-blue-600">Kebutuhan Media</span> Kamu.
        </motion.h1>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg">
          Streaming anime, download video tanpa watermark, dan nikmati fitur canggih lainnya dalam satu platform premium.
        </motion.p>
      </div>

      {/* Tools Grid */}
      <div className="w-full">
        <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-[#00b4ff] pl-3">Semua Tools</h2>
        <motion.div 
          initial="hidden" animate="show" 
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {toolsData.map((tool) => (
            <motion.div key={tool.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
