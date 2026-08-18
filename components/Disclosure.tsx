"use client";

import { ChevronDown } from "lucide-react";

export function Disclosure({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-t border-zinc-500/60 py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-zinc-200 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white">
        {title}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <div className="pt-4 text-sm leading-6 text-zinc-200">{children}</div>
    </details>
  );
}
