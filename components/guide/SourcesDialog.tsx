"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { BookMarked, ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";

const sources = [
  ["Скачать Nobara", "https://nobaraproject.org/download.html"],
  ["Начало работы с Nobara", "https://wiki.nobaraproject.org/new-user-guide-general-guidelines"],
  ["Правильное обновление", "https://wiki.nobaraproject.org/general-usage/troubleshooting/update-system"],
  ["Flatpak в Nobara", "https://wiki.nobaraproject.org/general-usage/flatpaks/nobara-flatpak"],
  ["Магазины Flatpak", "https://wiki.nobaraproject.org/general-usage/flatpaks/flatpak-package-managers"],
  ["Когда нужен нативный пакет", "https://wiki.nobaraproject.org/general-usage/flatpaks/preferred-packages"],
  ["Подключение дополнительных дисков", "https://wiki.nobaraproject.org/general-usage/troubleshooting/mounting-automounting-disk-drives"],
  ["OBS в Nobara", "https://wiki.nobaraproject.org/general-usage/additional-software/obs-studio"],
  ["Документация LACT", "https://github.com/ilya-zlobintsev/LACT"],
  ["Настройка AMDGPU в Fedora", "https://docs.fedoraproject.org/en-US/gaming/gpu-overclocking/"],
  ["Параметры OBS для VK Видео Live", "https://vk.ru/faq23473"],
  ["Создание трансляции VK Видео Live", "https://vk.ru/@business-kak-sozdat-translyaciu-v-vk-video-live"],
  ["Главная Nobara Wiki", "https://wiki.nobaraproject.org/"],
];

export function SourcesDialog({ compact = false }: { compact?: boolean }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button type="button" className={cn("app-action-button", compact && "app-action-button-compact")} aria-label="Открыть официальные источники">
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
              <Dialog.Title className="dialog-title">Официальные источники</Dialog.Title>
              <Dialog.Description className="dialog-description">Если название кнопки изменилось после обновления, сначала смотри сюда, а не в древний ролик с заставкой Linkin Park.</Dialog.Description>
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
