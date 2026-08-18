"use client";

import { Gauge, ThermometerSun, TimerReset, Zap } from "lucide-react";
import { useMemo, useState } from "react";

export function LactCalculator() {
  const [voltage, setVoltage] = useState(1125);

  const estimate = useMemo(() => {
    const belowReference = 1150 - voltage;
    const belowStart = Math.max(0, 1125 - voltage);

    if (voltage >= 1125) {
      return {
        level: "Нормальная отправная точка",
        advice: "Сохрани профиль и проверь тяжелую игру 15-30 минут.",
        tone: "safe",
        test: "15-30 мин",
        belowReference,
        belowStart,
      } as const;
    }

    if (voltage >= 1090) {
      return {
        level: "Только после стабильного старта",
        advice: "Понижай по 10-15 мВ и каждый раз повторяй один и тот же тест.",
        tone: "careful",
        test: "30+ мин",
        belowReference,
        belowStart,
      } as const;
    }

    return {
      level: "Зона повышенного риска",
      advice: "Для первой попытки слишком низко. Артефакты и сброс драйвера вполне реальны.",
      tone: "danger",
      test: "не стартовать",
      belowReference,
      belowStart,
    } as const;
  }, [voltage]);

  return (
    <section className="lact-calculator" data-risk={estimate.tone} aria-labelledby="calculator-title">
      <div className="calculator-heading">
        <div className="calculator-heading-icon"><Gauge aria-hidden="true" /></div>
        <div>
          <span>Интерактивный ориентир</span>
          <h3 id="calculator-title">Прикидка андервольта</h3>
          <p>Это план проверки стабильности, а не гадалка по температуре и ваттам.</p>
        </div>
      </div>

      <div className="calculator-value">
        <strong>{voltage}</strong><span>мВ</span>
        <small>{estimate.level}</small>
      </div>

      <div className="calculator-range-wrap">
        <input
          aria-label="Напряжение RX 580"
          type="range"
          min="1065"
          max="1150"
          step="5"
          value={voltage}
          onChange={(event) => setVoltage(Number(event.target.value))}
        />
        <div><span>1065 · риск</span><span>1125 · старт</span><span>1150</span></div>
      </div>

      <div className="calculator-metrics">
        <Metric icon={Zap} value={`-${estimate.belowReference} мВ`} label="от ориентира 1150 мВ" />
        <Metric icon={ThermometerSun} value={`-${estimate.belowStart} мВ`} label="ниже первого теста" />
        <Metric icon={TimerReset} value={estimate.test} label="один цикл проверки" />
      </div>
      <p className="calculator-advice">{estimate.advice}</p>
    </section>
  );
}

function Metric({ icon: Icon, value, label }: { icon: typeof Zap; value: string; label: string }) {
  return (
    <div className="calculator-metric">
      <Icon aria-hidden="true" />
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
