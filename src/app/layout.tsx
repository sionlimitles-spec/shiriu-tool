import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SHIRIU TOOL — All-in-One Platform",
  description: "Streaming, Downloader, AI, dan Tools premium dalam satu genggaman.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased`}>
        {/* Header Premium */}
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#030712]/80 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-black tracking-widest text-white flex items-center gap-2">
              SHIRIU<span className="text-[#00b4ff]">TOOL</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> System Online
              </span>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
