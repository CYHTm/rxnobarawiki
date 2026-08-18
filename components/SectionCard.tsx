"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  id: string;
  kicker: string;
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
  accent?: "indigo" | "emerald" | "amber";
}

const accents = {
  indigo: {
    icon: "border-indigo-400/20 bg-indigo-400/10 text-indigo-300",
    line: "from-indigo-500/80 via-violet-500/40",
  },
  emerald: {
    icon: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    line: "from-emerald-500/80 via-cyan-500/40",
  },
  amber: {
    icon: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    line: "from-amber-500/80 via-orange-500/40",
  },
};

export function SectionCard({
  id,
  kicker,
  title,
  description,
  icon: Icon,
  children,
  accent = "indigo",
}: SectionCardProps) {
  const colors = accents[accent];

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-white/[0.08] bg-slate-950/55 shadow-2xl shadow-black/20 backdrop-blur-xl"
    >
      <div className={cn("h-px bg-gradient-to-r to-transparent", colors.line)} />
      <div className="p-5 sm:p-7 lg:p-8">
        <div className="mb-7 flex items-start gap-4">
          <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border", colors.icon)}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <Badge variant={accent === "emerald" ? "success" : accent === "amber" ? "warning" : "default"}>
              {kicker}
            </Badge>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">{title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400 sm:text-base">{description}</p>
          </div>
        </div>
        {children}
      </div>
    </motion.section>
  );
}
