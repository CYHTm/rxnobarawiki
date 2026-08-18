"use client";

import { ArrowDown, ExternalLink, MonitorCog } from "lucide-react";
import { ActionRow } from "@/components/ActionRow";
import { CodeSnippet } from "@/components/CodeSnippet";
import { Disclosure } from "@/components/Disclosure";
import { LactCalculator } from "@/components/LactCalculator";
import { SectionCard } from "@/components/SectionCard";
import { DesktopNav, MobileNav } from "@/components/SettingsNav";
import { TypographyProvider, TypographySettings } from "@/components/TypographySettings";

export function GuideContent() {
  return (
    <TypographyProvider>
      <div className="min-h-screen bg-[#101219] text-zinc-100">
        <Hero />
        <Header />
        <div id="guide" className="mx-auto max-w-[1380px] scroll-mt-20 px-4 sm:px-6 lg:px-8">
          <MobileNav />
          <div className="grid items-start gap-12 py-10 lg:grid-cols-[280px_minmax(0,900px)] lg:gap-16 lg:py-20 xl:gap-24">
            <DesktopNav />
            <main className="min-w-0">
              <Intro />
              <BeforeInstall />
              <FirstStart />
              <Display />
              <Lact />
              <Games />
              <Obs />
              <DualBoot />
              <Sources />
            </main>
          </div>
        </div>
      </div>
    </TypographyProvider>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] overflow-hidden border-b border-white/[0.08]">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="hero-orb pointer-events-none absolute -right-28 top-20 h-[32rem] w-[32rem] rounded-full bg-violet-400/10 blur-3xl" />
      <div className="hero-orb pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-cyan-300/10 blur-3xl [animation-delay:-4s]" />

      <div className="relative mx-auto flex w-full max-w-[1380px] flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="font-mono text-xs font-bold tracking-[0.18em] text-zinc-200">NOBARA / ТВОЙ ПК</div>
          <TypographySettings />
        </div>

        <div className="my-auto grid items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(330px,0.75fr)] lg:gap-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-200/[0.06] px-4 py-2 text-xs font-semibold text-cyan-100">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />
              Система установлена. Теперь настраиваем.
            </div>
            <div className="shimmer-title mt-8 text-[clamp(4.5rem,13vw,10rem)] font-black leading-[0.78] tracking-[-0.085em]">NOBARA</div>
            <h1 className="mt-8 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-6xl">
              Вторая система без повторной установки и шаманства
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl sm:leading-9">
              Понятный маршрут после Windows 11: проверить загрузку, обновить Nobara, настроить RX 580, игры и эфир на VK Видео Live. Неполадки лежат рядом с основным шагом, а не в подвале сайта.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#guide" className="inline-flex h-14 items-center gap-3 rounded-full bg-white px-7 text-sm font-bold text-[#11131a] shadow-[0_16px_50px_rgba(255,255,255,0.12)] transition hover:-translate-y-0.5 hover:bg-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                Открыть весь гайд <ArrowDown className="h-4 w-4" />
              </a>
              <a href="#before" className="inline-flex h-14 items-center rounded-full border border-white/15 bg-white/[0.05] px-7 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                Сразу к проверке
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
            <div className="absolute -inset-10 rounded-full bg-gradient-to-br from-cyan-300/10 to-violet-400/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#181a22]/95 shadow-[0_36px_120px_rgba(0,0,0,0.42)]">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
                <div>
                  <div className="text-xs font-medium text-zinc-500">Профиль системы</div>
                  <div className="mt-1 font-semibold text-white">Твоя сборка</div>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300/15 to-violet-300/15 text-cyan-100">
                  <MonitorCog className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1 p-3">
                <HeroRow label="Система" value="Nobara 43 KDE" />
                <HeroRow label="Процессор" value="Ryzen 5 2600" />
                <HeroRow label="Графика" value="RX 580 · 8 ГБ" />
                <HeroRow label="Мониторы" value="75 Гц + 60 Гц" />
                <HeroRow label="Загрузка" value="Windows 11 рядом" />
                <HeroRow label="Следующая цель" value="VK Видео Live" accent />
              </div>
              <div className="border-t border-white/[0.08] px-6 py-5 text-xs leading-5 text-zinc-500">
                Один NVMe · общий EFI 200 МБ · 16 ГБ RAM
              </div>
            </div>
          </div>
        </div>

        <a href="#guide" className="mb-2 flex w-fit items-center gap-3 text-xs font-medium text-zinc-500 transition hover:text-zinc-200">
          Листай к содержанию <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}

function HeroRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl px-4 py-3.5 hover:bg-white/[0.035]">
      <span className="text-sm text-zinc-500">{label}</span>
      <span className={accent ? "text-sm font-semibold text-cyan-100" : "text-sm font-semibold text-zinc-100"}>{value}</span>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 h-[4.5rem] border-b border-white/[0.08] bg-[#101219]/88 backdrop-blur-2xl">
      <div className="mx-auto flex h-full max-w-[1380px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="font-mono text-xs font-bold tracking-[0.16em] text-white">
          NOBARA / НАСТРОЙКА
        </a>
        <div className="flex items-center gap-2">
          <a href="#guide" className="hidden rounded-full px-4 py-2 text-xs font-semibold text-zinc-400 transition hover:bg-white/[0.05] hover:text-white sm:block">Содержание</a>
          <TypographySettings compact />
        </div>
      </div>
    </header>
  );
}

function Intro() {
  return (
    <section className="pb-10 sm:pb-16">
      <p className="font-mono text-xs font-semibold tracking-[0.16em] text-cyan-200">КАК ЧИТАТЬ ЭТОТ ГАЙД</p>
      <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl">
        Идем сверху вниз один раз, потом открываем только нужный раздел
      </h2>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
        Основной способ всегда идет первым. Сразу под ним лежит блок «если не сработало» с проверкой и откатом. Отдельного кладбища аварийных команд в конце больше нет. Размер текста меняется шестеренкой сверху и сохраняется в браузере.
      </p>

      <div className="mt-10 rounded-[1.75rem] border border-cyan-200/12 bg-gradient-to-br from-cyan-200/[0.07] to-violet-300/[0.035] p-6 sm:p-8">
        <div className="font-semibold text-white">Что уже есть</div>
        <p className="mt-3 max-w-3xl leading-7 text-zinc-300">
          Nobara стоит рядом с Windows на одном NVMe. PortProton, Lesta Game Center и Tanks Blitz установлены. LACT установлен, но еще не проверен. Поэтому гайд не предлагает повторять эти действия и начинает с проверки текущего состояния.
        </p>
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">Восемь слов перед стартом</h3>
        <p className="mt-3 max-w-3xl leading-7 text-zinc-400">Этого словаря достаточно, чтобы не принимать пакетный менеджер за новый лаунчер.</p>
        <dl className="mt-7 grid gap-4 md:grid-cols-2">
          <Term name="Nobara и Fedora">Nobara собрана на базе Fedora, но имеет собственные пакеты, ядро и механизм обновления. Случайная команда для Fedora не всегда подходит Nobara.</Term>
          <Term name="KDE Plasma">Панель, меню, окна и Параметры системы. Это графический интерфейс, который ты видишь после входа.</Term>
          <Term name="Wayland">Слой, который связывает приложения, мониторы, видеокарту и устройства ввода. Это не отдельный драйвер.</Term>
          <Term name="Пакет и репозиторий">Пакет - программа в формате установки. Репозиторий - проверенный каталог, откуда система получает пакет и его обновления.</Term>
          <Term name="RPM">Нативный пакет системы. Ядро, службы, LACT и OBS ставятся в этом формате.</Term>
          <Term name="DNF App Center">Графический центр RPM-пакетов и штатного обновления Nobara. Flatpak он не обслуживает.</Term>
          <Term name="Flatpak и Flathub">Flatpak изолирует обычные приложения, а Flathub служит их каталогом. Ставим только для текущего пользователя.</Term>
          <Term name="Konsole и sudo">Konsole - окно для текстовых команд. Кнопка «Копировать» берет только команду: вставь ее в Konsole и нажми Enter. sudo временно запускает одно действие с правами администратора. При вводе пароля символы не видны - это нормально.</Term>
        </dl>
      </div>
    </section>
  );
}

