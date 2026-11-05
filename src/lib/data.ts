import { LucideIcon, Download, Play, Brain, Image as ImageIcon, Book } from "lucide-react";

export type Tool = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  color: string;
  bgGradient: string;
};

export const toolsData: Tool[] = [
  { id: "nonton", title: "Nonton Stream", description: "Streaming Anime, Film, & Donghua kualitas HD", icon: Play, href: "/nonton", badge: "LIVE", color: "text-red-500", bgGradient: "from-red-500/20 to-transparent" },
  { id: "downloader", title: "Media Downloader", description: "Unduh video & audio dari YouTube, TikTok, IG", icon: Download, href: "/downloader", badge: "HOT", color: "text-[#00b4ff]", bgGradient: "from-[#00b4ff]/20 to-transparent" },
  { id: "ai", title: "SHIRIU AI", description: "Asisten AI pintar untuk menjawab pertanyaanmu", icon: Brain, href: "/ai", badge: "NEW", color: "text-purple-500", bgGradient: "from-purple-500/20 to-transparent" },
  { id: "komik", title: "Baca Komik", description: "Komik full color terbaru, baca gratis", icon: Book, href: "/komik", badge: "FULL", color: "text-green-500", bgGradient: "from-green-500/20 to-transparent" },
];
