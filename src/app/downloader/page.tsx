"use client";

import { useState } from "react";
import { Link as LinkIcon, Download, X, ClipboardPaste, Loader2, Play, Music, AlertCircle, CheckCircle2, Settings2, Copy, Check } from "lucide-react";
import { fetchDownloadData, DownloadResult } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function DownloaderPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [downloadLoading, setDownloadLoading] = useState<string | null>(null); // Untuk loading tombol unduh

  // State Fitur Baru
  const [videoQuality, setVideoQuality] = useState<"original" | "hd">("original");
  const [audioBitrate, setAudioBitrate] = useState("320kbps");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const bitrateOptions = ["64kbps", "128kbps", "192kbps", "256kbps", "320kbps"];

  // Fungsi Membersihkan Nama File
  const getCleanFilename = (title: string, ext: string) => {
    const cleanTitle = title.replace(/[^a-zA-Z0-9\s]/g, "").trim();
    return `${cleanTitle} - by Shiriu.${ext}`;
  };

  // Fungsi Menghitung Estimasi Ukuran File Audio (Berdasarkan durasi)
  const getEstimatedAudioSize = (bitrateStr: string) => {
    const bitrate = parseInt(bitrateStr);
    const duration = result?.duration ? parseInt(result.duration.split(':')[0]) * 60 + parseInt(result.duration.split(':')[1]) : 180;
    const sizeInBytes = (bitrate * 1000 * duration) / 8;
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(1) + " MB";
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {}
  };

  const handleCopyLink = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
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

  // FUNGSI DOWNLOAD BARU: Fetch via Proxy -> Blob -> Download
  const handleDownload = async (mediaUrl: string, filename: string, id: string) => {
    setDownloadLoading(id);
    try {
      // Panggil proxy kita untuk mengambil file
      const proxyUrl = `/api/proxy?url=${encodeURIComponent(mediaUrl)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) throw new Error("Gagal mengunduh file dari server sumber.");
      
      // Ubah response menjadi Blob
      const blob = await response.blob();
      
      // Buat URL objek dari Blob
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Buat elemen <a> sementara untuk memicu unduhan
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename; // Set nama file kustom
      document.body.appendChild(a);
      a.click();
      a.remove();
      
      // Bersihkan URL objek
      window.URL.revokeObjectURL(blobUrl);
      
    } catch (err) {
      alert("Gagal mengunduh: " + (err as Error).message);
    } finally {
      setDownloadLoading(null);
    }
  };

  return (
    <div className="min-h-screen pb-28 px-4 pt-12 max-w-lg mx-auto relative z-10">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-[var(--text)] mb-2 tracking-tight">
          Media <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b4ff] to-blue-500">Downloader</span>
        </h1>
        <p className="text-[var(--text-muted)] text-sm">
          Unduh video & musik dengan kualitas terbaik.
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
            placeholder="Tempel link di sini..."
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

      {/* HASIL DOWNLOAD */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl rounded-[32px] overflow-hidden mt-4 shadow-2xl">
            
            {/* Thumbnail */}
            <div className="relative group">
              <img src={result.thumbnail} alt="Thumbnail" className="w-full aspect-video object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/60 to-transparent opacity-90" />
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
                        <button onClick={() => handleCopyLink(format.url, idx)} className="p-2.5 bg-[var(--card-bg)] rounded-xl text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                          {copiedIndex === idx ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                        </button>
                        <button 
                          onClick={() => handleDownload(format.url, getCleanFilename(result.title, 'mp4'), `video-${idx}`)}
                          disabled={downloadLoading === `video-${idx}`}
                          className="p-2.5 bg-[#00b4ff] rounded-xl text-white hover:bg-blue-600 transition-colors shadow-md disabled:opacity-50"
                        >
                          {downloadLoading === `video-${idx}` ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* OPSI AUDIO */}
              {result.formats.some(f => f.type === "audio") && (
                <div>
                  <h4 className="text-sm font-bold text-[var(--text)] mb-3 flex items-center gap-2">
                    <Music size={16} className="text-purple-500" /> Kualitas Audio (MP3)
                  </h4>
                  <div className="flex items-center gap-3 mb-3 bg-[var(--text-muted)]/5 p-3 rounded-xl border border-[var(--card-border)]">
                    <Settings2 size={18} className="text-[var(--text-muted)]" />
                    <select value={audioBitrate} onChange={(e) => setAudioBitrate(e.target.value)} className="bg-transparent text-sm font-bold text-[var(--text)] outline-none w-full cursor-pointer">
                      {bitrateOptions.map(bit => (
                        <option key={bit} value={bit} className="bg-[var(--bg)] text-[var(--text)]">{bit} (Estimasi: {getEstimatedAudioSize(bit)})</option>
                      ))}
                    </select>
                  </div>
                  {result.formats.filter(f => f.type === "audio").map((format, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-[var(--text-muted)]/5 border border-[var(--card-border)] p-2 rounded-2xl">
                      <div className="flex flex-col ml-2">
                        <span className="text-[13px] font-bold text-[var(--text)]">Audio MP3 ({audioBitrate})</span>
                        <span className="text-[10px] text-[var(--text-muted)]">Estimasi: {getEstimatedAudioSize(audioBitrate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleCopyLink(format.url, idx + 10)} className="p-2.5 bg-[var(--card-bg)] rounded-xl text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                          {copiedIndex === (idx + 10) ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                        </button>
                        <button 
                          onClick={() => handleDownload(format.url, getCleanFilename(result.title, 'mp3'), `audio-${idx}`)}
                          disabled={downloadLoading === `audio-${idx}`}
                          className="p-2.5 bg-purple-500 rounded-xl text-white hover:bg-purple-600 transition-colors shadow-md disabled:opacity-50"
                        >
                          {downloadLoading === `audio-${idx}` ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
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

      <p className="text-center text-xs text-[var(--text-muted)] mt-12 pb-10">
        File akan otomatis diganti namanya menjadi judul video + "by Shiriu".
      </p>
    </div>
  );
}
