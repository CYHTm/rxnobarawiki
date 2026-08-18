"use client";

import { TypographyProvider } from "@/components/TypographySettings";

export function Providers({ children }: { children: React.ReactNode }) {
  return <TypographyProvider>{children}</TypographyProvider>;
}
