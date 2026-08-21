import type { Metadata } from "next";
import { GuideApp } from "@/components/guide/GuideApp";

export const metadata: Metadata = {
  title: "Гайд - NOBARA / ТВОЙ ПК",
  description: "Двенадцать отдельных экранов настройки, штатной оптимизации, измеримых экспериментов и восстановления уже установленной Nobara Linux 43 на твоем ПК.",
};

export default function GuidePage() {
  return <GuideApp />;
}
