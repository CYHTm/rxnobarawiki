"use client";

import { BookOpen, Code2, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#start", label: "Старт" },
  { href: "#display", label: "Экран" },
  { href: "#lact", label: "RX 580" },
  { href: "#games", label: "Игры" },
  { href: "#obs", label: "OBS" },
  { href: "#dualboot", label: "Dual-boot" },
];

export function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#070a12]/85 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 font-black tracking-tight text-white" aria-label="К началу гайда">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
            <BookOpen className="h-4 w-4" />
          </span>
          <span>RX<span className="text-emerald-400">{"//"}</span>NOBARA</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Разделы гайда">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-xs font-bold text-emerald-300 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.9)]" />
            Актуально на 16.08.2026
          </div>
          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
            <a href="https://github.com/CYHTm/rxnobarawiki" target="_blank" rel="noreferrer" aria-label="Репозиторий на GitHub">
              <Code2 className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Закрыть меню" : "Открыть меню"}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/[0.06] bg-slate-950/95 lg:hidden"
            aria-label="Мобильная навигация"
          >
            <div className="grid grid-cols-2 gap-2 p-4">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-sm font-bold text-slate-300">
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
