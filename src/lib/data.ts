import { LucideIcon, Download, Play, Brain, Image as ImageIcon, Shield, Book } from "lucide-react";

export type Tool = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  status: "LIVE" | "READY" | "MAINTENANCE";
};

export const toolsData: Tool[] = [
  { id: "nonton", title: "Nonton Stream", description: "Anime, Film, & Donghua", icon: Play, href: "/nonton", badge: "LIVE", status: "LIVE" },
  { id: "downloader", title: "Media Downloader", description: "YT, TikTok, IG, Spotify", icon: Download, href: "/downloader", badge: "HOT", status: "READY" },
  { id: "ai-tools", title: "SHIRIU AI", description: "Personal AI Assistant", icon: Brain, href: "/tools/ai", status: "READY" },
  { id: "komik", title: "Baca Komik", description: "Komik Full Color", icon: Book, href: "/tools/komik", badge: "FULL", status: "READY" },
  { id: "image-gen", title: "Image Generator", description: "Buat gambar dari teks", icon: ImageIcon, href: "/tools/image", badge: "AI", status: "READY" },
  { id: "virus-scan", title: "Virus Scan", description: "Cek keamanan file/link", icon: Shield, href: "/tools/scan", badge: "VVIP", status: "MAINTENANCE" },
];
