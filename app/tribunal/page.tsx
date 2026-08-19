import type { Metadata } from "next";
import { TribunalApp } from "@/components/tribunal/TribunalApp";

export const metadata: Metadata = {
  title: "Линуксовый трибунал - дело №43",
  description: "Интерактивное дело о Windows 11, Nobara, RX 580 и привычке твоего ПК работать ровно до первого гениального твика.",
};

export default function TribunalPage() {
  return <TribunalApp />;
}
