"use client";

import { useState } from "react";
import { Link as LinkIcon, Download, X, ClipboardPaste, Loader2, Play, Music, AlertCircle } from "lucide-react";
import { fetchDownloadData, DownloadResult, detectPlatform } from "@/lib/api";

export default function DownloaderPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<DownloadResult | null>(null);

  const platform = detectPlatform(url);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.log("Gagal paste");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await fetchDownloadData(url);
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      
      {/* HEADER TITLE */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
          Media <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4ff] to-[#5b8cff]">Downloader</span>
        </h1>
        <p className="text-[#b4bccd] text-sm md:text-base">
          Unduh video dan musik tanpa watermark dari platform favoritmu.
        </p>
      </div>

      {/* FORM INPUT */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-8">
        <div className="flex items-center bg-[#151823] border border-white/10 rounded-2xl h-16 px-3 focus-within:border-[#00b4ff] focus-within:ring-1 focus-within:ring-[#00b4ff] transition-all">
          <LinkIcon className="w-5 h-5 text-[#7d869b] ml-1 mr-3 shrink-0" />
          <input
            type="url"
            required
            placeholder="Tempel link di sini..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent border-none text-white outline-none placeholder:text-[#7d869b] text-[15px] min-w-0"
          />
          {url && (
            <button type="button" onClick={() => setUrl("")} className="p-2 text-[#7d869b] hover:text-white shrink-0">
              <X className="w-5 h-5" />
            </button>
          )}
          <button 
            type="button" 
            onClick={handlePaste} 
            className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-white transition-colors shrink-0 ml-1"
          >
            <ClipboardPaste size={14} /> Paste
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-gradient-to-r from-[#00b4ff] to-[#5b8cff] text-[#04101a] font-bold text-lg rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98] shadow-[0_8px_28px_rgba(0,180,255,0.25)]"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
          {loading ? "Mencari Media..." : "Ambil Media"}
        </button>
      </form>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3 mb-8 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* PLATFORM CHIPS */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {["youtube", "tiktok", "instagram", "spotify"].map((p) => (
          <span key={p} className={`capitalize flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-all ${
            platform === p 
              ? "border-[#00b4ff] text-white bg-[#00b4ff]/10 shadow-[0_0_15px_rgba(0,180,255,0.2)]" 
              : "border-white/10 text-[#b4bccd] bg-white/5"
          }`}>
            <i className={`w-2 h-2 rounded-full ${
              p === 'youtube' ? 'bg-red-500' : 
              p === 'tiktok' ? 'bg-white' : 
              p === 'instagram' ? 'bg-pink-500' : 'bg-green-500'
            }`}></i> 
            {p}
          </span>
        ))}
      </div>

      {/* TUTORIAL STEPS */}
      <div className="flex flex-col gap-3 mb-10">
        {[
          { num: 1, title: "Salin link", desc: "Buka aplikasi, tekan Bagikan lalu Salin Link." },
          { num: 2, title: "Tempel & ambil", desc: "Tekan Paste, lalu tombol Ambil Media." },
          { num: 3, title: "Pilih format", desc: "Unduh sebagai video MP4 atau audio MP3." }
        ].map((step) => (
          <div key={step.num} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 items-center">
            <span className="flex-none w-10 h-10 rounded-full flex items-center justify-center font-bold text-[#00b4ff] bg-[#00b4ff]/10 border border-[#00b4ff]/20">
              {step.num}
            </span>
            <div>
              <b className="text-white text-[15px] block">{step.title}</b>
              <span className="text-[13.5px] text-[#b4bccd] leading-tight block mt-0.5">{step.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* HASIL DOWNLOAD */}
      {result && !loading && (
        <div className="bg-[#151823] border border-white/10 rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <img src={result.thumbnail} alt="Thumbnail" className="w-full aspect-video object-cover bg-black/50" />
          <div className="p-5">
            <h3 className="text-lg font-bold text-white leading-snug line-clamp-2">{result.title}</h3>
            <p className="text-sm text-[#b4bccd] mt-1 mb-5">{result.author} {result.duration && `· ${result.duration}`}</p>
            
            <div className="flex flex-col gap-2.5">
              {result.formats.map((format, idx) => (
                <a
                  key={idx}
                  href={format.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 p-4 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${format.type === "video" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`}>
                      {format.type === "video" ? <Play size={18} /> : <Music size={18} />}
                    </div>
                    <span className="text-sm font-medium text-white">{format.label}</span>
                  </div>
                  <Download size={20} className="text-[#b4bccd] group-hover:text-[#00b4ff] transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-[#7d869b] mt-8">
        Gunakan hanya untuk konten milikmu atau yang diizinkan pemiliknya.
      </p>
    </div>
  );
}
