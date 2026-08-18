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
      <div className="min-h-screen bg-[#424242] text-zinc-100">
        <Header />
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
          <MobileNav />
          <div className="grid gap-12 py-10 lg:grid-cols-[230px_minmax(0,760px)] lg:gap-16 lg:py-16">
            <DesktopNav />
            <main>
              <Intro />
              <BeforeInstall />
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
    <header className="sticky top-0 z-40 h-14 border-b border-zinc-500/60 bg-[#424242]">
      <div className="mx-auto flex h-full max-w-[1180px] items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-mono text-xs font-semibold tracking-[0.16em] text-white">
          NOBARA / НАСТРОЙКА
        </a>
        <div className="hidden font-mono text-[11px] text-zinc-300 sm:block">
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
      <p className="font-mono text-xs text-zinc-300">NOBARA 43 / KDE PLASMA 6 / WAYLAND</p>
      <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-6xl">
        Настройка твоего ПК без лишней херни
      </h1>
      <p className="mt-6 max-w-2xl text-[15px] leading-7 text-zinc-200">
        Этот гайд написан для перехода с Windows 11 на Nobara как на вторую систему. От тебя не требуется заранее знать Fedora, команды Linux или названия пакетных менеджеров. В каждом пункте есть действие, причина, ожидаемый результат и откат там, где он нужен.
      </p>
      <div className="mt-7 border-l-2 border-zinc-200 bg-zinc-700/30 px-4 py-3 text-sm leading-6 text-zinc-100">
        <strong className="text-white">Текущее состояние:</strong> Nobara уже установлена рядом с Windows на одном NVMe, общий EFI имеет размер 200 МБ, PortProton, Lesta Game Center и Tanks Blitz уже работают, LACT установлен, но еще не проверен. Гайд не заставляет повторять сделанное. Он объясняет, как проверить результат и что настраивать дальше.
      </div>
      <div className="mt-9 grid border-y border-zinc-500/60 sm:grid-cols-4">
        <Spec label="Процессор" value="Ryzen 5 2600" />
        <Spec label="Видеокарта" value="RX 580 8 ГБ" />
        <Spec label="Мониторы" value="75 + 60 Гц" />
        <Spec label="Система" value="Nobara 43" />
      </div>

      <div className="mt-12 border-t border-zinc-500/60 pt-8">
        <h2 className="text-xl font-semibold text-white">Сначала переведем Linux на человеческий</h2>
        <p className="mt-3 text-sm leading-7 text-zinc-200">
          Nobara основана на Fedora, но это не обычная Fedora с другой картинкой. У нее свой набор измененных пакетов, свое ядро, игровые настройки и собственный механизм обновления. Поэтому случайный совет для Fedora может быть неправильным для Nobara. Тебе не надо изучать Fedora перед стартом. Просто не подменяй команды из этого гайда командами из первого видоса в поиске.
        </p>
        <Settings className="mt-5">
          <Setting label="Проводник Windows" value="Dolphin" />
          <Setting label="Параметры Windows" value="Параметры системы KDE" />
          <Setting label="PowerShell или cmd" value="Konsole" />
          <Setting label="Установщик .exe" value="DNF App Center или Flatpak" />
          <Setting label="Рабочий стол" value="KDE Plasma" />
          <Setting label="Вывод картинки" value="Wayland" />
        </Settings>
        <p className="mt-5 text-sm leading-7 text-zinc-200">
          В Windows программа часто приходит отдельным <Code>.exe</Code>. В Linux безопаснее сначала искать ее в магазине пакетов. Магазин знает, откуда взят пакет, ставит зависимости и потом обновляет программу. Скачивать случайные установщики с сайтов здесь обычно не нужно.
        </p>

        <h3 className="mt-9 text-base font-semibold text-white">Слова, которые встретятся дальше</h3>
        <dl className="mt-4 border-y border-zinc-500/60">
          <Term name="Fedora">Linux-система, на технической базе которой собрана Nobara. Nobara сильно изменена, поэтому инструкции Fedora нельзя автоматически считать инструкциями Nobara.</Term>
          <Term name="KDE Plasma">Интерфейс рабочего стола: панель задач, меню приложений, окна и Параметры системы. Это примерно тот слой, который ты видишь и нажимаешь.</Term>
          <Term name="Wayland">Современный слой между приложениями, мониторами, видеокартой и устройствами ввода. Он отвечает за вывод окон и движение курсора.</Term>
          <Term name="Репозиторий">Проверяемый онлайн-каталог пакетов. Nobara подключает свои репозитории и контролируемые снимки Fedora, чтобы приложения и системные компоненты обновлялись согласованно.</Term>
          <Term name="RPM">Нативный пакет, который становится частью системы. Ядро, драйверы, службы, LACT и нативный OBS ставятся как RPM.</Term>
          <Term name="DNF App Center">Графический центр RPM-пакетов и системных обновлений Nobara. Он не плохой и не лишний. Просто RPM и Flatpak в нем остаются разными источниками.</Term>
          <Term name="Flatpak и Flathub">Flatpak - изолированный формат обычных приложений. Flathub - официальный каталог, из которого Nobara берет такие приложения по умолчанию.</Term>
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

      <ActionRow id="backup" title="Сохрани ключ BitLocker и важные файлы сейчас">
        Резервная копия все еще нужна, даже после успешной установки. Сохрани ключ восстановления BitLocker отдельно от этого ПК, скопируй документы и убедись, что хотя бы один важный файл реально открывается из копии. Это защита не только от Linux, но и от неудачного обновления Windows, ошибки диска или собственного слишком уверенного клика.
        <Disclosure title="Что именно не надо сейчас делать">
          Не уменьшай и не расширяй EFI на живой системе только потому, что увидел число 200 МБ. Не форматируй его и не удаляй папки <Code>EFI/Microsoft</Code> или <Code>EFI/fedora</Code>. Пока обе системы запускаются, сначала собирают данные и делают копию, а уже потом чинят конкретную проблему.
        </Disclosure>
      </ActionRow>

      <ActionRow id="usb" title="Оставь установочную флешку как аварийную">
        Не форматируй вчерашнюю флешку хотя бы до нескольких успешных обновлений и перезагрузок обеих систем. С нее можно загрузить живую Nobara, прочитать файлы и восстановить загрузку, если однажды меню пропадет. Если флешка уже стерта, катастрофы нет: образ можно снова скачать с официального сайта и записать через Ventoy, Fedora Media Writer или Rufus в режиме GPT и DD.
        <Disclosure title="Проверить образ перед повторной записью">
          <CodeSnippet code="Get-FileHash .\Nobara-43-*.iso -Algorithm SHA256" label="PowerShell в Windows: посчитать SHA256" />
          <p className="mt-3">Строка должна полностью совпасть с SHA256 на странице загрузки Nobara. Приложения на установленной системе от этой флешки не зависят.</p>
        </Disclosure>
      </ActionRow>

      <ActionRow
        id="install"
        title="Проверь отдельный /boot и свободное место в EFI"
        command={"findmnt /boot\nfindmnt /boot/efi\ndf -h /boot /boot/efi"}
        commandLabel="Только посмотреть разделы и свободное место"
      >
        В обычной разметке Nobara ядра и большие файлы загрузки находятся в отдельном <Code>/boot</Code>, а <Code>/boot/efi</Code> хранит небольшие UEFI-загрузчики. Поэтому ты прав в главном: одна игра и один браузер EFI не засрут. Количество установленных приложений с размером EFI вообще не связано.
        <p className="mt-4">В выводе <Code>findmnt</Code> должны быть отдельные точки <Code>/boot</Code> и <Code>/boot/efi</Code>. В строке EFI обычно будет файловая система <Code>vfat</Code>. Команда <Code>df</Code> покажет не номинальные 200 МБ, а сколько реально занято и свободно.</p>
        <p className="mt-4">Запомни или сфотографируй свободное место сейчас и сравни после нескольких обновлений ядра. Если заполнение стабильно, ничего не трогай. Если свободное место быстро уменьшается или раздел подходит к 80-90%, не удаляй файлы вручную: сначала покажи вывод команд и разберемся, что именно выросло.</p>
        <Disclosure title="Посмотреть, что занимает EFI, ничего не удаляя">
          <CodeSnippet code="sudo du -h --max-depth=2 /boot/efi | sort -h" label="Безопасный просмотр размеров каталогов EFI" />
        </Disclosure>
        <Disclosure title="Когда отдельный SSD все-таки понадобится">
          Не сейчас, если все работает. Отдельный SSD имеет смысл при будущей чистой переустановке, постоянной нехватке места в EFI или желании полностью развязать загрузчики Windows и Nobara. Для текущей системы важнее резервная копия и периодическая проверка, чем операция на разделах ради красивой схемы.
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

      <ActionRow id="sync" title="Обнови систему правильным способом" command="nobara-sync" commandLabel="Тот же обновлятор через Konsole, без sudo" status="важно">
        В Nobara Welcome нажми <Code>Update my system</Code>. Откроется Nobara System Updater внутри DNF App Center. Выбери все обновления и запусти установку. Нормальный финал в журнале выглядит как <Code>System update completed successfully</Code>.
        <p className="mt-4">
          Не обновляй Nobara обычной командой DNF. Nobara Updater не просто скачивает новые RPM-пакеты. Он проверяет репозитории, синхронизирует версии, применяет исправления Nobara, проверяет кодеки и умеет вернуть пакет к нужной версии, если его откатили в репозитории. Обычный DNF всех этих действий не делает.
        </p>
        <Disclosure title="Что такое DNF App Center и nobara-sync">
          <p><strong className="text-white">DNF App Center</strong> - графическая программа для системных RPM-пакетов и обновлений. <strong className="text-white">nobara-sync</strong> - штатный обновлятор Nobara в терминале. Это два входа в правильный процесс обновления, а не конкурирующие способы.</p>
          <p className="mt-3">Команду <Code>nobara-sync</Code> запускай без <Code>sudo</Code>. Она сама попросит пароль тогда, когда нужны права администратора. Запуск целиком от root может записать журнал не туда и не увидит пользовательские Flatpak.</p>
        </Disclosure>
        <Disclosure title="Нужно обновить систему вместе с Flatpak">
          <p className="mb-3">Обычный экран обновлений DNF App Center обновляет RPM. Ключ <Code>--all</Code> дополнительно обновит пользовательские Flatpak-приложения.</p>
          <CodeSnippet code="nobara-sync --all" label="RPM и Flatpak одной командой" />
        </Disclosure>
      </ActionRow>

      <ActionRow id="codecs" title="На вопрос о Media Codecs ответь YES" status="не пропускай">
        Кодеки нужны системе, чтобы читать и записывать H.264, H.265 и другие распространенные форматы. Без них может не воспроизводиться видео, не работать аппаратное кодирование OBS или появиться черный экран в браузере. Nobara сама показывает этот вопрос во время первого обновления. Нажми <strong className="text-white">YES</strong> и дождись завершения.
      </ActionRow>

      <ActionRow
        id="apps"
        title="Поставь qBittorrent, Vesktop и Chrome через Flatpak"
        command="flatpak install --user flathub org.qbittorrent.qBittorrent dev.vencord.Vesktop com.google.Chrome"
        commandLabel="Три приложения из Flathub, только для твоего пользователя"
      >
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

        <p className="mt-4">После установки все три программы появятся в меню Plasma. Запусти каждую один раз. Если Chrome и Vesktop открываются, а qBittorrent показывает главное окно, формат и графика работают нормально.</p>
        <Disclosure title="Как обновить или удалить эти Flatpak">
          <div className="space-y-3">
            <CodeSnippet code="flatpak update -y" label="Обновить все Flatpak твоего пользователя" />
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
      <ActionRow
        id="lact-install"
        title="Проверь установленный LACT и службу lactd"
        command={"rpm -q lact\nsystemctl is-enabled lactd\nsystemctl is-active lactd"}
        commandLabel="Проверить пакет, автозапуск и текущее состояние"
      >
        Переустанавливать LACT не надо. Первая строка должна показать имя и версию пакета, вторая - <Code>enabled</Code>, третья - <Code>active</Code>. Затем открой LACT из меню Plasma. В окне должны определиться RX 580, текущая температура, частота ядра и скорость вентиляторов.
        <p className="mt-4">Пока это просто проверка. Не нажимай «Применить» и не включай автоматическую загрузку профиля, если не сохранил исходные значения. Скриншот стартового экрана LACT уже будет нормальной точкой отката.</p>
        <Disclosure title="Пакет есть, но служба inactive или disabled">
          <CodeSnippet code="sudo systemctl enable --now lactd" label="Включить lactd сейчас и при следующих загрузках" />
          <p className="mt-3">После команды снова открой LACT. Если служба стала <Code>active</Code>, переустановка не нужна.</p>
        </Disclosure>
        <Disclosure title="Только если rpm сообщает, что LACT не установлен">
          <CodeSnippet code={"sudo dnf install lact -y\nsudo systemctl enable --now lactd"} label="Запасная установка из репозитория Nobara" />
          <p className="mt-3">Сторонний COPR для LACT не подключай. Сначала используется пакет из репозитория Nobara.</p>
        </Disclosure>
      </ActionRow>

      <ActionRow
        id="lact-mask"
        title="Если напряжение скрыто, разреши управление RX 580"
        command="sudo grubby --update-kernel=ALL --args='amdgpu.ppfeaturemask=0xfffd7fff'"
        commandLabel="Добавить параметр ко всем ядрам и потом перезагрузиться"
        status="только при необходимости"
      >
        Сначала открой вкладку настройки GPU в LACT. Если управление напряжением уже доступно, эту команду пропусти. Если ползунков нет, драйвер AMD скрывает ручное управление. Команда добавит параметр ядра для карт Polaris, к которым относится RX 580. После выполнения полностью перезагрузи ПК и снова открой LACT.
        <Disclosure title="Что означает маска 0xfffd7fff">
          Маска открывает управление питанием и напряжением, но не включает вообще все экспериментальные функции подряд. Для Polaris это консервативнее, чем маска из одних единиц. Она также отключает GFXOFF и Stutter Mode, поэтому на отдельных картах может немного вырасти потребление в простое.
        </Disclosure>
        <Disclosure title="После команды появились проблемы">
          <p className="mb-3">Удали ровно тот же параметр, перезагрузи ПК и проверь систему без него.</p>
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
    <SectionCard id="games" number="05" title="Игры без привязки к одному лаунчеру" description="PortProton, Lesta Game Center и Tanks Blitz уже стоят. Используем их как проверенный пример, а дальше строим понятную схему для любой игры.">
      <ActionRow
        id="portproton"
        title="Проверь уже установленную игровую основу"
        command="rpm -q portproton"
        commandLabel="Посмотреть версию RPM-пакета PortProton"
      >
        Открой PortProton из меню Plasma, затем запусти уже установленный Lesta Game Center и из него Tanks Blitz. Ничего не переустанавливай поверх рабочей копии. Задача этого прохода - убедиться, что лаунчер входит в аккаунт, игра показывает картинку, слышит звук и нормально закрывается обратно в PortProton.
        <p className="mt-4">Команда покажет версию PortProton, если он установлен как RPM. Если она отвечает <Code>package portproton is not installed</Code>, но программа открывается, значит ее могли поставить другим способом. Это не повод удалять рабочую установку: сначала посмотри свойства ярлыка и откуда он запускается.</p>
        <Settings className="mt-5">
          <Setting label="PortProton" value="Оболочка для Windows-программ" />
          <Setting label="Lesta Game Center" value="Уже рабочий лаунчер-пример" />
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
        Сначала выясни, какая перед тобой игра. Нативная Linux-версия запускается без Wine. Windows-игра из Steam обычно работает через Proton внутри нативного Steam. Отдельный <Code>setup.exe</Code> или чужой лаунчер удобнее запускать через PortProton. Не надо пихать каждую игру в префикс Lesta только потому, что он уже работает.
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
          <p className="mt-3">Скрин последней ошибки и журнал полезнее сообщения «не запускается». В журнале не публикуй токены, логины и полный путь, если в нем видно настоящее имя.</p>
        </Disclosure>
        <Disclosure title="Игра лежит на диске Windows">
          Сам установщик можно прочитать с NTFS, но префикс лучше создать на ext4 или btrfs. Wine активно использует права доступа и ссылки Linux, которых на NTFS нет. Если появилась странная ошибка прав или файлов, первым делом перенеси префикс на Linux-раздел. Не используй один и тот же префикс одновременно из Windows и Nobara.
        </Disclosure>
        <Disclosure title="Удалить сломанный префикс и начать заново">
          В PortProton выбери именно префикс проблемной игры и используй его штатное удаление. Это сотрет виртуальный диск C, настройки и локальные сохранения внутри него, но не обязано удалить файлы самой игры. Сначала скопируй сохранения. Никогда не удаляй папку руками, пока не сверил ее путь.
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
          Сначала проверь, не выключен ли источник значком динамика и двигается ли его шкала. Затем выбери источник приложения заново. Перезапуск PipeWire из аварийного раздела нужен только если звук исчез во всей системе, а не когда ты случайно нажал Mute. Не надо чинить сервер, если виновата одна кнопка.
        </Disclosure>
      </ActionRow>

      <ActionRow id="stream-test" title="Подключи VK Видео Live и проведи тестовый эфир">
        В студии VK Видео Live создай трансляцию и скопируй адрес сервера RTMP и ключ. В OBS открой Настройки - Трансляция, выбери службу <Code>Настраиваемый</Code>, вставь адрес в поле Сервер, а секретную строку в поле Ключ трансляции. Ключ работает как пароль: не показывай его в скриншотах, не отправляй в чат и сбрось в студии VK, если он засветился.
        <p className="mt-4">Сначала сделай локальную запись на 10 минут в формате MKV: запусти игру, активно подвигайся, поговори в микрофон, открой оверлей и один раз свернись. MKV безопаснее MP4 при сбое питания. После записи OBS умеет преобразовать файл в MP4 через меню Файл - Remux Recordings.</p>
        <p className="mt-4">Потом проведи короткий контролируемый эфир в VK, не анонсируя его как большой старт. Открой Вид - Статистика и смотри показатели во время игры. Цель - чтобы счетчики не росли постоянно.</p>
        <Settings className="mt-4">
          <Setting label="Пропущенные кадры рендера" value="Снизить графику или ограничить FPS игры" />
          <Setting label="Пропущенные кадры кодирования" value="Снизить выход до 720p60 или 1080p30" />
          <Setting label="Потерянные кадры сети" value="Провод, ниже битрейт, проверить загрузку сети" />
          <Setting label="Звук идет дважды" value="Отключить Desktop Audio или дубль источника" />
        </Settings>
        <p className="mt-4">Для стрима в 60 FPS ограничь игру на 60 FPS хотя бы на тест. Монитор Acer умеет 75 Гц, но забитая под 100% RX 580 не оставит OBS места на сборку кадра. Ровные 60 для зрителя лучше, чем 75 у тебя плюс презентация PowerPoint в эфире.</p>
        <Disclosure title="Что сохранить после удачного теста">
          В OBS экспортируй профиль и коллекцию сцен через верхние меню Профиль и Коллекция сцен. Храни копию локально. Архив со сценами может содержать приватные URL браузерных виджетов, поэтому не загружай его в публичное облако или GitHub. Сам ключ VK безопаснее не хранить в заметках вообще.
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

      <ActionRow
        id="windows-time"
        title="Отключи Fast Startup и переведи Windows в UTC"
        command={'reg add "HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Control\\TimeZoneInformation" /v RealTimeIsUniversal /d 1 /t REG_DWORD /f'}
        commandLabel="Windows Terminal от администратора: хранить аппаратные часы в UTC"
      >
        Linux хранит аппаратные часы в UTC, а Windows по умолчанию считает их местным временем. Из-за этого после переключения системы часы могут уезжать. Команда меняет правило Windows, а не часовой пояс.
        <div className="mt-4 space-y-3">
          <CodeSnippet code="powercfg /h off" label="Windows Terminal от администратора: отключить гибернацию и Fast Startup" />
          <CodeSnippet code="timedatectl set-local-rtc 0" label="Konsole в Nobara: оставить режим UTC" />
        </div>
        <p className="mt-4">Fast Startup сохраняет часть состояния Windows на диск вместо полного выключения. Linux после этого может увидеть NTFS-раздел как небезопасно закрытый и отказаться писать на него. После команд полностью перезагрузи обе системы.</p>
        <Disclosure title="Вернуть стандартные часы Windows и гибернацию">
          <div className="space-y-3">
            <CodeSnippet code={'reg delete "HKEY_LOCAL_MACHINE\\System\\CurrentControlSet\\Control\\TimeZoneInformation" /v RealTimeIsUniversal /f'} label="Windows Terminal от администратора: удалить настройку UTC" />
            <CodeSnippet code="powercfg /h on" label="Windows Terminal от администратора: вернуть гибернацию" />
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
        <p className="mt-4">После перезагрузки должны появиться пункты Nobara и Windows Boot Manager. Если Windows нет, не форматируй EFI и не копируй случайные команды восстановления загрузчика. Сначала проверь, виден ли Windows Boot Manager в Boot Menu самой платы.</p>
        <Disclosure title="Снова скрывать меню после успешного запуска">
          <CodeSnippet code="sudo grub2-editenv - set menu_auto_hide=1" label="Вернуть автоматическое скрытие GRUB" />
        </Disclosure>
      </ActionRow>
    </SectionCard>
  );
}