function BeforeInstall() {
  return (
    <SectionCard id="before" number="01" title="Установка уже готова" description="Windows 11 и Nobara уже стоят на одном NVMe и используют EFI-раздел 200 МБ. Не переустанавливаем, а спокойно фиксируем рабочее состояние.">
      <Warning>
        Официальная Nobara Wiki не рекомендует такой вариант до установки, потому что EFI Windows обычно мал для двух систем. Но установка уже загружается, поэтому паниковать, срочно двигать разделы или сносить систему не надо. Сначала смотрим фактическое свободное место. Любая игра, браузер и обычная программа вообще не пишут свои файлы в EFI.
      </Warning>

      <ActionRow id="usb" title="Оставь установочную флешку как аварийную">
        Не форматируй вчерашнюю флешку хотя бы до нескольких успешных обновлений и перезагрузок обеих систем. С нее можно загрузить живую Nobara, прочитать файлы и восстановить загрузку, если однажды меню пропадет. Если флешка уже стерта, катастрофы нет: образ можно снова скачать с официального сайта и записать через Ventoy, Fedora Media Writer или Rufus в режиме GPT и DD.
        <Disclosure title="Проверить образ перед повторной записью">
          <CodeSnippet code="Get-FileHash .\Nobara-43-*.iso -Algorithm SHA256" label="PowerShell в Windows: посчитать SHA256" />
          <p className="mt-3">Строка должна полностью совпасть с SHA256 на странице загрузки Nobara. Приложения на установленной системе от этой флешки не зависят.</p>
        </Disclosure>
      </ActionRow>

      <ActionRow id="install" title="Проверь отдельный /boot и свободное место в EFI">
        В обычной разметке Nobara ядра и большие файлы загрузки находятся в отдельном <Code>/boot</Code>, а <Code>/boot/efi</Code> хранит небольшие UEFI-загрузчики. Поэтому ты прав в главном: одна игра и один браузер EFI не засрут. Количество установленных приложений с размером EFI вообще не связано.
        <CodeSnippet code={"findmnt /boot\nfindmnt /boot/efi\ndf -h /boot /boot/efi"} label="Только посмотреть разделы и свободное место" className="mt-6" />
        <p className="mt-5">В выводе <Code>findmnt</Code> должны быть отдельные точки <Code>/boot</Code> и <Code>/boot/efi</Code>. В строке EFI обычно будет файловая система <Code>vfat</Code>. Команда <Code>df</Code> покажет не номинальные 200 МБ, а сколько реально занято и свободно.</p>
        <p className="mt-4">Запомни или сфотографируй свободное место сейчас и сравни после нескольких обновлений ядра. Если заполнение стабильно, ничего не трогай. Если свободное место быстро уменьшается или раздел подходит к 80-90%, не удаляй файлы вручную: сначала покажи вывод команд и разберемся, что именно выросло.</p>
        <Disclosure title="Посмотреть, что занимает EFI, ничего не удаляя">
          <CodeSnippet code="sudo du -h --max-depth=2 /boot/efi | sort -h" label="Безопасный просмотр размеров каталогов EFI" />
        </Disclosure>
        <Disclosure title="Когда отдельный SSD все-таки понадобится">
          Не сейчас, если все работает. Отдельный SSD имеет смысл при будущей чистой переустановке, постоянной нехватке места в EFI или желании полностью развязать загрузчики Windows и Nobara. Для текущей системы важнее периодическая проверка свободного места, чем операция на разделах ради красивой схемы.
        </Disclosure>
      </ActionRow>
    </SectionCard>
  );
}

