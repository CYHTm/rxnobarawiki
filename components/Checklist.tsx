"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, ClipboardCheck, RotateCcw, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const tasks = [
  "Запустил Nobara Welcome",
  "Обновил систему через nobara-sync",
  "Ответил YES на Media Codecs",
  "Поставил нужные приложения как Flatpak User",
  "Выставил герцовку обоих мониторов",
  "Проверил Adaptive Sync Automatic или Never",
  "Включил профиль мыши Flat",
  "Отключил Baloo, если индексатор не нужен",
  "Подключил игровые диски через Drive Mount Manager",
  "Установил LACT и включил lactd",
  "Прогнал андервольт RX 580 тестами",
  "Настроил PortProton и отдельные префиксы",
  "Выбрал VAAPI H.264 в OBS",
  "Развел звук приложений через PipeWire",
  "Перевел Windows RTC в UTC",
  "Проверил GRUB и сделал финальную перезагрузку",
];

const storageKey = "rx-nobara-checklist-v1";

export function Checklist() {
  const [checked, setChecked] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) setChecked(JSON.parse(saved) as string[]);
      } catch {
        window.localStorage.removeItem(storageKey);
      }
      setReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(storageKey, JSON.stringify(checked));
  }, [checked, ready]);

  const progress = useMemo(() => (checked.length / tasks.length) * 100, [checked]);

  function toggle(task: string) {
    setChecked((current) =>
      current.includes(task) ? current.filter((item) => item !== task) : [...current, task],
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[min(390px,calc(100vw-2rem))]">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.aside
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="overflow-hidden rounded-2xl border border-indigo-400/20 bg-slate-950/95 shadow-2xl shadow-black/60 backdrop-blur-2xl"
            aria-label="Чек-лист настройки"
          >
            <div className="border-b border-white/[0.08] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-sm font-black text-white">
                    <ClipboardCheck className="h-4 w-4 text-emerald-400" />
                    Боевой чек-лист
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {checked.length} из {tasks.length}. Прогресс живет в этом браузере.
                  </p>
                </div>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(false)} aria-label="Свернуть чек-лист">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <Progress value={progress} className="flex-1" />
                <span className="text-xs font-black text-emerald-300">{Math.round(progress)}%</span>
              </div>
            </div>

            <div className="max-h-[min(54vh,440px)] space-y-1 overflow-y-auto p-2">
              {tasks.map((task) => {
                const done = checked.includes(task);
                return (
                  <label
                    key={task}
                    className="flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
                  >
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => toggle(task)}
                      className="peer sr-only"
                    />
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/[0.03] peer-checked:border-emerald-400/40 peer-checked:bg-emerald-400/15">
                      {done && <Check className="h-3.5 w-3.5 text-emerald-300" />}
                    </span>
                    <span className={done ? "text-sm leading-5 text-slate-500 line-through" : "text-sm leading-5 text-slate-300"}>
                      {task}
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.08] p-3">
              <Button type="button" variant="ghost" size="sm" onClick={() => setChecked([])} disabled={checked.length === 0}>
                <RotateCcw className="h-3.5 w-3.5" />
                Сбросить
              </Button>
              <Button type="button" variant="success" size="sm" onClick={() => setOpen(false)}>
                <ChevronDown className="h-3.5 w-3.5" />
                Свернуть
              </Button>
            </div>
          </motion.aside>
        ) : (
          <motion.div
            key="trigger"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="ml-auto w-fit"
          >
            <Button type="button" size="lg" onClick={() => setOpen(true)} className="rounded-2xl border border-indigo-300/20 bg-indigo-500/95 shadow-2xl shadow-indigo-950/50">
              <ClipboardCheck className="h-5 w-5" />
              Чек-лист
              <span className="rounded-lg bg-black/20 px-2 py-1 text-xs">{Math.round(progress)}%</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
