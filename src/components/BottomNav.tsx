"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Brain, User } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Tools", href: "/tools", icon: LayoutGrid },
  { name: "AI", href: "/ai", icon: Brain },
  { name: "Profil", href: "/profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 p-1.5 rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all ${
                isActive
                  ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Icon size={18} />
              {isActive && <span className="text-xs font-bold">{item.name}</span>}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
