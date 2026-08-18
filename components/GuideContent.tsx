"use client";

import {
  Activity,
  AlertOctagon,
  AppWindow,
  AudioLines,
  BadgeCheck,
  BookOpenCheck,
  Boxes,
  Cable,
  Check,
  ChevronRight,
  CircleAlert,
  Clock3,
  CloudCog,
  Cpu,
  Disc3,
  ExternalLink,
  Fan,
  Gamepad2,
  Gauge,
  HardDrive,
  Headphones,
  Info,
  Keyboard,
  Link2,
  MemoryStick,
  Monitor,
  MousePointer2,
  PackageCheck,
  Radio,
  RefreshCcw,
  Router,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  ThermometerSun,
  TriangleAlert,
  Usb,
  Video,
  Volume2,
  WalletCards,
  Waypoints,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checklist } from "@/components/Checklist";
import { CodeSnippet } from "@/components/CodeSnippet";
import { Hero } from "@/components/Hero";
import { InfoBox } from "@/components/InfoBox";
import { LactCalculator } from "@/components/LactCalculator";
import { SectionCard } from "@/components/SectionCard";
import { StepList } from "@/components/StepList";
import { TopNav } from "@/components/TopNav";
import { cn } from "@/lib/utils";

const sourceLinks = [
  {
    title: "Nobara New User Guide",
    href: "https://wiki.nobaraproject.org/new-user-guide-general-guidelines",
    note: "Welcome, кодеки, нативные пакеты и диски",
  },
  {
    title: "Обновление Nobara",
    href: "https://wiki.nobaraproject.org/general-usage/troubleshooting/update-system",
    note: "nobara-sync и GUI updater",
  },
  {
    title: "OBS Studio в Nobara",
    href: "https://wiki.nobaraproject.org/general-usage/additional-software/obs-studio",
    note: "VAAPI, Vulkan и PipeWire",
  },
  {
    title: "LACT",
    href: "https://github.com/ilya-zlobintsev/LACT",
    note: "Официальный проект и актуальная установка",
  },
];

export function GuideContent() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#070a12] text-slate-100">
      <TopNav />
      <Hero />

      <main className="relative">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-[size:54px_54px]" />
        <div className="pointer-events-none absolute left-[-20rem] top-40 h-[36rem] w-[36rem] rounded-full bg-indigo-600/10 blur-[130px]" />
        <div className="pointer-events-none absolute right-[-18rem] top-[70rem] h-[34rem] w-[34rem] rounded-full bg-emerald-500/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <QuickRoute />
          <FirstMinutes />
          <DisplayAndInput />
          <RxAndLact />
          <Games />
          <ObsAndAudio />
          <DualBootAndCommands />
          <Sources />
        </div>
      </main>

      <Footer />
      <Checklist />
    </div>
  );
}

