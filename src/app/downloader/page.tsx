"use client";

import { useState } from "react";
import { Link as LinkIcon, Download, X, ClipboardPaste, Loader2, Play, Music, AlertCircle } from "lucide-react";
import { fetchDownloadData, DownloadResult, detectPlatform } from "@/lib/api";
import { playSound } from "@/lib/sound";

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
    playSound("click");

    try {
      const data = await fetchDownloadData(url);
      setResult(data);
      playSound("success");
    } catch (err: any) {
      setError(err.message);
      playSound("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[720px] mx-auto px-5 pt-8 pb-20">
      
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
          Media <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4ff] to-[#5b8cff]">Downloader</span>
        </h1>
        <p className="text-[#b4bccd] text-sm md:text-base max-w-md mx-auto">
          Unduh video dan musik tanpa watermark dari platform favoritmu.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <div className="flex items-center bg-[#151823] border border-white/10 rounded-2xl h-[58px] px-2 focus-within:border-[#00b4ff] transition-all">
          <div className="pl-3 pr-2 text-[#7d869b]">
            <LinkIcon className="h-5 w-5" />
          </div>
          <input
            type="url"
            required
            placeholder="Tempel link di sini..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent border-none text-white outline-none placeholder:text-[#7d869b] text-[15px]"
          />
          {url && (
            <button type="button" onClick={() => setUrl("")} className="p-2 text-[#7d869b] hover:text-white">
              <X className="h-5 w-5" />
            </button>
          )}
          <button 
            type="button" 
            onClick={handlePaste} 
            className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-white hover:bg-white/10 transition-colors"
          >
            <ClipboardPaste size={14} /> Paste
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-[56px] bg-gradient-to-r from-[#00b4ff] to-[#5b8cff] text-[#04101a] font-bold rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98] shadow-[0_8px_28px_rgba(0,180,255,0.28)]"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
          {loading ? "Mencari Media..." : "Ambil Media"}
        </button>
      </form>

      {/* Platform Chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border ${platform === 'youtube' ? 'border-[#ff0000] text-white shadow-[0_0_15px_rgba(255,0,0,0.3)]' : 'border-white/10 text-[#b4bccd] bg-white/5'}`}>
          <i className="w-2 h-2 rounded-full bg-[#ff0000]"></i> YouTube
        </span>
        <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border ${platform === 'tiktok' ? 'border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-white/10 text-[#b4bccd] bg-white/5'}`}>
          <i className="w-2 h-2 rounded-full bg-white"></i> TikTok
        </span>
        <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border ${platform === 'instagram' ? 'border-[#e1306c] text-white shadow-[0_0_15px_rgba(225,48,108,0.3)]' : 'border-white/10 text-[#b4bccd] bg-white/5'}`}>
          <i className="w-2 h-2 rounded-full bg-[#e1306c]"></i> Instagram
        </span>
        <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border ${platform === 'spotify' ? 'border-[#1db954] text-white shadow-[0_0_15px_rgba(29,185,84,0.3)]' : 'border-white/10 text-[#b4bccd] bg-white/5'}`}>
          <i className="w-2 h-2 rounded-full bg-[#1db954]"></i> Spotify
        </span>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3 mb-6 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Tutorial Steps (Sesuai Foto ke-2) */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 items-start">
          <span className="flex-none w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-[#00b4ff] bg-[#00b4ff]/10 border border-[#00b4ff]/30">1</span>
          <div>
            <b className="text-white text-sm block">Salin link</b>
            <span className="text-[13px] text-[#b4bccd]">Buka aplikasi, tekan Bagikan lalu Salin Link.</span>
          </div>
        </div>
        <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 items-start">
          <span className="flex-none w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-[#00b4ff] bg-[#00b4ff]/10 border border-[#00b4ff]/30">2</span>
          <div>
            <b className="text-white text-sm block">Tempel & ambil</b>
            <span className="text-[13px] text-[#b4bccd]">Tekan Paste, lalu tombol Ambil Media.</span>
          </div>
        </div>
        <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 items-start">
          <span className="flex-none w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-[#00b4ff] bg-[#00b4ff]/10 border border-[#00b4ff]/30">3</span>
          <div>
            <b className="text-white text-sm block">Pilih format</b>
            <span className="text-[13px] text-[#b4bccd]">Unduh sebagai video MP4 atau audio MP3.</span>
          </div>
        </div>
      </div>

      {/* Result Card */}
      {result && !loading && (
        <div className="bg-[#151823] border border-white/10 rounded-3xl overflow-hidden mt-8 animate-in fade-in slide-in-from-bottom-4">
          <img src={result.thumbnail} alt="Thumbnail" className="w-full aspect-video object-cover bg-black/50" />
          <div className="p-5">
            <h3 className="text-base font-bold text-white leading-tight line-clamp-2">{result.title}</h3>
            <p className="text-[13px] text-[#b4bccd] mt-1 mb-4">{result.author} {result.duration && `· ${result.duration}`}</p>
            
            <div className="flex flex-col gap-2">
              {result.formats.map((format, idx) => (
                <a
                  key={idx}
                  href={format.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 p-3.5 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${format.type === "video" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`}>
                      {format.type === "video" ? <Play size={16} /> : <Music size={16} />}
                    </div>
                    <span className="text-sm font-medium text-white">{format.label}</span>
                  </div>
                  <Download size={18} className="text-[#b4bccd] group-hover:text-[#00b4ff] transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-[#7d869b] mt-10">
        Gunakan hanya untuk konten milikmu atau yang diizinkan pemiliknya.
      </p>
    </div>
  );
          }
