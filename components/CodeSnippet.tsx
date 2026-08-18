"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeSnippetProps {
  code: string;
  label?: string;
  className?: string;
}

export function CodeSnippet({ code, label = "Konsole", className }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const area = document.createElement("textarea");
      area.value = code;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-white/10 bg-[#0e1016] shadow-inner shadow-black/30", className)}>
      <div className="flex min-h-12 items-center justify-between border-b border-white/[0.08] px-4 sm:px-5">
        <span className="text-xs font-medium text-zinc-400">{label}</span>
        <button type="button" onClick={copy} className="flex h-9 items-center gap-2 rounded-full px-3 text-xs font-semibold text-zinc-300 transition hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" aria-label="Скопировать команду">
          {copied ? <Check className="h-3.5 w-3.5 text-cyan-200" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Скопировано" : "Копировать"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[0.86rem] leading-7 text-zinc-100 selection:bg-cyan-200 selection:text-black"><code>{code}</code></pre>
    </div>
  );
}
