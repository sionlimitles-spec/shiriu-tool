"use client";
import { useState } from "react";
import { Link as LinkIcon, Download, X, ClipboardPaste, Loader2 } from "lucide-react";

export default function DownloaderPage() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (e) {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!url) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simulasi
  };

  return (
    <div className="wrap">
      <div className="page-title">
        <h1>Media <span className="grad">Downloader</span></h1>
        <p>Unduh video dan musik tanpa watermark dari platform favoritmu.</p>
      </div>

      <form className="dl-form" onSubmit={handleSubmit}>
        <div className="dl-input">
          <LinkIcon className="icon" />
          <input 
            type="url" 
            placeholder="Tempel link di sini..." 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          {url && <button type="button" className="mini x" onClick={() => setUrl("")}><X size={18}/></button>}
          <button type="button" className="mini" onClick={handlePaste}>
            <ClipboardPaste size={16} /> Paste
          </button>
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <Download />} 
          {loading ? "Mencari Media..." : "Ambil Media"}
        </button>
      </form>

      <div className="platforms">
        <span className="plat" style={{ "--p": "#ff0000" } as any}><i></i>YouTube</span>
        <span className="plat" style={{ "--p": "#ffffff" } as any}><i></i>TikTok</span>
        <span className="plat" style={{ "--p": "#e1306c" } as any}><i></i>Instagram</span>
        <span className="plat" style={{ "--p": "#1db954" } as any}><i></i>Spotify</span>
      </div>

      <div className="steps">
        <div className="step">
          <span className="n">1</span>
          <div><b>Salin link</b><span>Buka aplikasi, tekan Bagikan lalu Salin Link.</span></div>
        </div>
        <div className="step">
          <span className="n">2</span>
          <div><b>Tempel & ambil</b><span>Tekan Paste, lalu tombol Ambil Media.</span></div>
        </div>
        <div className="step">
          <span className="n">3</span>
          <div><b>Pilih format</b><span>Unduh sebagai video MP4 atau audio MP3.</span></div>
        </div>
      </div>

      <p className="disclaimer">Gunakan hanya untuk konten milikmu atau yang diizinkan pemiliknya.</p>
    </div>
  );
}
