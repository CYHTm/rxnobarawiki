"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export function LactCalculator() {
  const [voltage, setVoltage] = useState(1125);

  const estimate = useMemo(() => {
    const belowReference = 1150 - voltage;
    const belowStart = Math.max(0, 1125 - voltage);

    if (voltage >= 1125) {
      return {
        level: "Безопасная отправная точка",
        advice: "Сохрани профиль и проверь тяжелую игру 15-30 минут.",
        tone: "safe" as const,
        test: "15-30 мин",
        belowReference,
        belowStart,
      };
    }

    if (voltage >= 1090) {
      return {
        level: "Только после стабильного старта",
        advice: "Понижай по 10-15 мВ и каждый раз повторяй один и тот же тест.",
        tone: "careful" as const,
        test: "30+ мин",
        belowReference,
        belowStart,
      };
    }

    return {
      level: "Зона повышенного риска",
      advice: "Для первой попытки слишком низко. Артефакты и сброс драйвера вполне реальны.",
      tone: "danger" as const,
      test: "не стартовать",
      belowReference,
      belowStart,
    };
  }, [voltage]);

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-gradient-to-br from-white/[0.055] to-transparent">
      <div className="p-5 sm:p-7">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div className="max-w-md">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-200">Интерактивный ориентир</div>
            <h3 className="mt-2 text-xl font-semibold text-white">Прикидка андервольта</h3>
            <p className="mt-2 leading-7 text-zinc-300">Двигай ползунок, чтобы увидеть уровень осторожности. Это план теста, а не обещание температуры и ватт.</p>
          </div>
          <div className="shrink-0 sm:text-right">
            <div className="font-mono text-4xl font-semibold tracking-[-0.05em] text-white">{voltage}<span className="ml-2 text-base tracking-normal text-zinc-400">мВ</span></div>
            <div className={cn(
              "mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
              estimate.tone === "safe" && "border-emerald-300/20 bg-emerald-300/8 text-emerald-100",
              estimate.tone === "careful" && "border-amber-300/20 bg-amber-300/8 text-amber-100",
              estimate.tone === "danger" && "border-red-300/20 bg-red-300/8 text-red-100",
            )}>
              {estimate.level}
            </div>
          </div>
        </div>

        <input
          aria-label="Напряжение RX 580"
          type="range"
          min="1065"
          max="1150"
          step="5"
          value={voltage}
          onChange={(event) => setVoltage(Number(event.target.value))}
          className="mt-8 w-full"
        />
        <div className="mt-3 flex justify-between font-mono text-[10px] text-zinc-500">
          <span>1065 - риск</span>
          <span>1125 - старт</span>
          <span>1150</span>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <Metric value={`-${estimate.belowReference} мВ`} label="от ориентира 1150 мВ" />
          <Metric value={`-${estimate.belowStart} мВ`} label="ниже первого теста" />
          <Metric value={estimate.test} label="один цикл проверки" />
        </div>
        <p className="mt-5 rounded-2xl bg-black/15 px-4 py-3 text-sm leading-6 text-zinc-300">{estimate.advice}</p>
      </div>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-black/10 p-4">
      <div className="font-mono text-lg font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs leading-5 text-zinc-400">{label}</div>
    </div>
  );
}
