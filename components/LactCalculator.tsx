"use client";

import { Fan, Gauge, Snowflake, TriangleAlert, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function LactCalculator() {
  const [voltage, setVoltage] = useState(1100);

  const estimate = useMemo(() => {
    const ratio = (1150 - voltage) / 85;
    const watts = Math.round(45 * ratio);
    const temperature = Math.round(13 * ratio);
    const label = voltage >= 1125 ? "Разминка" : voltage >= 1090 ? "Золотая середина" : "Silicon lottery";
    const tone = voltage >= 1125 ? "default" : voltage >= 1090 ? "success" : "warning";
    return { watts, temperature, label, tone } as const;
  }, [voltage]);

  return (
    <Card className="overflow-hidden border-emerald-400/15 bg-gradient-to-br from-emerald-400/[0.06] to-slate-950/70 p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
            <Gauge className="h-4 w-4" />
            Калькулятор андервольта
          </div>
          <h3 className="mt-2 text-xl font-black text-white">Сдвинь напряжение, но не здравый смысл</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Модель показывает возможный эффект для RX 580. Это ориентир, а не договор с физикой и твоим конкретным кристаллом.
          </p>
        </div>
        <Badge variant={estimate.tone}>{estimate.label}</Badge>
      </div>

      <div className="mt-7 rounded-2xl border border-white/[0.07] bg-black/20 p-4">
        <div className="flex items-end justify-between">
          <label htmlFor="voltage" className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            Напряжение ядра
          </label>
          <div className="font-mono text-3xl font-black text-white">
            {voltage}<span className="ml-1 text-sm text-emerald-400">мВ</span>
          </div>
        </div>
        <input
          id="voltage"
          type="range"
          min="1065"
          max="1150"
          step="5"
          value={voltage}
          onChange={(event) => setVoltage(Number(event.target.value))}
          className="mt-5 w-full accent-emerald-400"
        />
        <div className="mt-2 flex justify-between font-mono text-[11px] text-slate-600">
          <span>1065 мВ - хардкор</span>
          <span>1150 мВ - сток</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric icon={Zap} value={`до -${estimate.watts} Вт`} label="потребление" />
        <Metric icon={Snowflake} value={`до -${estimate.temperature}°C`} label="температура" />
        <Metric icon={Fan} value="70%" label="на 68°C hotspot" />
        <Metric icon={Gauge} value="15-30 мин" label="тест на шаг" />
      </div>

      <div className="mt-4 flex gap-3 rounded-xl border border-amber-400/15 bg-amber-400/[0.06] p-4 text-sm leading-6 text-slate-300">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
        <p>
          Начни с 1125 мВ и снижай по 10-15 мВ. Артефакты, черный экран или вылет драйвера - верни предыдущий стабильный шаг. Цифры до -45 Вт и -13°C не гарантированы.
        </p>
      </div>
    </Card>
  );
}

function Metric({ icon: Icon, value, label }: { icon: typeof Zap; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
      <Icon className="h-4 w-4 text-emerald-400" />
      <div className="mt-3 text-lg font-black text-white">{value}</div>
      <div className="mt-0.5 text-xs text-slate-500">{label}</div>
    </div>
  );
}
