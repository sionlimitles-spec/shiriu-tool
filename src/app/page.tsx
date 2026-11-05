import { toolsData } from "@/lib/data";
import ToolSection from "@/components/ui/ToolSection";

export default function Home() {
  return (
    <div className="container mx-auto px-4 pt-8 pb-20">
      
      {/* Hero Section */}
      <div className="relative mb-10 text-center flex flex-col items-center">
        {/* Efek Glow di belakang judul */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-gradient-to-r from-accent-cyan/20 to-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/5 px-4 py-1.5 text-xs md:text-sm font-medium text-accent-cyan mb-5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
          </span>
          System Online v2.0
        </div>
        
        {/* Judul Diubah ke SHIRIU TOOL, ukuran disesuaikan */}
        <h1 className="relative z-10 text-4xl md:text-5xl font-extrabold tracking-tighter text-white mb-4">
          SHIRIU <span className="text-accent-cyan">TOOL</span>
        </h1>
        
        <p className="relative z-10 text-slate-300 max-w-md mx-auto text-sm md:text-base leading-relaxed">
          Platform premium untuk streaming, mendownload media, dan mengakses kecerdasan buatan. Semua dalam satu genggaman.
        </p>
      </div>

      {/* Catalog Section */}
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-accent-cyan">/</span> Catalog
        </h2>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-400 border border-white/10">
          {toolsData.length} Tools
        </span>
      </div>

      <ToolSection />
    </div>
  );
}
