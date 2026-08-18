"use client";

import { useEffect, useState } from "react";
import { ChecklistProgress } from "@/components/Checklist";
import { cn } from "@/lib/utils";

export const navigation = [
  { id: "start", number: "01", label: "После установки" },
  { id: "display", number: "02", label: "Мониторы и мышь" },
  { id: "lact", number: "03", label: "RX 580 и LACT" },
  { id: "games", number: "04", label: "Игры" },
  { id: "obs", number: "05", label: "OBS и звук" },
  { id: "dualboot", number: "06", label: "Две системы" },
  { id: "rescue", number: "07", label: "Если все сломалось" },
];

function useActiveSection() {
  const [active, setActive] = useState("start");

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
          <a key={item.id} href={`#${item.id}`} className={cn("grid grid-cols-[28px_1fr] px-3 py-2.5 text-sm transition-colors", active === item.id ? "bg-white text-black" : "text-zinc-600 hover:bg-zinc-900 hover:text-zinc-200")}>
            <span className="font-mono text-[10px] opacity-60">{item.number}</span>
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="mt-auto border-t border-zinc-800 px-3 pt-5">
        <ChecklistProgress />
        <p className="mt-3 text-[11px] leading-4 text-zinc-700">Галочки сохраняются в браузере.</p>
      </div>
    </aside>
  );
}

export function MobileNav() {
  return (
    <div className="sticky top-14 z-30 -mx-4 overflow-x-auto border-y border-zinc-800 bg-[#161616] px-4 sm:-mx-6 sm:px-6 lg:hidden">
      <nav className="flex min-w-max" aria-label="Разделы гайда">
        {navigation.map((item) => (
          <a key={item.id} href={`#${item.id}`} className="border-r border-zinc-800 px-4 py-3 font-mono text-[11px] text-zinc-500 first:border-l hover:text-white">
            {item.number} {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
