"use client";

import { Check } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export const checklistIds = [
  "backup",
  "usb",
  "install",
  "welcome",
  "sync",
  "codecs",
  "apps",
  "disks",
  "monitors",
  "adaptive",
  "mouse",
  "desktop",
  "lact-install",
  "lact-mask",
  "undervolt",
  "portproton",
  "prefixes",
  "obs-video",
  "obs-audio",
  "windows-time",
  "grub",
] as const;

export type ChecklistId = (typeof checklistIds)[number];

type ChecklistState = Partial<Record<ChecklistId, boolean>>;

interface ChecklistContextValue {
  state: ChecklistState;
  toggle: (id: ChecklistId) => void;
  completed: number;
  total: number;
}

const ChecklistContext = createContext<ChecklistContextValue | null>(null);
const storageKey = "rx-nobara-checklist-v2";

export function ChecklistProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ChecklistState>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) {
          const parsed: unknown = JSON.parse(saved);
          if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            setState(parsed as ChecklistState);
          }
        }
      } catch {
        try {
          window.localStorage.removeItem(storageKey);
        } catch {}
      }
      setReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {}
  }, [ready, state]);

  const value = useMemo(
    () => ({
      state,
      toggle: (id: ChecklistId) => setState((current) => ({ ...current, [id]: !current[id] })),
      completed: checklistIds.filter((id) => state[id]).length,
      total: checklistIds.length,
    }),
    [state],
  );

  return <ChecklistContext.Provider value={value}>{children}</ChecklistContext.Provider>;
}

function useChecklist() {
  const context = useContext(ChecklistContext);
  if (!context) throw new Error("Чек-лист должен находиться внутри ChecklistProvider");
  return context;
}

export function ChecklistToggle({ id, label }: { id: ChecklistId; label: string }) {
  const { state, toggle } = useChecklist();
  const checked = Boolean(state[id]);

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={checked ? `Отметить пункт «${label}» невыполненным` : `Отметить пункт «${label}» выполненным`}
      onClick={() => toggle(id)}
      className={cn(
        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
        checked ? "border-white bg-white text-black" : "border-zinc-400 bg-transparent text-transparent hover:border-white",
      )}
    >
      <Check className="h-4 w-4" strokeWidth={2.5} />
    </button>
  );
}

export function ChecklistProgress({ compact = false }: { compact?: boolean }) {
  const { completed, total } = useChecklist();
  const percent = Math.round((completed / total) * 100);

  return (
    <div className={compact ? "min-w-32" : "w-full"}>
      <div className="mb-2 flex items-center justify-between gap-3 text-xs">
        <span className="text-zinc-200">Готово</span>
        <span className="font-mono font-semibold text-white">{completed}/{total}</span>
      </div>
      <div className="h-1 bg-zinc-500" role="progressbar" aria-label={`Выполнено ${percent}%`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
        <div className="h-full bg-white transition-[width] duration-300" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
