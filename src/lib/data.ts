import { LucideIcon, Download, Play, Brain, Image as ImageIcon, Shield, Book } from "lucide-react";

export type Tool = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  status: "LIVE" | "READY" | "MAINTENANCE";
  color: string;
  bgColor: string;
  borderColor: string;
};

export const toolsData: Tool[] = [
  { 
    id: "nonton", title: "Nonton Stream", description: "Streaming Anime, Film, & Donghua kualitas HD", 
    icon: Play, href: "/nonton", badge: "LIVE", status: "LIVE",
    color: "text-orange-500", bgColor: "bg-orange-500/10", borderColor: "group-hover:border-orange-500/50"
  },
  { 
    id: "downloader", title: "Media Downloader", description: "Unduh video & audio dari YouTube, TikTok, IG, Spotify", 
    icon: Download, href: "/downloader", badge: "HOT", status: "READY",
    color: "text-blue-500", bgColor: "bg-blue-500/10", borderColor: "group-hover:border-blue-500/50"
  },
  { 
    id: "ai-tools", title: "SHIRIU AI", description: "Asisten AI pintar untuk menjawab pertanyaanmu", 
    icon: Brain, href: "/tools/ai", status: "READY",
    color: "text-purple-500", bgColor: "bg-purple-500/10", borderColor: "group-hover:border-purple-500/50"
  },
  { 
    id: "komik", title: "Baca Komik", description: "Baca komik full color terbaru secara gratis", 
    icon: Book, href: "/tools/komik", badge: "FULL", status: "READY",
    color: "text-green-500", bgColor: "bg-green-500/10", borderColor: "group-hover:border-green-500/50"
  },
  { 
    id: "image-gen", title: "Image Generator", description: "Buat gambar menakjubkan hanya dari teks", 
    icon: ImageIcon, href: "/tools/image", badge: "AI", status: "READY",
    color: "text-pink-500", bgColor: "bg-pink-500/10", borderColor: "group-hover:border-pink-500/50"
  },
  { 
    id: "virus-scan", title: "Virus Scan", description: "Cek keamanan file atau tautan secara instan", 
    icon: Shield, href: "/tools/scan", badge: "VVIP", status: "MAINTENANCE",
    color: "text-yellow-500", bgColor: "bg-yellow-500/10", borderColor: "group-hover:border-yellow-500/50"
  },
];
