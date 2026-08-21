"use client";

import { Copy, TerminalSquare } from "lucide-react";
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
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className={cn("code-shell", className)}>
      <div className="code-toolbar">
        <span><TerminalSquare aria-hidden="true" />{label}</span>
        <button type="button" onClick={copy} data-copied={copied || undefined} aria-label="Скопировать команду">
          <Copy aria-hidden="true" />
          {copied ? "Скопировано" : "Копировать"}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}
