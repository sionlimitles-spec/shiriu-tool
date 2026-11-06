import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SHIRIU TOOL — Premium Platform",
  description: "Streaming, Downloader, AI dalam satu genggaman.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased bg-[#050505]`}>
        {/* Header dihapus total, konten langsung dimulai dari atas layar */}
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
