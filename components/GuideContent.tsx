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
    <SectionCard id="before" number="01" title="До установки" description="Самый важный раздел для второй системы. Здесь одна ошибка может задеть Windows и твои файлы.">
      <Warning>
        Официальная Nobara Wiki не рекомендует ставить Nobara рядом с Windows на один физический диск. Windows обычно создает слишком маленький EFI-раздел, а обеим системам он нужен для загрузки. Самый безопасный вариант - отдельный SSD для Nobara. На Gigabyte B450M S2H можно оставить Windows на NVMe и добавить SATA SSD под Nobara.
      </Warning>

      <ActionRow id="backup" title="Сделай копию файлов и ключа восстановления">
        Скопируй важные документы, сохранения и рабочие файлы с Windows на внешний диск или в облако. Если включен BitLocker, сохрани его ключ восстановления отдельно. После изменения разметки Windows иногда просит этот ключ даже тогда, когда ты ничего плохого не делал.
        <Disclosure title="Если второго диска пока нет">
          Не нажимай наугад <Code>Установить рядом</Code> и не форматируй существующий EFI-раздел. Сначала освободи место средствами Windows, проверь резервную копию и прочитай официальный раздел про ручную разметку. Nobara нужны отдельные разделы <Code>/boot</Code>, <Code>/boot/efi</Code> и <Code>/</Code>. Если эти слова пока ничего не говорят, лучше остановиться и взять отдельный SSD. Тут цена ошибки выше цены диска.
        </Disclosure>
      </ActionRow>

      <ActionRow id="usb" title="Запиши и проверь установочную флешку">
        Скачай актуальный образ Nobara 43 KDE только с официального сайта. Wiki рекомендует Ventoy. Rufus тоже подходит, если выбрать GPT и режим DD. balenaEtcher официальная Wiki больше не рекомендует из-за проблем с записью образа.
        <div className="mt-4 space-y-3">
          <CodeSnippet code="Get-FileHash .\Nobara-43-*.iso -Algorithm SHA256" label="PowerShell: посчитать контрольную сумму" />
        </div>
        <p className="mt-4">Сравни полученную строку SHA256 с суммой на странице загрузки. Совпало полностью - флешке можно доверять. Не совпало - скачай образ заново.</p>
      </ActionRow>

      <ActionRow id="install" title="Установи Nobara в режиме UEFI">
        Перед запуском установщика отключи <Code>Secure Boot</Code> в BIOS. Кастомное ядро Nobara с ним несовместимо. Режим загрузки оставь <Code>UEFI</Code>, а <Code>CSM</Code> лучше отключить. После этого выбери флешку с пометкой UEFI в Boot Menu и сначала запусти живую систему.
        <p className="mt-4">Проверь клавиатуру, мышь, сеть, звук и оба монитора. Затем открой установщик с рабочего стола, выбери русский язык, нужную раскладку и часовой пояс. На шаге выбора диска сверь модель и объем. Для отдельного пустого SSD выбери автоматическую разметку только этого диска. Установщик создаст собственные разделы Nobara и не должен форматировать диск Windows.</p>
        <p className="mt-4">После установки перезагрузи ПК, вынь флешку и в Boot Menu выбери диск Nobara. Если система загрузилась, Dolphin видит файлы, сеть и звук работают, этот пункт выполнен. Потом уже возвращайся к Windows Boot Manager и проверяй запуск Windows.</p>
        <Disclosure title="Что проверить до нажатия «Установить»">
          <p>Если ставишь на отдельный SSD, дважды сверь его объем и модель. На экране итоговых изменений установщик обязан показывать только выбранный диск Nobara. Видишь форматирование NVMe с Windows, незнакомую разметку или не понимаешь итоговый список - нажми «Назад» и остановись. Название диска скучное, зато форматирование очень бодрое.</p>
          <p className="mt-3">На одном диске не выбирай автоматическое стирание и не форматируй существующий EFI-раздел Windows. Для этого сценария нужна ручная разметка и понимание EFI, а официальная Wiki его не рекомендует.</p>
        </Disclosure>
      </ActionRow>
    </SectionCard>
  );
}

