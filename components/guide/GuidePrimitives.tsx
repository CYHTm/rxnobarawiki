"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, CornerDownRight, Info, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GuideScreenProps {
  id: string;
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function GuideScreen({ id, number, title, description, children }: GuideScreenProps) {
  return (
    <section id={id} className="guide-screen" aria-labelledby={`${id}-title`}>
      <motion.header
        initial={{ opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.8 }}
        className="guide-screen-hero"
      >
        <div className="guide-screen-orbit" aria-hidden="true">
          <span>{number}</span>
        </div>
        <div className="relative z-10 max-w-4xl">
          <p className="guide-screen-kicker">Раздел {number}</p>
          <h1 id={`${id}-title`} className="guide-screen-title">{title}</h1>
          <p className="guide-screen-description">{description}</p>
        </div>
      </motion.header>
      <div className="steps-flow">{children}</div>
    </section>
  );
}

interface StepBlockProps {
  id: string;
  title: string;
  children: React.ReactNode;
  status?: string;
}

export function StepBlock({ id, title, children, status }: StepBlockProps) {
  return (
    <motion.article
      id={`action-${id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 190, damping: 26, delay: 0.06 }}
      className="m3-step scroll-mt-28"
    >
      <div className="m3-step-accent" aria-hidden="true">
        <CornerDownRight />
      </div>
      <div className="m3-step-content">
        <header className="m3-step-header">
          <h2>{title}</h2>
          {status && <span className="m3-status-chip">{status}</span>}
        </header>
        <div className="guide-copy">{children}</div>
      </div>
    </motion.article>
  );
}

export function SupportPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Accordion.Root type="single" collapsible className="support-root">
      <Accordion.Item value="details" className="support-item">
        <Accordion.Header>
          <Accordion.Trigger className="support-trigger">
            <span className="support-trigger-icon" aria-hidden="true"><Info /></span>
            <span>{title}</span>
            <ChevronDown className="support-chevron" aria-hidden="true" />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="support-content">
          <div className="support-content-inner">{children}</div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export function Code({ children }: { children: React.ReactNode }) {
  return <code className="inline-code">{children}</code>;
}

export function Settings({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("m3-settings-list", className)}>{children}</div>;
}

export function Setting({ label, value }: { label: string; value: string }) {
  return (
    <div className="m3-setting-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <aside className="m3-warning">
      <span className="m3-warning-icon" aria-hidden="true"><ShieldAlert /></span>
      <div><strong>Сначала без резких движений.</strong> {children}</div>
    </aside>
  );
}

export function Term({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="term-card">
      <dt>{name}</dt>
      <dd>{children}</dd>
    </div>
  );
}
