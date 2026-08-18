import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  text: React.ReactNode;
}

export function StepList({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol className={cn("space-y-3", className)}>
      {steps.map((step, index) => (
        <li key={step.title} className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-xs font-black text-indigo-300">
            {index + 1}
          </span>
          <div>
            <p className="flex items-center gap-2 text-sm font-bold text-slate-100">
              {step.title}
              {index === steps.length - 1 && <Check className="h-3.5 w-3.5 text-emerald-400" />}
            </p>
            <div className="mt-1 text-sm leading-6 text-slate-400">{step.text}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
