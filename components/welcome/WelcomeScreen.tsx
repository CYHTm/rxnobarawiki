"use client";

import { ArrowRight, Cpu, Gamepad2, MonitorUp, RadioTower, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TypographySettings, useLightweightMode } from "@/components/TypographySettings";

const MotionLink = motion.create(Link);

const floatingCards = [
  { icon: Cpu, label: "Ryzen 5 2600", className: "welcome-float-cpu" },
  { icon: Gamepad2, label: "RX 580 · 8 ГБ", className: "welcome-float-gpu" },
  { icon: MonitorUp, label: "75 + 60 Гц", className: "welcome-float-display" },
  { icon: RadioTower, label: "VK Видео Live", className: "welcome-float-stream" },
];

export function WelcomeScreen() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const lightweightMode = useLightweightMode();
  const simpleMotion = Boolean(reduceMotion || lightweightMode);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    router.prefetch("/guide");
  }, [router]);

  function enterGuide() {
    if (leaving) return;
    if (simpleMotion) {
      router.push("/guide");
      return;
    }
    setLeaving(true);
    window.setTimeout(() => router.push("/guide"), 620);
  }

  return (
    <main className="welcome-screen">
      <div className="welcome-noise" aria-hidden="true" />
      <motion.div
        className="welcome-color-field welcome-color-field-one"
        animate={simpleMotion ? { x: 0, y: 0, scale: 1 } : { x: [0, 28, -12, 0], y: [0, -18, 16, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={simpleMotion ? { duration: 0 } : { duration: 16, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="welcome-color-field welcome-color-field-two"
        animate={simpleMotion ? { x: 0, y: 0, scale: 1 } : { x: [0, -24, 15, 0], y: [0, 24, -12, 0], scale: [1, 0.94, 1.06, 1] }}
        transition={simpleMotion ? { duration: 0 } : { duration: 19, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <motion.div
        className="welcome-shell"
        animate={simpleMotion ? { opacity: 1, scale: 1, filter: "none" } : leaving ? { opacity: 0, scale: 0.94, filter: "blur(16px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={simpleMotion ? { duration: 0 } : { duration: 0.44, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <header className="welcome-header">
          <div className="welcome-brand"><span>N</span><strong>NOBARA / ТВОЙ ПК</strong></div>
          <div className="welcome-header-note"><span /> Система уже установлена</div>
        </header>

        <div className="welcome-layout">
          <section className="welcome-copy" aria-labelledby="welcome-title">
            <motion.p initial={simpleMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={simpleMotion ? { duration: 0 } : { delay: 0.08, duration: 0.5 }} className="welcome-eyebrow">
              Добро пожаловать, кент
            </motion.p>
            <motion.h1 id="welcome-title" initial={simpleMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={simpleMotion ? { duration: 0 } : { delay: 0.14, type: "spring", stiffness: 160, damping: 22 }}>
              <span className="welcome-title-small">Настрой</span>
              <span className="welcome-title-shimmer">NOBARA</span>
            </motion.h1>
            <motion.p initial={simpleMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={simpleMotion ? { duration: 0 } : { delay: 0.22, duration: 0.55 }} className="welcome-lead">
              Не еще одна простыня команд, а отдельные экраны для уже установленной системы: загрузка, программы, RX 580, игры, эфир и Windows рядом.
            </motion.p>

            <motion.div initial={simpleMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={simpleMotion ? { duration: 0 } : { delay: 0.3, duration: 0.5 }} className="welcome-actions">
              <MotionLink
                href="/guide"
                onClick={(event) => {
                  event.preventDefault();
                  enterGuide();
                }}
                whileHover={simpleMotion ? undefined : { scale: 1.025 }}
                whileTap={simpleMotion ? undefined : { scale: 0.97 }}
                transition={simpleMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 22 }}
                className="welcome-enter"
              >
                <span>Войти</span>
                <span className="welcome-enter-icon"><ArrowRight aria-hidden="true" /></span>
              </MotionLink>
              <TypographySettings />
            </motion.div>
          </section>

          <motion.section
            initial={simpleMotion ? false : { opacity: 0, scale: 0.88, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={simpleMotion ? { duration: 0 } : { delay: 0.16, type: "spring", stiffness: 120, damping: 18 }}
            className="welcome-visual"
            aria-label="Профиль компьютера"
          >
            <div className="welcome-visual-rings" aria-hidden="true"><span /><span /><span /></div>
            <motion.div
              className="welcome-core"
              animate={simpleMotion ? { borderRadius: "38% 62% 54% 46% / 45% 42% 58% 55%" } : { borderRadius: ["38% 62% 54% 46% / 45% 42% 58% 55%", "55% 45% 36% 64% / 52% 63% 37% 48%", "38% 62% 54% 46% / 45% 42% 58% 55%"] }}
              transition={simpleMotion ? { duration: 0 } : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles aria-hidden="true" />
              <strong>43</strong>
              <span>KDE · WAYLAND</span>
            </motion.div>
            {floatingCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  className={`welcome-float ${card.className}`}
                  animate={simpleMotion ? { y: 0, rotate: 0 } : { y: [0, index % 2 === 0 ? -10 : 9, 0], rotate: [0, index % 2 === 0 ? 1.4 : -1.4, 0] }}
                  transition={simpleMotion ? { duration: 0 } : { duration: 5.5 + index, repeat: Infinity, ease: "easeInOut", delay: index * -0.7 }}
                >
                  <span><Icon aria-hidden="true" /></span>
                  <strong>{card.label}</strong>
                </motion.div>
              );
            })}
          </motion.section>
        </div>

        <footer className="welcome-footer">
          <span>Ryzen 5 2600</span><i />
          <span>RX 580</span><i />
          <span>16 ГБ</span><i />
          <span>Windows 11 рядом</span>
        </footer>
      </motion.div>

      <AnimatePresence>
        {leaving && (
          <motion.div
            className="welcome-transition"
            initial={{ clipPath: "circle(0% at 50% 82%)" }}
            animate={{ clipPath: "circle(150% at 50% 82%)" }}
            transition={{ duration: 0.62, ease: [0.65, 0, 0.35, 1] }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </main>
  );
}
