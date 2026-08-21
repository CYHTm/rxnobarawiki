"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Gauge, Settings2, Type, X, Zap } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TextScale = "small" | "normal" | "large";

interface PreferencesContextValue {
  scale: TextScale;
  setScale: (scale: TextScale) => void;
  lightweightMode: boolean;
  setLightweightMode: (enabled: boolean) => void;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);
const storageKey = "rx-nobara-text-scale";

const options: { value: TextScale; label: string; previewClass: string }[] = [
  { value: "small", label: "Меньше", previewClass: "text-sm" },
  { value: "normal", label: "Нормально", previewClass: "text-lg" },
  { value: "large", label: "Крупнее", previewClass: "text-2xl" },
];

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState<TextScale>("normal");
  const [lightweightMode, setLightweightMode] = useState(false);

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

  useEffect(() => {
    document.documentElement.dataset.performance = lightweightMode ? "lite" : "full";
  }, [lightweightMode]);

  return (
    <PreferencesContext.Provider value={{ scale, setScale, lightweightMode, setLightweightMode }}>
      {children}
    </PreferencesContext.Provider>
  );
}

function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("Настройки сайта должны находиться внутри PreferencesProvider");
  return value;
}

export function useLightweightMode() {
  return usePreferences().lightweightMode;
}

export function TypographySettings({ compact = false }: { compact?: boolean }) {
  const { scale, setScale, lightweightMode, setLightweightMode } = usePreferences();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn("typography-trigger", compact && "typography-trigger-compact")}
          aria-label="Открыть настройки сайта"
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
            <div className="dialog-heading-icon"><Gauge aria-hidden="true" /></div>
            <div>
              <Dialog.Title className="dialog-title">Настройки сайта</Dialog.Title>
              <Dialog.Description className="dialog-description">Подстрой чтение и нагрузку под свой экран и железо.</Dialog.Description>
            </div>
          </div>

          <section className="settings-section" aria-labelledby="text-size-title">
            <div className="settings-section-heading">
              <Type aria-hidden="true" />
              <div>
                <h2 id="text-size-title">Размер текста</h2>
                <p>Выбор сохранится только в этом браузере.</p>
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
          </section>

          <section className="settings-section performance-section" aria-labelledby="performance-title">
            <div className="performance-option" data-active={lightweightMode || undefined}>
              <div className="performance-icon" aria-hidden="true"><Zap /></div>
              <div className="performance-copy">
                <h2 id="performance-title">Облегченный режим</h2>
                <p>Для слабых ПК и ноутов. Убирает размытия, тяжелые тени, фоновые эффекты и почти все движение.</p>
                <span>{lightweightMode ? "Включен. Видеочип наконец перестал изображать фен." : "Сейчас работает полный визуальный режим."}</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={lightweightMode}
                aria-label="Облегченный режим"
                className="performance-switch"
                onClick={() => setLightweightMode(!lightweightMode)}
              >
                <span aria-hidden="true" />
              </button>
            </div>
          </section>

          <p className="typography-note">Облегченный режим действует до обновления страницы. В LocalStorage по-прежнему записывается только размер текста.</p>
          <Dialog.Close asChild>
            <button type="button" className="dialog-close" aria-label="Закрыть настройки"><X aria-hidden="true" /></button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
