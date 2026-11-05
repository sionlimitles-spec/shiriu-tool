"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as LinkIcon, Download, Loader2, Play, Music, X, ClipboardPaste } from "lucide-react";
import { fetchDownloadData, DownloadResult, detectPlatform } from "@/lib/api";
import { playSound } from "@/lib/sound";

export default function DownloaderForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<DownloadResult | null>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.log("Gagal paste");
    }
  };

  const handleFetch = async (e: React.FormEvent) => {
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

  const platform = detectPlatform(url);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleFetch} className="flex flex-col gap-3 mb-8">
        <div className="relative flex items-center bg-white/5 border border-line focus-within:border-brand focus-within:ring-1 focus-within:ring-brand rounded-2xl h-[58px] px-2 transition-all">
          <div className="pl-3 pr-2 text-text-muted">
            <LinkIcon className="h-5 w-5" />
          </div>
          <input
            type="url"
            required
            placeholder="Paste link YouTube, TikTok, IG..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent border-none text-white outline-none placeholder:text-text-muted text-[15px]"
          />
          {url && (
            <button type="button" onClick={() => setUrl("")} className="p-2 text-text-muted hover:text-white">
              <X className="h-5 w-5" />
            </button>
          )}
          <button type="button" onClick={handlePaste} className="flex items-center gap-1.5 px-3 py-2 bg-white/10 rounded-xl text-xs font-semibold hover:bg-white/20 transition-colors">
            <ClipboardPaste size={14} /> Paste
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-[56px] bg-gradient-to-r from-brand to-brand-dark text-bg-main font-bold rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98] shadow-[0_8px_28px_rgba(0,180,255,0.28)]"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
          {loading ? "Mencari Media..." : "Ambil Media"}
        </button>
      </form>

      {error && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3 mb-6 text-sm">
          {error}
        </motion.div>
      )}

      {loading && (
        <div className="h-[260px] rounded-3xl border border-line bg-gradient-to-r from-[#10131c] via-[#1a1e2b] to-[#10131c] bg-[length:200%_100%] animate-[shine_1.2s_linear_infinite]" />
      )}

      <AnimatePresence>
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-b from-[#151823] to-[#0c0e15] border border-line rounded-3xl overflow-hidden shadow-2xl"
          >
            <img src={result.thumbnail} alt="Thumbnail" className="w-full aspect-video object-cover bg-black/50" />
            <div className="p-5">
              <h3 className="text-lg font-bold text-white leading-tight">{result.title}</h3>
              <p className="text-[13px] text-text-muted mt-1 mb-4">{result.author} {result.duration && `· ${result.duration}`}</p>
              
              <div className="flex flex-col gap-2">
                {result.formats.map((format, idx) => (
                  <a
                    key={idx}
                    href={format.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between bg-white/5 hover:bg-white/10 border border-line p-3.5 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${format.type === "video" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`}>
                        {format.type === "video" ? <Play size={16} /> : <Music size={16} />}
                      </div>
                      <span className="text-sm font-medium text-white">{format.label}</span>
                    </div>
                    <Download size={18} className="text-text-muted group-hover:text-brand transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
        }
