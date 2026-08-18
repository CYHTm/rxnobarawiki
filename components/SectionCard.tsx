"use client";

import { motion } from "framer-motion";

interface SectionCardProps {
  id: string;
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function SectionCard({ id, number, title, description, children }: SectionCardProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.3 }}
      className="scroll-mt-24 border-t border-zinc-800 py-12 first:border-t-0 first:pt-0 sm:py-16"
    >
      <div className="mb-9 grid gap-3 sm:grid-cols-[56px_1fr]">
        <span className="font-mono text-xs text-zinc-600">{number}</span>
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-[15px]">{description}</p>
        </div>
      </div>
      <div className="sm:pl-14">{children}</div>
    </motion.section>
  );
}