function FirstStart() {
  return (
    <SectionCard id="start" number="02" title="База после установки" description="Система уже запускалась, но эти проверки все равно делаем один раз: штатное обновление, кодеки и понятная схема программ.">
      <ActionRow id="welcome" title="Открой Nobara Welcome">
        Это стартовая панель самой Nobara, а не реклама. Слева открой <Code>First Steps</Code>. Отсюда запускаются обновление, менеджер драйверов и рекомендованные дополнения. На RX 580 обычный графический драйвер AMD уже находится в системе. <Code>rocm-meta</Code> и экспериментальный <Code>mesa-vulkan-drivers-git</Code> для обычных игр не нужны.
      </ActionRow>

      <ActionRow id="sync" title="Обнови систему штатным способом" status="важно">
        В Nobara Welcome нажми <Code>Update my system</Code>. Откроется Nobara System Updater внутри DNF App Center. Нажми <Code>Select All and Update</Code> и дождись строки <Code>System Update: System update completed successfully</Code> в журнале.
        <p className="mt-5">Не обновляй всю Nobara обычной командой DNF. Штатный обновлятор проверяет репозитории, синхронизирует версии, применяет исправления Nobara и умеет вернуть пакет к нужной версии, если его откатили. Обычный DNF всех этих действий не делает.</p>
        <Disclosure title="Если кнопка Update my system не открывается">
          <p className="mb-4">Открой Konsole и запусти тот же штатный механизм вручную. <Code>sudo</Code> перед командой не ставь: обновлятор сам попросит пароль в нужный момент.</p>
          <CodeSnippet code="nobara-sync" label="Запустить Nobara Updater через Konsole" />
          <p className="mb-4 mt-5">Если синхронизация завершилась конфликтом, используй встроенное восстановление и повтори обычный запуск:</p>
          <div className="space-y-3">
            <CodeSnippet code="nobara-sync repair" label="Исправить состояние пакетов" />
            <CodeSnippet code="nobara-sync" label="Повторить штатное обновление" />
          </div>
        </Disclosure>
        <Disclosure title="Если нужно показать журнал ошибки">
          <p className="mb-4">Команда берет последний журнал Nobara Updater и отправляет его в сервис npaste. Перед отправкой все равно просмотри текст и убедись, что там нет личных данных.</p>
          <CodeSnippet code="cat ~/.local/share/nobara-updater/nobara-sync.log | npaste" label="Получить ссылку на журнал обновления" />
        </Disclosure>
        <Disclosure title="Обновить RPM и пользовательские Flatpak вместе">
          <p className="mb-4">DNF App Center обновляет RPM. Ключ <Code>--all</Code> дополнительно обновит Flatpak-приложения текущего пользователя.</p>
          <CodeSnippet code="nobara-sync --all" label="RPM и Flatpak одной командой" />
        </Disclosure>
        <Disclosure title="После обновления одна из частей системы не запускается">
          <p className="mb-4">Сначала посмотри, есть ли упавшая служба, и серьезные сообщения только текущей загрузки. Эти команды ничего не исправляют и не удаляют.</p>
          <div className="space-y-3">
            <CodeSnippet code="systemctl --failed" label="Показать службы, которые не смогли запуститься" />
            <CodeSnippet code="journalctl -b -p err..alert --no-pager" label="Показать серьезные ошибки текущей загрузки" />
          </div>
          <p className="mt-4">Пустой список служб - хороший результат. Красная строка в журнале еще не доказывает причину: смотри время, имя службы и действие прямо перед ошибкой. Не вставляй первую попавшуюся команду из старого ответа для Fedora.</p>
        </Disclosure>
      </ActionRow>

      <ActionRow id="codecs" title="На вопрос о Media Codecs ответь YES" status="не пропускай">
        Кодеки нужны системе, чтобы читать и записывать H.264, H.265 и другие распространенные форматы. Без них может не воспроизводиться видео, не работать аппаратное кодирование OBS или появиться черный экран в браузере. Nobara сама показывает этот вопрос во время первого обновления. Нажми <strong className="text-white">YES</strong> и дождись завершения.
      </ActionRow>

      <ActionRow id="apps" title="Поставь qBittorrent, Vesktop и Chrome через Flatpak">
        <p>
          <strong className="text-white">Flatpak</strong> - отдельный формат приложений. Программа приходит вместе с подходящей средой выполнения и запускается с ограниченным доступом к системе. <strong className="text-white">Flathub</strong> - основной каталог Flatpak, который в Nobara уже включен по умолчанию. Nobara не подключает урезанные Fedora Flatpak-репозитории, а использует официальный Flathub.
        </p>
        <p className="mt-4">
          Для обычных пользовательских программ официальная Wiki советует Flatpak, чтобы не набивать систему дополнительными RPM-пакетами и сторонними репозиториями. qBittorrent, Vesktop и Chrome не должны менять ядро, драйверы или графический стек, поэтому изоляция им не мешает. Зато удалить их можно без ковыряния системных зависимостей.
        </p>

        <h4 className="mt-5 font-semibold text-white">Почему не DNF App Center?</h4>
        <p className="mt-2">
          DNF App Center предназначен для нативных RPM-пакетов и системных обновлений. Он нормально устанавливает приложения из RPM-репозиториев, но Flatpak и пользовательские установки Flathub через DNF не обслуживает. Поэтому это не плохой магазин, а инструмент для другого слоя системы. Команда ниже дана не потому, что терминал круче. Она просто сразу фиксирует Flathub, точные приложения и режим <Code>User</Code>.
        </p>
        <p className="mt-4">
          Если хочется графический Flatpak-магазин, открой Nobara Welcome - <Code>Recommended Additions</Code> и поставь <Code>Bazaar</Code>. В некоторых установках уже есть <Code>Flatpost</Code>, он решает ту же задачу. Найди приложения по названию и выбери установку для пользователя. Discover на этом ПК удален, возвращать его ради Flatpak не нужно.
        </p>

        <CodeSnippet code="flatpak install --user flathub org.qbittorrent.qBittorrent dev.vencord.Vesktop com.google.Chrome" label="Три приложения из Flathub, только для твоего пользователя" className="mt-6" />
        <p className="mt-5">Подтверди список клавишей <Code>Y</Code>, если Flatpak спросит разрешение. После установки все три программы появятся в меню Plasma. Запусти каждую один раз. Если Chrome и Vesktop открываются, а qBittorrent показывает главное окно, установка закончена.</p>
        <Disclosure title="Если команда пишет, что репозиторий flathub не найден">
          <p className="mb-4">В нормальной Nobara Flathub уже подключен. Если его запись пропала, верни официальный репозиторий только для своей учетной записи, а затем повтори установку.</p>
          <div className="space-y-3">
            <CodeSnippet code="flatpak remote-add --user --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo" label="Вернуть пользовательский Flathub" />
            <CodeSnippet code="flatpak install --user flathub org.qbittorrent.qBittorrent dev.vencord.Vesktop com.google.Chrome" label="Повторить установку" />
          </div>
        </Disclosure>

        <Settings className="mt-5">
          <Setting label="DNF App Center" value="RPM-пакеты и система" />
          <Setting label="Nobara System Updater" value="Правильное обновление Nobara" />
          <Setting label="Bazaar или Flatpost" value="Графический Flatpak из Flathub" />
          <Setting label="flatpak install --user" value="Flatpak через Konsole" />
        </Settings>

        <Disclosure title="Почему режим User, а не System">
          <p><Code>User</Code> ставит приложение только для твоей учетной записи и не требует раскладывать его по всей системе. Официальная Wiki рекомендует этот режим. Главное - не смешивать User и System, иначе одинаковые среды выполнения могут храниться дважды и жрать место.</p>
          <p className="mt-3">Минус Flatpak тоже есть: общие среды выполнения занимают дополнительное место. Это не магия и не всегда самый маленький пакет. Здесь приоритет - чистая система и понятное обновление.</p>
        </Disclosure>

        <Disclosure title="Когда нужен нативный RPM, а не Flatpak">
          Steam, Lutris, Gamescope, MangoHud, OBS Studio, Prism Launcher, Blender и Kdenlive официальная Wiki советует ставить из репозиториев Nobara. Им важны драйверы, аппаратное кодирование, игровые хуки или плагины. Для них открывай DNF App Center или Recommended Additions, а не Flathub.
        </Disclosure>

        <Disclosure title="Как обновить или удалить эти Flatpak">
          <div className="space-y-3">
            <CodeSnippet code="flatpak update --user -y" label="Обновить все Flatpak твоего пользователя" />
            <CodeSnippet code="flatpak uninstall --user org.qbittorrent.qBittorrent dev.vencord.Vesktop com.google.Chrome" label="Удалить эти три приложения" />
          </div>
        </Disclosure>
      </ActionRow>

      <ActionRow id="disks" title="Подключи игровые диски через Drive Mount Manager">
        Открой Nobara Drive Mount Manager, отметь нужный раздел и перезагрузи ПК. Менеджер закрепит постоянную точку подключения. Без этого диск может появляться только после ручного клика в Dolphin, а PortProton или игровая библиотека при старте не найдут старый путь.
        <Disclosure title="Где потом искать диск и как отменить автомонтирование">
          Обычно раздел будет доступен по пути <Code>/run/media/твой_пользователь/uuid</Code>. UUID - постоянный идентификатор раздела. Именно этот путь указывай в игровых программах. Для отката открой Drive Mount Manager, сними галочку с раздела и перезагрузи ПК.
        </Disclosure>
        <Disclosure title="Можно ли держать одну библиотеку игр на NTFS для Windows и Nobara">
          Официальная Wiki не рекомендует общую Steam-библиотеку на NTFS. Права доступа, символические ссылки и Wine-префиксы на NTFS часто создают проблемы. Для нового игрового диска лучше <Code>ext4</Code>. Общий NTFS можно оставить для фильмов, установщиков и обычных файлов, но префиксы и Linux-библиотеку держи на Linux-разделе.
        </Disclosure>
      </ActionRow>
    </SectionCard>
  );
}