function QuickRoute() {
  const route = [
    { icon: RefreshCcw, title: "Обновить", text: "Welcome + nobara-sync", href: "#start" },
    { icon: Monitor, title: "Синхронизировать", text: "165 Гц + 60 Гц без нервов", href: "#display" },
    { icon: Gauge, title: "Охладить", text: "LACT и андервольт RX 580", href: "#lact" },
    { icon: Radio, title: "Запустить эфир", text: "VAAPI + отдельный звук", href: "#obs" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="grid gap-3 rounded-3xl border border-white/[0.08] bg-slate-950/55 p-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4"
      aria-label="Быстрый маршрут"
    >
      {route.map((item, index) => (
        <a key={item.href} href={item.href} className="group flex items-center gap-3 rounded-2xl border border-transparent p-3 transition-all hover:border-white/[0.08] hover:bg-white/[0.035]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-300 transition-colors group-hover:bg-emerald-400/10 group-hover:text-emerald-300">
            <item.icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">Шаг {index + 1}</div>
            <div className="text-sm font-bold text-white">{item.title}</div>
            <div className="truncate text-xs text-slate-500">{item.text}</div>
          </div>
          <ChevronRight className="ml-auto h-4 w-4 text-slate-700 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-400" />
        </a>
      ))}
    </motion.nav>
  );
}

function FirstMinutes() {
  return (
    <SectionCard
      id="start"
      kicker="01 / Первые 15 минут"
      title="Сначала база, потом магия"
      description="Не спеши превращать свежую систему в археологический слой из случайных репозиториев. В Nobara уже есть нормальный маршрут."
      icon={Clock3}
      accent="indigo"
    >
      <div className="grid gap-4 lg:grid-cols-[1.05fr_.95fr]">
        <StepList
          steps={[
            {
              title: "0-3 минуты: Nobara Welcome",
              text: <>Открой приветственное приложение и пройди начальные пункты. Если система предлагает обновление, соглашайся через штатный интерфейс.</>,
            },
            {
              title: "3-10 минут: обновление",
              text: <>Используй Nobara System Updater в GUI или <code className="code-pill">nobara-sync</code>. Без <code className="code-pill">sudo</code> и без <code className="code-pill">sudo dnf upgrade</code>.</>,
            },
            {
              title: "10-12 минут: Media Codecs",
              text: <>На вопрос об установке медиакодеков отвечай <strong className="text-emerald-300">YES</strong>. Иначе H.264, H.265 и FFmpeg устроят тебе квест прямо перед эфиром.</>,
            },
            {
              title: "12-15 минут: приложения",
              text: <>qBittorrent, Vesktop и Chrome ставь через DNF App Center, Nobara Welcome или Flathub строго в режиме User. Discover в этом гайде не участвует.</>,
            },
          ]}
        />

        <div className="space-y-4">
          <InfoBox icon={ShieldCheck} title="Священное правило Nobara" tone="success">
            Для обновления всей системы запускай <strong>nobara-sync</strong>. Он выполняет Nobara-специфичные миграции и исправления, которые обычный DNF не знает. Команда <code className="code-pill">nobara-sync --all</code> дополнительно обновит Flatpak.
          </InfoBox>
          <CodeSnippet code="nobara-sync" label="Обычное обновление системы" />
          <CodeSnippet code="nobara-sync --all" label="RPM + Flatpak одним заходом" />
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <MiniCard icon={PackageCheck} title="Media Codecs" badge="Обязательно" tone="emerald">
          H.264/H.265, x264/x265 и FFmpeg нужны браузеру, играм, OBS и почти всему, что не выводит звук азбукой Морзе.
        </MiniCard>
        <MiniCard icon={AppWindow} title="Flatpak только User" badge="Без дублей">
          Не смешивай User и System установки. Иначе получишь два приложения, три runtime и четыре причины спросить: кто это сделал?
        </MiniCard>
        <MiniCard icon={HardDrive} title="Дополнительные диски" badge="Стабильный путь" tone="amber">
          Подключай через Nobara Drive Mount Manager. Игровой путь будет жить в <code className="code-pill">/run/media/ты/uuid</code> и не испарится после ребута.
        </MiniCard>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_.8fr]">
        <CodeSnippet
          label="qBittorrent + Vesktop + Chrome как Flatpak User"
          code="flatpak install --user flathub org.qbittorrent.qBittorrent dev.vencord.Vesktop com.google.Chrome"
        />
        <InfoBox icon={CircleAlert} title="Не трогай кнопку хаоса" tone="danger">
          <code className="code-pill">sudo dnf upgrade</code> здесь не герой, а мужик с ломом возле электрощита. DNF можно использовать для установки конкретных пакетов, но обновляй Nobara только штатно.
        </InfoBox>
      </div>
    </SectionCard>
  );
}

