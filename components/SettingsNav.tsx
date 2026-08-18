"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const navigation = [
  { id: "before", number: "01", label: "Проверка загрузки" },
  { id: "start", number: "02", label: "База системы" },
  { id: "display", number: "03", label: "Экран и ввод" },
  { id: "lact", number: "04", label: "RX 580 и LACT" },
  { id: "games", number: "05", label: "Игры и PortProton" },
  { id: "obs", number: "06", label: "OBS и VK Live" },
  { id: "dualboot", number: "07", label: "Windows рядом" },
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
      { rootMargin: "-22% 0px -62% 0px", threshold: [0, 0.1, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function DesktopNav() {
  const active = useActiveSection();

  return (
    <aside className="sticky top-28 hidden h-fit rounded-[1.75rem] border border-white/[0.08] bg-[#16181f] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.18)] lg:block">
      <div className="px-4 pb-3 pt-4">
        <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Содержание</div>
        <div className="mt-2 text-sm font-semibold text-zinc-200">Настройка по порядку</div>
      </div>
      <nav aria-label="Разделы гайда" className="mt-2 space-y-1">
        {navigation.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "grid grid-cols-[34px_1fr] items-center rounded-2xl px-4 py-3.5 text-sm transition",
              active === item.id
                ? "bg-gradient-to-r from-cyan-300/16 to-violet-300/8 text-white shadow-inner shadow-white/[0.03]"
                : "text-zinc-400 hover:bg-white/[0.045] hover:text-zinc-100",
            )}
          >
            <span className={cn("font-mono text-[10px]", active === item.id ? "text-cyan-200" : "text-zinc-600")}>{item.number}</span>
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="mx-4 mb-3 mt-5 border-t border-white/[0.08] pt-5 text-xs leading-5 text-zinc-500">
        R5 2600 · RX 580 · 16 ГБ<br />Acer 75 Гц · ViewSonic 60 Гц
      </div>
    </aside>
  );
}

export function MobileNav() {
  return (
    <div className="sticky top-[4.5rem] z-30 -mx-4 overflow-x-auto border-y border-white/[0.08] bg-[#11131a]/95 px-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:hidden">
      <nav className="flex min-w-max gap-1 py-2" aria-label="Разделы гайда">
        {navigation.map((item) => (
          <a key={item.id} href={`#${item.id}`} className="rounded-full px-4 py-2.5 text-xs font-medium text-zinc-300 transition hover:bg-white/[0.07] hover:text-white">
            <span className="mr-2 font-mono text-[9px] text-cyan-200">{item.number}</span>{item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
