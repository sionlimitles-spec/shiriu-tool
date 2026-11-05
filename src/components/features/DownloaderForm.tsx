"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as LinkIcon, Download, Loader2, Play, Music, AlertCircle } from "lucide-react";
import { fetchDownloadData, DownloadResult, detectPlatform } from "@/lib/api";
import { playSound } from "@/lib/sound";

export default function DownloaderForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<DownloadResult | null>(null);

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
      {/* Form Input */}
      <form onSubmit={handleFetch} className="relative z-10 mb-8">
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <LinkIcon className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="url"
            required
            placeholder="Paste link YouTube, TikTok, IG, atau Spotify..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-[#14141a] border border-white/10 text-white rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none py-4 pl-11 pr-4 outline-none focus:border-accent-cyan/50 transition-all placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto mt-2 md:mt-0 bg-accent-cyan hover:bg-cyan-400 text-bg-primary font-bold rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none py-4 px-8 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
            {loading ? "Mencari..." : "Ambil Media"}
          </button>
        </div>
        {url && platform !== "unknown" && (
          <p className="text-xs text-accent-cyan mt-2 ml-1">Terdeteksi: {platform.toUpperCase()}</p>
        )}
      </form>

      {/* Error Message */}
      {error && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3 mb-6">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </motion.div>
      )}

      {/* Hasil Download */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-[#14141a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col md:flex-row gap-6 p-6">
              {/* Thumbnail */}
              <div className="w-full md:w-1/3 shrink-0">
                <img 
                  src={result.thumbnail} 
                  alt={result.title} 
                  className="w-full h-auto aspect-video object-cover rounded-xl border border-white/10"
                />
              </div>
              
              {/* Info & Tombol */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-white line-clamp-2 leading-snug">{result.title}</h3>
                {result.author && <p className="text-sm text-slate-400 mt-1">{result.author}</p>}
                {result.duration && <p className="text-xs text-slate-500 mt-1">Durasi: {result.duration}</p>}
                
                <div className="mt-5 flex flex-col gap-2">
                  {result.formats.map((format, idx) => (
                    <a
                      key={idx}
                      href={format.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playSound("success")}
                      className="group flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent-cyan/30 p-3 rounded-xl transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${format.type === "video" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`}>
                          {format.type === "video" ? <Play size={16} /> : <Music size={16} />}
                        </div>
                        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{format.label}</span>
                      </div>
                      <Download size={16} className="text-slate-500 group-hover:text-accent-cyan transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
                              }
