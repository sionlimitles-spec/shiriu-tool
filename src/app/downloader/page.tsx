import DownloaderForm from "@/components/features/DownloaderForm";

export default function DownloaderPage() {
  return (
    <div className="container mx-auto px-4 pt-16 pb-20">
      {/* Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-accent-cyan/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
          Media <span className="text-accent-cyan">Downloader</span>
        </h1>
        <p className="text-slate-300 max-w-md mx-auto text-sm md:text-base">
          Unduh video dan musik tanpa watermark dari berbagai platform sosial media favoritmu.
        </p>
      </div>

      <DownloaderForm />
    </div>
  );
}