function DisplayAndInput() {
  return (
    <SectionCard
      id="display"
      kicker="02 / Экран и ввод"
      title="165 Гц для игры, 60 Гц для чата, ноль киселя"
      description="Plasma 6 на Wayland умеет разную герцовку для каждого экрана. Но VRR и старый Polaris иногда собирают микростаттер-пати без твоего приглашения."
      icon={Monitor}
      accent="emerald"
    >
      <div className="grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
        <Card className="bg-black/20">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>Схема мониторов</CardTitle>
              <Badge variant="success">Wayland</Badge>
            </div>
            <CardDescription>Параметры системы - Экран и монитор - Конфигурация экрана</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <MonitorDiagram title="Acer" subtitle="Основной игровой" refresh="144/165 Гц" active />
            <MonitorDiagram title="ViewSonic" subtitle="Чат, браузер, OBS" refresh="60 Гц" />
            <InfoBox icon={Cable} title="Проверь кабель" tone="info">
              Для высокой герцовки и Adaptive Sync предпочти DisplayPort. В списке режимов выбери максимальную стабильную частоту, а не ту, которую HDMI вспомнил из прошлой жизни.
            </InfoBox>
          </CardContent>
        </Card>

        <div>
          <Tabs defaultValue="automatic">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="automatic">Adaptive Sync: Automatic</TabsTrigger>
              <TabsTrigger value="never">Adaptive Sync: Never</TabsTrigger>
            </TabsList>
            <TabsContent value="automatic">
              <Card className="border-emerald-400/15 bg-emerald-400/[0.04]">
                <CardHeader>
                  <div className="flex items-center gap-2 text-emerald-300"><Sparkles className="h-4 w-4" /><CardTitle>Начни отсюда</CardTitle></div>
                  <CardDescription>VRR включается для полноэкранной игры, когда приложение и монитор это поддерживают.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm leading-6 text-slate-300">
                    <CheckLine>На Acer выставь 144 или 165 Гц.</CheckLine>
                    <CheckLine>Adaptive Sync оставь Automatic.</CheckLine>
                    <CheckLine>ViewSonic держи на честных 60 Гц.</CheckLine>
                    <CheckLine>Проверь игру с открытым видео или чатом на втором экране.</CheckLine>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="never">
              <Card className="border-amber-400/15 bg-amber-400/[0.04]">
                <CardHeader>
                  <div className="flex items-center gap-2 text-amber-300"><Activity className="h-4 w-4" /><CardTitle>Антистаттер-план</CardTitle></div>
                  <CardDescription>Если при движении на 165 Гц дергается игра, курсор или видео на 60 Гц, временно отключи VRR.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm leading-6 text-slate-300">
                    <CheckLine>Поставь Adaptive Sync: Never сначала на игровом экране.</CheckLine>
                    <CheckLine>Если не помогло, выставь Never на обоих экранах.</CheckLine>
                    <CheckLine>Перезапусти игру и сравни frametime, а не средний FPS.</CheckLine>
                    <CheckLine>Верни Automatic, если разницы нет. Не лечим то, что не болеет.</CheckLine>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <InfoBox icon={Info} title="Почему это работает" tone="info" className="mt-4">
            Mixed-refresh сам по себе поддерживается KWin, но VRR, второй 60-Гц экран и разные сценарии композитинга могут давать неровный frametime. Переключение Automatic/Never - нормальный диагностический тест, а не религия.
          </InfoBox>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <MiniCard icon={MousePointer2} title="Мышь Flat 1:1" badge="Без ускорения" tone="emerald">
          Параметры системы - Мышь - Профиль ускорения - <strong className="text-white">Flat</strong>. Это убирает зависимость ускорения от скорости руки. Ползунок скорости остается обычным множителем.
        </MiniCard>
        <MiniCard icon={WalletCards} title="KWallet без попапа" badge="Есть цена" tone="amber">
          Либо создай кошелек с пустым паролем, либо отключи подсистему KDE Wallet в настройках. Оба варианта снижают защиту токенов и паролей. Безопаснее пароль входа + автоматическая разблокировка.
        </MiniCard>
        <MiniCard icon={MemoryStick} title="Baloo на диете" badge="Минус индексация">
          Если поиск по содержимому файлов не нужен, отключи индексатор. На 16 ГБ это убирает лишнюю фоновую возню, но поиск станет проще и глупее.
        </MiniCard>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <CodeSnippet code="balooctl6 disable" label="Отключить Baloo в Plasma 6" />
        <CodeSnippet code="balooctl6 status" label="Проверить статус индексатора" />
      </div>
    </SectionCard>
  );
}

