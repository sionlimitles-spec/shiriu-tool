import { LucideIcon, Download, Play, Brain, Image as ImageIcon, Shield, Book } from "lucide-react";

export type Tool = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  category: "media" | "hiburan" | "ai" | "lainnya";
  color: string;
  bgColor: string;
};

export const toolsData: Tool[] = [
  { 
    id: "nonton", title: "Nonton Stream", description: "Streaming Anime, Film, & Donghua kualitas HD", 
    icon: Play, href: "/nonton", badge: "LIVE", category: "hiburan",
    color: "text-[#ff6b6b]", bgColor: "bg-[#ff6b6b]/10", 
  },
  { 
    id: "downloader", title: "Media Downloader", description: "Unduh video & audio dari YouTube, TikTok, IG, Spotify", 
    icon: Download, href: "/downloader", badge: "HOT", category: "media",
    color: "text-[#00b4ff]", bgColor: "bg-[#00b4ff]/10", 
  },
  { 
    id: "ai-tools", title: "SHIRIU AI", description: "Asisten AI pintar untuk menjawab, menulis, dan membantu tugasmu", 
    icon: Brain, href: "/ai", badge: "NEW", category: "ai",
    color: "text-[#a78bfa]", bgColor: "bg-[#a78bfa]/10", 
  },
  { 
    id: "komik", title: "Baca Komik", description: "Komik full color terbaru, baca gratis tanpa batas", 
    icon: Book, href: "/komik", badge: "FULL", category: "hiburan",
    color: "text-[#34d399]", bgColor: "bg-[#34d399]/10", 
  },
  { 
    id: "sticker", title: "Sticker Maker", description: "Ubah gambar jadi stiker WhatsApp dalam sekali klik", 
    icon: ImageIcon, href: "/sticker", badge: "NEW", category: "media",
    color: "text-[#f472b6]", bgColor: "bg-[#f472b6]/10", 
  },
  { 
    id: "image-tools", title: "Image Tools", description: "Kompres, resize, dan konversi gambar langsung di browser", 
    icon: Shield, href: "/image", badge: "LIVE", category: "media",
    color: "text-[#fbbf24]", bgColor: "bg-[#fbbf24]/10", 
  },
];
