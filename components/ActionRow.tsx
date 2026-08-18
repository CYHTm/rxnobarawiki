import type { ChecklistId } from "@/components/Checklist";
import { ChecklistToggle } from "@/components/Checklist";
import { CodeSnippet } from "@/components/CodeSnippet";
import { cn } from "@/lib/utils";

interface ActionRowProps {
  id: ChecklistId;
  title: string;
  children: React.ReactNode;
  command?: string;
  commandLabel?: string;
  status?: string;
  danger?: boolean;
}

export function ActionRow({ id, title, children, command, commandLabel, status, danger = false }: ActionRowProps) {
  return (
    <div className="grid grid-cols-[24px_1fr] gap-4 border-t border-zinc-500/60 py-6 first:border-t-0 first:pt-0">
      <ChecklistToggle id={id} label={title} />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-[15px] font-semibold text-white">{title}</h3>
          {status && <span className={cn("font-mono text-[10px] uppercase tracking-wider", danger ? "text-red-200" : "text-zinc-300")}>{status}</span>}
        </div>
        <div className="mt-2 text-sm leading-6 text-zinc-200">{children}</div>
        {command && <CodeSnippet code={command} label={commandLabel} className="mt-4" />}
      </div>
    </div>
  );
}