function Display() {
  return (
    <SectionCard id="display" number="03" title="Мониторы и мышь" description="Acer работает на 75 Гц, ViewSonic на 60 Гц. Каждый экран настраивается отдельно.">
      <ActionRow id="monitors" title="Выставь правильную частоту и расположение">
        Открой Параметры системы - Экран и монитор - Конфигурация экрана. Выбери каждый прямоугольник по очереди, выставь частоту и перетащи экраны так, как они стоят на столе. Назначь Acer основным.
        <Settings className="mt-4">
          <Setting label="Acer" value="75 Гц / основной" />
          <Setting label="ViewSonic" value="60 Гц / второй" />
          <Setting label="Сеанс" value="Wayland" />
        </Settings>
        <p className="mt-4">Wayland здесь отвечает за вывод окон и ввод. Это не отдельная версия Nobara и не драйвер. Оставь его, Nobara и современная Plasma ориентированы именно на Wayland. После «Применить» курсор должен переходить между экранами в правильном месте. Если экран погас, не подтверждай изменение: Plasma сама вернет прошлую конфигурацию после обратного отсчета.</p>
      </ActionRow>

      <ActionRow id="adaptive" title="Проверь Adaptive Sync">
        Adaptive Sync подстраивает обновление экрана под частоту кадров игры и уменьшает разрывы картинки. Если пункт доступен, сначала поставь <Code>Automatic</Code>. Запусти игру, потом видео на втором мониторе и подвигай курсор между экранами.
        <p className="mt-4">Если появляются мигание, рывки курсора или странное поведение второго монитора, поставь <Code>Never</Code> на обоих экранах и проверь еще раз. Разная частота 75 и 60 Гц плюс старая RX 580 иногда конфликтуют с VRR. Не дергается - оставь Automatic и больше не трогай.</p>
      </ActionRow>

      <ActionRow id="mouse" title="Поставь профиль мыши Flat">
        Путь: Параметры системы - Мышь - Профиль ускорения - <Code>Flat</Code>. В Windows ускорение меняет расстояние в зависимости от скорости руки. Flat убирает эту зависимость и дает движение ближе к 1:1. Сам ползунок скорости выставь по ощущениям. Если курсор стал непривычным, верни профиль <Code>Adaptive</Code>: это обычная настройка, а не необратимый твик.
      </ActionRow>

      <ActionRow id="desktop" title="Настрой KWallet и отключи Baloo, если он мешает">
        KWallet хранит пароли и токены приложений. Безопасный вариант - пароль кошелька, совпадающий с паролем входа, чтобы Plasma открывала его автоматически. Пустой пароль убирает запросы, но сохраненные данные будут защищены хуже. Полностью отключать кошелек стоит только если приложения не зависят от него.
        <p className="mt-4">Baloo индексирует имена и содержимое файлов ради быстрого поиска. На небольшом NVMe или во время первой индексации он может создавать лишнюю нагрузку. Если поиск по содержимому не нужен, отключи его.</p>
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
    <SectionCard id="lact" number="04" title="RX 580 и LACT" description="LACT уже установлен. Сначала проверяем службу, карту и датчики, только потом разрешаем управление напряжением.">
      <ActionRow id="lact-install" title="Проверь установленный LACT и службу lactd">
        LACT уже стоит, поэтому переустанавливать его поверх рабочей системы не надо. Сначала открой Konsole и проверь пакет, автозапуск фоновой службы и ее текущее состояние.
        <CodeSnippet code={"rpm -q lact\nsystemctl is-enabled lactd\nsystemctl is-active lactd"} label="Проверить пакет, автозапуск и текущее состояние" className="mt-6" />
        <p className="mt-5">Первая строка должна показать имя и версию пакета, вторая - <Code>enabled</Code>, третья - <Code>active</Code>. Затем открой LACT из меню Plasma. В окне должны определиться RX 580, текущая температура, частота ядра и скорость вентиляторов.</p>
        <p className="mt-4">Пока это просто проверка. Не нажимай «Применить» и не включай автоматическую загрузку профиля, если не сохранил исходные значения. Скриншот стартового экрана LACT уже будет нормальной точкой отката.</p>
        <Disclosure title="Пакет есть, но служба inactive или disabled">
          <p className="mb-4">Включи службу сейчас и добавь ее в автозапуск. Затем снова проверь статус и открой LACT.</p>
          <div className="space-y-3">
            <CodeSnippet code="sudo systemctl enable --now lactd" label="Включить lactd сейчас и при следующих загрузках" />
            <CodeSnippet code="systemctl is-active lactd" label="Убедиться, что ответ теперь active" />
          </div>
        </Disclosure>
        <Disclosure title="Служба не запускается или LACT не видит карту">
          <p className="mb-4">Последние 80 строк журнала обычно называют причину. Эта команда ничего не меняет.</p>
          <CodeSnippet code="journalctl -u lactd -b --no-pager -n 80" label="Посмотреть журнал lactd текущей загрузки" />
          <p className="mb-4 mt-5">Если после включения службы появились проблемы, останови ее и убери из автозапуска. Управление драйвером AMD вернется к обычным настройкам ядра.</p>
          <CodeSnippet code="sudo systemctl disable --now lactd" label="Отключить службу LACT" />
        </Disclosure>
        <Disclosure title="Только если rpm сообщает, что LACT не установлен">
          <p className="mb-4">Тогда установленного пакета действительно нет. Поставь нативную версию из репозитория Nobara и включи службу.</p>
          <CodeSnippet code={"sudo dnf install lact -y\nsudo systemctl enable --now lactd"} label="Запасная установка из репозитория Nobara" />
          <p className="mt-3">Сторонний COPR для LACT не подключай. Для этой утилиты сначала используется пакет из репозитория Nobara.</p>
        </Disclosure>
      </ActionRow>

      <ActionRow id="lact-mask" title="Если напряжение скрыто, разреши управление RX 580" status="только при необходимости">
        Сначала открой вкладку настройки GPU в LACT. Если управление напряжением уже доступно, весь этот шаг пропусти. Если ползунков нет, драйвер AMD скрывает ручное управление. Для RX 580 на архитектуре Polaris можно добавить условный параметр ядра.
        <CodeSnippet code="sudo grubby --update-kernel=ALL --args='amdgpu.ppfeaturemask=0xfffd7fff'" label="Добавить параметр ко всем ядрам" className="mt-6" />
        <p className="mt-5">Полностью перезагрузи ПК и снова открой LACT. Ползунки напряжения должны появиться. Убедиться, что ядро действительно получило параметр, можно без изменения системы:</p>
        <CodeSnippet code="cat /proc/cmdline | grep -o 'amdgpu.ppfeaturemask=[^ ]*'" label="Проверить параметр после перезагрузки" className="mt-4" />
        <Disclosure title="Что означает маска 0xfffd7fff">
          Маска открывает управление питанием и напряжением, но не включает вообще все экспериментальные функции подряд. Для Polaris это консервативнее, чем маска из одних единиц. Она также отключает GFXOFF и Stutter Mode, поэтому на отдельных картах может немного вырасти потребление в простое.
        </Disclosure>
        <Disclosure title="Ползунки не появились или после команды начались проблемы">
          <p className="mb-4">Если проверка выше ничего не вывела, параметр не применился - не переходи к андервольту. Если появились черный экран, артефакты, странности двух мониторов или выросло потребление, удали ровно тот же параметр и перезагрузи ПК.</p>
          <CodeSnippet code="sudo grubby --update-kernel=ALL --remove-args='amdgpu.ppfeaturemask=0xfffd7fff'" label="Полный откат параметра" />
        </Disclosure>
      </ActionRow>

      <ActionRow id="undervolt" title="Начни с 1125 мВ и тестируй шагами">
        Андервольт снижает напряжение видеокарты. Цель - меньше нагрева и шума без потери стабильности. Он не гарантирует одинаковый результат на двух RX 580, даже если модели совпадают.
        <p className="mt-4">Сохрани исходный профиль. Поставь 1125 мВ и запусти тяжелую реальную игру на 15-30 минут. Если нет цветных точек, полос, вылета драйвера или черного экрана, снижай по 10-15 мВ. При первой ошибке верни последнее стабильное значение. Не начинай с 1065 мВ, карта тебе ничего не должна.</p>
        <div className="mt-5"><LactCalculator /></div>
        <Disclosure title="Быстрый откат нестабильного профиля">
          Открой LACT и загрузи сохраненный исходный профиль или нажми сброс параметров видеокарты. Не включай автоматическое применение нового андервольта при запуске, пока он не пережил несколько игр и хотя бы одну полную перезагрузку.
        </Disclosure>
        <Disclosure title="Простой профиль вентиляторов">
          <Settings>
            <Setting label="40°C" value="28%" />
            <Setting label="55°C" value="45%" />
            <Setting label="68°C hotspot" value="70%" />
            <Setting label="80°C" value="90%" />
          </Settings>
          <p className="mt-4">Это стартовый пример, а не обязательная кривая. Смотри на hotspot и шум своей карты. Если вентиляторы резко прыгают между соседними точками, разнеси точки по температуре.</p>
        </Disclosure>
      </ActionRow>
    </SectionCard>
  );
}

