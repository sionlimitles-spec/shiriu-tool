"use client";

import { useState, useEffect, useRef } from "react";
import { Link as LinkIcon, Download, X, ClipboardPaste, Loader2, Play, Music, AlertCircle, CheckCircle2, Settings2, Copy, Check, Image as ImageIcon, History, ChevronDown, Pause } from "lucide-react";
import { fetchDownloadData, DownloadResult } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

type HistoryItem = { url: string; title: string; thumbnail: string };

export default function DownloaderPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<DownloadResult | null>(null);
  
  // State untuk Progress Bar
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadingType, setDownloadingType] = useState<string | null>(null);
  
  // State untuk Preview Modal
  const [previewMedia, setPreviewMedia] = useState<{ url: string; type: "video" | "audio" } | null>(null);

  // State Fitur
  const [videoQuality, setVideoQuality] = useState<"original" | "hd">("original");
  const [audioBitrate, setAudioBitrate] = useState("320kbps");
  const [showBitrateMenu, setShowBitrateMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const bitrateOptions = ["64kbps", "128kbps", "192kbps", "256kbps", "320kbps"];

  // Load History dari LocalStorage
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

  const getCleanFilename = (title: string, ext: string) => {
    const cleanTitle = title.replace(/[^a-zA-Z0-9\s]/g, "").trim().substring(0, 50);
    return `${cleanTitle} - by Shiriu.${ext}`;
  };

  const getEstimatedAudioSize = (bitrateStr: string) => {
    const bitrate = parseInt(bitrateStr);
    const duration = result?.duration ? parseInt(result.duration.split(':')[0]) * 60 + parseInt(result.duration.split(':')[1]) : 180;
    const sizeInBytes = (bitrate * 1000 * duration) / 8;
    return (sizeInBytes / (1024 * 1024)).toFixed(1) + " MB";
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

  // DOWNLOAD DENGAN PROGRESS BAR & FALLBACK
  const handleDownload = async (mediaUrl: string, filename: string, id: string) => {
    setDownloadingType(id);
    setDownloadProgress(0);
    
    // 1. Coba lewat Proxy Cloudflare
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(mediaUrl)}`;
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", proxyUrl, true);
    xhr.responseType = "blob";

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setDownloadProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(blobUrl);
        setDownloadProgress(null);
        setDownloadingType(null);
      } else {
        // Fallback: Buka link langsung jika proxy gagal (502)
        console.log("Proxy failed, opening direct link...");
        window.open(mediaUrl, '_blank');
        setDownloadProgress(null);
        setDownloadingType(null);
      }
    };

    xhr.onerror = () => {
      // Fallback jika error jaringan
      window.open(mediaUrl, '_blank');
      setDownloadProgress(null);
      setDownloadingType(null);
    };

    xhr.send();
  };

  return (
    <div className="min-h-screen pb-28 px-4 pt-12 max-w-lg mx-auto relative z-10">
      
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-2 tracking-tight">
          Media <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4ff] to-blue-500">Downloader</span>
        </h1>
        <p className="text-[var(--text-muted)] text-sm">Unduh video & musik dengan kualitas terbaik.</p>
      </div>

      {/* Form Input */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
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

      {/* RIWAYAT UNDUHAN */}
      {history.length > 0 && !result && !loading && (
        <div className="mb-8">
          <p className="text-xs font-bold text-[var(--text-muted)] mb-2 flex items-center gap-1"><History size={12}/> Riwayat Terakhir</p>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {history.map((h, i) => (
              <button key={i} onClick={() => setUrl(h.url)} className="flex items-center gap-2 p-2 pr-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl shrink-0 hover:bg-[var(--text-muted)]/10 transition-colors">
                <img src={h.thumbnail} className="w-8 h-8 rounded-lg object-cover" />
                <span className="text-[11px] font-semibold text-[var(--text)] truncate max-w-[120px]">{h.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl flex items-start gap-3 mb-8 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" /><p className="font-medium">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HASIL DOWNLOAD */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl rounded-[32px] overflow-hidden mt-4 shadow-2xl">
            
            {/* Thumbnail & Info */}
            <div className="relative group">
              <img src={result.thumbnail} alt="Thumbnail" className="w-full aspect-video object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/60 to-transparent opacity-90" />
              
              {/* Tombol Play Preview */}
              <button 
                onClick={() => setPreviewMedia({ url: result.formats[0]?.url, type: result.formats[0]?.type })}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform opacity-0 group-hover:opacity-100 shadow-xl"
              >
                <Play size={24} fill="white" className="ml-1" />
              </button>

              {/* Tombol Thumbnail & Copy */}
              <div className="absolute top-4 right-4 flex gap-2">
                <a href={result.thumbnail} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60" title="Unduh Thumbnail">
                  <ImageIcon size={16} />
                </a>
                <button onClick={() => handleCopyText(result.title)} className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60" title="Copy Judul">
                  {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                </button>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-[10px] font-bold text-green-400 mb-2 backdrop-blur-md">
                  <CheckCircle2 size={12} /> Siap Diunduh
                </span>
                <h3 className="text-lg font-bold text-white leading-tight line-clamp-2 drop-shadow-md">{result.title}</h3>
                <p className="text-xs text-gray-300 mt-1 font-medium">{result.author} {result.duration && `• ${result.duration}`}</p>
              </div>
            </div>
            
            <div className="p-5 flex flex-col gap-6">
              
              {/* OPSI VIDEO */}
              {result.formats.some(f => f.type === "video") && (
                <div>
                  <h4 className="text-sm font-bold text-[var(--text)] mb-3 flex items-center gap-2">
                    <Play size={16} className="text-blue-500" /> Kualitas Video (MP4)
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <button onClick={() => setVideoQuality("original")} className={`p-3 rounded-xl border text-xs font-bold transition-all ${videoQuality === "original" ? "border-[#00b4ff] bg-[#00b4ff]/10 text-[#00b4ff]" : "border-[var(--card-border)] text-[var(--text-muted)]"}`}>Original <br/><span className="text-[10px] font-normal opacity-70">Tanpa Kompres</span></button>
                    <button onClick={() => setVideoQuality("hd")} className={`p-3 rounded-xl border text-xs font-bold transition-all ${videoQuality === "hd" ? "border-[#00b4ff] bg-[#00b4ff]/10 text-[#00b4ff]" : "border-[var(--card-border)] text-[var(--text-muted)]"}`}>HD Enhanced <br/><span className="text-[10px] font-normal opacity-70">Upscale + Tajam</span></button>
                  </div>
                  {result.formats.filter(f => f.type === "video").map((format, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-[var(--text-muted)]/5 border border-[var(--card-border)] p-2 rounded-2xl mb-2">
                      <div className="flex flex-col ml-2">
                        <span className="text-[13px] font-bold text-[var(--text)]">{format.label} {videoQuality === "hd" ? "(Upscaled)" : ""}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setPreviewMedia({ url: format.url, type: "video" })} className="p-2.5 bg-[var(--card-bg)] rounded-xl text-[var(--text-muted)] hover:text-[var(--text)] transition-colors" title="Preview">
                          <Play size={16} />
                        </button>
                        <button onClick={() => handleDownload(format.url, getCleanFilename(result.title, 'mp4'), `video-${idx}`)} disabled={downloadingType === `video-${idx}`} className="p-2.5 bg-[#00b4ff] rounded-xl text-white hover:bg-blue-600 transition-colors shadow-md disabled:opacity-50 min-w-[40px] flex justify-center">
                          {downloadingType === `video-${idx}` ? <span className="text-xs font-bold">{downloadProgress}%</span> : <Download size={16} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* OPSI AUDIO & DROPDOWN KUSTOM */}
              {result.formats.some(f => f.type === "audio") && (
                <div>
                  <h4 className="text-sm font-bold text-[var(--text)] mb-3 flex items-center gap-2">
                    <Music size={16} className="text-purple-500" /> Kualitas Audio (MP3)
                  </h4>
                  
                  {/* Custom Dropdown */}
                  <div className="relative mb-3 z-20">
                    <button onClick={() => setShowBitrateMenu(!showBitrateMenu)} className="w-full flex items-center justify-between bg-[var(--text-muted)]/5 p-3 rounded-xl border border-[var(--card-border)] text-sm font-bold text-[var(--text)] transition-colors hover:bg-[var(--text-muted)]/10">
                      <div className="flex items-center gap-2"><Settings2 size={16} className="text-[var(--text-muted)]"/> {audioBitrate} <span className="text-xs font-normal text-[var(--text-muted)] ml-1">({getEstimatedAudioSize(audioBitrate)})</span></div>
                      <ChevronDown size={16} className={`transition-transform ${showBitrateMenu ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {showBitrateMenu && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 right-0 mt-1 bg-[var(--bg)] border border-[var(--card-border)] rounded-xl shadow-2xl overflow-hidden z-50">
                          {bitrateOptions.map(bit => (
                            <button key={bit} onClick={() => { setAudioBitrate(bit); setShowBitrateMenu(false); }} className="w-full text-left px-4 py-3 text-sm font-semibold text-[var(--text)] hover:bg-[#00b4ff]/10 hover:text-[#00b4ff] transition-colors border-b border-[var(--card-border)] last:border-0 flex justify-between items-center">
                              {bit} <span className="text-xs font-normal text-[var(--text-muted)]">{getEstimatedAudioSize(bit)}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {result.formats.filter(f => f.type === "audio").map((format, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-[var(--text-muted)]/5 border border-[var(--card-border)] p-2 rounded-2xl">
                      <div className="flex flex-col ml-2">
                        <span className="text-[13px] font-bold text-[var(--text)]">Audio MP3 ({audioBitrate})</span>
                        <span className="text-[10px] text-[var(--text-muted)]">Estimasi: {getEstimatedAudioSize(audioBitrate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setPreviewMedia({ url: format.url, type: "audio" })} className="p-2.5 bg-[var(--card-bg)] rounded-xl text-[var(--text-muted)] hover:text-[var(--text)] transition-colors" title="Preview">
                          <Play size={16} />
                        </button>
                        <button onClick={() => handleDownload(format.url, getCleanFilename(result.title, 'mp3'), `audio-${idx}`)} disabled={downloadingType === `audio-${idx}`} className="p-2.5 bg-purple-500 rounded-xl text-white hover:bg-purple-600 transition-colors shadow-md disabled:opacity-50 min-w-[40px] flex justify-center">
                          {downloadingType === `audio-${idx}` ? <span className="text-xs font-bold">{downloadProgress}%</span> : <Download size={16} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL PREVIEW (MP4 / MP3) */}
      <AnimatePresence>
        {previewMedia && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="w-full max-w-md bg-[var(--bg)] border border-[var(--card-border)] rounded-3xl overflow-hidden shadow-2xl relative">
              <div className="flex items-center justify-between p-4 border-b border-[var(--card-border)]">
                <h3 className="font-bold text-[var(--text)] text-sm flex items-center gap-2">
                  {previewMedia.type === "video" ? <Play size={16} className="text-blue-500" /> : <Music size={16} className="text-purple-500" />}
                  Preview Media
                </h3>
                <button onClick={() => setPreviewMedia(null)} className="p-2 bg-[var(--text-muted)]/10 rounded-full hover:bg-[var(--text-muted)]/20 text-[var(--text)]">
                  <X size={18} />
                </button>
              </div>
              
              <div className="p-2 bg-black">
                {previewMedia.type === "video" ? (
                  <video src={previewMedia.url} controls autoPlay className="w-full aspect-video rounded-xl bg-black" />
                ) : (
                  <div className="p-6 flex flex-col items-center gap-4">
                    <div className="w-24 h-24 rounded-full bg-purple-500/20 flex items-center justify-center animate-pulse">
                      <Music size={40} className="text-purple-500" />
                    </div>
                    <audio src={previewMedia.url} controls autoPlay className="w-full" />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-xs text-[var(--text-muted)] mt-12 pb-10">
        File akan otomatis diganti namanya menjadi judul video + "by Shiriu".
      </p>
    </div>
  );
}
