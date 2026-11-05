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
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
    >
      {toolsData.map((tool) => (
        <motion.div key={tool.id} variants={item}>
          <ToolCard tool={tool} />
        </motion.div>
      ))}
    </motion.div>
  );
}
