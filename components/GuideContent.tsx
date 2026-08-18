"use client";

import { ExternalLink, RotateCcw } from "lucide-react";
import { ActionRow } from "@/components/ActionRow";
import { ChecklistProgress, ChecklistProvider } from "@/components/Checklist";
import { CodeSnippet } from "@/components/CodeSnippet";
import { Disclosure } from "@/components/Disclosure";
import { LactCalculator } from "@/components/LactCalculator";
import { SectionCard } from "@/components/SectionCard";
import { DesktopNav, MobileNav } from "@/components/SettingsNav";

export function GuideContent() {
  return (
    <ChecklistProvider>
      <div className="min-h-screen bg-[#161616] text-zinc-200">
        <Header />
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
          <MobileNav />
          <div className="grid gap-12 py-10 lg:grid-cols-[230px_minmax(0,760px)] lg:gap-16 lg:py-16">
            <DesktopNav />
            <main>
              <Intro />
              <FirstStart />
              <Display />
              <Lact />
              <Games />
              <Obs />
              <DualBoot />
              <Rescue />
              <Sources />
            </main>
          </div>
        </div>
      </div>
    </ChecklistProvider>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 h-14 border-b border-zinc-800 bg-[#161616]">
      <div className="mx-auto flex h-full max-w-[1180px] items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-mono text-xs font-semibold tracking-[0.16em] text-white">
          NOBARA / НАСТРОЙКА
        </a>
        <div className="hidden font-mono text-[11px] text-zinc-600 sm:block">
          R5 2600&nbsp;&nbsp;/&nbsp;&nbsp;RX 580 8 ГБ&nbsp;&nbsp;/&nbsp;&nbsp;16 ГБ
        </div>
        <div className="w-28 sm:hidden"><ChecklistProgress compact /></div>
      </div>
    </header>
  );
}

function Intro() {
  return (
    <section id="top" className="pb-14 sm:pb-20">
      <p className="font-mono text-xs text-zinc-600">NOBARA 43 / KDE PLASMA 6 / WAYLAND</p>
      <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-6xl">
        Настройка моего ПК без лишней херни
      </h1>
      <p className="mt-6 max-w-xl text-[15px] leading-7 text-zinc-400">
        Ryzen 5 2600, RX 580 8 ГБ, 16 ГБ памяти, Gigabyte B450M S2H, NVMe 512 ГБ, Acer 75 Гц и ViewSonic 60 Гц. Тут только что нажать, что вставить и как откатить, если все пошло по пизде.
      </p>
      <div className="mt-9 grid border-y border-zinc-800 sm:grid-cols-4">
        <Spec label="Процессор" value="Ryzen 5 2600" />
        <Spec label="Видеокарта" value="RX 580 8 ГБ" />
        <Spec label="Мониторы" value="75 + 60 Гц" />
        <Spec label="Система" value="Nobara 43" />
      </div>
    </section>
  );
}

function FirstStart() {
  return (
    <SectionCard id="start" number="01" title="После установки" description="Сначала обновление и кодеки. Остальное потом.">
      <ActionRow id="welcome" title="Открой Nobara Welcome">
        Пройди начальные пункты и запусти штатное обновление, если оно появилось. Никаких левых репозиториев пока не добавляй.
      </ActionRow>

      <ActionRow id="sync" title="Обнови систему" command="nobara-sync" commandLabel="Запускать без sudo" status="важно">
        Через GUI используй Nobara System Updater. Через терминал используй только <Code>nobara-sync</Code>. <Code>sudo dnf upgrade</Code> не тыкай, долбоеб. Это Nobara, не чистая Fedora.
        <Disclosure title="Нужно обновить еще и Flatpak?">
          <CodeSnippet code="nobara-sync --all" label="RPM + Flatpak" />
        </Disclosure>
      </ActionRow>

      <ActionRow id="codecs" title="На Media Codecs нажми YES" status="не пропускай">
        Просто жми <strong className="text-white">YES</strong>. Без кодеков потом отвалятся видео, запись или браузер, а вспоминать эту галочку будешь уже перед стримом.
      </ActionRow>

      <ActionRow
        id="apps"
        title="Поставь qBittorrent, Vesktop и Chrome"
        command="flatpak install --user flathub org.qbittorrent.qBittorrent dev.vencord.Vesktop com.google.Chrome"
        commandLabel="Flatpak User"
      >
        Вставь команду ниже. Она поставит все три приложения в твой пользовательский Flatpak. Режим <Code>System</Code> не выбирай. Discover здесь не нужен.
      </ActionRow>

      <ActionRow id="disks" title="Подключи дополнительные диски через Drive Mount Manager">
        Открой Nobara Drive Mount Manager и включи автомонтирование. Иначе после перезагрузки путь к играм может поменяться, и PortProton охуеет вместе с тобой.
        <Disclosure title="Где потом искать диск?">
          Обычно он будет доступен по пути <Code>/run/media/твой_пользователь/uuid</Code>. Этот путь и указывай для игровых библиотек.
        </Disclosure>
      </ActionRow>
    </SectionCard>
  );
}

function Display() {
  return (
    <SectionCard id="display" number="02" title="Мониторы и мышь" description="Acer работает на 75 Гц, ViewSonic на 60 Гц. Настраиваем каждый отдельно.">
      <ActionRow id="monitors" title="Выставь правильную частоту">
        <Settings>
          <Setting label="Acer" value="75 Гц / основной" />
          <Setting label="ViewSonic" value="60 Гц / второй" />
          <Setting label="Сеанс" value="Wayland" />
        </Settings>
        <p className="mt-4">Путь: Параметры системы - Экран и монитор - Конфигурация экрана.</p>
      </ActionRow>

      <ActionRow id="adaptive" title="Проверь Adaptive Sync">
        Если пункт доступен, сначала поставь <Code>Automatic</Code>. Если курсор, видео на втором экране или игра начинают дергаться, ставь <Code>Never</Code> на обоих экранах и проверяй снова. Не дергается - не крути настройку ради науки.
        <Disclosure title="Почему два монитора иногда дергаются?">
          У экранов разная частота, а RX 580 старая. Иногда VRR и два разных режима дают неровный frametime. Тебе не надо знать внутренности KWin, просто сравни Automatic и Never.
        </Disclosure>
      </ActionRow>

      <ActionRow id="mouse" title="Поставь мышь в режим Flat">
        Параметры системы - Мышь - Профиль ускорения - <Code>Flat</Code>. Получишь прямое движение без ускорения от скорости руки. Ползунок скорости выставь как удобно.
      </ActionRow>

      <ActionRow id="desktop" title="Убери KWallet и Baloo, если они бесят">
        Когда KWallet попросит создать кошелек, оставь оба поля пароля пустыми. Или открой Параметры системы - Безопасность и конфиденциальность - Бумажник KDE и отключи подсистему. Пустой пароль удобнее, но сохраненные токены защищены хуже. Тут без приколов, это реальный минус.
        <CodeSnippet code="balooctl6 disable" label="Отключить индексацию файлов" className="mt-4" />
        <Disclosure title="Как вернуть Baloo">
          <CodeSnippet code="balooctl6 enable" label="Включить индексацию обратно" />
        </Disclosure>
      </ActionRow>
    </SectionCard>
  );
}

function Lact() {
  return (
    <SectionCard id="lact" number="03" title="RX 580 и LACT" description="Ставим управление видеокартой, снижаем напряжение и не пытаемся сразу поставить рекорд мира.">
      <ActionRow
        id="lact-install"
        title="Установи LACT"
        command={"sudo dnf copr enable ilyaz/LACT -y\nsudo dnf install lact -y\nsudo systemctl enable --now lactd"}
        commandLabel="Установка и запуск"
      >
        После выполнения открой LACT из меню приложений. Старый адрес <Code>ilya-zlobintsev/LACT</Code> из старых гайдов не используй, актуальный называется <Code>ilyaz/LACT</Code>.
      </ActionRow>

      <ActionRow
        id="lact-mask"
        title="Разреши LACT менять напряжение"
        command="sudo grubby --update-kernel=ALL --args='amdgpu.ppfeaturemask=0xfffd7fff'"
        commandLabel="Добавить параметр и потом перезагрузиться"
        status="только RX 580"
      >
        Вставь команду, перезагрузи ПК и снова открой LACT. Все. Запоминать эту кашу из цифр нахер не нужно.
        <Disclosure title="Что эта команда вообще делает?">
          По умолчанию драйвер прячет часть управления RX 580. Параметр открывает напряжение и лимит мощности для LACT. Маска рассчитана на Polaris, то есть RX 470/480/570/580. Она также отключает GFXOFF/STUTTER, поэтому на отдельных системах может вырасти расход в простое.
        </Disclosure>
        <Disclosure title="После команды началась херня? Откатить">
          <CodeSnippet code="sudo grubby --update-kernel=ALL --remove-args='amdgpu.ppfeaturemask=0xfffd7fff'" label="Убрать параметр" />
          <p className="mt-3">После отката перезагрузи ПК.</p>
        </Disclosure>
      </ActionRow>

      <ActionRow id="undervolt" title="Начни с 1125 мВ и тестируй">
        Поставь 1125 мВ, сохрани профиль и погоняй реальную игру 15-30 минут. Потом снижай по 10-15 мВ. Артефакты, вылет или черный экран - верни предыдущий шаг. Не ебашь сразу 1065 мВ, карта тебе ничего не должна.
        <div className="mt-5"><LactCalculator /></div>
        <Disclosure title="Простой профиль вентиляторов">
          <Settings>
            <Setting label="40°C" value="28%" />
            <Setting label="55°C" value="45%" />
            <Setting label="68°C hotspot" value="70%" />
            <Setting label="80°C" value="90%" />
          </Settings>
          <p className="mt-4">Цель - держать hotspot около 68°C без постоянного воя. Значения подстрой под шум именно своей карты.</p>
        </Disclosure>
      </ActionRow>
    </SectionCard>
  );
}

function Games() {
  return (
    <SectionCard id="games" number="04" title="Игры" description="PortProton, отдельные префиксы и нормальные пути к дискам.">
      <ActionRow
        id="portproton"
        title="Поставь PortProton"
        command={"sudo dnf copr enable boria138/portproton -y\nsudo dnf install portproton -y"}
        commandLabel="Если пакета нет в Nobara Welcome"
      >
        Сначала поищи PortProton в Nobara Welcome или DNF App Center. Если там нет, используй команду. Lesta Game Center ставится из раздела автоустановки внутри PortProton.
        <Disclosure title="PortProton и PortProtonQt - в чем разница?">
          PortProton запускает Windows-игры через Wine/Proton. PortProtonQt - его графический интерфейс. Это не два разных движка, выбирать между ними как между Wine и Proton не надо.
        </Disclosure>
      </ActionRow>

      <ActionRow id="prefixes" title="Одна игра - один префикс">
        Для локального <Code>setup.exe</Code> выбери запуск через PortProton и создай новый префикс. В установщике сними галочки DirectX и Visual C++, PortProton поставит нужное сам. Не пихай все игры в один префикс, потом сам хер найдешь, какая из них все сломала.
        <Disclosure title="Коротко про FitGirl и DODI">
          Технически их <Code>setup.exe</Code> запускается так же. Используй только законно полученные файлы и проверяй их источник. Сайт не раздает репаки и не ведет на пиратские ссылки.
        </Disclosure>
        <Disclosure title="Захват OpenGL-игры в OBS">
          <CodeSnippet code="obs-gamecapture %command%" label="Параметры запуска Steam" />
          <p className="mt-3">Vulkan обычно захватывается без этого параметра.</p>
        </Disclosure>
      </ActionRow>
    </SectionCard>
  );
}

function Obs() {
  return (
    <SectionCard id="obs" number="05" title="OBS и звук" description="Видео кодирует RX 580. Игра, Vesktop и музыка идут отдельными дорожками.">
      <ActionRow id="obs-video" title="Выбери FFmpeg VAAPI H.264">
        OBS ставь нативно через Nobara Welcome или DNF App Center, не Flatpak. В выводе выбери расширенный режим и выставь настройки ниже.
        <Settings className="mt-4">
          <Setting label="Энкодер" value="FFmpeg VAAPI H.264" />
          <Setting label="Битрейт" value="CBR / 6000 Кбит/с" />
          <Setting label="Ключевые кадры" value="2 секунды" />
          <Setting label="Профиль" value="High" />
          <Setting label="Стартовое разрешение" value="1664x936 / 60 FPS" />
        </Settings>
        <p className="mt-4">Нагрузка на Ryzen станет низкой, но не нулевой. Кто обещает ровно 0% - пиздит. OBS все равно собирает сцену и крутит плагины.</p>
        <Disclosure title="Картинка сыпется в движении">
          Попробуй 1080p30 или 720p60. RX 580 старая, и надпись 1080p60 сама по себе качество не добавляет.
        </Disclosure>
      </ActionRow>

      <ActionRow
        id="obs-audio"
        title="Раздели звук через PipeWire"
        command="sudo dnf install obs-studio-plugin-pipewire-audio-capture -y"
        commandLabel="Плагин Application Audio Capture"
      >
        В OBS добавь отдельный Application Audio Capture для игры, Vesktop и музыки. Не захватывай весь Desktop Audio одной кучей.
        <Settings className="mt-4">
          <Setting label="Дорожка 1" value="Игра" />
          <Setting label="Дорожка 2" value="Vesktop" />
          <Setting label="Дорожка 3" value="Музыка" />
        </Settings>
        <Disclosure title="DonationAlerts">
          Добавь источник Браузер и вставь ссылку виджета DonationAlerts. CEF уже есть в нативной сборке OBS для Nobara.
        </Disclosure>
      </ActionRow>
    </SectionCard>
  );
}

function DualBoot() {
  return (
    <SectionCard id="dualboot" number="06" title="Две системы" description="Windows 11 и Nobara на одном NVMe. Работает, но резервная копия обязательна.">
      <Warning>
        Один диск для двух систем рискованнее двух отдельных. Не форматируй существующий EFI-раздел и сделай копию важных файлов до любых игр с разметкой.
      </Warning>

      <ActionRow
        id="windows-time"
        title="Переведи часы Windows в UTC"
        command={'reg add "HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Control\\TimeZoneInformation" /v RealTimeIsUniversal /d 1 /t REG_DWORD /f'}
        commandLabel="Windows Terminal от администратора"
      >
        После команды перезагрузи Windows и Nobara. Еще отключи Fast Startup в Windows. Эта хрень любит оставлять диски в полумертвом состоянии.
        <CodeSnippet code="timedatectl set-local-rtc 0" label="Оставить Nobara в режиме UTC" className="mt-4" />
      </ActionRow>

      <ActionRow id="grub" title="Показывай GRUB 10 секунд">
        Выполни команды по очереди и перезагрузи ПК.
        <div className="mt-4 space-y-3">
          <CodeSnippet code="sudo grub2-editenv - unset menu_auto_hide" label="Показывать меню" />
          <CodeSnippet code="sudo sed -i 's/^GRUB_TIMEOUT=.*/GRUB_TIMEOUT=10/' /etc/default/grub" label="Таймаут 10 секунд" />
          <CodeSnippet code="sudo grub2-mkconfig -o /boot/grub2/grub.cfg" label="Пересобрать конфигурацию" />
        </div>
      </ActionRow>
    </SectionCard>
  );
}

function Rescue() {
  return (
    <SectionCard id="rescue" number="07" title="Если все сломалось" description="Пять команд. Без лекции на сорок минут.">
      <CommandItem title="Обновление Nobara зависло или ругается" code="nobara-sync" />
      <CommandItem title="Пропал звук" code="systemctl --user restart pipewire pipewire-pulse wireplumber" />
      <CommandItem title="Зависла игра через Wine" code="wineserver -k" />
      <CommandItem title="Wine вообще не понял намек" code="killall -9 portproton wine xwininfo" danger />
      <CommandItem title="Посмотреть ошибки текущей загрузки" code="journalctl -b -p err..alert" />
      <CommandItem title="Посмотреть упавшие службы" code="systemctl --failed" />
    </SectionCard>
  );
}

function Sources() {
  const links = [
    ["Nobara Wiki", "https://wiki.nobaraproject.org/"],
    ["Обновление Nobara", "https://wiki.nobaraproject.org/general-usage/troubleshooting/update-system"],
    ["OBS в Nobara", "https://wiki.nobaraproject.org/general-usage/additional-software/obs-studio"],
    ["LACT", "https://github.com/ilya-zlobintsev/LACT"],
  ];

  return (
    <footer className="border-t border-zinc-800 py-10">
      <p className="text-xs leading-5 text-zinc-700">Если после крупного обновления команда перестала работать, сначала смотри официальную Wiki, а не видос трехлетней давности.</p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
        {links.map(([label, href]) => (
          <a key={href} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white">
            {label}<ExternalLink className="h-3 w-3" />
          </a>
        ))}
      </div>
    </footer>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-zinc-800 px-0 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0">
      <div className="font-mono text-[9px] uppercase tracking-wider text-zinc-700">{label}</div>
      <div className="mt-1 text-xs font-medium text-zinc-300">{value}</div>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="border border-zinc-800 bg-[#1d1d1d] px-1.5 py-0.5 font-mono text-[12px] text-zinc-200">{children}</code>;
}

function Settings({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border border-zinc-800 ${className}`}>{children}</div>;
}

function Setting({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-zinc-800 px-4 py-3 text-sm last:border-b-0">
      <span className="text-zinc-600">{label}</span>
      <span className="text-right font-medium text-zinc-200">{value}</span>
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return <div className="mb-6 border-l-2 border-red-500 bg-red-500/[0.04] px-4 py-3 text-sm leading-6 text-zinc-400"><span className="font-medium text-red-400">Стоп. </span>{children}</div>;
}

function CommandItem({ title, code, danger = false }: { title: string; code: string; danger?: boolean }) {
  return (
    <div className="border-t border-zinc-800 py-6 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-2">
        {danger && <RotateCcw className="h-3.5 w-3.5 text-red-400" />}
        <h3 className="text-sm font-medium text-zinc-300">{title}</h3>
      </div>
      <CodeSnippet code={code} label={danger ? "Только если мягкий способ не помог" : "Терминал"} className="mt-3" />
    </div>
  );
}