function Games() {
  return (
    <SectionCard id="games" number="05" title="Игры без привязки к одному лаунчеру" description="PortProton, Lesta Game Center и Tanks Blitz уже стоят. Используем их как контрольный пример, а дальше строим понятную схему для любой игры.">
      <ActionRow id="portproton" title="Проверь уже установленную игровую основу">
        Открой PortProton из меню Plasma, затем запусти уже установленный Lesta Game Center и из него Tanks Blitz. Ничего не переустанавливай поверх рабочей копии. Задача этого прохода - убедиться, что лаунчер входит в аккаунт, игра показывает картинку, слышит звук и нормально закрывается обратно в PortProton.
        <p className="mt-4">Если хочется уточнить тип установки PortProton, проверь RPM-пакет:</p>
        <CodeSnippet code="rpm -q portproton" label="Посмотреть версию RPM-пакета PortProton" className="mt-4" />
        <p className="mt-4">Команда покажет имя и версию, если PortProton установлен как RPM. Ответ <Code>package portproton is not installed</Code> при рабочем приложении означает, что его могли поставить другим способом. Это не повод удалять рабочую установку: сначала посмотри свойства ярлыка и откуда он запускается.</p>
        <Disclosure title="PortProton открывается, но игры не показывают картинку">
          <p className="mb-4">Убедись, что Vulkan видит RX 580. В сводке должно быть имя AMD Radeon RX 580 и версии Vulkan. Команда ничего не меняет.</p>
          <CodeSnippet code="vulkaninfo --summary" label="Проверить Vulkan и видеокарту" />
          <p className="mt-4">Если команды нет, установи утилиту <Code>vulkan-tools</Code> через DNF App Center. Если RX 580 отсутствует в выводе, сначала закончи штатное обновление Nobara и перезагрузи ПК. Не ставь случайный драйвер с сайта AMD поверх Mesa.</p>
        </Disclosure>
        <Settings className="mt-5">
          <Setting label="PortProton" value="Оболочка для Windows-программ" />
          <Setting label="Lesta Game Center" value="Уже установленный лаунчер-пример" />
          <Setting label="Tanks Blitz" value="Контрольный запуск графики и звука" />
          <Setting label="Новые игры" value="Отдельный префикс для каждой" />
        </Settings>
        <Disclosure title="Что такое Wine, Proton и префикс">
          Wine создает для Windows-программы знакомую структуру диска C и переводит ее системные вызовы. Proton добавляет игровые исправления поверх Wine. Префикс - отдельная папка с виртуальным диском C, реестром и библиотеками одной игры или одного лаунчера. Это не виртуальная машина, и отдельная Windows туда не устанавливается.
        </Disclosure>
        <Disclosure title="Проверь Tanks Blitz как контрольный пример">
          Поиграй 10-15 минут, один раз свернись на рабочий стол, вернись в игру и нормально выйди через меню. Одновременно посмотри в LACT температуру и частоты RX 580. Если этот пример стабилен, графический драйвер, Vulkan, Wine-окружение и звук уже прошли базовый тест. Это не означает, что любая другая игра гарантированно запустится: античит и конкретный лаунчер могут иметь свои ограничения.
        </Disclosure>
      </ActionRow>

      <ActionRow id="prefixes" title="Добавляй другие игры по одной понятной схеме">
        Сначала выясни, какая перед тобой игра. Нативная Linux-версия запускается без Wine. Windows-игра из Steam обычно работает через Proton внутри нативного Steam. Отдельный <Code>setup.exe</Code> или чужой лаунчер удобнее запускать через PortProton. Не надо пихать каждую игру в префикс Lesta только потому, что он уже создан.
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-6 text-zinc-200">
          <li><strong className="text-white">Steam-игра.</strong> Поставь нативный Steam из репозитория Nobara, открой свойства конкретной игры и включай Proton только для нее, если Linux-версии нет.</li>
          <li><strong className="text-white">Обычный Windows-установщик.</strong> Открой файл через PortProton, создай новый префикс с понятным именем и устанавливай игру туда.</li>
          <li><strong className="text-white">Отдельный лаунчер.</strong> Сначала проверь каталог автоустановки PortProton. Готовый сценарий обычно безопаснее ручной установки компонентов.</li>
          <li><strong className="text-white">Онлайн-игра с античитом.</strong> До скачивания проверь поддержку Linux и Proton. Если античит запрещает запуск, десять случайных DLL его не уговорят, он только посмеется над твоим вечером.</li>
        </ol>
        <p className="mt-5">В стороннем установщике сними галочки DirectX и Visual C++, если PortProton сам предлагает зависимости для выбранного префикса. Меняй за раз только одну вещь: версию Wine/Proton, графический API или набор библиотек. Иначе после пяти «фиксов» ты не узнаешь, какой из них все сломал.</p>
        <Disclosure title="Универсальная диагностика игры, которая не запустилась">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Закрой игру и перезапусти только ее, не весь ПК.</li>
            <li>Открой журнал запуска PortProton и сохрани последние строки с <Code>error</Code> или <Code>failed</Code>.</li>
            <li>Проверь, находится ли префикс на Linux-разделе, а игровой диск подключен через Drive Mount Manager.</li>
            <li>Попробуй свежий отдельный префикс, не удаляя рабочий или старый.</li>
            <li>Смени только версию Proton/Wine и повтори тест. Если стало хуже, верни прошлую.</li>
            <li>Для сетевой игры отдельно проверь античит и состояние серверов.</li>
          </ol>
          <p className="mt-3">Скрин последней ошибки и журнал полезнее сообщения «не запускается». Если окно исчезло без сообщения, сразу после сбоя сохрани журнал пользовательского сеанса:</p>
          <CodeSnippet code="journalctl --user -b --since '-10 min' --no-pager" label="События приложений за последние 10 минут" className="mt-4" />
          <p className="mt-3">Перед публикацией журнала убери токены, логины и полный путь, если в нем видно настоящее имя.</p>
        </Disclosure>
        <Disclosure title="Игра лежит на диске Windows">
          Сам установщик можно прочитать с NTFS, но префикс лучше создать на ext4 или btrfs. Wine активно использует права доступа и ссылки Linux, которых на NTFS нет. Если появилась странная ошибка прав или файлов, первым делом перенеси префикс на Linux-раздел. Не используй один и тот же префикс одновременно из Windows и Nobara.
        </Disclosure>
        <Disclosure title="Удалить сломанный префикс и начать заново">
          В PortProton выбери именно префикс проблемной игры и используй его штатное удаление. Это сотрет виртуальный диск C, настройки и локальные сохранения внутри него, но не обязано удалить файлы самой игры. Сначала убедись, что облачная синхронизация игры завершилась. Никогда не удаляй папку руками, пока не сверил ее путь.
        </Disclosure>
        <Disclosure title="Как захватывать разные игры в OBS">
          Для Vulkan, DXVK и VKD3D нативная сборка OBS Nobara включает Game Capture глобально. Для OpenGL-игры из Steam добавь параметр ниже. Если конкретная игра все равно не ловится, используй захват окна, а не всего экрана с уведомлениями и личной перепиской.
          <CodeSnippet code="obs-gamecapture %command%" label="Параметры запуска Steam только для OpenGL" className="mt-3" />
        </Disclosure>
      </ActionRow>
    </SectionCard>
  );
}

