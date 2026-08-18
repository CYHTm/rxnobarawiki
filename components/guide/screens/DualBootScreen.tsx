"use client";

import { CodeSnippet } from "@/components/CodeSnippet";
import { Code, GuideScreen, StepBlock, SupportPanel, Warning } from "@/components/guide/GuidePrimitives";

export function DualBootScreen() {
  return (
    <GuideScreen id="dualboot" number="07" title="Windows 11 рядом с Nobara" description="Две системы должны делить часы, загрузку и иногда диски. Настроим это без магии.">
      <Warning>
        У тебя обе системы уже загружаются с одного NVMe и общего EFI. Не меняй разметку ради этого раздела. Здесь мы только согласуем часы и меню запуска, а состояние EFI контролируем командами из первого раздела.
      </Warning>

      <StepBlock id="windows-time" title="Отключи Fast Startup и переведи Windows в UTC">
        Linux хранит аппаратные часы в UTC, а Windows по умолчанию считает их местным временем. Из-за этого после переключения системы часы могут уезжать. Отдельно Fast Startup сохраняет часть состояния Windows на диск вместо полного выключения: Nobara после этого может увидеть NTFS-раздел как небезопасно закрытый и отказаться писать на него.
        <p className="mt-5">Загрузи Windows, нажми правой кнопкой по кнопке Пуск и открой Терминал от имени администратора. Выполни две команды по очереди:</p>
        <div className="mt-4 space-y-3">
          <CodeSnippet code="powercfg /h off" label="Отключить гибернацию и Fast Startup" />
          <CodeSnippet code={'reg add "HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Control\\TimeZoneInformation" /v RealTimeIsUniversal /d 1 /t REG_DWORD /f'} label="Хранить аппаратные часы в UTC" />
        </div>
        <p className="mt-5">Windows должна ответить, что операция выполнена успешно. Полностью выключи ее, загрузи Nobara и оставь Linux в обычном режиме UTC:</p>
        <CodeSnippet code={"timedatectl set-local-rtc 0\ntimedatectl status"} label="Konsole в Nobara: применить и проверить UTC" className="mt-4" />
        <p className="mt-4">В проверке ожидается <Code>RTC in local TZ: no</Code>. После полной перезагрузки обе системы должны показывать одно правильное местное время, а NTFS-разделы Windows не должны оставаться заблокированными Fast Startup.</p>
        <SupportPanel title="Вернуть стандартные часы Windows и гибернацию">
          <p className="mb-4">В Windows снова открой Терминал от имени администратора и выполни обе команды:</p>
          <div className="space-y-3">
            <CodeSnippet code={'reg delete "HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Control\\TimeZoneInformation" /v RealTimeIsUniversal /f'} label="Удалить настройку UTC" />
            <CodeSnippet code="powercfg /h on" label="Вернуть гибернацию" />
          </div>
        </SupportPanel>
      </StepBlock>

      <StepBlock id="grub" title="Показывай меню GRUB 10 секунд">
        GRUB - меню, которое появляется до запуска системы и позволяет выбрать Nobara или Windows. Первая команда отключает скрытие меню, вторая задает паузу, третья пересобирает конфигурацию.
        <div className="mt-4 space-y-3">
          <CodeSnippet code="sudo grub2-editenv - unset menu_auto_hide" label="Всегда показывать меню" />
          <CodeSnippet code="sudo sed -i 's/^GRUB_TIMEOUT=.*/GRUB_TIMEOUT=10/' /etc/default/grub" label="Ждать выбор 10 секунд" />
          <CodeSnippet code="sudo grub2-mkconfig -o /boot/grub2/grub.cfg" label="Применить конфигурацию" />
        </div>
        <p className="mt-4">После перезагрузки меню должно показываться около 10 секунд, а внутри должны быть Nobara и Windows Boot Manager.</p>
        <SupportPanel title="Меню есть, но пункта Windows Boot Manager нет">
          <p className="mb-4">Не форматируй EFI и не копируй случайные команды восстановления загрузчика. Сначала посмотри записи UEFI и файлы общего EFI-раздела. Команды ниже ничего не меняют.</p>
          <div className="space-y-3">
            <CodeSnippet code="sudo efibootmgr -v" label="Показать загрузочные записи платы" />
            <CodeSnippet code="find /boot/efi/EFI -maxdepth 2 -type f" label="Показать файлы загрузчиков в EFI" />
          </div>
          <p className="mt-4">Если запись Windows Boot Manager есть, проверь ее через Boot Menu платы и еще раз пересобери GRUB последней командой основного способа. Если записи нет или Windows не запускается даже из Boot Menu, загружайся с сохраненной флешки и сначала сохраняй вывод этих проверок. Не удаляй каталог <Code>EFI/Microsoft</Code>.</p>
        </SupportPanel>
        <SupportPanel title="Меню GRUB вообще не появилось">
          Открой Boot Menu платы Gigabyte и проверь, выбран ли загрузчик Nobara первым. Если Nobara запускается из Boot Menu, сама система цела: вернись сюда и повтори три команды выше. Если не запускается ни одна запись, используй живую флешку из первого раздела для диагностики, а не для повторной установки.
        </SupportPanel>
        <SupportPanel title="Снова скрывать меню после успешного запуска">
          <CodeSnippet code="sudo grub2-editenv - set menu_auto_hide=1" label="Вернуть автоматическое скрытие GRUB" />
        </SupportPanel>
      </StepBlock>

      <StepBlock id="disks" title="Подключи игровые диски через Drive Mount Manager">
        Открой Nobara Drive Mount Manager, отметь нужный раздел и перезагрузи ПК. Менеджер закрепит постоянную точку подключения. Без этого диск может появляться только после ручного клика в Dolphin, а PortProton или игровая библиотека при старте не найдут старый путь.
        <SupportPanel title="Где потом искать диск и как отменить автомонтирование">
          Обычно раздел будет доступен по пути <Code>/run/media/твой_пользователь/uuid</Code>. UUID - постоянный идентификатор раздела. Именно этот путь указывай в игровых программах. Для отката открой Drive Mount Manager, сними галочку с раздела и перезагрузи ПК.
        </SupportPanel>
        <SupportPanel title="Можно ли держать одну библиотеку игр на NTFS для Windows и Nobara">
          Официальная Wiki не рекомендует общую Steam-библиотеку на NTFS. Права доступа, символические ссылки и Wine-префиксы на NTFS часто создают проблемы. Для нового игрового диска лучше <Code>ext4</Code>. Общий NTFS можно оставить для фильмов, установщиков и обычных файлов, но префиксы и Linux-библиотеку держи на Linux-разделе.
        </SupportPanel>
      </StepBlock>
    </GuideScreen>
  );
}
