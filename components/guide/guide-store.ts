"use client";

import { create } from "zustand";

export type GuideScreenId =
  | "overview"
  | "before"
  | "start"
  | "display"
  | "lact"
  | "games"
  | "obs"
  | "dualboot"
  | "devices"
  | "rescue";

export const guideScreenIds: GuideScreenId[] = [
  "overview",
  "before",
  "start",
  "display",
  "lact",
  "games",
  "obs",
  "dualboot",
  "devices",
  "rescue",
];

interface GuideState {
  activeScreen: GuideScreenId;
  direction: 1 | -1;
  navigationOpen: boolean;
  setActiveScreen: (screen: GuideScreenId) => void;
  setNavigationOpen: (open: boolean) => void;
}

export const useGuideStore = create<GuideState>((set, get) => ({
  activeScreen: "overview",
  direction: 1,
  navigationOpen: false,
  setActiveScreen: (screen) => {
    const currentIndex = guideScreenIds.indexOf(get().activeScreen);
    const nextIndex = guideScreenIds.indexOf(screen);
    set({
      activeScreen: screen,
      direction: nextIndex >= currentIndex ? 1 : -1,
      navigationOpen: false,
    });
  },
  setNavigationOpen: (open) => set({ navigationOpen: open }),
}));

export function isGuideScreenId(value: string): value is GuideScreenId {
  return guideScreenIds.includes(value as GuideScreenId);
}
