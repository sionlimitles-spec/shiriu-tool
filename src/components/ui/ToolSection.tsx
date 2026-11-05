"use client";
import { useState } from "react";
import { toolsData } from "@/lib/data";
import ToolCard from "./ToolCard";
import { Search, LayoutGrid, Download, Film, Sparkles } from "lucide-react";

export default function ToolSection() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");

  const filteredTools = toolsData.filter(t => {
    const matchSearch = (t.title + " " + t.description).toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === "all" || t.category === cat;
    return matchSearch && matchCat;
  });

  return (
    <>
      <div className="sec-head">
        <h2><i>/</i>Catalog</h2>
        <span className="pill">{filteredTools.length} Tools</span>
      </div>

      <label className="search">
        <Search className="icon" />
        <input 
          type="search" 
          placeholder="Cari tools impianmu..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>

      <div className="chips">
        <button className={`chip ${cat === 'all' ? 'active' : ''}`} onClick={() => setCat('all')}>
          <LayoutGrid className="icon" /> Semua
        </button>
        <button className={`chip ${cat === 'media' ? 'active' : ''}`} onClick={() => setCat('media')}>
          <Download className="icon" /> Media
        </button>
        <button className={`chip ${cat === 'hiburan' ? 'active' : ''}`} onClick={() => setCat('hiburan')}>
          <Film className="icon" /> Hiburan
        </button>
        <button className={`chip ${cat === 'ai' ? 'active' : ''}`} onClick={() => setCat('ai')}>
          <Sparkles className="icon" /> AI
        </button>
      </div>

      <section className="grid">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
        {filteredTools.length === 0 && <p className="empty">Tools tidak ditemukan.</p>}
      </section>
    </>
  );
}
