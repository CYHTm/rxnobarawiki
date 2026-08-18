"use client";

import { useEffect, useState } from "react";
import { ChecklistProgress } from "@/components/Checklist";
import { cn } from "@/lib/utils";

export const navigation = [
  { id: "before", number: "01", label: "До установки" },
  { id: "start", number: "02", label: "Первый запуск" },
  { id: "display", number: "03", label: "Мониторы и мышь" },
  { id: "lact", number: "04", label: "RX 580 и LACT" },
  { id: "games", number: "05", label: "Windows-игры" },
  { id: "obs", number: "06", label: "OBS и звук" },
  { id: "dualboot", number: "07", label: "Windows 11 рядом" },
  { id: "rescue", number: "08", label: "Если сломалось" },
];

function useActiveSection() {
  const [active, setActive] = useState("before");

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function DesktopNav() {
  const active = useActiveSection();

  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] flex-col lg:flex">
      <nav aria-label="Разделы гайда" className="space-y-1">
        {navigation.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "grid grid-cols-[28px_1fr] px-3 py-2.5 text-sm transition-colors",
              active === item.id ? "bg-white text-black" : "text-zinc-300 hover:bg-zinc-700/60 hover:text-white",
            )}
          >
            <span className="font-mono text-[10px] opacity-60">{item.number}</span>
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="mt-auto border-t border-zinc-500/60 px-3 pt-5">
        <ChecklistProgress />
        <p className="mt-3 text-[11px] leading-4 text-zinc-300">Галочки сохраняются в этом браузере.</p>
      </div>
    </aside>
  );
}

export function MobileNav() {
  return (
    <div className="sticky top-14 z-30 -mx-4 overflow-x-auto border-y border-zinc-500/60 bg-[#424242] px-4 sm:-mx-6 sm:px-6 lg:hidden">
      <nav className="flex min-w-max" aria-label="Разделы гайда">
        {navigation.map((item) => (
          <a key={item.id} href={`#${item.id}`} className="border-r border-zinc-500/60 px-4 py-3 font-mono text-[11px] text-zinc-200 first:border-l hover:bg-zinc-700/60 hover:text-white">
            {item.number} {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
