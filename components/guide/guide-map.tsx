import {
  AudioLines,
  BookOpenText,
  FlaskConical,
  Gamepad2,
  Gauge,
  GitBranch,
  Globe,
  HardDrive,
  HeartPulse,
  MonitorUp,
  NotebookPen,
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
    summary: "Обновление, штатная оптимизация, RPM, Flatpak, Windows-программы и безопасная очистка места.",
    icon: PackageOpen,
    tone: "mint",
  },
  {
    id: "vpn",
    number: "03",
    shortLabel: "VPN",
    title: "Клиент подписки, не «просто VPN»",
    summary: "Та же подписка, что на Windows: FLClash, Karing или v2rayN вместо V2RayTun. AppImage, один клиент.",
    icon: Globe,
    tone: "sky",
  },
  {
    id: "display",
    number: "04",
    shortLabel: "Экран",
    title: "Мониторы и Wayland",
    summary: "Acer 75 Гц, ViewSonic 60 Гц, Adaptive Sync, захват экрана и диагностика Wayland.",
    icon: MonitorUp,
    tone: "amber",
  },
  {
    id: "lact",
    number: "05",
    shortLabel: "RX 580",
    title: "Видеокарта и LACT",
    summary: "Проверка установленного LACT, доступ к напряжению, безопасный андервольт и полный откат.",
    icon: Gauge,
    tone: "pink",
  },
  {
    id: "games",
    number: "06",
    shortLabel: "Игры",
    title: "Игры и лаунчеры",
    summary: "Steam, PortProton, Lutris, Heroic, ретро-игры и честная проверка совместимости.",
    icon: Gamepad2,
    tone: "lime",
  },
  {
    id: "obs",
    number: "07",
    shortLabel: "Эфир",
    title: "OBS и VK Видео Live",
    summary: "VAAPI H.264, PipeWire, захват игры, DonationAlerts и тестовый эфир без сюрпризов.",
    icon: RadioTower,
    tone: "orange",
  },
  {
    id: "dualboot",
    number: "08",
    shortLabel: "Windows",
    title: "Windows рядом",
    summary: "UTC, Fast Startup, GRUB, порядок загрузки после обновлений Windows и игровые диски.",
    icon: GitBranch,
    tone: "sky",
  },
  {
    id: "devices",
    number: "09",
    shortLabel: "Устройства",
    title: "Звук и устройства",
    summary: "PipeWire, Bluetooth, микрофон, контроллеры и Steam Input без двойного ввода.",
    icon: AudioLines,
    tone: "blue",
  },
  {
    id: "rescue",
    number: "10",
    shortLabel: "Помощь",
    title: "Скорая помощь",
    summary: "Единый маршрут от зависшей Plasma до старого ядра, журналов и загрузочной флешки.",
    icon: HeartPulse,
    tone: "pink",
  },
  {
    id: "tuning",
    number: "11",
    shortLabel: "Лаборатория",
    title: "Тонкая настройка",
    summary: "Аргументы ядра, измеримый A/B-тест, Btrfs, NVMe и Vulkan без веры в бесплатный FPS.",
    icon: FlaskConical,
    tone: "orange",
  },
  {
    id: "notes",
    number: "12",
    shortLabel: "Заметки",
    title: "Заметки",
    summary: "Быстрый белый список диагностических и штатных команд с понятным результатом и кнопкой копирования.",
    icon: NotebookPen,
    tone: "amber",
  },
];

export function getGuideScreen(id: GuideScreenId) {
  return guideScreens.find((screen) => screen.id === id) ?? guideScreens[0];
}
