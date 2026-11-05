import { LucideIcon, Download, Play, Brain, Image as ImageIcon, Shield, Book } from "lucide-react";

export type Tool = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  category: "media" | "hiburan" | "ai" | "lainnya";
  cssClass: string;
};

export const toolsData: Tool[] = [
  { id: "nonton", title: "Nonton Stream", description: "Streaming Anime, Film, & Donghua kualitas HD", icon: Play, href: "/nonton", badge: "LIVE", category: "hiburan", cssClass: "t-anime" },
  { id: "downloader", title: "Media Downloader", description: "Unduh video & audio dari YouTube, TikTok, IG, Spotify", icon: Download, href: "/downloader", badge: "HOT", category: "media", cssClass: "t-dl" },
  { id: "ai-tools", title: "SHIRIU AI", description: "Asisten AI pintar untuk menjawab, menulis, dan membantu tugasmu", icon: Brain, href: "/ai", badge: "NEW", category: "ai", cssClass: "t-ai" },
  { id: "komik", title: "Baca Komik", description: "Komik full color terbaru, baca gratis tanpa batas", icon: Book, href: "/komik", badge: "FULL", category: "hiburan", cssClass: "t-komik" },
  { id: "sticker", title: "Sticker Maker", description: "Ubah gambar jadi stiker WhatsApp dalam sekali klik", icon: ImageIcon, href: "/sticker", badge: "NEW", category: "media", cssClass: "t-sticker" },
  { id: "image", title: "Image Tools", description: "Kompres, resize, dan konversi gambar langsung di browser", icon: Shield, href: "/image", badge: "LIVE", category: "media", cssClass: "t-short" },
];
