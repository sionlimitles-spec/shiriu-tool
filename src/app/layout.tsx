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
    // Tambahkan class "dark" sebagai default
    <html lang="id" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              if (localStorage.theme === 'light') {
                document.documentElement.classList.remove('dark')
              } else {
                document.documentElement.classList.add('dark')
              }
            } catch (_) {}
          `
        }} />
        {children}
      </body>
    </html>
  );
}
