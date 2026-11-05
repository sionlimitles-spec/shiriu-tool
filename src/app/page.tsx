import { toolsData } from "@/lib/data";
import ToolSection from "@/components/ui/ToolSection";

export default function Home() {
  return (
    <div className="container mx-auto px-4 pt-10 pb-20">
      
      {/* Hero Section */}
      <div className="relative mb-10 text-center flex flex-col items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-gradient-to-r from-brand/20 to-violet/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs md:text-sm font-medium text-brand mb-5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
          </span>
          System Online v2.0
        </div>
        
        <h1 className="relative z-10 text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Semua Tools <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-violet">dalam Satu Genggaman</span>
        </h1>
        
        <p className="relative z-10 text-text-muted max-w-md mx-auto text-[15px] md:text-base leading-relaxed">
          Streaming, download media, dan kecerdasan buatan. Gratis, cepat, tanpa ribet.
        </p>

        {/* Stats */}
        <div className="relative z-10 flex flex-wrap justify-center gap-3 mt-6">
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-line text-[13px] text-text-muted"><b className="text-white">6</b> Tools</div>
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-line text-[13px] text-text-muted"><b className="text-white">24/7</b> Online</div>
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-line text-[13px] text-text-muted"><b className="text-white">0</b> Biaya</div>
        </div>
      </div>

      {/* Catalog Section */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-brand">/</span> Catalog
        </h2>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-text-muted border border-line">
          {toolsData.length} Tools
        </span>
      </div>

      <ToolSection />
    </div>
  );
}