function Obs() {
  return (
    <SectionCard id="obs" number="06" title="OBS и VK Видео Live" description="Собираем нативный OBS, отдельный звук PipeWire и безопасный тестовый эфир. Сразу стримить в боевой аккаунт без прогона - храбро, но тупо.">
      <ActionRow id="obs-video" title="Проверь нативный OBS и настрой VAAPI H.264">
        Открой OBS из меню. Если его еще нет, поставь <Code>obs-studio</Code> через Nobara Welcome - Recommended Additions или DNF App Center - Packages. Версию из Flathub здесь не используй. Нативная сборка Nobara лучше дружит с системным VAAPI и игровыми плагинами захвата.
        <p className="mt-4">Открой Настройки - Вывод, выбери расширенный режим и вкладку Трансляция. Для первого стабильного теста на RX 580 используй профиль 720p60. Это не вечный потолок качества, а нормальная отправная точка, которая оставляет игре запас видеокарты.</p>
        <Settings className="mt-4">
          <Setting label="Энкодер" value="FFmpeg VAAPI H.264" />
          <Setting label="Управление битрейтом" value="CBR" />
          <Setting label="Битрейт" value="5000 Кбит/с" />
          <Setting label="Ключевые кадры" value="2 секунды" />
          <Setting label="Профиль" value="High" />
          <Setting label="Выходное видео" value="1280x720 / 60 FPS" />
        </Settings>
        <p className="mt-4">VAAPI переносит кодирование на видеоблок RX 580, поэтому Ryzen 5 2600 не должен кодировать весь эфир программно. Нагрузка процессора все равно не станет нулевой: OBS собирает сцену, масштабирует источники, смешивает звук и обслуживает браузерные виджеты.</p>
        <Disclosure title="Какие параметры VK разрешает для более высокого качества">
          <Settings>
            <Setting label="720p60" value="2250-6000 Кбит/с" />
            <Setting label="1080p30" value="3000-6000 Кбит/с" />
            <Setting label="1080p60" value="4500-9000 Кбит/с" />
            <Setting label="Аудио" value="до 320 Кбит/с" />
          </Settings>
          <p className="mt-4">После успешного теста попробуй 1920x1080 30 FPS при 6000 Кбит/с. Затем, если игра, кодировщик и сеть стабильны, можно тестировать 1080p60 при 7000-8000 Кбит/с. Не повышай разрешение, FPS и битрейт одновременно: иначе статистика скажет только «все стало хуже», но не объяснит почему.</p>
        </Disclosure>
        <Disclosure title="Энкодера VAAPI H.264 нет в списке">
          <p className="mb-3">Сначала закончи обновление Nobara и установку Media Codecs, затем перезапусти ПК. Если пункт не появился, проверь, видит ли VAAPI профили H.264:</p>
          <CodeSnippet code="vainfo | grep -i h264" label="Показать аппаратные профили H.264" />
          <p className="mt-3">Строки с <Code>VAProfileH264</Code> означают, что драйвер умеет этот формат. Если команда не найдена, пакет проверки ставится через <Code>sudo dnf install libva-utils -y</Code>. Если команда есть, а профилей нет, не подключай случайный Mesa из COPR: сначала повтори <Code>nobara-sync</Code> и проверь кодеки.</p>
        </Disclosure>
        <Disclosure title="Как добавить захват игры">
          В блоке Источники нажми <Code>+</Code>, выбери <Code>Game Capture</Code> и запусти игру. Для Vulkan, DXVK и VKD3D сборка Nobara подключает Game Capture глобально. Если конкретная игра не ловится, попробуй Захват окна. Захват всего экрана оставляй последним вариантом, иначе личное уведомление однажды тоже станет звездой VK.
        </Disclosure>
      </ActionRow>

      <ActionRow id="obs-audio" title="Собери сцену и раздели звук через PipeWire">
        PipeWire - звуковая система Nobara. В Источниках нажми <Code>+</Code> и добавь <Code>Application Audio Capture</Code> отдельно для игры и Vesktop. Добавь микрофон как источник входного аудио. Если используешь отдельные источники приложений, отключи глобальное Desktop Audio, иначе один и тот же звук попадет в эфир дважды с эхом.
        <Settings className="mt-4">
          <Setting label="Игра" value="Application Audio Capture" />
          <Setting label="Vesktop" value="Отдельный Application Audio Capture" />
          <Setting label="Микрофон" value="Mic/Aux или источник входа" />
          <Setting label="Пики голоса" value="примерно -10 ... -6 dB" />
          <Setting label="Пики игры" value="примерно -25 ... -15 dB" />
        </Settings>
        <p className="mt-4">На дорожке прямого эфира должны быть отмечены все источники, которые зритель обязан слышать. Отдельные дорожки полезны прежде всего для локальной записи и монтажа. Сделай один хлопок перед микрофоном и посмотри запись: так проще заметить задержку между голосом и картинкой.</p>
        <Disclosure title="Нет пункта Application Audio Capture">
          <CodeSnippet code="sudo dnf install obs-studio-plugin-pipewire-audio-capture -y" label="Добавить нативный плагин PipeWire" />
          <p className="mt-3">После установки полностью закрой OBS и открой снова. Пункт появится в списке источников.</p>
        </Disclosure>
        <Disclosure title="DonationAlerts через Browser Source">
          В Источниках нажми <Code>+</Code>, выбери <Code>Браузер</Code> и вставь приватную ссылку виджета DonationAlerts. CEF уже входит в нативную сборку OBS от Nobara, отдельный браузерный плагин с левого сайта не нужен. Не показывай адрес виджета на стриме и не публикуй его вместе с коллекцией сцен.
        </Disclosure>
        <Disclosure title="Если пропал весь звук в OBS">
          <p className="mb-4">Сначала проверь, не выключен ли источник значком динамика и двигается ли его шкала. Затем выбери приложение в свойствах источника заново. Если звука нет только в OBS, PipeWire не перезапускай - не надо чинить сервер, если виновата одна кнопка.</p>
          <p className="mb-4">Только если звук исчез во всей системе, перезапусти три звуковые службы своего сеанса. На несколько секунд звук пропадет, затем устройства должны появиться снова.</p>
          <CodeSnippet code="systemctl --user restart pipewire pipewire-pulse wireplumber" label="Перезапустить звук без перезагрузки ПК" />
        </Disclosure>
      </ActionRow>

      <ActionRow id="stream-test" title="Подключи VK Видео Live и проведи тестовый эфир">
        В студии VK Видео Live создай трансляцию и скопируй адрес сервера RTMP и ключ. В OBS открой Настройки - Трансляция, выбери службу <Code>Настраиваемый</Code>, вставь адрес в поле Сервер, а секретную строку в поле Ключ трансляции. Ключ работает как пароль: не показывай его в скриншотах, не отправляй в чат и сбрось в студии VK, если он засветился.
        <p className="mt-4">Сначала сделай локальную запись на 10 минут в формате MKV: запусти игру, активно подвигайся, поговори в микрофон, открой оверлей и один раз свернись. MKV безопаснее MP4 при сбое питания. После записи OBS умеет преобразовать файл в MP4 через меню Файл - Ремультиплексировать записи.</p>
        <p className="mt-4">Потом проведи короткий контролируемый эфир в VK, не анонсируя его как большой старт. Открой Вид - Статистика и смотри показатели во время игры. Цель - чтобы счетчики не росли постоянно.</p>
        <Settings className="mt-4">
          <Setting label="Пропущенные кадры рендера" value="Снизить графику или ограничить FPS игры" />
          <Setting label="Пропущенные кадры кодирования" value="Снизить выход до 720p60 или 1080p30" />
          <Setting label="Потерянные кадры сети" value="Провод, ниже битрейт, проверить загрузку сети" />
          <Setting label="Звук идет дважды" value="Отключить Desktop Audio или дубль источника" />
        </Settings>
        <p className="mt-4">Для стрима в 60 FPS ограничь игру на 60 FPS хотя бы на тест. Монитор Acer умеет 75 Гц, но забитая под 100% RX 580 не оставит OBS места на сборку кадра. Ровные 60 для зрителя лучше, чем 75 у тебя плюс презентация PowerPoint в эфире.</p>
        <Disclosure title="Перед первым настоящим эфиром">
          Дай профилю и коллекции сцен понятные названия, еще раз проверь микрофон, игру и Browser Source. Не публикуй коллекцию сцен: внутри могут находиться приватные URL браузерных виджетов. Сам ключ VK безопаснее не хранить в заметках вообще.
        </Disclosure>
        <Disclosure title="Как откатить неудачную настройку качества">
          Верни стартовые 1280x720, 60 FPS и 5000 Кбит/с, перезапусти OBS и повтори тот же участок игры. Если проблема исчезла, повышай только один параметр за тест. Если не исчезла, проверь статистику: уменьшение битрейта не лечит перегрузку рендера, а снижение графики не лечит плохой Wi-Fi.
        </Disclosure>
      </ActionRow>
    </SectionCard>
  );
}

