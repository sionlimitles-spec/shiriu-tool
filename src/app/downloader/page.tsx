"use client";

import { useState, useEffect } from "react";
import { Link as LinkIcon, Download, X, ClipboardPaste, Loader2, Play, Music, AlertCircle, CheckCircle2, Copy, Check, Image as ImageIcon, History, Trash2, Music2, Music3, Headphones } from "lucide-react";
import { fetchDownloadData, DownloadResult } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

type HistoryItem = { url: string; title: string; thumbnail: string };

export default function DownloaderPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<DownloadResult | null>(null);
  
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadingType, setDownloadingType] = useState<string | null>(null);
  const [previewMedia, setPreviewMedia] = useState<{ url: string; type: "video" | "audio" } | null>(null);

  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("shiriu_history");
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const saveToHistory = (res: DownloadResult, originalUrl: string) => {
    const newItem = { url: originalUrl, title: res.title, thumbnail: res.thumbnail };
    const updated = [newItem, ...history.filter(h => h.url !== originalUrl)].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("shiriu_history", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("shiriu_history");
  };

  const getCleanFilename = (title: string, ext: string) => {
    const cleanTitle = title.replace(/[^a-zA-Z0-9\s]/g, "").trim().substring(0, 50);
    return `${cleanTitle} - by Shiriu.${ext}`;
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {}
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError("");
    setResult(null);
    setPreviewMedia(null);
    try {
      const data = await fetchDownloadData(url);
      setResult(data);
      saveToHistory(data, url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // FUNGSI DOWNLOAD DIRECT (TANPA FFMPEG - CEPAT & STABIL)
  const handleDownload = async (mediaUrl: string, filename: string, id: string) => {
    setDownloadingType(id);
    setDownloadProgress(0);

    try {
      const proxyUrl = `/api/proxy?url=${encodeURIComponent(mediaUrl)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error("Gagal mengambil file.");

      const contentLength = response.headers.get('content-length');
      const total = parseInt(contentLength || '0', 10);
      let loaded = 0;
      
      const reader = response.body?.getReader();
      const chunks = [];
      
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          loaded += value.length;
          if (total) setDownloadProgress(Math.round((loaded / total) * 100));
        }
      }
      
      const blob = new Blob(chunks);
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // Fallback: Jika proxy gagal, buka link langsung di tab baru
      window.open(mediaUrl, '_blank');
    } finally {
      setDownloadingType(null);
      setDownloadProgress(0);
    }
  };

  return (
    <div className="min-h-screen pb-28 px-4 pt-10 max-w-lg mx-auto relative z-10">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-2 tracking-tight">
          Media <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4ff] to-blue-500">Downloader</span>
        </h1>
        <p className="text-[var(--text-muted)] text-sm">Unduh video & musik dengan kualitas terbaik.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <div className="relative flex items-center bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl h-16 px-2 focus-within:border-[#00b4ff] transition-all shadow-lg">
          <div className="pl-3 pr-2 text-[var(--text-muted)]"><LinkIcon className="w-5 h-5" /></div>
          <input
            type="url" required placeholder="Tempel link di sini..."
            value={url} onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent border-none text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] text-[15px]"
          />
          {url && <button type="button" onClick={() => setUrl("")} className="p-2 text-[var(--text-muted)] hover:text-[var(--text)]"><X className="w-5 h-5" /></button>}
          <button type="button" onClick={handlePaste} className="flex items-center gap-1.5 px-4 py-2 bg-[var(--text-muted)]/10 hover:bg-[var(--text-muted)]/20 rounded-xl text-sm font-semibold text-[var(--text)] transition-colors ml-1 shrink-0">
            <ClipboardPaste size={16} /> Paste
          </button>
        </div>

        <button type="submit" disabled={loading} className="w-full h-14 bg-gradient-to-r from-[#00b4ff] to-blue-600 text-white font-bold text-lg rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98] shadow-[0_10px_30px_rgba(0,180,255,0.3)]">
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
          {loading ? "Memproses..." : "Ambil Media"}
        </button>
      </form>

      {history.length > 0 && !loading && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-[var(--text-muted)] flex items-center gap-1.5"><History size={14}/> Riwayat Terakhir</p>
            <button onClick={clearHistory} className="text-xs text-red-400 hover:text-red-500 flex items-center gap-1"><Trash2 size={12}/> Hapus</button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {history.map((h, i) => (
              <button key={i} onClick={() => setUrl(h.url)} className="flex items-center gap-2 p-2 pr-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shrink-0 hover:bg-[var(--text-muted)]/10 transition-colors shadow-sm">
                <img src={h.thumbnail} className="w-10 h-10 rounded-xl object-cover" />
                <span className="text-[11px] font-semibold text-[var(--text)] truncate max-w-[120px] text-left">{h.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl flex items-start gap-3 mb-8 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" /><p className="font-medium">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && !loading && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl rounded-[32px] overflow-hidden mt-2 shadow-2xl">
            
            <div className="relative group">
              <img src={result.thumbnail} alt="Thumbnail" className="w-full aspect-video object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/60 to-transparent opacity-90" />
              
              <div className="absolute top-4 right-4 flex gap-2">
                <a href={result.thumbnail} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors" title="Unduh Thumbnail">
                  <ImageIcon size={16} />
                </a>
                <button onClick={() => handleCopyText(result.title)} className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors" title="Copy Judul">
                  {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                </button>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-[10px] font-bold text-green-400 mb-2 backdrop-blur-md">
                  <CheckCircle2 size={12} /> Siap Diunduh
                </span>
                <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 drop-shadow-md">{result.title}</h3>
                <p className="text-xs text-gray-300 mt-1 font-medium">{result.author}</p>
              </div>
            </div>
            
            <div className="p-5 flex flex-col gap-4">
              
              {/* OPSI VIDEO */}
              {result.formats.filter(f => f.type === "video").map((format, idx) => (
                <div key={idx} className="relative flex flex-col bg-[var(--text-muted)]/5 border border-[var(--card-border)] p-3 rounded-2xl overflow-hidden">
                  {downloadingType === `video-${idx}` && (
                    <div className="absolute top-0 left-0 h-full bg-[#00b4ff]/20 z-0 transition-all duration-300" style={{ width: `${downloadProgress}%` }} />
                  )}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[var(--text)] flex items-center gap-2"><Play size={14} className="text-blue-500"/> Video MP4</span>
                      <span className="text-[11px] text-[var(--text-muted)] mt-0.5">
                        {downloadingType === `video-${idx}` ? `Mengunduh... ${downloadProgress}%` : 'Kualitas HD Original'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setPreviewMedia({ url: format.url, type: "video" })} className="p-2.5 bg-[var(--card-bg)] rounded-xl text-[var(--text-muted)] hover:text-[var(--text)] transition-colors" title="Preview">
                        <Play size={16} />
                      </button>
                      <button onClick={() => handleDownload(format.url, getCleanFilename(result.title, 'mp4'), `video-${idx}`)} disabled={downloadingType === `video-${idx}`} className="p-2.5 bg-[#00b4ff] rounded-xl text-white hover:bg-blue-600 transition-colors shadow-md disabled:opacity-50 min-w-[36px] flex justify-center">
                        {downloadingType === `video-${idx}` ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* OPSI AUDIO */}
              {result.formats.filter(f => f.type === "audio").map((format, idx) => (
                <div key={idx} className="relative flex flex-col bg-[var(--text-muted)]/5 border border-[var(--card-border)] p-3 rounded-2xl overflow-hidden">
                  {downloadingType === `audio-${idx}` && (
                    <div className="absolute top-0 left-0 h-full bg-purple-500/20 z-0 transition-all duration-300" style={{ width: `${downloadProgress}%` }} />
                  )}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[var(--text)] flex items-center gap-2"><Music size={14} className="text-purple-500"/> Audio MP3</span>
                      <span className="text-[11px] text-[var(--text-muted)] mt-0.5">
                        {downloadingType === `audio-${idx}` ? `Mengunduh... ${downloadProgress}%` : 'Kualitas Original'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setPreviewMedia({ url: format.url, type: "audio" })} className="p-2.5 bg-[var(--card-bg)] rounded-xl text-[var(--text-muted)] hover:text-[var(--text)] transition-colors" title="Preview">
                        <Play size={16} />
                      </button>
                      <button onClick={() => handleDownload(format.url, getCleanFilename(result.title, 'mp3'), `audio-${idx}`)} disabled={downloadingType === `audio-${idx}`} className="p-2.5 bg-purple-500 rounded-xl text-white hover:bg-purple-600 transition-colors shadow-md disabled:opacity-50 min-w-[36px] flex justify-center">
                        {downloadingType === `audio-${idx}` ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MODAL PREVIEW SUPER KEREN ================= */}
      <AnimatePresence>
        {previewMedia && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="w-full max-w-sm bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[32px] overflow-hidden shadow-2xl relative">
              
              <div className="flex items-center justify-between p-4 absolute top-0 left-0 right-0 z-20">
                <h3 className="font-bold text-white text-sm flex items-center gap-2 drop-shadow-md">
                  {previewMedia.type === "video" ? <Play size={16} className="text-blue-400" /> : <Music size={16} className="text-purple-400" />}
                  {previewMedia.type === "video" ? "Preview Video" : "Preview Audio"}
                </h3>
                <button onClick={() => setPreviewMedia(null)} className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors">
                  <X size={18} />
                </button>
              </div>
              
              <div className="bg-black flex items-center justify-center min-h-[300px] relative overflow-hidden">
                {previewMedia.type === "video" ? (
                  <video src={previewMedia.url} controls autoPlay playsInline className="w-full h-full object-contain" />
                ) : (
                  // ANIMASI AUDIO PREVIEW
                  <div className="w-full flex flex-col items-center gap-8 py-16 px-6 relative z-10">
                    
                    {/* Orb Berdenyut & Berputar */}
                    <div className="relative flex items-center justify-center w-40 h-40">
                      {/* Efek Lingkaran Luar */}
                      <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-[spin_4s_linear_infinite]"></div>
                      <div className="absolute inset-2 rounded-full border border-purple-400/20 animate-[spin_6s_linear_infinite_reverse]"></div>
                      
                      {/* Cahaya Glow */}
                      <div className="absolute inset-4 rounded-full bg-purple-500/20 blur-xl animate-pulse"></div>
                      
                      {/* Bola Kaca Utama */}
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/40 to-black border border-purple-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)] backdrop-blur-md">
                        <Headphones size={40} className="text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                      </div>

                      {/* Not Balok Terbang (Framer Motion) */}
                      <motion.div animate={{ y: [-10, -40], opacity: [0, 1, 0], rotate: [0, 45] }} transition={{ repeat: Infinity, duration: 2, delay: 0 }} className="absolute top-0 right-2 text-purple-400"><Music2 size={20}/></motion.div>
                      <motion.div animate={{ y: [-10, -50], opacity: [0, 1, 0], rotate: [0, -45] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} className="absolute top-2 left-0 text-pink-400"><Music3 size={16}/></motion.div>
                      <motion.div animate={{ y: [-10, -30], opacity: [0, 1, 0], rotate: [0, 20] }} transition={{ repeat: Infinity, duration: 1.8, delay: 1 }} className="absolute -top-4 right-1/2 text-purple-300"><Music2 size={14}/></motion.div>
                    </div>

                    <audio src={previewMedia.url} controls autoPlay className="w-full mt-4" />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-xs text-[var(--text-muted)] mt-12 pb-10">
        Unduhan langsung dari server sumber (Super Cepat).
      </p>
    </div>
  );
}
