"use client";

import { Settings2, Type } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type TextScale = "small" | "normal" | "large";

interface TypographyContextValue {
  scale: TextScale;
  setScale: (scale: TextScale) => void;
}

const TypographyContext = createContext<TypographyContextValue | null>(null);
const storageKey = "rx-nobara-text-scale";

const options: { value: TextScale; label: string; preview: string }[] = [
  { value: "small", label: "Меньше", preview: "15" },
  { value: "normal", label: "Нормально", preview: "16" },
  { value: "large", label: "Крупнее", preview: "18" },
];

export function TypographyProvider({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState<TextScale>("normal");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(storageKey);
    } catch {
      // Размер текста все равно работает в текущей вкладке, даже если хранилище отключено.
    }
    const frame = window.requestAnimationFrame(() => {
      if (saved === "small" || saved === "normal" || saved === "large") setScale(saved);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.textScale = scale;
    try {
      window.localStorage.setItem(storageKey, scale);
    } catch {
      // Браузер может запретить LocalStorage в строгом приватном режиме.
    }
  }, [scale]);

  return <TypographyContext.Provider value={{ scale, setScale }}>{children}</TypographyContext.Provider>;
}

function useTypography() {
  const value = useContext(TypographyContext);
  if (!value) throw new Error("Настройки типографики должны находиться внутри TypographyProvider");
  return value;
}

export function TypographySettings({ compact = false }: { compact?: boolean }) {
  const { scale, setScale } = useTypography();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(event: MouseEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, []);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Настроить размер текста"
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 font-semibold text-white shadow-lg shadow-black/10 backdrop-blur-md transition hover:border-white/30 hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
          compact ? "h-10 w-10" : "h-12 px-5 text-sm",
        )}
      >
        <Settings2 className="h-4 w-4" />
        {!compact && "Размер текста"}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-72 rounded-3xl border border-white/12 bg-[#191b23] p-4 shadow-2xl shadow-black/40">
          <div className="flex items-center gap-3 px-2 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200">
              <Type className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-white">Типографика</div>
              <div className="mt-0.5 text-xs text-zinc-400">Выбор сохранится в браузере</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setScale(option.value);
                  setOpen(false);
                }}
                aria-pressed={scale === option.value}
                className={cn(
                  "rounded-2xl border px-2 py-3 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
                  scale === option.value
                    ? "border-cyan-300/60 bg-cyan-300/12 text-white"
                    : "border-white/8 bg-white/[0.03] text-zinc-300 hover:border-white/20 hover:text-white",
                )}
              >
                <span className="block font-mono text-lg font-bold">{option.preview}</span>
                <span className="mt-1 block text-[11px]">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
