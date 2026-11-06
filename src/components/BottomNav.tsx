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
      <div className="flex items-center gap-1 p-1.5 rounded-full backdrop-blur-2xl border border-gray-200 dark:border-white/10 shadow-2xl bg-white/80 dark:bg-black/60">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
                  : "text-gray-500 dark:text-white/50 hover:text-black dark:hover:text-white"
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
