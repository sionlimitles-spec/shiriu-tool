"use client";
import { useState } from "react";
import { toolsData } from "@/lib/data";
import ToolCard from "@/components/ui/ToolCard";
// PERBAIKAN: Mengubah import 'Home' menjadi 'HomeIcon'
import { Search, User, Smartphone, Battery, Crown, MessageCircle, Home as HomeIcon, LayoutGrid, Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredTools = toolsData.filter((tool) =>
    tool.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-32">
      
      {/* ================= HERO IMAGE (BAGIAN ATAS) ================= */}
      <div className="relative w-full h-[220px] overflow-hidden rounded-b-[40px] border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 to-[#050505]/90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
          className="w-full h-full object-cover z-0"
          alt="Hero"
        />
      </div>

      <div className="px-4 -mt-10 relative z-20">
        
        {/* ================= KARTU PROFIL (GLASSMORPHISM) ================= */}
        <div className="rounded-3xl border border-white/20 bg-white/5 backdrop-blur-2xl p-5 shadow-2xl mb-6">
          <div className="flex flex-col gap-3.5">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-3 text-gray-300"><User size={16} /> Username</div>
              <span className="font-semibold text-white">Tamu</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-3 text-gray-300"><Smartphone size={16} /> Perangkat</div>
              <span className="font-semibold text-white">Android</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-3 text-gray-300"><Battery size={16} /> Baterai</div>
              <span className="font-semibold text-white">85%</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-white/10 pt-3">
              <div className="flex items-center gap-3 text-gray-300"><Crown size={16} /> Role</div>
              <span className="font-bold text-white flex items-center gap-1"><span className="text-yellow-400">✦</span> MEMBER</span>
            </div>
          </div>
        </div>

        {/* ================= TOMBOL LEBAR ================= */}
        <div className="flex flex-col gap-3 mb-8">
          <button className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold shadow-lg shadow-green-500/20 active:scale-95 transition-transform">
            <MessageCircle size={18} fill="currentColor" /> Saluran WhatsApp
          </button>
          <button className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-white/5 border border-white/20 backdrop-blur-md text-white text-sm font-bold shadow-lg active:scale-95 transition-transform">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> @shiriutool
          </button>
        </div>

        {/* ================= HEADER TOOLS & SEARCH ================= */}
        <div className="flex items-center gap-2 mb-4">
          <LayoutGrid size={20} className="text-white" />
          <h2 className="text-lg font-bold text-white">Tools Populer</h2>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Cari tool..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-2xl py-3 pl-11 pr-4 text-sm text-white outline-none focus:border-white/50 backdrop-blur-xl transition-colors placeholder:text-gray-400"
          />
        </div>

        {/* ================= GRID TOOLS (3 KOLOM) ================= */}
        <div className="grid grid-cols-3 gap-3">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
        
        {filteredTools.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">Tool tidak ditemukan.</div>
        )}
      </div>

      {/* ================= BOTTOM NAVIGATION MELAYANG ================= */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 p-1.5 rounded-full bg-black/40 backdrop-blur-2xl border border-white/20 shadow-2xl">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black">
            {/* PERBAIKAN: Menggunakan HomeIcon di sini */}
            <HomeIcon size={18} />
            <span className="text-xs font-bold">Home</span>
          </button>
          <button className="p-2.5 text-gray-300 hover:text-white transition-colors"><LayoutGrid size={20} /></button>
          <button className="p-2.5 text-gray-300 hover:text-white transition-colors"><Brain size={20} /></button>
        </div>
      </div>

    </div>
  );
}