function RxAndLact() {
  return (
    <SectionCard
      id="lact"
      kicker="03 / RX 580 и LACT"
      title="Дадим Polaris прохладу, а не похоронный марш вентиляторов"
      description="RX 580 отлично дружит с Mesa и amdgpu. LACT дает удобный контроль напряжения, лимита мощности и вентилятора, но каждое изменение проверяем нагрузкой."
      icon={Gauge}
      accent="amber"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <CompareCard
          icon={Boxes}
          eyebrow="Linux"
          title="Mesa + amdgpu"
          tone="emerald"
          items={[
            "Драйвер уже в ядре и Mesa, отдельный Adrenalin не нужен",
            "Wayland, Vulkan и VAAPI работают одним открытым стеком",
            "После сбоя GPU ядро может восстановить драйвер без полного ребута",
          ]}
        />
        <CompareCard
          icon={AlertOctagon}
          eyebrow="Windows"
          title="Adrenalin + TDR"
          tone="rose"
          items={[
            "Windows следит за зависанием GPU через Timeout Detection and Recovery",
            "Черный экран может завершиться перезапуском драйвера или приложения",
            "Это не делает Linux бессмертным: плохой андервольт валит оба лагеря",
          ]}
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[.88fr_1.12fr]">
        <div className="space-y-4">
          <Card className="bg-black/20">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle>Установка LACT</CardTitle>
                <Badge variant="success">Fedora 43 / Nobara 43</Badge>
              </div>
              <CardDescription>
                Старый идентификатор <code className="code-pill">ilya-zlobintsev/LACT</code> из древних видосов не используй. Актуальный COPR проекта - <code className="code-pill">ilyaz/LACT</code>.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <CodeSnippet code="sudo dnf copr enable ilyaz/LACT -y" label="1. Подключить актуальный COPR" />
              <CodeSnippet code="sudo dnf install lact -y" label="2. Установить LACT" />
              <CodeSnippet code="sudo systemctl enable --now lactd" label="3. Запустить демон" />
              <InfoBox icon={BadgeCheck} title="Здесь DNF можно" tone="success">
                Ты ставишь конкретный пакет, а не обновляешь Nobara в обход ее синхронизатора. Это нормальный сценарий.
              </InfoBox>
            </CardContent>
          </Card>

          <Card className="border-amber-400/15 bg-amber-400/[0.035]">
            <CardHeader>
              <div className="flex items-center gap-2 text-amber-300"><ShieldAlert className="h-4 w-4" /><CardTitle>Открываем OverDrive для Polaris</CardTitle></div>
              <CardDescription>Маска ниже специфична для RX 470/480/570/580. Она включает нужные PP-функции и отключает биты GFXOFF/STUTTER.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <CodeSnippet code="sudo grubby --update-kernel=ALL --args='amdgpu.ppfeaturemask=0xfffd7fff'" label="Добавить параметр ядра" />
              <CodeSnippet code="systemctl reboot" label="Перезагрузиться" />
              <CodeSnippet code="cat /proc/cmdline" label="Проверить параметр после загрузки" />
              <InfoBox icon={TriangleAlert} title="Не универсальная таблетка" tone="warning">
                <code className="code-pill">0xfffd7fff</code> может повысить потребление в простое или конфликтовать с отдельными multi-monitor конфигурациями. Если после нее ловишь черный экран или странный idle, откатывай.
              </InfoBox>
              <CodeSnippet code="sudo grubby --update-kernel=ALL --remove-args='amdgpu.ppfeaturemask=0xfffd7fff'" label="Откат параметра" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <LactCalculator />
          <Card className="bg-black/20">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle>Профиль вентиляторов</CardTitle>
                  <CardDescription>Ориентируйся на hotspot, а не только на красивую температуру edge.</CardDescription>
                </div>
                <Fan className="h-5 w-5 text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { temp: "40°C", fan: "28%" },
                  { temp: "55°C", fan: "45%" },
                  { temp: "68°C", fan: "70%" },
                  { temp: "80°C", fan: "90%" },
                ].map((point, index) => (
                  <div key={point.temp} className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 text-center">
                    <div className="absolute inset-x-0 bottom-0 bg-emerald-400/[0.06]" style={{ height: `${28 + index * 21}%` }} />
                    <div className="relative text-sm font-black text-white">{point.temp}</div>
                    <div className="relative mt-1 text-xs font-bold text-emerald-300">{point.fan}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Зафиксируй профиль в LACT, включи применение при загрузке и проверь 15-30 минут в реальной игре. Один бенчмарк не доказывает стабильность, он лишь красиво шевелит полоски.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionCard>
  );
}

function Games() {
  return (
    <SectionCard
      id="games"
      kicker="04 / Игры"
      title="PortProton: запускаем, изолируем, не варим префикс-солянку"
      description="PortProton собирает Wine/Proton, DXVK, VKD3D и настройки в один внятный запускатор. Qt - это интерфейс, а не магически другой движок."
      icon={Gamepad2}
      accent="indigo"
    >
      <Tabs defaultValue="difference">
        <TabsList className="grid w-full grid-cols-2 sm:w-fit sm:min-w-[460px]">
          <TabsTrigger value="difference">PortProton vs Qt</TabsTrigger>
          <TabsTrigger value="install">Установка</TabsTrigger>
        </TabsList>
        <TabsContent value="difference">
          <div className="grid gap-4 md:grid-cols-2">
            <CompareCard
              icon={Wrench}
              eyebrow="Среда запуска"
              title="PortProton"
              tone="emerald"
              items={[
                "Скрипты и окружение для запуска Windows-игр",
                "Управляет Wine/Proton, DXVK, VKD3D и переменными",
                "Создает и обслуживает отдельные игровые префиксы",
              ]}
            />
            <CompareCard
              icon={AppWindow}
              eyebrow="Графический слой"
              title="PortProtonQt"
              tone="indigo"
              items={[
                "Qt-интерфейс поверх возможностей PortProton",
                "Удобные карточки, настройки и список приложений",
                "Не отдельная совместимость и не другой Proton",
              ]}
            />
          </div>
        </TabsContent>
        <TabsContent value="install">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
            <CodeSnippet code={"sudo dnf copr enable boria138/portproton -y\nsudo dnf install portproton -y"} label="Официальный COPR PortProton для Fedora/Nobara" />
            <InfoBox icon={CloudCog} title="Сначала проверь Nobara Welcome" tone="info">
              Если PortProton уже предлагается в Nobara Welcome или DNF App Center, выбирай штатную карточку. COPR нужен, когда пакет там не найден.
            </InfoBox>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <MiniCard icon={Router} title="Lesta Game Center" badge="Автоустановка" tone="emerald">
          В PortProton открой раздел автоустановки, выбери Lesta Game Center, дождись готового префикса и уже внутри поставь нужную игру. Не запускай клиент из случайного общего Wine-префикса.
        </MiniCard>
        <MiniCard icon={Disc3} title="setup.exe локальной копии" badge="Отдельный префикс" tone="amber">
          Для законно полученного установщика нажми правой кнопкой по <code className="code-pill">setup.exe</code> и открой через PortProton. Ссылок на пиратские раздачи тут нет, кент не подставляет кента.
        </MiniCard>
        <MiniCard icon={HardDrive} title="Путь к библиотеке" badge="Drive Mount Manager">
          Дополнительный SSD или HDD сначала добавь в Nobara Drive Mount Manager. Иначе сегодня библиотека есть, завтра Wine смотрит в пустоту как бывшая в переписку.
        </MiniCard>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.08fr_.92fr]">
        <Card className="bg-black/20">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>FitGirl / DODI setup.exe: безопасный маршрут</CardTitle>
                <CardDescription>Технически это обычный Windows-инсталлятор, но происхождение файла и лицензия остаются твоей ответственностью.</CardDescription>
              </div>
              <Badge variant="danger">Риск</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <StepList
              steps={[
                { title: "Создай новый префикс", text: <>Одна игра - один префикс. Так поломанный DLL override не утянет соседей на дно.</> },
                { title: "Запусти setup.exe через PortProton", text: <>Не через системный Wine и не двойным кликом в неизвестность.</> },
                { title: "Сними DirectX и Visual C++", text: <>Убери галочки с bundled DirectX и Visual C++ runtimes. PortProton поставит совместимые компоненты сам.</> },
                { title: "Выбери стабильный путь", text: <>Ставь в каталог на диске, подключенном через Drive Mount Manager.</> },
                { title: "После установки создай ярлык", text: <>Укажи основной exe игры, проверь DXVK и только потом добавляй MangoHud или Gamescope.</> },
              ]}
            />
          </CardContent>
        </Card>

        <Card className="border-indigo-400/15 bg-indigo-400/[0.035]">
          <CardHeader>
            <div className="flex items-center gap-2 text-indigo-300"><Video className="h-4 w-4" /><CardTitle>Захват игры для OBS</CardTitle></div>
            <CardDescription>Vulkan в Nobara обычно захватывается напрямую. OpenGL запускай с переменной obs-vkcapture.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <SettingRow label="Источник OBS" value="Game Capture" icon={Monitor} />
            <SettingRow label="Vulkan" value="Обычный запуск" icon={Zap} good />
            <SettingRow label="OpenGL / Steam" value="obs-gamecapture %command%" icon={Keyboard} />
            <CodeSnippet code="obs-gamecapture %command%" label="Параметры запуска Steam для OpenGL" />
            <InfoBox icon={Info} title="Если окно черное" tone="warning">
              Сначала проверь тип рендера игры и запусти OBS из репозитория Nobara, а не Flatpak. Нативная сборка уже интегрирована с Vulkan capture.
            </InfoBox>
          </CardContent>
        </Card>
      </div>
    </SectionCard>
  );
}

