"use client";

import { useMemo, useState } from "react";

export function LactCalculator() {
  const [voltage, setVoltage] = useState(1125);

  const estimate = useMemo(() => {
    const ratio = (1150 - voltage) / 85;
    return {
      watts: Math.max(0, Math.round(45 * ratio)),
      temperature: Math.max(0, Math.round(13 * ratio)),
      risk: voltage >= 1125 ? "спокойный старт" : voltage >= 1090 ? "обычно нормально" : "уже лотерея",
    };
  }, [voltage]);

  return (
    <div className="border-y border-zinc-500/60 py-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h3 className="text-[15px] font-semibold text-white">Прикидка андервольта</h3>
          <p className="mt-1 text-sm text-zinc-200">Начни с 1125 мВ. Ниже пойдешь только после нормального теста.</p>
        </div>
        <div className="text-left sm:text-right">
          <div className="font-mono text-3xl font-semibold text-white">{voltage} <span className="text-sm text-zinc-300">мВ</span></div>
          <div className="mt-1 text-xs text-zinc-200">{estimate.risk}</div>
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
        className="mt-7 w-full"
      />
      <div className="mt-2 flex justify-between font-mono text-[10px] text-zinc-300">
        <span>1065</span>
        <span>1150</span>
      </div>

      <div className="mt-6 grid grid-cols-3 border border-zinc-500/60">
        <Metric value={`-${estimate.watts} Вт`} label="в теории" />
        <Metric value={`-${estimate.temperature}°C`} label="в теории" />
        <Metric value="70%" label="вентилятор при 68°C" />
      </div>
      <p className="mt-4 text-xs leading-5 text-zinc-300">
        Это примерный расчет, не обещание. Реальный результат зависит от конкретного экземпляра карты.
      </p>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-r border-zinc-500/60 p-3 last:border-r-0 sm:p-4">
      <div className="font-mono text-sm font-semibold text-white sm:text-base">{value}</div>
      <div className="mt-1 text-[10px] text-zinc-300">{label}</div>
    </div>
  );
}
