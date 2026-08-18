"use client";

import { Check, Clipboard, TerminalSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CodeSnippetProps {
  code: string;
  label?: string;
  className?: string;
}

export function CodeSnippet({ code, label = "Терминал", className }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const area = document.createElement("textarea");
      area.value = code;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border border-white/[0.08] bg-[#070a12]", className)}>
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.025] px-3 py-2">
        <span className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <TerminalSquare className="h-3.5 w-3.5" />
          {label}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={copyCode}
          className="h-7 px-2 text-slate-400"
          aria-label={copied ? "Команда скопирована" : "Скопировать команду"}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Clipboard className="h-3.5 w-3.5" />}
          <span>{copied ? "Скопировано" : "Копировать"}</span>
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-6 text-emerald-300 selection:bg-indigo-500/40">
        <code>{code}</code>
      </pre>
    </div>
  );
}