function ObsAndAudio() {
  return (
    <SectionCard
      id="obs"
      kicker="05 / OBS и PipeWire"
      title="Кодирует RX 580, Ryzen наконец просто дышит"
      description="Нативный OBS из Nobara получает VAAPI, Vulkan capture, PipeWire и CEF без Flatpak-песочницы между тобой и эфиром."
      icon={Radio}
      accent="emerald"
    >
      <div className="grid gap-4 lg:grid-cols-[.92fr_1.08fr]">
        <Card className="overflow-hidden border-emerald-400/15 bg-gradient-to-br from-emerald-400/[0.065] to-black/20">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <Badge variant="success">Рекомендуемый профиль</Badge>
                <CardTitle className="mt-3 text-2xl">FFmpeg VAAPI H.264</CardTitle>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                <Cpu className="h-5 w-5" />
              </div>
            </div>
            <CardDescription>Аппаратный энкодер RX 580 берет основную работу на себя. CPU-нагрузка станет низкой, но честные 0% никто не обещает: OBS еще композитит сцену и обслуживает плагины.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <SettingRow label="Режим вывода" value="Расширенный" icon={SlidersHorizontal} />
            <SettingRow label="Энкодер" value="FFmpeg VAAPI H.264" icon={MemoryStick} good />
            <SettingRow label="Управление битрейтом" value="CBR" icon={Activity} />
            <SettingRow label="Битрейт" value="6000 Кбит/с" icon={Waypoints} />
            <SettingRow label="Интервал ключевых кадров" value="2 секунды" icon={Clock3} />
            <SettingRow label="Профиль" value="High" icon={Gauge} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <InfoBox icon={ThermometerSun} title="Реалистичная цель для Polaris" tone="warning">
            Для старого VCE на RX 580 сначала протестируй <strong>1664x936, 60 FPS, 6000 Кбит/с</strong>. Если картинка сыпется в динамике, выбери 1080p30 или 720p60. Качество важнее цифры 1080p60 в заголовке стрима.
          </InfoBox>
          <CodeSnippet code="sudo dnf install obs-studio-plugin-pipewire-audio-capture -y" label="Плагин отдельного звука PipeWire" />
          <InfoBox icon={ShieldCheck} title="OBS только нативный" tone="success">
            Установи OBS через Nobara Welcome или DNF App Center. Официальная Wiki Nobara рекомендует репозиторную сборку из-за готовой интеграции кодеков, аппаратного захвата и плагинов.
          </InfoBox>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-white">Раздельный звук через Application Audio Capture</h3>
            <p className="mt-1 text-sm text-slate-500">Каждое приложение идет на свою дорожку. Больше никакого desktop audio, где донат утонул в турбине меню.</p>
          </div>
          <Badge variant="success">PipeWire</Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <AudioTrack icon={Gamepad2} number="01" title="Игра" color="emerald" text="Захвати процесс игры и отправь на стрим + запись." />
          <AudioTrack icon={Headphones} number="02" title="Vesktop" color="indigo" text="Голоса друзей отдельно. Можно убрать их из VOD-дорожки." />
          <AudioTrack icon={Volume2} number="03" title="Музыка" color="amber" text="Браузер или плеер на отдельной дорожке и фейдере." />
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <MiniCard icon={Gamepad2} title="Game Capture" badge="Vulkan / OpenGL" tone="emerald">
          Добавь источник Game Capture. Vulkan захватывается напрямую. Для OpenGL используй <code className="code-pill">obs-gamecapture %command%</code>.
        </MiniCard>
        <MiniCard icon={AudioLines} title="Application Audio" badge="PipeWire">
          Добавь отдельный PipeWire Application Audio Capture для игры, Vesktop и музыки. Выбирай процесс, а не весь выход монитора.
        </MiniCard>
        <MiniCard icon={Link2} title="DonationAlerts" badge="CEF Browser" tone="amber">
          Добавь источник Браузер, вставь URL виджета DonationAlerts, выставь размер и включи аппаратное ускорение, если анимация дергается.
        </MiniCard>
      </div>
    </SectionCard>
  );
}

