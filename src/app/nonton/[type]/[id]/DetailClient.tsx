"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchDetail } from "@/lib/detail";
import VideoPlayer from "@/components/nonton/VideoPlayer";
import { ArrowLeft, Star, Calendar, Loader2 } from "lucide-react";
import Link from "next/link";

export default function DetailClient() {
  const params = useParams();
  const type = params.type as string;
  const id = params.id as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const res = await fetchDetail(type, id);
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getDetail();
  }, [type, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#00b4ff] animate-spin mb-4" />
        <p className="text-[var(--text-muted)] text-sm">Memuat data...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-[var(--text)] mb-2">Konten Tidak Ditemukan</h2>
        <Link href="/nonton" className="text-[#00b4ff] text-sm">Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-[var(--bg)]">
      <div className="absolute top-0 left-0 right-0 h-[300px] overflow-hidden -z-10">
        <img src={data.poster} className="w-full h-full object-cover blur-2xl opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/50 to-[var(--bg)]" />
      </div>

      <div className="sticky top-0 z-50 px-4 py-3 flex items-center gap-3 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--card-border)]">
        <Link href="/nonton" className="p-2 bg-[var(--card-bg)] rounded-full border border-[var(--card-border)] text-[var(--text)] hover:text-[#00b4ff]">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-bold text-sm text-[var(--text)] truncate max-w-[80%]">{data.title}</h1>
      </div>

      <div className="px-4 pt-6">
        <div className="flex gap-4 mb-6">
          <img src={data.poster} className="w-[110px] h-[160px] object-cover rounded-xl border border-[var(--card-border)] shadow-xl shrink-0" />
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-black text-[var(--text)] leading-tight mb-2">{data.title}</h2>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="flex items-center gap-1 text-[11px] font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-md">
                <Star size={12} className="fill-yellow-500" /> {data.rating}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-[var(--text-muted)] bg-[var(--text-muted)]/10 px-2 py-1 rounded-md">
                <Calendar size={12} /> {data.year}
              </span>
              <span className="text-[11px] font-bold text-[#00b4ff] bg-[#00b4ff]/10 px-2 py-1 rounded-md uppercase">
                {data.type}
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] line-clamp-3 leading-relaxed">
              {data.synopsis}
            </p>
          </div>
        </div>

        <VideoPlayer data={data} />
      </div>
    </div>
  );
}
