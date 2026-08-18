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
    <div className={cn("border border-zinc-500/60 bg-[#303030]", className)}>
      <div className="flex min-h-10 items-center justify-between border-b border-zinc-500/60 px-3">
        <span className="text-[11px] font-medium text-zinc-300">{label}</span>
        <button type="button" onClick={copy} className="flex h-8 items-center gap-2 px-2 text-xs text-zinc-300 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white" aria-label="Скопировать команду">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Готово" : "Копировать"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6 text-white selection:bg-white selection:text-black"><code>{code}</code></pre>
    </div>
  );
}
