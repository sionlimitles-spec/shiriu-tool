"use client";
import Link from "next/link";
import { Tool } from "@/lib/data";
import { playSound } from "@/lib/sound";
import { ChevronRight } from "lucide-react";

export default function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  
  return (
    <Link href={tool.href} className={`card ${tool.cssClass}`} onClick={() => playSound("click")}>
      <div className="top">
        <span className="ico"><Icon /></span>
        {tool.badge && (
          <span className={`badge ${tool.badge.toLowerCase()}`}>{tool.badge}</span>
        )}
      </div>
      <h3>{tool.title}</h3>
      <p>{tool.description}</p>
      <div className="go">Buka <ChevronRight className="icon" /></div>
    </Link>
  );
}