function DualBootAndCommands() {
  return (
    <SectionCard
      id="dualboot"
      kicker="06 / Dual-boot и команды"
      title="Windows и Nobara на одном NVMe без битвы за часы"
      description="Один диск на 512 ГБ требует аккуратности: отдельные разделы, запас места в EFI, отключенный Fast Startup и часы Windows в UTC."
      icon={Usb}
      accent="amber"
    >
      <InfoBox icon={TriangleAlert} title="Один NVMe - не лучший, но рабочий вариант" tone="danger">
        Nobara Wiki предупреждает, что dual-boot на одном диске повышает риск проблем с EFI и загрузчиком после крупных обновлений Windows. Перед разметкой сделай резервную копию, не форматируй существующий EFI-раздел и оставь ему достаточно свободного места. Если можешь выделить второй диск - будет спокойнее.
      </InfoBox>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card className="bg-black/20">
          <CardHeader>
            <div className="flex items-center gap-2 text-indigo-300"><AppWindow className="h-4 w-4" /><CardTitle>Windows 11: часы в UTC</CardTitle></div>
            <CardDescription>Открой Терминал или CMD от имени администратора. После команды полностью перезагрузи обе системы.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeSnippet code={'reg add "HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Control\\TimeZoneInformation" /v RealTimeIsUniversal /d 1 /t REG_DWORD /f'} label="Windows Terminal от администратора" />
            <CodeSnippet code="timedatectl set-local-rtc 0" label="Nobara должна хранить RTC в UTC" />
            <InfoBox icon={Clock3} title="Еще один саботажник" tone="warning">
              Отключи Fast Startup в Windows. Иначе она оставляет разделы и железо в полууснувшем состоянии, а Linux потом получает квест без подсказок.
            </InfoBox>
          </CardContent>
        </Card>

        <Card className="bg-black/20">
          <CardHeader>
            <div className="flex items-center gap-2 text-emerald-300"><BookOpenCheck className="h-4 w-4" /><CardTitle>GRUB: меню на 10 секунд</CardTitle></div>
            <CardDescription>Показываем меню, выставляем таймаут и перестраиваем конфигурацию.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <CodeSnippet code="sudo grub2-editenv - unset menu_auto_hide" label="Всегда показывать меню" />
            <CodeSnippet code="sudo sed -i 's/^GRUB_TIMEOUT=.*/GRUB_TIMEOUT=10/' /etc/default/grub" label="Выставить таймаут 10 секунд" />
            <CodeSnippet code="sudo grub2-mkconfig -o /boot/grub2/grub.cfg" label="Перестроить конфигурацию GRUB" />
          </CardContent>
        </Card>
      </div>

      <div className="mt-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-white">Аварийный командный набор</h3>
            <p className="mt-1 text-sm text-slate-500">Когда GUI решил уйти в творческий отпуск.</p>
          </div>
          <Badge variant="danger">Не паниковать</Badge>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="border-indigo-400/15 bg-indigo-400/[0.035]">
            <CardHeader>
              <RefreshCcw className="h-5 w-5 text-indigo-300" />
              <CardTitle>Починить обновление</CardTitle>
              <CardDescription>Штатная синхронизация пакетов и Nobara-фиксов.</CardDescription>
            </CardHeader>
            <CardContent><CodeSnippet code="nobara-sync" label="Без sudo" /></CardContent>
          </Card>
          <Card className="border-emerald-400/15 bg-emerald-400/[0.035]">
            <CardHeader>
              <AudioLines className="h-5 w-5 text-emerald-300" />
              <CardTitle>Перезапустить звук</CardTitle>
              <CardDescription>PipeWire, Pulse-совместимость и менеджер сессии.</CardDescription>
            </CardHeader>
            <CardContent><CodeSnippet code="systemctl --user restart pipewire pipewire-pulse wireplumber" label="Мягкий рестарт аудио" /></CardContent>
          </Card>
          <Card className="border-rose-400/15 bg-rose-400/[0.035]">
            <CardHeader>
              <AlertOctagon className="h-5 w-5 text-rose-300" />
              <CardTitle>Прибить зависший Wine</CardTitle>
              <CardDescription>Сначала мягко. Если не понял намек, тогда кувалда.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <CodeSnippet code="wineserver -k" label="Мягкое завершение" />
              <CodeSnippet code="killall -9 portproton wine xwininfo" label="Аварийная кувалда" />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <CodeSnippet code="journalctl -b -p err..alert" label="Ошибки текущей загрузки" />
        <CodeSnippet code="systemctl --failed" label="Упавшие системные службы" />
      </div>
    </SectionCard>
  );
}