function DualBoot() {
  return (
    <SectionCard id="dualboot" number="07" title="Windows 11 рядом с Nobara" description="Две системы должны делить часы, загрузку и иногда диски. Настроим это без магии.">
      <Warning>
        У тебя обе системы уже загружаются с одного NVMe и общего EFI. Не меняй разметку ради этого раздела. Здесь мы только согласуем часы и меню запуска, а состояние EFI контролируем командами из первого раздела.
      </Warning>

      <ActionRow id="windows-time" title="Отключи Fast Startup и переведи Windows в UTC">
        Linux хранит аппаратные часы в UTC, а Windows по умолчанию считает их местным временем. Из-за этого после переключения системы часы могут уезжать. Отдельно Fast Startup сохраняет часть состояния Windows на диск вместо полного выключения: Nobara после этого может увидеть NTFS-раздел как небезопасно закрытый и отказаться писать на него.
        <p className="mt-5">Загрузи Windows, нажми правой кнопкой по кнопке Пуск и открой Терминал от имени администратора. Выполни две команды по очереди:</p>
        <div className="mt-4 space-y-3">
          <CodeSnippet code="powercfg /h off" label="Отключить гибернацию и Fast Startup" />
          <CodeSnippet code={'reg add "HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Control\\TimeZoneInformation" /v RealTimeIsUniversal /d 1 /t REG_DWORD /f'} label="Хранить аппаратные часы в UTC" />
        </div>
        <p className="mt-5">Windows должна ответить, что операция выполнена успешно. Полностью выключи ее, загрузи Nobara и оставь Linux в обычном режиме UTC:</p>
        <CodeSnippet code={"timedatectl set-local-rtc 0\ntimedatectl status"} label="Konsole в Nobara: применить и проверить UTC" className="mt-4" />
        <p className="mt-4">В проверке ожидается <Code>RTC in local TZ: no</Code>. После полной перезагрузки обе системы должны показывать одно правильное местное время, а NTFS-разделы Windows не должны оставаться заблокированными Fast Startup.</p>
        <Disclosure title="Вернуть стандартные часы Windows и гибернацию">
          <p className="mb-4">В Windows снова открой Терминал от имени администратора и выполни обе команды:</p>
          <div className="space-y-3">
            <CodeSnippet code={'reg delete "HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Control\\TimeZoneInformation" /v RealTimeIsUniversal /f'} label="Удалить настройку UTC" />
            <CodeSnippet code="powercfg /h on" label="Вернуть гибернацию" />
          </div>
        </Disclosure>
      </ActionRow>

      <ActionRow id="grub" title="Показывай меню GRUB 10 секунд">
        GRUB - меню, которое появляется до запуска системы и позволяет выбрать Nobara или Windows. Первая команда отключает скрытие меню, вторая задает паузу, третья пересобирает конфигурацию.
        <div className="mt-4 space-y-3">
          <CodeSnippet code="sudo grub2-editenv - unset menu_auto_hide" label="Всегда показывать меню" />
          <CodeSnippet code="sudo sed -i 's/^GRUB_TIMEOUT=.*/GRUB_TIMEOUT=10/' /etc/default/grub" label="Ждать выбор 10 секунд" />
          <CodeSnippet code="sudo grub2-mkconfig -o /boot/grub2/grub.cfg" label="Применить конфигурацию" />
        </div>
        <p className="mt-4">После перезагрузки меню должно показываться около 10 секунд, а внутри должны быть Nobara и Windows Boot Manager.</p>
        <Disclosure title="Меню есть, но пункта Windows Boot Manager нет">
          <p className="mb-4">Не форматируй EFI и не копируй случайные команды восстановления загрузчика. Сначала посмотри записи UEFI и файлы общего EFI-раздела. Команды ниже ничего не меняют.</p>
          <div className="space-y-3">
            <CodeSnippet code="sudo efibootmgr -v" label="Показать загрузочные записи платы" />
            <CodeSnippet code="find /boot/efi/EFI -maxdepth 2 -type f" label="Показать файлы загрузчиков в EFI" />
          </div>
          <p className="mt-4">Если запись Windows Boot Manager есть, проверь ее через Boot Menu платы и еще раз пересобери GRUB последней командой основного способа. Если записи нет или Windows не запускается даже из Boot Menu, загружайся с сохраненной флешки и сначала сохраняй вывод этих проверок. Не удаляй каталог <Code>EFI/Microsoft</Code>.</p>
        </Disclosure>
        <Disclosure title="Меню GRUB вообще не появилось">
          Открой Boot Menu платы Gigabyte и проверь, выбран ли загрузчик Nobara первым. Если Nobara запускается из Boot Menu, сама система цела: вернись сюда и повтори три команды выше. Если не запускается ни одна запись, используй живую флешку из первого раздела для диагностики, а не для повторной установки.
        </Disclosure>
        <Disclosure title="Снова скрывать меню после успешного запуска">
          <CodeSnippet code="sudo grub2-editenv - set menu_auto_hide=1" label="Вернуть автоматическое скрытие GRUB" />
        </Disclosure>
      </ActionRow>
    </SectionCard>
  );
}

