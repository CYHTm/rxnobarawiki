"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Settings2, Type, X } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TextScale = "small" | "normal" | "large";

interface TypographyContextValue {
  scale: TextScale;
  setScale: (scale: TextScale) => void;
}

const TypographyContext = createContext<TypographyContextValue | null>(null);
const storageKey = "rx-nobara-text-scale";

const options: { value: TextScale; label: string; previewClass: string }[] = [
  { value: "small", label: "Меньше", previewClass: "text-sm" },
  { value: "normal", label: "Нормально", previewClass: "text-lg" },
  { value: "large", label: "Крупнее", previewClass: "text-2xl" },
];

export function TypographyProvider({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState<TextScale>("normal");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(storageKey);
    } catch {
      // Настройка продолжит работать в текущей вкладке, даже если хранилище отключено.
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

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn("typography-trigger", compact && "typography-trigger-compact")}
          aria-label="Настроить размер текста"
        >
          <Settings2 aria-hidden="true" />
          {!compact && <span>Настройки</span>}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-sheet typography-sheet">
          <div className="dialog-handle" aria-hidden="true" />
          <div className="dialog-heading">
            <div className="dialog-heading-icon"><Type aria-hidden="true" /></div>
            <div>
              <Dialog.Title className="dialog-title">Размер текста</Dialog.Title>
              <Dialog.Description className="dialog-description">Три режима для чтения с монитора. Выбор сохранится только в этом браузере.</Dialog.Description>
            </div>
          </div>
          <div className="typography-options" role="group" aria-label="Размер текста">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setScale(option.value)}
                data-active={scale === option.value || undefined}
                aria-pressed={scale === option.value}
              >
                <span className={option.previewClass}>Aa</span>
                <strong>{option.label}</strong>
              </button>
            ))}
          </div>
          <p className="typography-note">Другие настройки и состояние гайда в LocalStorage не записываются.</p>
          <Dialog.Close asChild>
            <button type="button" className="dialog-close" aria-label="Закрыть настройки"><X aria-hidden="true" /></button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