function Sources() {
  return (
    <section className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-indigo-500/[0.07] via-slate-950/60 to-emerald-500/[0.05] p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <Badge variant="success">Проверено 16.08.2026</Badge>
          <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">Не верь даже кенту на слово</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Nobara развивается быстро. Перед крупным обновлением или изменением драйвера сверяйся с официальной Wiki. Тикток-ролик 2023 года может быть музейным экспонатом с хорошим монтажом.
          </p>
        </div>
        <Button variant="outline" asChild>
          <a href="https://wiki.nobaraproject.org/" target="_blank" rel="noreferrer">
            Открыть Nobara Wiki
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {sourceLinks.map((source) => (
          <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/[0.07] bg-black/20 p-4 transition-all hover:-translate-y-0.5 hover:border-indigo-400/20 hover:bg-indigo-400/[0.04]">
            <div className="flex items-start justify-between gap-3">
              <BookOpenCheck className="h-4 w-4 text-indigo-300" />
              <ExternalLink className="h-3.5 w-3.5 text-slate-700 transition-colors group-hover:text-indigo-300" />
            </div>
            <div className="mt-4 text-sm font-bold text-white">{source.title}</div>
            <div className="mt-1 text-xs leading-5 text-slate-500">{source.note}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black/20 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className="font-black tracking-tight text-white">RX<span className="text-emerald-400">{"//"}</span>NOBARA</div>
          <p className="mt-1 text-xs text-slate-600">Кентский гайд. Без гарантии. С резервной копией.</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-500">
          <a href="#top" className="hover:text-white">Наверх</a>
          <a href="https://wiki.nobaraproject.org/" target="_blank" rel="noreferrer" className="hover:text-white">Nobara Wiki</a>
          <a href="https://github.com/CYHTm/rxnobarawiki" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
          <span>2026</span>
        </div>
      </div>
    </footer>
  );
}

function MiniCard({
  icon: Icon,
  title,
  badge,
  children,
  tone = "indigo",
}: {
  icon: typeof Zap;
  title: string;
  badge: string;
  children: React.ReactNode;
  tone?: "indigo" | "emerald" | "amber";
}) {
  const tones = {
    indigo: "border-indigo-400/15 bg-indigo-400/[0.035] text-indigo-300",
    emerald: "border-emerald-400/15 bg-emerald-400/[0.035] text-emerald-300",
    amber: "border-amber-400/15 bg-amber-400/[0.035] text-amber-300",
  };
  return (
    <Card className={cn("h-full transition-transform duration-300 hover:-translate-y-1", tones[tone])}>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-current/10 bg-current/[0.06]">
            <Icon className="h-4 w-4" />
          </div>
          <Badge variant={tone === "emerald" ? "success" : tone === "amber" ? "warning" : "default"}>{badge}</Badge>
        </div>
        <CardTitle className="mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm leading-6 text-slate-400">{children}</CardContent>
    </Card>
  );
}

function CheckLine({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-400/15">
        <Check className="h-2.5 w-2.5 text-emerald-300" />
      </span>
      <span>{children}</span>
    </li>
  );
}

function MonitorDiagram({ title, subtitle, refresh, active = false }: { title: string; subtitle: string; refresh: string; active?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3 rounded-xl border p-3", active ? "border-emerald-400/20 bg-emerald-400/[0.045]" : "border-white/[0.06] bg-white/[0.025]") }>
      <div className={cn("flex h-10 w-14 items-center justify-center rounded-lg border", active ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-white/10 bg-black/20 text-slate-500") }>
        <Monitor className="h-4 w-4" />
      </div>
      <div>
        <div className="text-sm font-bold text-white">{title}</div>
        <div className="text-xs text-slate-500">{subtitle}</div>
      </div>
      <div className={cn("ml-auto rounded-lg px-2.5 py-1 font-mono text-xs font-black", active ? "bg-emerald-400/10 text-emerald-300" : "bg-white/[0.04] text-slate-400")}>{refresh}</div>
    </div>
  );
}

function CompareCard({
  icon: Icon,
  eyebrow,
  title,
  tone,
  items,
}: {
  icon: typeof Boxes;
  eyebrow: string;
  title: string;
  tone: "emerald" | "rose" | "indigo";
  items: string[];
}) {
  const tones = {
    emerald: "border-emerald-400/15 bg-emerald-400/[0.035] text-emerald-300",
    rose: "border-rose-400/15 bg-rose-400/[0.035] text-rose-300",
    indigo: "border-indigo-400/15 bg-indigo-400/[0.035] text-indigo-300",
  };
  return (
    <Card className={cn("h-full", tones[tone])}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-current/15 bg-current/[0.06]"><Icon className="h-4 w-4" /></div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-70">{eyebrow}</div>
            <CardTitle>{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item) => <CheckLine key={item}>{item}</CheckLine>)}
        </ul>
      </CardContent>
    </Card>
  );
}

function SettingRow({ label, value, icon: Icon, good = false }: { label: string; value: string; icon: typeof Monitor; good?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
      <Icon className={cn("h-4 w-4 shrink-0", good ? "text-emerald-400" : "text-slate-500")} />
      <span className="text-sm text-slate-500">{label}</span>
      <span className={cn("ml-auto text-right text-sm font-bold", good ? "text-emerald-300" : "text-white")}>{value}</span>
    </div>
  );
}

function AudioTrack({ icon: Icon, number, title, text, color }: { icon: typeof Gamepad2; number: string; title: string; text: string; color: "emerald" | "indigo" | "amber" }) {
  const colors = {
    emerald: "border-emerald-400/15 bg-emerald-400/[0.035] text-emerald-300",
    indigo: "border-indigo-400/15 bg-indigo-400/[0.035] text-indigo-300",
    amber: "border-amber-400/15 bg-amber-400/[0.035] text-amber-300",
  };
  return (
    <div className={cn("rounded-2xl border p-4", colors[color])}>
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4" />
        <span className="font-mono text-[10px] font-black opacity-50">TRACK {number}</span>
      </div>
      <div className="mt-4 text-sm font-black text-white">{title}</div>
      <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
    </div>
  );
}