function Sources() {
  const links = [
    ["Скачать Nobara", "https://nobaraproject.org/download.html"],
    ["Начало работы с Nobara", "https://wiki.nobaraproject.org/new-user-guide-general-guidelines"],
    ["Правильное обновление", "https://wiki.nobaraproject.org/general-usage/troubleshooting/update-system"],
    ["Flatpak в Nobara", "https://wiki.nobaraproject.org/general-usage/flatpaks/nobara-flatpak"],
    ["Магазины Flatpak", "https://wiki.nobaraproject.org/general-usage/flatpaks/flatpak-package-managers"],
    ["Какие программы ставить нативно", "https://wiki.nobaraproject.org/general-usage/flatpaks/preferred-packages"],
    ["Автомонтирование дисков", "https://wiki.nobaraproject.org/general-usage/troubleshooting/mounting-automounting-disk-drives"],
    ["OBS в Nobara", "https://wiki.nobaraproject.org/general-usage/additional-software/obs-studio"],
    ["Настройка OBS для VK Видео Live", "https://vk.ru/faq23473"],
    ["Как создать трансляцию VK Видео Live", "https://vk.ru/@business-kak-sozdat-translyaciu-v-vk-video-live"],
    ["Главная Nobara Wiki", "https://wiki.nobaraproject.org/"],
  ];

  return (
    <footer className="mb-10 mt-16 rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.045] to-transparent p-6 sm:p-8">
      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-200">Официальные источники</div>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">Проверяй свежие названия здесь</h2>
      <p className="mt-3 max-w-3xl leading-7 text-zinc-400">После крупного обновления название или путь могут измениться. Сначала смотри официальную Wiki: Nobara меняется быстрее, чем старые ролики и случайные ответы в поиске.</p>
      <div className="mt-7 flex flex-wrap gap-2.5">
        {links.map(([label, href]) => (
          <a key={href} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-white/[0.09] bg-black/10 px-4 py-2.5 text-sm text-zinc-300 transition hover:-translate-y-0.5 hover:border-cyan-200/20 hover:bg-cyan-200/[0.045] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
            {label}<ExternalLink className="h-3.5 w-3.5" />
          </a>
        ))}
      </div>
    </footer>
  );
}

function Term({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/[0.075] bg-white/[0.025] p-5 transition hover:border-cyan-200/15 hover:bg-cyan-200/[0.025]">
      <dt className="font-mono text-sm font-semibold text-cyan-100">{name}</dt>
      <dd className="mt-3 leading-7 text-zinc-300">{children}</dd>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="rounded-md border border-white/10 bg-black/25 px-1.5 py-0.5 font-mono text-[0.84em] text-cyan-50">{children}</code>;
}

function Settings({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`overflow-hidden rounded-2xl border border-white/[0.09] bg-black/10 ${className}`}>{children}</div>;
}

function Setting({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/[0.08] px-5 py-4 text-sm last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <span className="text-zinc-400">{label}</span>
      <span className="font-medium text-white sm:text-right">{value}</span>
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return <div className="mb-8 rounded-2xl border border-amber-300/15 bg-amber-300/[0.055] px-5 py-4 leading-7 text-zinc-200 sm:px-6"><span className="font-semibold text-amber-100">Сначала без резких движений. </span>{children}</div>;
}
