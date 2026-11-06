// src/lib/data.ts
import { LucideIcon, Download, Play, Brain, Book } from "lucide-react";

export type Tool = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  category: string;
  color: string;
  bgClass: string;
  tags: string[]; // <-- Properti ini wajib ada
};

export const toolsData: Tool[] = [
  { 
    id: "nonton", title: "Nonton Stream", description: "Anime, Film, Donghua HD", 
    icon: Play, href: "/nonton", badge: "LIVE", category: "hiburan",
    color: "#ff6b6b", bgClass: "from-[#ff6b6b] to-[#ff3b3b]",
    tags: ["HD", "SUB"] 
  },
  { 
    id: "downloader", title: "Media Downloader", description: "Unduh video & audio", 
    icon: Download, href: "/downloader", badge: "HOT", category: "media",
    color: "#00b4ff", bgClass: "from-[#00b4ff] to-[#0084ff]",
    tags: ["MP4", "MP3"] 
  },
  { 
    id: "ai", title: "SHIRIU AI", description: "Asisten pintar kamu", 
    icon: Brain, href: "/ai", badge: "NEW", category: "ai",
    color: "#a78bfa", bgClass: "from-[#a78bfa] to-[#8b5cf6]",
    tags: ["GPT", "BOT"] 
  },
  { 
    id: "komik", title: "Baca Komik", description: "Komik full color", 
    icon: Book, href: "/komik", badge: "FULL", category: "hiburan",
    color: "#34d399", bgClass: "from-[#34d399] to-[#10b981]",
    tags: ["MANGA"] 
  },
];
