import {
  BookOpenText,
  Gamepad2,
  Gauge,
  GitBranch,
  HardDrive,
  MonitorUp,
  PackageOpen,
  RadioTower,
  type LucideIcon,
} from "lucide-react";
import type { GuideScreenId } from "@/components/guide/guide-store";

export interface GuideScreenMeta {
  id: GuideScreenId;
  number: string;
  shortLabel: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  tone: "violet" | "blue" | "mint" | "amber" | "pink" | "lime" | "orange" | "sky";
}

export const guideScreens: GuideScreenMeta[] = [
  {
    id: "overview",
    number: "00",
    shortLabel: "Маршрут",
    title: "Карта твоей Nobara",
    summary: "Что уже установлено, как устроен гайд и какие слова нужно знать до первой команды.",
    icon: BookOpenText,
    tone: "violet",
  },
  {
    id: "before",
    number: "01",
    shortLabel: "Загрузка",
    title: "Проверка dual-boot",
    summary: "Флешка, отдельный /boot, общий EFI и реальное свободное место без повторной установки.",
    icon: HardDrive,
    tone: "blue",
  },
  {
    id: "start",
    number: "02",
    shortLabel: "Система",
    title: "База после установки",
    summary: "Nobara Welcome, правильное обновление, кодеки, RPM, DNF App Center и пользовательский Flatpak.",
    icon: PackageOpen,
    tone: "mint",
  },
  {
    id: "display",
    number: "03",
    shortLabel: "Экран",
    title: "Мониторы и ввод",
    summary: "Acer 75 Гц, ViewSonic 60 Гц, Adaptive Sync, мышь, KWallet и Baloo.",
    icon: MonitorUp,
    tone: "amber",
  },
  {
    id: "lact",
    number: "04",
    shortLabel: "RX 580",
    title: "Видеокарта и LACT",
    summary: "Проверка установленного LACT, доступ к напряжению, безопасный андервольт и полный откат.",
    icon: Gauge,
    tone: "pink",
  },
  {
    id: "games",
    number: "05",
    shortLabel: "Игры",
    title: "Игры и PortProton",
    summary: "Установленный Lesta Game Center как пример и универсальная схема для любых Windows-игр.",
    icon: Gamepad2,
    tone: "lime",
  },
  {
    id: "obs",
    number: "06",
    shortLabel: "Эфир",
    title: "OBS и VK Видео Live",
    summary: "VAAPI H.264, PipeWire, захват игры, DonationAlerts и тестовый эфир без сюрпризов.",
    icon: RadioTower,
    tone: "orange",
  },
  {
    id: "dualboot",
    number: "07",
    shortLabel: "Windows",
    title: "Windows рядом",
    summary: "UTC, Fast Startup, GRUB и дополнительные игровые диски в нормальном dual-boot.",
    icon: GitBranch,
    tone: "sky",
  },
];

export function getGuideScreen(id: GuideScreenId) {
  return guideScreens.find((screen) => screen.id === id) ?? guideScreens[0];
}
