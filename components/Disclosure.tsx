"use client";

import { ChevronDown } from "lucide-react";

export function Disclosure({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-5 open:border-cyan-200/15 open:bg-cyan-200/[0.035] sm:px-6">
      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 font-semibold text-zinc-100 transition hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
        <span>{title}</span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/10">
          <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
        </span>
      </summary>
      <div className="border-t border-white/[0.08] pb-6 pt-5 leading-7 text-zinc-300">{children}</div>
    </details>
  );
}