function FirstStart() {
  return (
    <SectionCard id="start" number="02" title="Первый запуск" description="Сначала штатное обновление, кодеки и понятная схема установки программ. Потом уже игры и тюнинг.">
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
          Если в твоей версии DNF App Center есть вкладка <Code>Flatpaks</Code>, можно открыть ее, выбрать пакет из Flathub и режим <Code>User</Code>. Результат будет тем же. Это отдельная графическая вкладка Flatpak, а не способность DNF обновлять Flatpak. Нельзя путать ее с вкладкой <Code>Packages</Code>: там лежат нативные RPM-пакеты, которые ставятся в саму систему. Команда ниже дана не потому, что терминал круче. Она просто сразу фиксирует правильный источник, точные приложения и пользовательский режим.
        </p>
        <p className="mt-4">
          Если хочется магазин попроще, открой Nobara Welcome - <Code>Recommended Additions</Code> и поставь <Code>Bazaar</Code>. В Bazaar найди приложения по названию и выбери установку для пользователя. Discover на этом ПК удален, возвращать его ради Flatpak не нужно.
        </p>

        <Settings className="mt-5">
          <Setting label="DNF App Center / Packages" value="Система, драйверы, OBS, LACT" />
          <Setting label="DNF App Center / Flatpaks" value="Обычные приложения из Flathub" />
          <Setting label="Bazaar" value="Простой графический магазин Flatpak" />
          <Setting label="flatpak install --user" value="Тот же Flatpak через Konsole" />
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
    <SectionCard id="lact" number="04" title="RX 580 и LACT" description="LACT управляет питанием и вентиляторами видеокарты. Сначала ставим, потом меняем по одному параметру.">
      <ActionRow
        id="lact-install"
        title="Установи LACT из репозитория Nobara"
        command={"sudo dnf install lact -y\nsudo systemctl enable --now lactd"}
        commandLabel="Установить LACT и запустить его службу"
      >
        LACT относится к системным утилитам и общается с драйвером видеокарты через фоновую службу <Code>lactd</Code>. Поэтому здесь нужен нативный RPM, а не Flatpak. Сначала попробуй найти <Code>lact</Code> в DNF App Center на вкладке Packages. Команда ниже делает то же самое через Konsole.
        <p className="mt-4">После установки открой LACT из меню. Если окно показывает RX 580, температуру и частоты, служба работает. Сторонний COPR для LACT на актуальной Nobara сначала подключать не надо: официальная Wiki относит LACT к программам, доступным из репозиториев Nobara.</p>
        <Disclosure title="Удалить LACT и его службу">
          <CodeSnippet code={"sudo systemctl disable --now lactd\nsudo dnf remove lact -y"} label="Остановить службу и удалить пакет" />
        </Disclosure>
      </ActionRow>

      <ActionRow
        id="lact-mask"
        title="Разреши LACT менять напряжение"
        command="sudo grubby --update-kernel=ALL --args='amdgpu.ppfeaturemask=0xfffd7fff'"
        commandLabel="Добавить параметр ко всем ядрам и потом перезагрузиться"
        status="только RX 580"
      >
        Драйвер AMD по умолчанию скрывает часть ручного управления. Эта команда добавляет параметр ядра для карт Polaris, к которым относится RX 580. После выполнения полностью перезагрузи ПК и снова открой LACT.
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
    <SectionCard id="games" number="05" title="Windows-игры" description="Wine и Proton переводят обращения Windows-игры в понятные Linux команды. PortProton дает для этого графическую оболочку.">
      <ActionRow
        id="portproton"
        title="Поставь PortProton и Lesta Game Center"
        command={"sudo dnf copr enable boria138/portproton -y\nsudo dnf install portproton -y"}
        commandLabel="Запасной вариант: сторонний COPR"
      >
        Сначала ищи PortProton в Nobara Welcome и DNF App Center. Если пакет там есть, ставь оттуда и не подключай сторонний репозиторий. После первого запуска открой раздел автоустановки PortProton и выбери Lesta Game Center.
        <Disclosure title="Что такое Wine, Proton и префикс">
          Wine создает для Windows-программы знакомую структуру диска C и переводит ее системные вызовы. Proton добавляет игровые исправления поверх Wine. Префикс - отдельная папка с виртуальным диском C, реестром и библиотеками конкретной игры. Это не виртуальная машина и отдельная Windows туда не устанавливается.
        </Disclosure>
        <Disclosure title="Почему COPR оставлен только запасным вариантом">
          COPR - сторонний репозиторий RPM-пакетов. Официальная Nobara Wiki предупреждает, что забытые COPR могут мешать переходу на следующую версию системы, если автор не собрал свежие пакеты. Используй команду только если PortProton отсутствует в источниках Nobara и текущая сборка COPR поддерживает твою версию.
        </Disclosure>
        <Disclosure title="Удалить PortProton и отключить сторонний COPR">
          <CodeSnippet code={"sudo dnf remove portproton -y\nsudo dnf copr disable boria138/portproton -y"} label="Удалить пакет и его сторонний источник" />
        </Disclosure>
      </ActionRow>

      <ActionRow id="prefixes" title="Делай отдельный префикс для каждой игры">
        Для локального <Code>setup.exe</Code> выбери запуск через PortProton и создай новый префикс. В установщике сними галочки DirectX и Visual C++. PortProton поставит совместимые компоненты сам. Отдельный префикс не дает одной игре сломать библиотеки другой и сильно упрощает удаление.
        <Disclosure title="Коротко про FitGirl и DODI">
          Их <Code>setup.exe</Code> технически запускается тем же способом. Используй только законно полученные файлы и проверяй источник. Сайт не раздает репаки и не ведет на пиратские ссылки.
        </Disclosure>
        <Disclosure title="Игра лежит на диске Windows">
          Сам установщик можно прочитать с NTFS, но префикс лучше создать на ext4 или btrfs. Wine активно использует особенности файловой системы Linux, которых на NTFS нет. Если словишь странную ошибку прав или ссылок, первым делом перенеси префикс на Linux-раздел.
        </Disclosure>
        <Disclosure title="Удалить сломанный префикс и начать заново">
          В PortProton выбери именно префикс проблемной игры и используй его удаление. Это сотрет виртуальный диск C, настройки и локальные сохранения внутри него, но не обязано удалять файлы самой игры. Сначала скопируй сохранения. Никогда не удаляй руками папку, пока не сверил ее путь.
        </Disclosure>
        <Disclosure title="Захват OpenGL-игры в OBS">
          <CodeSnippet code="obs-gamecapture %command%" label="Параметры запуска Steam для OpenGL" />
          <p className="mt-3">Для Vulkan и игр через DXVK или VKD3D этот параметр не нужен: Nobara включает Vulkan Game Capture глобально.</p>
        </Disclosure>
      </ActionRow>
    </SectionCard>
  );
}

