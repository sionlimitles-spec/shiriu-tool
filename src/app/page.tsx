import { toolsData } from "@/lib/data";
import ToolGrid from "@/components/ui/ToolGrid";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="mb-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-dim px-4 py-1.5 text-sm font-medium text-accent-cyan mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
          </span>
          System Online v2.0
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6">
          All Tools <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-blue-500">Nexora</span>
        </h1>
        
        <p className="text-white/60 max-w-xl mx-auto text-base md:text-lg">
          Platform premium untuk streaming, mendownload media, dan mengakses kecerdasan buatan. Semua dalam satu genggaman.
        </p>
      </div>

      {/* Grid Section */}
      <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-accent-cyan">/</span> Catalog
        </h2>
        <span className="rounded-full bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60 border border-white/10">
          {toolsData.length} Tools
        </span>
      </div>

      {/* Client Component untuk Animasi Grid */}
      <ToolGrid />
    </div>
  );
}
