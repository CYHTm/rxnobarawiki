"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Grid2X2, House, X } from "lucide-react";
import Link from "next/link";
import { TypographySettings, useLightweightMode } from "@/components/TypographySettings";
import { SourcesDialog } from "@/components/guide/SourcesDialog";
import { getGuideScreen, guideScreens } from "@/components/guide/guide-map";
import { getNeighborScreen, openGuideScreen } from "@/components/guide/guide-navigation";
import { useGuideStore } from "@/components/guide/guide-store";

export function DesktopRail() {
  const active = useGuideStore((state) => state.activeScreen);
  const reduceMotion = useReducedMotion();
  const lightweightMode = useLightweightMode();
  const simpleMotion = Boolean(reduceMotion || lightweightMode);

  return (
    <Tooltip.Provider delayDuration={350}>
      <aside className="desktop-rail">
        <Link href="/" className="rail-brand" aria-label="Вернуться на приветственный экран">
          <span className="rail-brand-mark">N</span>
          <span>NOBARA</span>
        </Link>
        <nav aria-label="Экраны гайда" className="rail-navigation">
          {guideScreens.map((screen) => {
            const Icon = screen.icon;
            const selected = screen.id === active;
            return (
              <Tooltip.Root key={screen.id}>
                <Tooltip.Trigger asChild>
                  <button
                    type="button"
                    onClick={() => openGuideScreen(screen.id)}
                    className="rail-item"
                    data-active={selected || undefined}
                    aria-current={selected ? "page" : undefined}
                  >
                    <span className="rail-icon" data-tone={screen.tone}>
                      {selected && (simpleMotion ? (
                        <span className="rail-active-shape" />
                      ) : (
                        <motion.span layoutId="rail-active" className="rail-active-shape" transition={{ type: "spring", stiffness: 360, damping: 30 }} />
                      ))}
                      <Icon aria-hidden="true" />
                    </span>
                    <span>{screen.shortLabel}</span>
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content side="right" sideOffset={12} className="tooltip-content">
                    {screen.number} · {screen.title}
                    <Tooltip.Arrow className="tooltip-arrow" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            );
          })}
        </nav>
        <div className="rail-footer">
          <SourcesDialog compact />
          <TypographySettings compact />
        </div>
      </aside>
    </Tooltip.Provider>
  );
}

export function GuideTopBar() {
  const active = useGuideStore((state) => state.activeScreen);
  const reduceMotion = useReducedMotion();
  const lightweightMode = useLightweightMode();
  const simpleMotion = Boolean(reduceMotion || lightweightMode);
  const meta = getGuideScreen(active);
  const Icon = meta.icon;

  return (
    <header className="guide-topbar">
      <div className="topbar-current" data-tone={meta.tone}>
        <span><Icon aria-hidden="true" /></span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={meta.id}
            initial={simpleMotion ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={simpleMotion ? undefined : { opacity: 0, y: -5 }}
            transition={simpleMotion ? { duration: 0 } : undefined}
          >
            <small>{meta.id === "overview" ? "Стартовый экран" : `Раздел ${meta.number}`}</small>
            <strong>{meta.title}</strong>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="topbar-actions">
        <SourcesDialog />
        <TypographySettings />
      </div>
    </header>
  );
}

export function ScreenPager() {
  const active = useGuideStore((state) => state.activeScreen);
  const previous = getNeighborScreen(active, -1);
  const next = getNeighborScreen(active, 1);
  const previousMeta = previous ? getGuideScreen(previous) : null;
  const nextMeta = next ? getGuideScreen(next) : null;

  return (
    <nav className="screen-pager" aria-label="Переход между экранами">
      {previousMeta ? (
        <button type="button" onClick={() => openGuideScreen(previousMeta.id)} className="pager-button pager-previous">
          <ArrowLeft aria-hidden="true" />
          <span><small>Назад</small><strong>{previousMeta.shortLabel}</strong></span>
        </button>
      ) : <span />}
      {nextMeta ? (
        <button type="button" onClick={() => openGuideScreen(nextMeta.id)} className="pager-button pager-next">
          <span><small>Дальше</small><strong>{nextMeta.shortLabel}</strong></span>
          <ArrowRight aria-hidden="true" />
        </button>
      ) : (
        <button type="button" onClick={() => openGuideScreen("overview")} className="pager-button pager-next">
          <span><small>Вернуться</small><strong>К карте</strong></span>
          <House aria-hidden="true" />
        </button>
      )}
    </nav>
  );
}

export function MobileDock() {
  const active = useGuideStore((state) => state.activeScreen);
  const navigationOpen = useGuideStore((state) => state.navigationOpen);
  const setNavigationOpen = useGuideStore((state) => state.setNavigationOpen);
  const previous = getNeighborScreen(active, -1);
  const next = getNeighborScreen(active, 1);
  const meta = getGuideScreen(active);

  return (
    <>
      <nav className="mobile-dock" aria-label="Навигация по гайду">
        <button type="button" onClick={() => previous && openGuideScreen(previous)} disabled={!previous} aria-label="Предыдущий экран">
          <ArrowLeft aria-hidden="true" />
          <span>Назад</span>
        </button>
        <button type="button" onClick={() => setNavigationOpen(true)} className="mobile-sections-button" aria-label="Открыть все разделы">
          <Grid2X2 aria-hidden="true" />
          <span>{meta.shortLabel}</span>
        </button>
        <button type="button" onClick={() => next ? openGuideScreen(next) : openGuideScreen("overview")} aria-label={next ? "Следующий экран" : "Вернуться к карте"}>
          {next ? <ArrowRight aria-hidden="true" /> : <House aria-hidden="true" />}
          <span>{next ? "Дальше" : "К карте"}</span>
        </button>
      </nav>

      <Dialog.Root open={navigationOpen} onOpenChange={setNavigationOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-sheet mobile-navigation-sheet">
            <div className="dialog-handle" aria-hidden="true" />
            <Dialog.Title className="dialog-title">Все экраны</Dialog.Title>
            <Dialog.Description className="dialog-description">Выбери тему. Каждый раздел откроется как отдельный экран.</Dialog.Description>
            <div className="mobile-screen-grid">
              {guideScreens.map((screen) => {
                const Icon = screen.icon;
                return (
                  <button
                    key={screen.id}
                    type="button"
                    onClick={() => openGuideScreen(screen.id)}
                    data-active={active === screen.id || undefined}
                    data-tone={screen.tone}
                  >
                    <span><Icon aria-hidden="true" /></span>
                    <small>{screen.number}</small>
                    <strong>{screen.shortLabel}</strong>
                  </button>
                );
              })}
            </div>
            <div className="mobile-navigation-actions">
              <SourcesDialog />
              <TypographySettings />
            </div>
            <Dialog.Close asChild>
              <button type="button" className="dialog-close" aria-label="Закрыть меню"><X aria-hidden="true" /></button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
