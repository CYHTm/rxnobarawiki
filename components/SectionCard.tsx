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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="scroll-mt-28 py-16 sm:py-24"
    >
      <header className="mb-10 sm:mb-14">
        <span className="font-mono text-xs font-semibold tracking-[0.18em] text-cyan-200">РАЗДЕЛ {number}</span>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl">{title}</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">{description}</p>
      </header>
      <div className="space-y-6 sm:space-y-8">{children}</div>
    </motion.section>
  );
}
