"use client";
import { toolsData } from "@/lib/data";
import ToolCard from "./ToolCard";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function ToolGrid() {
  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="grid grid-cols-3 gap-3"
    >
      {toolsData.map((tool, idx) => (
        <motion.div key={tool.id} variants={item}>
          {/* PERBAIKAN: Tambahkan index={idx} */}
          <ToolCard tool={tool} index={idx} />
        </motion.div>
      ))}
    </motion.div>
  );
}
