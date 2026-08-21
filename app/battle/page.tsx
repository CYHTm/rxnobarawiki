import type { Metadata } from "next";
import { BattleApp } from "@/components/battle/BattleApp";

export const metadata: Metadata = {
  title: "Windows 11 vs Nobara - бой за ПК Жеки",
  description: "Последовательный интерактивный бой Windows 11 и Nobara Linux за место основной системы на твоем ПК.",
};

export default function BattlePage() {
  return <BattleApp />;
}
