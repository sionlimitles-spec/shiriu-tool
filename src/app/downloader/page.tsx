"use client";

import { useState } from "react";
import { Link as LinkIcon, Download, X, ClipboardPaste, Loader2, Play, Music, AlertCircle, CheckCircle2, Settings2 } from "lucide-react";
import { fetchDownloadData, DownloadResult } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function DownloaderPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<DownloadResult | null>(null);

  // State untuk fitur baru
  const [videoQuality, setVideoQuality] = useState<"original" | "hd">("original");
  const [audioBitrate, setAudioBitrate] = useState("320kbps");

  const bitrateOptions = ["64kbps", "128kbps", "192kbps", "256kbps", "320kbps"];

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {}
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
    <div className="min-h-screen pb-28 px-4 pt-12 max-w-lg mx-auto relative z-10">
      
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-3 tracking-tight">
          Media <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4ff] to-blue-500">Downloader</span>
        </h1>
        <p className="text-[var(--text-muted)] text-sm">
          Unduh video dan musik dengan kualitas terbaik.
        </p>
      </div>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
        <div className="relative flex items-center bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl h-16 px-2 focus-within:border-[#00b4ff] transition-all shadow-lg">
          <div className="pl-3 pr-2 text-[var(--text-muted)]">
            <LinkIcon className="w-5 h-5" />
          </div>
          <input
            type="url"
            required
            placeholder="Tempel link YouTube atau Spotify..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent border-none text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] text-[15px]"
          />
          {url && (
            <button type="button" onClick={() => setUrl("")} className="p-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
          <button 
            type="button" 
            onClick={handlePaste} 
            className="flex items-center gap-1.5 px-4 py-2 bg-[var(--text-muted)]/10 hover:bg-[var(--text-muted)]/20 rounded-xl text-sm font-semibold text-[var(--text)] transition-colors ml-1 shrink-0"
          >
            <ClipboardPaste size={16} /> Paste
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-gradient-to-r from-[#00b4ff] to-blue-600 text-white font-bold text-lg rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98] shadow-[0_10px_30px_rgba(0,180,255,0.3)]"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
          {loading ? "Memproses..." : "Ambil Media"}
        </button>
      </form>

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl flex items-start gap-3 mb-8 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="font-medium">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TUTORIAL (Muncul jika belum ada hasil) */}
      {!result && !loading && (
        <div className="grid gap-4 mt-4">
          {[
            { num: "1", title: "Salin Link", desc: "Buka YouTube/Spotify, salin link yang ingin diunduh." },
            { num: "2", title: "Tempel & Proses", desc: "Paste link di atas, lalu klik tombol Ambil Media." },
            { num: "3", title: "Atur Kualitas", desc: "Pilih bitrate MP3 atau tingkatkan kualitas video ke HD." }
          ].map((step, i) => (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={step.num} className="flex gap-4 p-5 rounded-[24px] bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl items-start shadow-sm">
              <span className="flex-none w-10 h-10 rounded-full flex items-center justify-center font-bold text-[#00b4ff] bg-[#00b4ff]/10 border border-[#00b4ff]/20 text-lg">
                {step.num}
              </span>
              <div>
                <b className="text-[var(--text)] block mb-1 text-[15px]">{step.title}</b>
                <span className="text-sm text-[var(--text-muted)] leading-relaxed">{step.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ================= HASIL DOWNLOAD & OPSI BARU ================= */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl rounded-[32px] overflow-hidden mt-4 shadow-2xl">
            
            {/* Thumbnail & Info */}
            <div className="relative">
              <img src={result.thumbnail} alt="Thumbnail" className="w-full aspect-video object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-[var(--card-bg)]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-xs font-bold text-green-500 mb-2">
                  <CheckCircle2 size={14} /> Siap Diunduh
                </span>
                <h3 className="text-lg font-bold text-[var(--text)] leading-tight line-clamp-2 drop-shadow-sm">{result.title}</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1 font-medium">{result.author}</p>
              </div>
            </div>
            
            <div className="p-5 flex flex-col gap-6">
              
              {/* OPSI VIDEO */}
              {result.formats.some(f => f.type === "video") && (
                <div>
                  <h4 className="text-sm font-bold text-[var(--text)] mb-3 flex items-center gap-2">
                    <Play size={16} className="text-blue-500" /> Opsi Video (MP4)
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <button 
                      onClick={() => setVideoQuality("original")}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${videoQuality === "original" ? "border-[#00b4ff] bg-[#00b4ff]/10 text-[#00b4ff]" : "border-[var(--card-border)] text-[var(--text-muted)]"}`}
                    >
                      Original <br/><span className="text-[10px] font-normal opacity-70">(Tanpa Kompres)</span>
                    </button>
                    <button 
                      onClick={() => setVideoQuality("hd")}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${videoQuality === "hd" ? "border-[#00b4ff] bg-[#00b4ff]/10 text-[#00b4ff]" : "border-[var(--card-border)] text-[var(--text-muted)]"}`}
                    >
                      HD Enhanced <br/><span className="text-[10px] font-normal opacity-70">(Upscale + Tajam)</span>
                    </button>
                  </div>
                  {result.formats.filter(f => f.type === "video").map((format, idx) => (
                    <a key={idx} href={format.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-[var(--text-muted)]/5 hover:bg-[var(--text-muted)]/10 border border-[var(--card-border)] p-4 rounded-2xl transition-all group">
                      <span className="text-sm font-bold text-[var(--text)]">{format.label} {videoQuality === "hd" ? "(Upscaled)" : ""}</span>
                      <Download size={20} className="text-[var(--text-muted)] group-hover:text-[#00b4ff] transition-colors" />
                    </a>
                  ))}
                </div>
              )}

              {/* OPSI AUDIO */}
              {result.formats.some(f => f.type === "audio") && (
                <div>
                  <h4 className="text-sm font-bold text-[var(--text)] mb-3 flex items-center gap-2">
                    <Music size={16} className="text-purple-500" /> Opsi Audio (MP3)
                  </h4>
                  <div className="flex items-center gap-3 mb-3 bg-[var(--text-muted)]/5 p-3 rounded-xl border border-[var(--card-border)]">
                    <Settings2 size={18} className="text-[var(--text-muted)]" />
                    <select 
                      value={audioBitrate} 
                      onChange={(e) => setAudioBitrate(e.target.value)}
                      className="bg-transparent text-sm font-bold text-[var(--text)] outline-none w-full cursor-pointer"
                    >
                      {bitrateOptions.map(bit => (
                        <option key={bit} value={bit} className="bg-[var(--bg)] text-[var(--text)]">{bit}</option>
                      ))}
                    </select>
                  </div>
                  {result.formats.filter(f => f.type === "audio").map((format, idx) => (
                    <a key={idx} href={format.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-[var(--text-muted)]/5 hover:bg-[var(--text-muted)]/10 border border-[var(--card-border)] p-4 rounded-2xl transition-all group">
                      <span className="text-sm font-bold text-[var(--text)]">Download Audio ({audioBitrate})</span>
                      <Download size={20} className="text-[var(--text-muted)] group-hover:text-purple-500 transition-colors" />
                    </a>
                  ))}
                </div>
              )}
              
              {result.formats.length === 0 && (
                <p className="text-center text-sm text-[var(--text-muted)]">Format tidak tersedia untuk link ini.</p>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-xs text-[var(--text-muted)] mt-12 pb-10">
        Gunakan hanya untuk konten milikmu atau yang diizinkan pemiliknya.
      </p>
    </div>
  );
}
