"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { useLightweightMode } from "@/components/TypographySettings";
import { DesktopRail, GuideTopBar, MobileDock, ScreenPager } from "@/components/guide/GuideNavigation";
import { getGuideScreen } from "@/components/guide/guide-map";
import { openGuideScreen } from "@/components/guide/guide-navigation";
import { isGuideScreenId, useGuideStore } from "@/components/guide/guide-store";
import { BootScreen } from "@/components/guide/screens/BootScreen";
import { DisplayScreen } from "@/components/guide/screens/DisplayScreen";
import { DualBootScreen } from "@/components/guide/screens/DualBootScreen";
import { GamesScreen } from "@/components/guide/screens/GamesScreen";
import { LactScreen } from "@/components/guide/screens/LactScreen";
import { ObsScreen } from "@/components/guide/screens/ObsScreen";
import { OverviewScreen } from "@/components/guide/screens/OverviewScreen";
import { SystemScreen } from "@/components/guide/screens/SystemScreen";

const screenComponents = {
  overview: OverviewScreen,
  before: BootScreen,
  start: SystemScreen,
  display: DisplayScreen,
  lact: LactScreen,
  games: GamesScreen,
  obs: ObsScreen,
  dualboot: DualBootScreen,
};

const variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 54, y: 12, filter: "blur(10px)", scale: 0.985 }),
  center: { opacity: 1, x: 0, y: 0, filter: "blur(0px)", scale: 1 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -38, y: -8, filter: "blur(8px)", scale: 0.99 }),
};

export function GuideApp() {
  const active = useGuideStore((state) => state.activeScreen);
  const direction = useGuideStore((state) => state.direction);
  const reduceMotion = useReducedMotion();
  const lightweightMode = useLightweightMode();
  const simpleMotion = Boolean(reduceMotion || lightweightMode);
  const ActiveScreen = screenComponents[active];
  const meta = getGuideScreen(active);

  useEffect(() => {
    const syncFromAddress = () => {
      const hash = window.location.hash.slice(1);
      if (isGuideScreenId(hash)) openGuideScreen(hash, "none");
      else openGuideScreen("overview", "replace");
    };

    const frame = window.requestAnimationFrame(syncFromAddress);
    window.addEventListener("popstate", syncFromAddress);
    window.addEventListener("hashchange", syncFromAddress);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("popstate", syncFromAddress);
      window.removeEventListener("hashchange", syncFromAddress);
    };
  }, []);

  return (
    <div className="guide-app" data-tone={meta.tone}>
      <div className="guide-ambient" aria-hidden="true"><span /><span /><span /></div>
      <DesktopRail />
      <div className="guide-workspace">
        <GuideTopBar />
        <main className="guide-stage" tabIndex={-1}>
          {simpleMotion ? (
            <div key={active} className="guide-scene">
              <ActiveScreen />
              <ScreenPager />
            </div>
          ) : (
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 185, damping: 25, mass: 0.78 }}
                className="guide-scene"
              >
                <ActiveScreen />
                <ScreenPager />
              </motion.div>
            </AnimatePresence>
          )}
        </main>
      </div>
      <MobileDock />
    </div>
  );
}
