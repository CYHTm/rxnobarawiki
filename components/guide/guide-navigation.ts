"use client";

import { getGuideScreen } from "@/components/guide/guide-map";
import { guideScreenIds, type GuideScreenId, useGuideStore } from "@/components/guide/guide-store";

export function openGuideScreen(screen: GuideScreenId, history: "push" | "replace" | "none" = "push") {
  useGuideStore.getState().setActiveScreen(screen);

  if (typeof window !== "undefined" && history !== "none") {
    const url = `${window.location.pathname}${window.location.search}#${screen}`;
    if (history === "replace") window.history.replaceState({ screen }, "", url);
    else window.history.pushState({ screen }, "", url);
  }

  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = `${getGuideScreen(screen).title} - NOBARA / ТВОЙ ПК`;
  }
}

export function getNeighborScreen(screen: GuideScreenId, offset: -1 | 1) {
  const current = guideScreenIds.indexOf(screen);
  const next = current + offset;
  return next >= 0 && next < guideScreenIds.length ? guideScreenIds[next] : null;
}
