"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { toggleMute, getMuteState, playSound } from "@/lib/sound";

export default function Header() {
  const [muted, setMuted] = useState(false);
  useEffect(() => { setMuted(getMuteState()); }, []);
  
  const handleMute = () => {
    const newState = toggleMute();
    setMuted(newState);
    if (!newState) playSound("click");
  };

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-white/5 bg-bg-primary/60 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => playSound("click")}>
          <span className="text-xl font-black tracking-widest text-white">
            SHIRIU<span className="text-accent-cyan">TOOL</span>
          </span>
        </Link>
        <button 
          onClick={handleMute} 
          className="rounded-full p-2.5 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all active:scale-90"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </motion.header>
  );
}
