import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoBoxProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  tone?: "info" | "success" | "warning" | "danger";
  className?: string;
}

const tones = {
  info: "border-indigo-400/15 bg-indigo-400/[0.07] text-indigo-300",
  success: "border-emerald-400/15 bg-emerald-400/[0.07] text-emerald-300",
  warning: "border-amber-400/15 bg-amber-400/[0.07] text-amber-300",
  danger: "border-rose-400/15 bg-rose-400/[0.07] text-rose-300",
};

export function InfoBox({ icon: Icon, title, children, tone = "info", className }: InfoBoxProps) {
  return (
    <div className={cn("rounded-2xl border p-4", tones[tone], className)}>
      <div className="flex items-center gap-2 text-sm font-bold">
        <Icon className="h-4 w-4 shrink-0" />
        {title}
      </div>
      <div className="mt-2 text-sm leading-6 text-slate-300">{children}</div>
    </div>
  );
}
