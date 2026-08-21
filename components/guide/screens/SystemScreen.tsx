"use client";

import { CodeSnippet } from "@/components/CodeSnippet";
import { Code, GuideScreen, Setting, Settings, StepBlock, SupportPanel, Warning } from "@/components/guide/GuidePrimitives";

export function SystemScreen() {
  return (
    <GuideScreen id="start" number="02" title="База после установки" description="Система уже запускалась, но эти проверки все равно делаем один раз: штатное обновление, кодеки, встроенная оптимизация и понятная схема программ.">
      <StepBlock id="welcome" title="Открой Nobara Welcome">
        Это стартовая панель самой Nobara, а не реклама. Слева открой <Code>First Steps</Code>. Отсюда запускаются обновление, менеджер драйверов и рекомендованные дополнения. На RX 580 обычный графический драйвер AMD уже находится в системе. <Code>rocm-meta</Code> и экспериментальный <Code>mesa-vulkan-drivers-git</Code> для обычных игр не нужны.
      </StepBlock>

      <StepBlock id="sync" title="Обнови систему штатным способом" status="важно">
        В Nobara Welcome нажми <Code>Update my system</Code>. Откроется Nobara System Updater внутри DNF App Center. Нажми <Code>Select All and Update</Code> и дождись строки <Code>System Update: System update completed successfully</Code> в журнале.
        <p className="mt-5">Не обновляй всю Nobara обычной командой DNF. Штатный обновлятор проверяет репозитории, синхронизирует версии, применяет исправления Nobara и умеет вернуть пакет к нужной версии, если его откатили. Обычный DNF всех этих действий не делает.</p>
        <SupportPanel title="Если кнопка Update my system не открывается">
          <p className="mb-4">Открой Konsole и запусти тот же штатный механизм вручную. <Code>sudo</Code> перед командой не ставь: обновлятор сам попросит пароль в нужный момент.</p>
          <CodeSnippet code="nobara-sync" label="Запустить Nobara Updater через Konsole" />
          <p className="mb-4 mt-5">Если синхронизация завершилась конфликтом, используй встроенное восстановление и повтори обычный запуск:</p>
          <div className="space-y-3">
            <CodeSnippet code="nobara-sync repair" label="Исправить состояние пакетов" />
            <CodeSnippet code="nobara-sync" label="Повторить штатное обновление" />
          </div>
        </SupportPanel>
        <SupportPanel title="Если нужно показать журнал ошибки">
          <p className="mb-4">Команда берет последний журнал Nobara Updater и отправляет его в сервис npaste. Перед отправкой все равно просмотри текст и убедись, что там нет личных данных.</p>
          <CodeSnippet code="cat ~/.local/share/nobara-updater/nobara-sync.log | npaste" label="Получить ссылку на журнал обновления" />
        </SupportPanel>
        <SupportPanel title="Обновить RPM и пользовательские Flatpak вместе">
          <p className="mb-4">DNF App Center обновляет RPM. Ключ <Code>--all</Code> дополнительно обновит Flatpak-приложения текущего пользователя.</p>
          <CodeSnippet code="nobara-sync --all" label="RPM и Flatpak одной командой" />
        </SupportPanel>
        <SupportPanel title="После обновления одна из частей системы не запускается">
          <p className="mb-4">Сначала посмотри, есть ли упавшая служба, и серьезные сообщения только текущей загрузки. Эти команды ничего не исправляют и не удаляют.</p>
          <div className="space-y-3">
            <CodeSnippet code="systemctl --failed" label="Показать службы, которые не смогли запуститься" />
            <CodeSnippet code="journalctl -b -p err..alert --no-pager" label="Показать серьезные ошибки текущей загрузки" />
          </div>
          <p className="mt-4">Пустой список служб - хороший результат. Красная строка в журнале еще не доказывает причину: смотри время, имя службы и действие прямо перед ошибкой. Не вставляй первую попавшуюся команду из старого ответа для Fedora.</p>
        </SupportPanel>
      </StepBlock>

      <StepBlock id="codecs" title="На вопрос о Media Codecs ответь YES" status="не пропускай">
        Кодеки нужны системе, чтобы читать и записывать H.264, H.265 и другие распространенные форматы. Без них может не воспроизводиться видео, не работать аппаратное кодирование OBS или появиться черный экран в браузере. Nobara сама показывает этот вопрос во время первого обновления. Нажми <strong className="text-white">YES</strong> и дождись завершения.
      </StepBlock>

      <StepBlock id="nobara-optimization" title="Проверь то, что Nobara уже оптимизировала" status="без новых твиков">
        <p>Отдельный экран с «ускорителями» здесь не нужен. Штатная установка Nobara 43 KDE уже включает сжатую подкачку в оперативной памяти, игровой демон falcond, правила для планировщика дисков, irqbalance и защиту от полного зависания при нехватке памяти. Сначала подтверждаем их состояние на твоем ПК, а не ставим второй набор демонов поверх первого.</p>

        <Settings className="mt-5">
          <Setting label="Zram" value="Сжатая подкачка в оперативной памяти" />
          <Setting label="falcond" value="Игровой профиль включается автоматически" />
          <Setting label="NVMe scheduler" value="Штатный режим none" />
          <Setting label="preload" value="Не установлен и на NVMe не нужен" />
        </Settings>

        <h4 className="mt-6 font-semibold text-white">Zram помогает пережить нехватку 16 ГБ памяти</h4>
        <p className="mt-2"><strong className="text-white">Zram</strong> создает сжатое устройство подкачки прямо в оперативной памяти. Это не добавляет настоящие гигабайты и не хранит подкачку на NVMe, но позволяет дольше не убивать приложение при коротком пике памяти. Пакет приходит из базовой группы системы, поэтому отдельный «оптимизатор RAM» ставить не надо.</p>
        <CodeSnippet code="rpm -q zram-generator-defaults; zramctl; swapon --show" label="Проверить пакет, zram и активную подкачку" className="mt-4" />
        <p className="mt-4">Нормальный результат - версия <Code>zram-generator-defaults</Code>, устройство <Code>/dev/zram0</Code> и строка типа <Code>partition</Code> в выводе подкачки. Размер zram может отличаться от объема оперативной памяти. Если пакета или устройства нет, сначала закончи штатное обновление, перезагрузи ПК и повтори проверку. Не скачивай случайный zram-скрипт.</p>

        <h4 className="mt-6 font-semibold text-white">falcond сам включает игровой режим и потом возвращает прежнее состояние</h4>
        <p className="mt-2"><strong className="text-white">falcond</strong> - штатный игровой демон Nobara. Он замечает процесс игры, выбирает профиль и, если функция доступна на железе, просит системный менеджер питания перейти в <Code>performance</Code>. Для отдельных игр профиль также может выбрать SCX-планировщик процессора или запретить засыпание экрана. После закрытия игры falcond восстанавливает прошлый профиль питания и планировщик.</p>
        <div className="mt-4 space-y-3">
          <CodeSnippet code="systemctl is-enabled falcond; systemctl is-active falcond" label="Проверить автозапуск и работу falcond" />
          <CodeSnippet code="cat /var/lib/falcond/status" label="Показать настройки и активный игровой профиль" />
        </div>
        <p className="mt-4">Сначала жди строки <Code>enabled</Code> и <Code>active</Code>. Без запущенной игры <Code>ACTIVE_PROFILE</Code> должен быть пустым или <Code>(None)</Code> - это покой, а не поломка. Запусти игру, подожди до 9 секунд и прочитай статус снова: появится профиль игры или общий профиль Proton. Ручной режим производительности на весь день для этого не нужен.</p>
        <SupportPanel title="falcond не активен или статус-файла нет">
          <p className="mb-4">Сначала посмотри причину без изменения системы:</p>
          <CodeSnippet code="systemctl status falcond --no-pager" label="Показать состояние и последние сообщения falcond" />
          <p className="mb-4 mt-5">Если пакет есть, а служба просто остановилась, перезапусти ее и повтори проверку статуса:</p>
          <CodeSnippet code="sudo systemctl restart falcond" label="Перезапустить штатный игровой демон" />
          <p className="mt-4">Если служба снова падает, сохрани ее вывод и не подменяй falcond другим оптимизатором. Сначала обнови Nobara через <Code>nobara-sync</Code>.</p>
        </SupportPanel>
        <SupportPanel title="Почему не добавляем gamemoderun в параметры каждой игры">
          <p>Пакет Feral GameMode есть в образе, но сам факт установки не велит запускать его для каждой игры. Официальная Wiki Nobara запрещает одновременно применять GameMode и falcond к одной игре. Оба меняют режим производительности и могут спорить при восстановлении настроек. Поэтому не добавляй <Code>gamemoderun %command%</Code>, пока falcond активен. Больше демонов не означает больше кадров, иногда это просто драка двух дворников за одну швабру.</p>
        </SupportPanel>

        <h4 className="mt-6 font-semibold text-white">NVMe уже получает подходящий планировщик</h4>
        <p className="mt-2"><strong className="text-white">Планировщик ввода-вывода</strong> решает, в каком порядке накопитель получает запросы. Правило Nobara выбирает <Code>none</Code> для NVMe, <Code>mq-deadline</Code> для SATA SSD и <Code>bfq</Code> для жесткого диска. Для быстрого NVMe режим <Code>none</Code> означает, что ядро не устраивает лишнюю очередь поверх контроллера.</p>
        <CodeSnippet code="grep . /sys/block/nvme*/queue/scheduler" label="Показать планировщик каждого NVMe" className="mt-4" />
        <p className="mt-4">Выбранный вариант отмечен квадратными скобками, ожидаемый ответ - <Code>[none]</Code>. Если видишь другой вариант, не записывай новое значение в <Code>/sys</Code> вручную: после перезагрузки оно все равно пропадет. Сохрани вывод вместе с <Code>lsblk -f</Code> и сначала проверь штатные обновления.</p>

        <h4 className="mt-6 font-semibold text-white">Preload для этого NVMe пропускаем</h4>
        <p className="mt-2"><strong className="text-white">Preload</strong> пытается предугадывать запуск программ и заранее читать файлы в память. В официальном KDE-образе Nobara 43 его нет, а для Fedora 43 не находится актуального штатного пакета. На NVMe выигрыш сомнительный, зато демон постоянно наблюдает за запуском программ и занимает память.</p>
        <CodeSnippet code="rpm -q preload" label="Убедиться, что preload не установлен" className="mt-4" />
        <p className="mt-4">Ожидаемое сообщение - пакет <Code>preload</Code> не установлен. Это правильный результат. Не подключай старый COPR и не собирай заброшенный пакет ради красивого слова «оптимизация».</p>

        <SupportPanel title="Еще три штатные вещи, которые не надо дублировать">
          <p><Code>irqbalance</Code> распределяет аппаратные прерывания между потоками процессора. <Code>systemd-oomd</Code> помогает вернуть управление системой при критической нехватке памяти. Для Wine Nobara отдельно задает подходящий quantum PipeWire, чтобы не требовать общего системного твика звука.</p>
          <CodeSnippet code="systemctl status irqbalance systemd-oomd --no-pager" label="Проверить службы распределения прерываний и защиты памяти" className="mt-4" />
          <p className="mt-4">Не ставь рядом earlyoom, nohang, Ananicy, tuned или второй менеджер питания просто по списку из чужой Fedora. Сначала должен существовать измеримый сбой, которого не решают уже установленные механизмы.</p>
        </SupportPanel>

        <h4 className="mt-6 font-semibold text-white">Режим performance не поднимает TDP Ryzen 5 2600</h4>
        <p className="mt-2">Проверь, какие профили питания и какой драйвер частоты реально доступны. На старом Zen+ нормален <Code>acpi-cpufreq</Code>. Не добавляй параметр <Code>amd_pstate=active</Code> ради нового названия: документация ядра относит amd-pstate к более новым процессорам с CPPC, а неподдерживаемое железо все равно откатывается к старому драйверу.</p>
        <CodeSnippet code="powerprofilesctl list; powerprofilesctl get; cat /sys/devices/system/cpu/cpufreq/policy0/scaling_driver" label="Проверить профили питания и драйвер частоты CPU" className="mt-4" />
        <p className="mt-4">Если профиль <Code>performance</Code> доступен, falcond включает его только на время игры. Это меняет политику выбора частоты, но не напряжение, множитель и паспортный лимит мощности. Если performance в списке нет, не создавай его скриптом: штатный Precision Boost процессора продолжает работать в пределах BIOS, температуры и питания.</p>

        <Warning>Ryzen 5 2600 имеет паспортный TDP 65 Вт, частоты 3,4-3,9 ГГц и разблокированный множитель, но это не делает любое повышение лимита безопасным. Официальный PBO не совместим с Ryzen второго поколения. На Gigabyte B450M S2H используется простая 4+3-фазная схема питания, а ревизия платы, кулер, обдув VRM и реальные температуры здесь неизвестны. Поэтому универсального безопасного числа PPT, TDC, EDC или напряжения для этого ПК нет.</Warning>
        <Settings className="mt-5">
          <Setting label="Core Performance Boost" value="Auto или Enabled" />
          <Setting label="CPU Clock Ratio" value="Auto" />
          <Setting label="CPU Vcore" value="Auto" />
          <Setting label="Программное повышение TDP" value="Не применять" />
        </Settings>
        <p className="mt-5">Оставь штатный boost и смотри температуру CPU в MangoHUD или через <Code>sensors</Code> во время реальной игры. Если процессор перегревается или сбрасывает частоту, сначала чистят охлаждение, проверяют прижим кулера и настраивают кривую вентилятора. Утилита RyzenAdj предназначена для мобильных Ryzen, а сторонний модуль ryzen_smu и запись через <Code>/dev/mem</Code> для настольного Ryzen 5 2600 не являются разумным способом добыть пару кадров.</p>
        <SupportPanel title="Почему здесь нет инструкции ручного разгона">
          <p>Ручной множитель и напряжение в BIOS действительно возможны, потому что процессор разблокирован. Но это уже разгон, а не настройка Nobara: он требует известного кулера, обдува зоны питания, стресс-тестов, контроля напряжения и готовности сбрасывать CMOS после неудачной загрузки. Он может увеличить нагрев, потребление и нестабильность, а в игре с RX 580 прирост еще и часто упрется в видеокарту. Для новичка на этой плате измеримый риск выше ожидаемой пользы, поэтому кентская рекомендация простая - не повышать TDP и не фиксировать частоту.</p>
        </SupportPanel>
      </StepBlock>

      <StepBlock id="apps" title="Поставь qBittorrent, Vesktop и Chrome через Flatpak">
        <p>
          <strong className="text-white">Flatpak</strong> - отдельный формат приложений. Программа приходит вместе с подходящей средой выполнения и запускается с ограниченным доступом к системе. <strong className="text-white">Flathub</strong> - основной каталог Flatpak, который в Nobara уже включен по умолчанию. Nobara не подключает урезанные Fedora Flatpak-репозитории, а использует официальный Flathub.
        </p>
        <p className="mt-4">
          Для обычных пользовательских программ официальная Wiki советует Flatpak, чтобы не набивать систему дополнительными RPM-пакетами и сторонними репозиториями. qBittorrent, Vesktop и Chrome не должны менять ядро, драйверы или графический стек, поэтому изоляция им не мешает. Зато удалить их можно без ковыряния системных зависимостей.
        </p>

        <h4 className="mt-5 font-semibold text-white">Почему эти три программы не ставим через DNF App Center?</h4>
        <p className="mt-2">
          DNF App Center предназначен для нативных Linux-приложений и системных пакетов в формате RPM. Он ищет каталог AppStream, устанавливает и удаляет RPM из репозиториев, обновляет систему и умеет открыть локальный файл <Code>.rpm</Code>. Это полноценный центр приложений, а не «только драйверы». Но пользовательские Flatpak из Flathub и Windows-файлы <Code>.exe</Code> относятся к другим слоям, поэтому через DNF он их не обслуживает. Команда ниже дана не потому, что терминал круче. Она просто сразу фиксирует Flathub, точные приложения и режим <Code>User</Code>.
        </p>
        <p className="mt-4">
          Если хочется графический Flatpak-магазин, открой Nobara Welcome - <Code>Recommended Additions</Code> и поставь <Code>Bazaar</Code>. В некоторых установках уже есть <Code>Flatpost</Code>, он решает ту же задачу. Найди приложения по названию и выбери установку для пользователя. Discover на этом ПК удален, возвращать его ради Flatpak не нужно.
        </p>

        <CodeSnippet code="flatpak install --user flathub org.qbittorrent.qBittorrent dev.vencord.Vesktop com.google.Chrome" label="Три приложения из Flathub, только для твоего пользователя" className="mt-6" />
        <p className="mt-5">Подтверди список клавишей <Code>Y</Code>, если Flatpak спросит разрешение. После установки все три программы появятся в меню Plasma. Запусти каждую один раз. Если Chrome и Vesktop открываются, а qBittorrent показывает главное окно, установка закончена.</p>
        <SupportPanel title="Если команда пишет, что репозиторий flathub не найден">
          <p className="mb-4">В нормальной Nobara Flathub уже подключен. Если его запись пропала, верни официальный репозиторий только для своей учетной записи, а затем повтори установку.</p>
          <div className="space-y-3">
            <CodeSnippet code="flatpak remote-add --user --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo" label="Вернуть пользовательский Flathub" />
            <CodeSnippet code="flatpak install --user flathub org.qbittorrent.qBittorrent dev.vencord.Vesktop com.google.Chrome" label="Повторить установку" />
          </div>
        </SupportPanel>

        <Settings className="mt-5">
          <Setting label="DNF App Center" value="RPM-пакеты и система" />
          <Setting label="Nobara System Updater" value="Правильное обновление Nobara" />
          <Setting label="Bazaar или Flatpost" value="Графический Flatpak из Flathub" />
          <Setting label="flatpak install --user" value="Flatpak через Konsole" />
        </Settings>

        <SupportPanel title="Почему режим User, а не System">
          <p><Code>User</Code> ставит приложение только для твоей учетной записи и не требует раскладывать его по всей системе. Официальная Wiki рекомендует этот режим. Главное - не смешивать User и System, иначе одинаковые среды выполнения могут храниться дважды и жрать место.</p>
          <p className="mt-3">Минус Flatpak тоже есть: общие среды выполнения занимают дополнительное место. Это не магия и не всегда самый маленький пакет. Здесь приоритет - чистая система и понятное обновление.</p>
        </SupportPanel>

        <SupportPanel title="Когда нужен нативный RPM, а не Flatpak">
          Steam, Lutris, Gamescope, MangoHud, OBS Studio, Prism Launcher, Blender и Kdenlive официальная Wiki советует ставить из репозиториев Nobara. Им важны драйверы, аппаратное кодирование, игровые хуки или плагины. Для них открывай DNF App Center или Recommended Additions, а не Flathub.
        </SupportPanel>

        <SupportPanel title="Как обновить или удалить эти Flatpak">
          <div className="space-y-3">
            <CodeSnippet code="flatpak update --user -y" label="Обновить все Flatpak твоего пользователя" />
            <CodeSnippet code="flatpak uninstall --user org.qbittorrent.qBittorrent dev.vencord.Vesktop com.google.Chrome" label="Удалить эти три приложения" />
          </div>
        </SupportPanel>
      </StepBlock>

      <StepBlock id="windows-apps" title="Windows-программу запускай через Bottles, а не через DNF App Center">
        Файл <Code>.exe</Code> содержит программу для Windows. DNF App Center не переводит Windows-вызовы и не создает диск C, поэтому сам такой файл не устанавливает. Он может поставить Linux-приложение в формате RPM, включая локальный <Code>.rpm</Code>, но совпадающее слово «установщик» не превращает один формат в другой.
        <p className="mt-4">Сначала поищи нативную Linux-версию программы или подходящий Flatpak. Она обычно лучше работает с Wayland, файлами и обновлениями. Если нужен именно Windows-вариант, используй <strong className="text-white">Bottles</strong>. Это графическая оболочка над Wine, которая создает отдельные изолированные окружения с виртуальным диском C и своим runner.</p>
        <Settings className="mt-5">
          <Setting label="Файл .rpm" value="Открыть в DNF App Center" />
          <Setting label="Приложение из RPM-каталога" value="Найти в DNF App Center" />
          <Setting label="Обычное приложение из Flathub" value="Bazaar, Flatpost или Flatpak User" />
          <Setting label="Windows-файл .exe или .msi" value="Bottles, если нет нативной версии" />
          <Setting label="Windows-игра" value="Steam, PortProton, Lutris или Heroic" />
        </Settings>
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-6 text-zinc-200">
          <li>Установи Bottles из Flathub только для своего пользователя.</li>
          <li>Открой Bottles и создай новую bottle типа <Code>Application</Code>. Назови ее по программе, чтобы через месяц не гадать, что лежит в «New Bottle 4».</li>
          <li>Открой созданную bottle, нажми <Code>Run executable</Code> и выбери доверенный <Code>.exe</Code> или <Code>.msi</Code>.</li>
          <li>Пройди обычный Windows-установщик. Путь внутри <Code>C:\Program Files</Code> относится к виртуальному диску этой bottle, а не к разделу Windows 11.</li>
          <li>После установки запускай найденную программу из раздела Programs той же bottle. Если ярлык не появился, снова используй Run executable и выбери основной файл программы внутри ее виртуального диска.</li>
        </ol>
        <CodeSnippet code="flatpak install --user flathub com.usebottles.bottles" label="Установить поддерживаемую Flatpak-версию Bottles в режиме User" className="mt-5" />
        <p className="mt-5">Ожидаемый результат - одна программа запускается внутри своей bottle, не меняет рабочий префикс Lesta и не раскладывает Windows-библиотеки по Nobara. Для следующего независимого приложения лучше создать отдельную bottle. Общая bottle нужна только программам, которые действительно устанавливают плагины друг для друга.</p>
        <SupportPanel title="Установщик просит Visual C++, .NET или другой компонент">
          Сначала запусти программу без ручного набора зависимостей. Если официальная инструкция приложения называет конкретный компонент, установи только его через Dependencies внутри выбранной bottle и повтори запуск. Меняй по одному компоненту. Не ставь системные Windows-DLL в Nobara и не копируй их в префикс Lesta.
        </SupportPanel>
        <SupportPanel title="Что Bottles, скорее всего, не спасет">
          Драйверы, антивирусы, утилиты прошивки железа и программы с глубокой интеграцией в Windows обычно не подходят для Wine. Современные Microsoft Office, Adobe и защищенные корпоративные клиенты тоже могут работать частично или не работать вообще. В таких случаях используй веб-версию, Linux-альтернативу или сохраненную Windows 11. Bottles не является виртуальной машиной и не гарантирует запуск любого файла.
        </SupportPanel>
        <SupportPanel title="Безопасность Windows-установщика">
          Изоляция bottle защищает префиксы друг от друга, но не делает подозрительный <Code>.exe</Code> безопасным. Скачивай установщик с сайта разработчика, не запускай кейгены и не выдавай bottle доступ ко всей домашней папке без необходимости. Windows-вредонос может прочитать те пользовательские файлы, которые доступны Wine.
        </SupportPanel>
        <SupportPanel title="Удалить неудачную программу и откатить изменения">
          Сначала открой Uninstaller внутри этой bottle и удали программу обычным способом. Если bottle создавалась только для нее и больше ничего ценного внутри нет, удали всю bottle через меню Bottles. Это удалит ее виртуальный диск C и настройки, но не затронет PortProton, другие bottles или настоящую Windows. Не удаляй скрытую папку Flatpak руками, пока не сверил название bottle.
        </SupportPanel>
      </StepBlock>

      <StepBlock id="disk-space" title="Освобождай место по цифрам, а не ковровой бомбардировкой кэшей">
        На NVMe 512 ГБ игры и записи OBS закончат место быстрее самой системы. Сначала узнай, какой раздел заполнен. <Code>/</Code> - системный путь, <Code>/home</Code> - домашние файлы. На btrfs они могут показывать один и тот же общий объем, это нормально.
        <div className="mt-4 space-y-3">
          <CodeSnippet code="df -h / /home" label="Свободное место на системе и домашней папке" />
          <CodeSnippet code={'du -h --max-depth=1 "$HOME" 2>/dev/null | sort -h'} label="Размер папок текущего пользователя" />
          <CodeSnippet code="flatpak list --user --columns=application,size" label="Размер пользовательских Flatpak" />
        </div>
        <p className="mt-5">Для наглядной карты открой Filelight. Если его нет, установи нативный пакет через DNF App Center. Дай анализу закончиться и сначала смотри на знакомые каталоги Downloads, Videos, записи OBS, библиотеки игр и Корзину. Большая скрытая папка не является автоматическим приглашением к удалению.</p>
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-6 text-zinc-200">
          <li>Очисти Корзину через Dolphin и удали ненужные установщики из Downloads.</li>
          <li>Перенеси или удали старые записи OBS после проверки, что нужный эфир уже загружен.</li>
          <li>Игры удаляй через Steam, PortProton, Lutris или Heroic. Так лаунчер знает, какие файлы и префиксы относятся к игре.</li>
          <li>Неиспользуемые среды Flatpak удали штатной командой ниже. Она сначала покажет список и попросит подтверждение.</li>
          <li>Повтори <Code>df -h / /home</Code> и сравни свободное место. Цель - понятный запас, а не магические нули в каждой папке кэша.</li>
        </ol>
        <CodeSnippet code="flatpak uninstall --user --unused" label="Предложить удалить только неиспользуемые Flatpak-среды" className="mt-5" />
        <p className="mt-5">Среда выполнения, которая нужна установленному приложению, в список не попадет. Если удаленная среда снова понадобится после установки программы, Flatpak скачает ее заново. Не добавляй <Code>-y</Code> в первый запуск: список лучше прочитать глазами.</p>
        <SupportPanel title="Что нельзя удалять руками">
          Не трогай содержимое <Code>/usr</Code>, <Code>/var/lib/rpm</Code>, <Code>/boot</Code>, <Code>/boot/efi</Code> и скрытые префиксы Wine по совету «там много гигабайт». Не запускай <Code>rm -rf ~/.cache</Code> как универсальное лекарство: приложения потеряют полезные данные и просто создадут часть кэша снова. Старые ядра и системные пакеты обслуживает штатный механизм Nobara.
        </SupportPanel>
        <SupportPanel title="Почему программы не забивают общий EFI 200 МБ">
          Браузеры, игры, OBS, Flatpak и bottles хранятся на Linux-разделе, а не в EFI. Общий EFI содержит небольшие загрузчики Nobara и Windows. Ядра обычно находятся в отдельном <Code>/boot</Code> или системном разделе. Поэтому количество приложений не говорит о заполнении EFI: смотри фактический вывод <Code>df -h /boot /boot/efi</Code> и схему из раздела «Загрузка».
        </SupportPanel>
        <SupportPanel title="Откат очистки">
          Удаленную игру или Flatpak можно установить заново, а общая среда скачается автоматически. Личные файлы, очищенная Корзина и удаленная bottle сами не вернутся. Поэтому сначала анализируй размер, потом удаляй через приложение и сразу проверяй результат. Если выигрыш оказался смешным, не продолжай выжигать систему ради еще 200 мегабайт.
        </SupportPanel>
      </StepBlock>

    </GuideScreen>
  );
}