function Rescue() {
  return (
    <SectionCard id="rescue" number="08" title="Если что-то сломалось" description="Сначала мягкое действие, потом жесткое. Каждая команда ниже делает одну понятную вещь.">
      <CommandItem
        title="Обновление Nobara зависло или показывает конфликт"
        description="Повторно запускает штатную синхронизацию пакетов и исправления Nobara. Команда сама запросит пароль при необходимости."
        code="nobara-sync"
      />
      <CommandItem
        title="Пропал звук или приложения перестали видеть устройства"
        description="Перезапускает PipeWire, совместимый слой PulseAudio и менеджер звуковых устройств только в твоем сеансе. Перезагрузка ПК обычно не нужна."
        code="systemctl --user restart pipewire pipewire-pulse wireplumber"
      />
      <CommandItem
        title="Зависла одна игра через Wine"
        description="Просит сервер Wine завершить процессы текущих Windows-приложений. Начинай с этого варианта."
        code="wineserver -k"
      />
      <CommandItem
        title="Wine и PortProton вообще не реагируют"
        description="Принудительно убивает перечисленные процессы. Несохраненные данные в запущенных Windows-программах пропадут, поэтому это последний способ, а не кнопка выхода."
        code="killall -9 portproton wine xwininfo"
        danger
      />
      <CommandItem
        title="Посмотреть серьезные ошибки текущей загрузки"
        description="Показывает ошибки от момента последнего запуска системы. Красная строка не всегда означает причину проблемы, читай время и имя службы."
        code="journalctl -b -p err..alert"
      />
      <CommandItem
        title="Посмотреть службы, которые не смогли запуститься"
        description="Выводит только упавшие системные службы. Если список пуст, systemd не видит проваленных служб."
        code="systemctl --failed"
      />
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
    <footer className="border-t border-zinc-500/60 py-10">
      <p className="text-xs leading-5 text-zinc-300">Если после крупного обновления название или путь изменились, сначала смотри официальную Wiki. Nobara меняется быстрее, чем старые ролики и случайные ответы в поиске.</p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
        {links.map(([label, href]) => (
          <a key={href} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-200 hover:text-white">
            {label}<ExternalLink className="h-3 w-3" />
          </a>
        ))}
      </div>
    </footer>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-zinc-500/60 px-0 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0">
      <div className="font-mono text-[9px] uppercase tracking-wider text-zinc-300">{label}</div>
      <div className="mt-1 text-xs font-medium text-white">{value}</div>
    </div>
  );
}

