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
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {/* Script untuk mencegah layar berkedip saat ganti tema */}
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              if (localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                document.documentElement.classList.remove('dark')
              } else {
                document.documentElement.classList.add('dark')
              }
            } catch (_) {}
          `
        }} />
        <main className="min-h-screen pb-24">{children}</main>
      </body>
    </html>
  );
}
