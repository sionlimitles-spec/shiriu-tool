"use client";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";
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
    <header className="nav">
      <div className="wrap">
        <Link href="/" className="brand" onClick={() => playSound("click")}>
          <span>SHIRIU<b>TOOL</b></span>
        </Link>
        <button className={`icon-btn ${!muted ? 'on' : ''}`} onClick={handleMute} aria-label="Suara">
          {muted ? <VolumeX /> : <Volume2 />}
        </button>
      </div>
    </header>
  );
}
