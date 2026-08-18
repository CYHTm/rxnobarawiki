import type { LucideIcon } from "lucide-react";

export function SpecChip({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="group rounded-2xl border border-white/[0.08] bg-black/20 p-4 transition-colors hover:border-emerald-400/20 hover:bg-emerald-400/[0.04]">
      <Icon className="mb-3 h-4 w-4 text-emerald-400" />
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-bold text-slate-100">{value}</div>
    </div>
  );
}
