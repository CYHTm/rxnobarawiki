"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { BookMarked, ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";

const sources = [
  ["Главная Nobara Wiki", "https://wiki.nobaraproject.org/"],
  ["Начало работы с Nobara", "https://wiki.nobaraproject.org/new-user-guide-general-guidelines"],
  ["Игровые профили falcond в Nobara", "https://wiki.nobaraproject.org/general-usage/additional-software/falcond"],
  ["Состав KDE-образа Nobara 43", "https://github.com/Nobara-Project/nobara-images/blob/main/ISO-ready-flattened-kickstarts/43/flat-nobara-live-kde-43.ks"],
  ["Настройка GRUB и BLS в установщике Nobara", "https://github.com/Nobara-Project/calamares/blob/master/src/modules/grubcfg/grubcfg.conf"],
  ["Файловые системы в установщике Nobara", "https://github.com/Nobara-Project/calamares/blob/master/src/modules/partition/partition.conf"],
  ["Устройство nobara-sync", "https://github.com/Nobara-Project/nobara-core-packages/blob/main/nobara-updater/src/nobara_sync.py"],
  ["Пакет falcond в Nobara 43", "https://github.com/Nobara-Project/rpm-sources/blob/43/baseos/falcond/falcond.spec"],
  ["Правило планировщиков диска Nobara 43", "https://github.com/Nobara-Project/rpm-sources/blob/43/baseos/nobara-login/60-ioschedulers.rules"],
  ["falcond 2.0.6 и его настройки", "https://github.com/PikaOS-Linux/falcond/tree/v2.0.6"],
  ["Системные профили falcond", "https://github.com/PikaOS-Linux/falcond-profiles"],
  ["Zram в Fedora 43", "https://packages.fedoraproject.org/pkgs/rust-zram-generator/zram-generator-defaults/fedora-43.html"],
  ["Базовая группа пакетов Fedora 43", "https://pagure.io/fedora-comps/raw/main/f/comps-f43.xml.in"],
  ["Правильное обновление", "https://wiki.nobaraproject.org/general-usage/troubleshooting/update-system"],
  ["FAQ Nobara", "https://wiki.nobaraproject.org/FAQ/FAQ"],
  ["Flatpak в Nobara", "https://wiki.nobaraproject.org/general-usage/flatpaks/nobara-flatpak"],
  ["Магазины Flatpak", "https://wiki.nobaraproject.org/general-usage/flatpaks/flatpak-package-managers"],
  ["Когда нужен нативный пакет", "https://wiki.nobaraproject.org/general-usage/flatpaks/preferred-packages"],
  ["Исходный код DNF App Center", "https://github.com/Nobara-Project/dnf-app-center"],
  ["Подключение дополнительных дисков", "https://wiki.nobaraproject.org/general-usage/troubleshooting/mounting-automounting-disk-drives"],
  ["OBS в Nobara", "https://wiki.nobaraproject.org/general-usage/additional-software/obs-studio"],
  ["MangoJuice в Nobara", "https://wiki.nobaraproject.org/general-usage/additional-software/MangoJuice"],
  ["Документация LACT", "https://github.com/ilya-zlobintsev/LACT"],
  ["Настройка AMDGPU в Fedora", "https://docs.fedoraproject.org/en-US/gaming/gpu-overclocking/"],
  ["Параметры командной строки ядра Linux", "https://docs.kernel.org/admin-guide/kernel-parameters.html"],
  ["Режимы CPU-защит ядра Linux", "https://docs.kernel.org/admin-guide/hw-vuln/attack_vector_controls.html"],
  ["GRUB 2 и grubby в Fedora", "https://docs.fedoraproject.org/en-US/fedora/f36/system-administrators-guide/kernel-module-driver-configuration/Working_with_the_GRUB_2_Boot_Loader/"],
  ["Scrub и контрольные суммы Btrfs", "https://btrfs.readthedocs.io/en/latest/btrfs-scrub.html"],
  ["Vulkan-драйвер Mesa RADV", "https://docs.mesa3d.org/drivers/radv.html"],
  ["Переменные Mesa", "https://docs.mesa3d.org/envvars.html"],
  ["Запись benchmark в MangoHud", "https://github.com/flightlessmango/MangoHud/blob/master/README.md"],
  ["Характеристики Ryzen 5 2600", "https://www.amd.com/en/support/downloads/drivers.html/processors/ryzen/ryzen-2000-series/amd-ryzen-5-2600.html"],
  ["Совместимость Precision Boost Overdrive", "https://www.amd.com/en/products/software/ryzen-master.html"],
  ["Gigabyte B450M S2H", "https://www.gigabyte.com/Motherboard/B450M-S2H-rev-1x"],
  ["Драйвер частоты amd-pstate", "https://docs.kernel.org/admin-guide/pm/amd-pstate.html"],
  ["Назначение RyzenAdj", "https://github.com/FlyGoat/RyzenAdj"],
  ["Официальная документация Proton", "https://partner.steamgames.com/doc/steamhardware/proton"],
  ["Lutris", "https://lutris.net/about"],
  ["Heroic Games Launcher", "https://heroicgameslauncher.com/"],
  ["Установка Bottles", "https://docs.usebottles.com/getting-started/installation"],
  ["Запуск .exe и .msi в Bottles", "https://docs.usebottles.com/bottles/run-.exe-.msi-.bat-.lnk-files"],
  ["Документация DOSBox Staging", "https://www.dosbox-staging.org/getting-started/introduction/"],
  ["Совместимость ScummVM", "https://www.scummvm.org/compatibility"],
  ["Документация PipeWire", "https://docs.pipewire.org/"],
  ["Порталы захвата Wayland", "https://flatpak.github.io/xdg-desktop-portal/docs/"],
  ["Загрузка прошлого ядра Fedora", "https://fedoramagazine.org/boot-earlier-kernel/"],
  ["ProtonDB - общественные отчеты", "https://www.protondb.com/"],
  ["Are We Anti-Cheat Yet - общественная база", "https://areweanticheatyet.com/"],
  ["Параметры OBS для VK Видео Live", "https://vk.ru/faq23473"],
  ["Создание трансляции VK Видео Live", "https://vk.ru/@business-kak-sozdat-translyaciu-v-vk-video-live"],
];

export function SourcesDialog({ compact = false }: { compact?: boolean }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button type="button" className={cn("app-action-button", compact && "app-action-button-compact")} aria-label="Открыть источники и документацию">
          <BookMarked aria-hidden="true" />
          {!compact && <span>Источники</span>}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-sheet sources-sheet">
          <div className="dialog-handle" aria-hidden="true" />
          <div className="dialog-heading">
            <div className="dialog-heading-icon"><BookMarked aria-hidden="true" /></div>
            <div>
              <Dialog.Title className="dialog-title">Источники и документация</Dialog.Title>
              <Dialog.Description className="dialog-description">Основа - официальная Wiki Nobara и документация проектов. ProtonDB и база античита отдельно помечены как общественные: полезно, но не священное писание.</Dialog.Description>
            </div>
          </div>
          <div className="sources-list">
            {sources.map(([label, href]) => (
              <a key={href} href={href} target="_blank" rel="noreferrer">
                <span>{label}</span>
                <ExternalLink aria-hidden="true" />
              </a>
            ))}
          </div>
          <Dialog.Close asChild>
            <button type="button" className="dialog-close" aria-label="Закрыть окно"><X aria-hidden="true" /></button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
