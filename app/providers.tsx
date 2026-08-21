"use client";

import { PreferencesProvider } from "@/components/TypographySettings";

export function Providers({ children }: { children: React.ReactNode }) {
  return <PreferencesProvider>{children}</PreferencesProvider>;
}