function Term({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 border-b border-zinc-500/60 py-4 last:border-b-0 sm:grid-cols-[150px_1fr] sm:gap-5">
      <dt className="font-mono text-xs font-semibold text-white">{name}</dt>
      <dd className="text-sm leading-6 text-zinc-200">{children}</dd>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="border border-zinc-500/60 bg-[#303030] px-1.5 py-0.5 font-mono text-[12px] text-white">{children}</code>;
}

function Settings({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border border-zinc-500/60 ${className}`}>{children}</div>;
}

function Setting({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-zinc-500/60 px-4 py-3 text-sm last:border-b-0">
      <span className="text-zinc-300">{label}</span>
      <span className="text-right font-medium text-white">{value}</span>
    </div>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return <div className="mb-6 border-l-2 border-red-400 bg-red-950/20 px-4 py-3 text-sm leading-6 text-zinc-100"><span className="font-semibold text-red-200">Стоп. </span>{children}</div>;
}

function CommandItem({ title, description, code, danger = false }: { title: string; description: string; code: string; danger?: boolean }) {
  return (
    <div className="border-t border-zinc-500/60 py-6 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-2">
        {danger && <RotateCcw className="h-3.5 w-3.5 text-red-200" />}
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-2 text-sm leading-6 text-zinc-200">{description}</p>
      <CodeSnippet code={code} label={danger ? "Только если мягкий способ не помог" : "Konsole"} className="mt-3" />
    </div>
  );
}
