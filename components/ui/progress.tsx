import { cn } from "@/lib/utils";

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div
      className={cn("h-2 overflow-hidden rounded-full bg-white/[0.08]", className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
      aria-label={`Прогресс настройки: ${Math.round(value)}%`}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-400 to-emerald-400 transition-[width] duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
