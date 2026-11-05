import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Header from "@/components/layout/Header";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "SHIRIUTOOL — Semua Tools dalam Satu Genggaman",
  description: "Streaming, download media, AI, dan komik dalam satu platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${outfit.variable} font-sans`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
