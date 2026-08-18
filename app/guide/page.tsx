import type { Metadata } from "next";
import { GuideApp } from "@/components/guide/GuideApp";

export const metadata: Metadata = {
  title: "Гайд - NOBARA / ТВОЙ ПК",
  description: "Восемь отдельных экранов настройки уже установленной Nobara Linux 43.",
};

export default function GuidePage() {
  return <GuideApp />;
}
