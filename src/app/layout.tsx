import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { Volume2 } from "lucide-react";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SHIRIUTOOL — Media Downloader",
  description: "Download video dan musik tanpa watermark.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${outfit.className} antialiased`}>
        {/* HEADER FIXED */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#05070d]/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-black tracking-widest text-white">
              SHIRIU<span className="text-[#00b4ff]">TOOL</span>
            </Link>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white">
              <Volume2 size={18} />
            </button>
          </div>
        </header>

        {/* KONTEN UTAMA (Diberi padding-top agar tidak tertutup header) */}
        <main className="pt-24 pb-12">
          {children}
        </main>
      </body>
    </html>
  );
}
