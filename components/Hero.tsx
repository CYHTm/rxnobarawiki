"use client";

import { motion } from "framer-motion";
import { ArrowDown, Cpu, HardDrive, MemoryStick, Monitor, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import heroImage from "@/public/hero-rig.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpecChip } from "@/components/SpecChip";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-white/[0.06]">
      <div className="absolute inset-0">
        <Image src={heroImage} alt="Темный игровой стол с компьютером и двумя мониторами" fill priority className="object-cover object-[62%_center] opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#070a12_0%,rgba(7,10,18,.94)_34%,rgba(7,10,18,.55)_66%,rgba(7,10,18,.8)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070a12] via-transparent to-[#070a12]/30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-3xl">
          <div className="flex flex-wrap gap-2">
            <Badge variant="success"><Sparkles className="h-3 w-3" /> Полный гайд</Badge>
            <Badge variant="neutral">Nobara 43</Badge>
            <Badge variant="neutral">KDE Plasma 6</Badge>
            <Badge variant="neutral">Wayland</Badge>
          </div>

          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
            Превращаем RX 580 в <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">стрим-машину</span>, а не обогреватель
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Кентский маршрут по Nobara Linux 43: обновления без суицида пакетной базы, два монитора без дерготни, LACT без дыма, игры без шаманского бубна и OBS без убийства Ryzen 5 2600.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#start">
                Начать настройку
                <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#lact">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Сразу к RX 580
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.6 }}
          className="mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          <SpecChip icon={Cpu} label="Процессор" value="Ryzen 5 2600" />
          <SpecChip icon={MemoryStick} label="Видеокарта" value="RX 580 8 ГБ" />
          <SpecChip icon={HardDrive} label="Память и диск" value="16 ГБ / NVMe 512" />
          <SpecChip icon={Monitor} label="Мониторы" value="165 + 60 Гц" />
        </motion.div>
      </div>
    </section>
  );
}