function Obs() {
  return (
    <SectionCard id="obs" number="06" title="OBS и звук" description="OBS ставим нативно, чтобы RX 580 кодировала видео через VAAPI, а плагины Nobara были на месте.">
      <ActionRow id="obs-video" title="Поставь нативный OBS и выбери VAAPI H.264">
        Открой Nobara Welcome - Recommended Additions или DNF App Center - Packages и установи <Code>obs-studio</Code>. Версию из Flathub здесь не используй. Нативная сборка Nobara имеет аппаратное кодирование VAAPI, Browser Source и Vulkan Game Capture, включая 32-битный и 64-битный плагины.
        <p className="mt-4">В OBS открой Настройки - Вывод, включи расширенный режим и начни с этих значений:</p>
        <Settings className="mt-4">
          <Setting label="Энкодер" value="FFmpeg VAAPI H.264" />
          <Setting label="Битрейт" value="CBR / 6000 Кбит/с" />
          <Setting label="Ключевые кадры" value="2 секунды" />
          <Setting label="Профиль" value="High" />
          <Setting label="Стартовое разрешение" value="1664x936 / 60 FPS" />
        </Settings>
        <p className="mt-4">VAAPI переносит основную работу кодирования на RX 580. Нагрузка на Ryzen станет ниже, но не будет ровно 0%: OBS все равно собирает сцену, смешивает звук и запускает плагины.</p>
        <Disclosure title="Как добавить захват игры">
          В блоке Источники нажми <Code>+</Code>, выбери <Code>Game Capture</Code> и подтверди. Для Vulkan ничего выбирать по окнам не нужно: источник поймает игру после запуска. Если картинка сыпется в движении, попробуй 1080p30 или 720p60 вместо попытки любой ценой держать 1080p60 на старом кодировщике.
        </Disclosure>
      </ActionRow>

      <ActionRow
        id="obs-audio"
        title="Раздели звук через PipeWire"
        command="sudo dnf install obs-studio-plugin-pipewire-audio-capture -y"
        commandLabel="Добавить плагин захвата отдельных приложений"
      >
        PipeWire - звуковая система Nobara. Плагин добавляет в OBS источник Application Audio Capture. Создай отдельный источник для игры, Vesktop и музыки. Так на записи можно независимо менять громкость или вообще не писать музыку.
        <Settings className="mt-4">
          <Setting label="Дорожка 1" value="Игра" />
          <Setting label="Дорожка 2" value="Vesktop" />
          <Setting label="Дорожка 3" value="Музыка" />
        </Settings>
        <Disclosure title="DonationAlerts через Browser Source">
          В Источниках нажми <Code>+</Code>, выбери <Code>Браузер</Code> и вставь ссылку виджета DonationAlerts. CEF уже входит в нативную сборку OBS от Nobara, отдельный браузерный плагин с левого сайта не нужен.
        </Disclosure>
        <Disclosure title="Убрать плагин отдельного звука">
          <CodeSnippet code="sudo dnf remove obs-studio-plugin-pipewire-audio-capture -y" label="Удалить только дополнительный плагин" />
        </Disclosure>
      </ActionRow>
    </SectionCard>
  );
}

function DualBoot() {
  return (
    <SectionCard id="dualboot" number="07" title="Windows 11 рядом с Nobara" description="Две системы должны делить часы, загрузку и иногда диски. Настроим это без магии.">
      <Warning>
        Если Nobara еще не установлена, вернись к разделу «До установки». Официальная Wiki рекомендует разные физические диски. Этот раздел настраивает уже работающие системы и не делает установку на один NVMe внезапно безопасной.
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
    ["Какие программы ставить нативно", "https://wiki.nobaraproject.org/general-usage/flatpaks/preferred-packages"],
    ["Автомонтирование дисков", "https://wiki.nobaraproject.org/general-usage/troubleshooting/mounting-automounting-disk-drives"],
    ["OBS в Nobara", "https://wiki.nobaraproject.org/general-usage/additional-software/obs-studio"],
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
