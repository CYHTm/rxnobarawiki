"use client";

import { CodeSnippet } from "@/components/CodeSnippet";
import { Code, GuideScreen, Setting, Settings, StepBlock, SupportPanel, Warning } from "@/components/guide/GuidePrimitives";

export function TuningScreen() {
  return (
    <GuideScreen
      id="tuning"
      number="11"
      title="Лаборатория тонкой настройки"
      description="Сюда идем после базы. Один параметр, одинаковые замеры, понятный риск и полный откат. Никаких обещаний бесплатных кадров из шаманского конфига."
    >
      <Warning>
        Этот экран не является обязательным продолжением установки и не заменяет штатные механизмы Nobara. Здесь есть намеренное отключение части CPU-защит, нагрузочная проверка накопителя и команды с правами администратора. Сначала прочитай весь связанный блок, получи исходные цифры и только потом меняй одну вещь.
      </Warning>

      <StepBlock id="kernel-map" title="Раздели текущую загрузку, BLS и настройки GRUB" status="сначала только чтение">
        <p><strong className="text-white">Параметр ядра</strong> - короткая настройка, которую загрузчик передает Linux еще до появления рабочего стола. <strong className="text-white">BLS</strong> хранит отдельные загрузочные записи для установленных ядер. Утилита <Code>grubby</Code> умеет одинаково изменить эти записи и не требует вручную пересобирать огромный файл меню.</p>
        <p className="mt-4">Установщик Nobara создает <Code>/etc/default/grub</Code> и использует переменную <Code>GRUB_CMDLINE_LINUX_DEFAULT</Code>. Регистр букв важен: вариант <Code>grub_cmdline_linux_default</Code> является другим именем и не сработает. Но файл настроек, записи BLS и уже запущенное ядро - три разных слоя. Поэтому проверяем каждый, а не верим одной строке из старой статьи.</p>

        <div className="mt-5 space-y-3">
          <CodeSnippet code="cat /proc/cmdline" label="Показать параметры именно текущей загрузки" />
          <CodeSnippet code="grep '^GRUB_CMDLINE_LINUX_DEFAULT=' /etc/default/grub" label="Показать исходную строку GRUB с правильным регистром" />
          <CodeSnippet code="sudo grubby --info=ALL | grep -E '^(index|kernel|args)='" label="Показать ядра и аргументы в загрузочных записях" />
        </div>
        <p className="mt-5">Первая команда является главным фактом после перезагрузки. Вторая показывает настройку, с которой Nobara формировала конфигурацию. Третья помогает заметить, если старое и новое ядро получили разные аргументы. Обычная строка Nobara содержит как минимум тихую загрузку, но точный набор зависит от установки и уже выполненных действий.</p>

        <Settings className="mt-5">
          <Setting label="/proc/cmdline" value="Что использует запущенное ядро" />
          <Setting label="grubby --info=ALL" value="Что получат установленные ядра" />
          <Setting label="GRUB_CMDLINE_LINUX_DEFAULT" value="Исходная настройка GRUB, регистр важен" />
          <Setting label="/boot/grub2/grub.cfg" value="Сгенерированный файл, руками не правим" />
        </Settings>

        <SupportPanel title="Почему здесь используется grubby, а не ручное редактирование grub.cfg">
          <p>В Nobara включена схема BLS. <Code>grubby --update-kernel=ALL</Code> меняет аргументы всех установленных ядер через штатный для Fedora-подобной системы путь. Ручная правка <Code>/boot/grub2/grub.cfg</Code> может исчезнуть при следующем обновлении, ошибиться строкой Windows или оставить разные ядра с разными параметрами.</p>
          <p className="mt-3">Файл <Code>/etc/default/grub</Code> полезно понимать и читать, но одно его редактирование еще не доказывает, что текущие BLS-записи изменились. После любого действия окончательный ответ дает <Code>/proc/cmdline</Code> уже после перезагрузки.</p>
        </SupportPanel>
        <SupportPanel title="Как временно убрать плохой аргумент на одну загрузку">
          <p>В меню GRUB выдели Nobara, нажми <Code>e</Code>, найди строку ядра, удали только проблемный аргумент и запусти запись сочетанием, показанным внизу редактора, обычно <Code>Ctrl+X</Code>. Это изменение действует один раз. После входа в систему удали аргумент постоянной командой <Code>grubby --remove-args</Code> из его блока.</p>
          <p className="mt-3">Не меняй запись Windows и не стирай параметры <Code>root=</Code>, <Code>resume=</Code> или <Code>rd.</Code> наугад. Временный редактор нужен для одного известного аргумента, а не для лотереи с загрузчиком.</p>
        </SupportPanel>
      </StepBlock>

      <StepBlock id="ab-measurement" title="Сначала собери повторяемый A/B-замер" status="три прогона на вариант">
        <p><strong className="text-white">A/B-тест</strong> сравнивает исходное состояние A и состояние с одним изменением B. Средний FPS показывает общую скорость, <strong className="text-white">1% low</strong> описывает медленные кадры в худшей части прогона, а график <strong className="text-white">frame time</strong> показывает время каждого кадра. Для 60 FPS кадр должен занимать около 16,7 мс, для 75 FPS - около 13,3 мс.</p>
        <p className="mt-4">Сначала прогрей игру и пройди тестовый участок один раз без записи, чтобы компиляция шейдеров меньше искажала первый результат. Затем используй одну версию игры и Proton, один пресет, одно разрешение, один маршрут или встроенный benchmark. Закрой обновления, загрузки и запись OBS, если проверяешь не стрим.</p>

        <CodeSnippet
          code={'mkdir -p "$HOME/.config/MangoHud" "$HOME/MangoHud-logs"\nprintf \'%s\\n\' \'fps\' \'frame_timing\' \'gpu_stats\' \'cpu_stats\' \'gpu_temp\' \'cpu_temp\' "output_folder=$HOME/MangoHud-logs" \'log_duration=120\' \'log_interval=100\' \'autostart_log=10\' \'benchmark_percentiles=97,AVG,1,0.1\' > "$HOME/.config/MangoHud/ab-test.conf"'}
          label="Создать отдельный профиль MangoHUD для двухминутного теста"
          className="mt-5"
        />
        <p className="mt-4">Для Steam временно поставь строку ниже в свойствах только тестовой игры. MangoHUD подождет 10 секунд, затем запишет 120 секунд в <Code>~/MangoHud-logs</Code>. Если нужен ручной старт на одной и той же точке сцены, убери из файла строку <Code>autostart_log=10</Code> и переключай запись стандартным сочетанием <Code>Shift_L+F2</Code>. Для PortProton, Lutris или Heroic включи MangoHUD у конкретной игры и добавь переменную <Code>MANGOHUD_CONFIGFILE</Code> со значением полного пути к этому файлу.</p>
        <CodeSnippet code={'MANGOHUD_CONFIGFILE="$HOME/.config/MangoHud/ab-test.conf" mangohud %command%'} label="Параметры запуска одной Steam-игры на время замера" className="mt-4" />
        <CodeSnippet code={'ls -lt "$HOME/MangoHud-logs" | head'} label="Показать последние журналы MangoHUD" className="mt-3" />

        <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-6 text-zinc-200">
          <li>Сделай три одинаковых прогона A на штатных CPU-защитах. Подпиши средний FPS, 1% low, 0,1% low и заметные пики frame time.</li>
          <li>Измени только один параметр, перезагрузи ПК, подтверди его через <Code>/proc/cmdline</Code> и сделай три прогона B.</li>
          <li>Сравнивай медиану трех прогонов, а не самый красивый результат. Если разница между A1, A2 и A3 не меньше разницы A против B, твик утонул в обычном разбросе.</li>
          <li>Верни исходное состояние и сделай контрольный прогон A-контроль. Так обновившийся шейдерный кэш не сможет притвориться заслугой параметра.</li>
        </ol>

        <p className="mt-5">Каждый журнал CSV содержит временной ряд. Построй график frame time для всех прогонов на одной шкале по вертикали: важны повторяющиеся пики и длинные участки неровного кадра, а не один случайный шип при автосохранении. Интервал <Code>log_interval=100</Code> записывает точку каждые 100 мс и дает достаточно подробный график без бессмысленного мешка данных.</p>

        <Settings className="mt-5">
          <Setting label="Обычная игра на Acer" value="Тест с привычным лимитом 75 FPS" />
          <Setting label="Проверка потолка CPU" value="Короткий отдельный тест без лимита" />
          <Setting label="GPU держится на 95-100%" value="Разница CPU может быть скрыта RX 580" />
          <Setting label="Разница меньше разброса" value="Считать прирост недоказанным" />
        </Settings>
        <p className="mt-5">Не смешивай два сценария. Лимит 75 FPS показывает плавность настоящей игры на мониторе Acer, но скрывает рост среднего FPS выше 75. Короткий тест без лимита помогает увидеть потолок, зато сильнее грузит RX 580. Для стрима отдельно оставляй 60 FPS и открывай статистику OBS: это другая нагрузка.</p>

        <SupportPanel title="Как убрать тестовый профиль MangoHUD">
          <p className="mb-4">Верни прежние параметры запуска игры, затем удали только созданный здесь профиль. Журналы останутся в отдельной папке, пока ты сам не решишь, что они больше не нужны.</p>
          <CodeSnippet code={'rm -- "$HOME/.config/MangoHud/ab-test.conf"'} label="Удалить только профиль A/B-теста" />
        </SupportPanel>
      </StepBlock>

      <StepBlock id="cpu-mitigations" title="mitigations=off проверяй как рискованный эксперимент" status="не рекомендация Nobara">
        <p><Code>mitigations=off</Code> просит ядро отключить управляемые группы защит от известных аппаратных уязвимостей CPU. Это не пароль, не права файлов и не AppArmor: в Nobara SELinux выключен, а контроль доступа дает AppArmor. Аргумент может снова открыть утечки данных между программой и ядром, между программами, потоками и виртуальными машинами. Защищенный глобальный режим ядра называется <Code>auto</Code> и используется по умолчанию без этого аргумента.</p>
        <p className="mt-4">Игровой ПК нельзя честно назвать полностью доверенной средой. Здесь запускаются браузер, Wine и Proton, лаунчеры, моды, плагины и загружаемый код. Поэтому возможный прирост не является бесплатным. На RX 580 игра часто упирается в видеокарту, и разница на Ryzen 5 2600 может оказаться нулевой или попасть в обычный разброс.</p>

        <CodeSnippet code="grep . /sys/devices/system/cpu/vulnerabilities/*" label="Снять исходное состояние CPU-защит" className="mt-5" />
        <p className="mt-4"><Code>Not affected</Code> означает, что этот процессор не затронут конкретным классом. Строка с <Code>Mitigation</Code> называет активную защиту. <Code>Vulnerable</Code> означает, что защита отсутствует или отключена. Сохрани вывод рядом с результатом A, иначе после перезагрузки сравнивать будет нечего.</p>

        <Warning>Не добавляй рядом <Code>dis_ucode_ldr</Code>, <Code>spectre_v2=off</Code>, <Code>nopti</Code> и сборную солянку из ролика. Тогда ты уже не узнаешь, что изменило результат, а отключение загрузки микрокода может убрать исправления процессора, не относящиеся к FPS.</Warning>

        <p className="mt-5">Перед изменением убедись, что в текущей строке и загрузочных записях еще нет другого значения <Code>mitigations=</Code>. Если команда что-то выводит, сначала разберись с уже существующим параметром и не создавай два противоречащих значения.</p>
        <CodeSnippet code="{ cat /proc/cmdline; sudo grubby --info=ALL; } | grep -oE 'mitigations=[[:alnum:]_,.-]+' | sort -u" label="Найти уже заданный режим mitigations" className="mt-4" />
        <p className="mt-4">Пустой вывод означает, что явного параметра не найдено. Только после базовых прогонов A можно выполнить экспериментальную команду:</p>
        <CodeSnippet code="sudo grubby --update-kernel=ALL --args='mitigations=off'" label="Отключить управляемые CPU-защиты для всех установленных ядер" className="mt-4" />
        <p className="mt-4">Полностью перезагрузи ПК. Затем обеими командами ниже подтверди не обещание команды, а фактическое состояние. В первой должен появиться ровно один <Code>mitigations=off</Code>. Во второй часть строк может смениться на <Code>Vulnerable</Code>, хотя классы с <Code>Not affected</Code> такими и останутся.</p>
        <div className="mt-4 space-y-3">
          <CodeSnippet code="cat /proc/cmdline | grep -o 'mitigations=[^ ]*'" label="Подтвердить аргумент после перезагрузки" />
          <CodeSnippet code="grep . /sys/devices/system/cpu/vulnerabilities/*" label="Подтвердить фактическое состояние защит" />
        </div>

        <h4 className="mt-6 font-semibold text-white">Полный откат после прогонов B</h4>
        <p className="mt-2">Удаление аргумента возвращает штатный выбор ядра, а не добавляет поверх него еще одно значение. Выполни команду, перезагрузи ПК и снова проверь строку загрузки и каталог уязвимостей.</p>
        <CodeSnippet code="sudo grubby --update-kernel=ALL --remove-args='mitigations=off'" label="Удалить экспериментальный аргумент из всех ядер" className="mt-4" />
        <div className="mt-4 space-y-3">
          <CodeSnippet code="cat /proc/cmdline | grep -o 'mitigations=[^ ]*' || echo 'явного параметра mitigations нет'" label="Убедиться, что аргумент исчез после перезагрузки" />
          <CodeSnippet code="grep . /sys/devices/system/cpu/vulnerabilities/*" label="Убедиться, что штатные защиты вернулись" />
        </div>
        <p className="mt-5">Оставлять <Code>off</Code> имеет смысл только как твое осознанное решение, если повторяемая польза заметно больше разброса и ты принимаешь изменение модели безопасности. Если выигрыш равен погрешности, правильный итог лаборатории - откат. Нулевой результат тоже результат, зато без легенды про тайные 20% FPS.</p>
      </StepBlock>

      <StepBlock id="btrfs-nvme" title="Проверяй Btrfs и NVMe по фактам" status="не запускай во время benchmark">
        <p>Nobara предлагает Btrfs по умолчанию, но установщик также разрешает XFS и ext4. Поэтому первая команда определяет реальную файловую систему. <strong className="text-white">Scrub</strong> читает данные и метаданные Btrfs, сверяет контрольные суммы и сообщает о повреждениях. Это не дефрагментация, не ускоритель и не универсальный ремонт.</p>
        <div className="mt-5 space-y-3">
          <CodeSnippet code="findmnt -no SOURCE,TARGET,FSTYPE,OPTIONS /; findmnt -no SOURCE,TARGET,FSTYPE,OPTIONS /home" label="Определить файловую систему и параметры корня и home" />
          <CodeSnippet code="lsblk -d -o NAME,MODEL,SIZE,ROTA,TRAN" label="Показать имя и модель физического накопителя" />
        </div>
        <p className="mt-4">Если в колонке файловой системы написано <Code>btrfs</Code>, переходи к командам Btrfs. Если там <Code>xfs</Code> или <Code>ext4</Code>, пропусти их полностью. Не запускай <Code>btrfs check</Code> на другой файловой системе и никогда не добавляй <Code>--repair</Code> по совету из случайного комментария.</p>

        <div className="mt-5 space-y-3">
          <CodeSnippet code="sudo btrfs filesystem usage /" label="Показать профили данных и метаданных Btrfs" />
          <CodeSnippet code="sudo btrfs device stats /" label="Показать накопленные ошибки устройств Btrfs" />
          <CodeSnippet code="sudo btrfs scrub status /" label="Показать состояние последнего scrub" />
        </div>
        <p className="mt-4">На одном NVMe данные обычно имеют профиль <Code>single</Code>, а метаданные могут иметь две копии <Code>DUP</Code> на том же устройстве. Scrub способен исправить поврежденный блок только когда находит другую исправную копию. Поэтому успешный scrub подтверждает прочитанные контрольные суммы, но один накопитель не превращается от этой команды в два.</p>

        <p className="mt-5">Запускай scrub, когда не идет игра, запись OBS, обновление или A/B-тест. Файловая система остается смонтированной, а ключ <Code>-B</Code> держит команду на экране до итоговой статистики.</p>
        <CodeSnippet code="sudo btrfs scrub start -B /" label="Провести полный scrub смонтированного Btrfs" className="mt-4" />
        <p className="mt-4">Хороший итог содержит <Code>Error summary: no errors found</Code>. Любая неисправленная ошибка, рост счетчиков <Code>corruption_errs</Code>, <Code>read_io_errs</Code> или <Code>write_io_errs</Code> требует остановить твики и сначала выяснить состояние накопителя.</p>

        <h4 className="mt-6 font-semibold text-white">Сверь здоровье самого NVMe</h4>
        <p className="mt-2">В команде ниже <Code>/dev/nvme0</Code> является контроллером первого NVMe. Если <Code>lsblk</Code> выше показывает другое число, замени только его. Нормальная отправная точка - <Code>Critical Warning: 0x00</Code> и ноль в <Code>Media and Data Integrity Errors</Code>. <Code>Percentage Used</Code> показывает оцененный износ, а не заполненность диска.</p>
        <CodeSnippet code="sudo smartctl -x /dev/nvme0" label="Прочитать полную SMART-информацию первого NVMe" className="mt-4" />
        <div className="mt-4 space-y-3">
          <CodeSnippet code="systemctl is-enabled fstrim.timer; systemctl is-active fstrim.timer; systemctl list-timers fstrim.timer --all" label="Проверить штатный периодический TRIM" />
          <CodeSnippet code="sudo journalctl -k -b -p warning..alert --no-pager | grep -Ei 'btrfs|nvme|I/O|medium|reset' || echo 'предупреждений Btrfs и NVMe не найдено'" label="Найти предупреждения накопителя текущей загрузки" />
        </div>
        <p className="mt-4">Для таймера ожидаются <Code>enabled</Code> и <Code>active</Code>, затем дата следующего запуска. Не запускай ежедневный ручной <Code>fstrim</Code> и не меняй штатный NVMe scheduler <Code>none</Code> на BFQ ради красивого названия. Если журнал пуст, это хорошо. Одна запись <Code>Unsafe Shutdowns</Code> в SMART является историческим счетчиком, а не доказательством текущей поломки; важна динамика и сочетание с ошибками носителя.</p>

        <SupportPanel title="Scrub был прерван или команда сообщает, что он уже идет">
          <p className="mb-4">Сначала прочитай текущее состояние. Не запускай второй процесс поверх первого.</p>
          <CodeSnippet code="sudo btrfs scrub status /" label="Проверить прогресс или итог scrub" />
          <p className="mt-4">Если процесс был штатно прерван, его можно продолжить командой <Code>sudo btrfs scrub resume -B /</Code>. Если есть неисправленные ошибки, не применяй <Code>btrfs check --repair</Code>: это отдельный низкоуровневый инструмент, который используют только после точной диагностики.</p>
        </SupportPanel>
      </StepBlock>

      <StepBlock id="vulkan-stack" title="Разложи AMD-графику на amdgpu, Mesa, RADV и 32 бита" status="драйвер с сайта AMD не нужен">
        <p>У RX 580 графический стек состоит из нескольких этажей. <Code>amdgpu</Code> работает внутри ядра и общается с картой. Mesa дает пользовательские OpenGL и Vulkan-библиотеки. <Code>RADV</Code> - Vulkan-драйвер Mesa для AMD. Загрузчик Vulkan выбирает подходящую библиотеку, а старой Windows-игре через Wine или Proton дополнительно нужны 32-битные варианты пакетов с суффиксом <Code>i686</Code>.</p>

        <div className="mt-5 space-y-3">
          <CodeSnippet code="lspci -k | grep -A3 -E 'VGA|3D'" label="Проверить RX 580 и загруженный драйвер ядра" />
          <CodeSnippet code="vulkaninfo --summary" label="Проверить устройство, версию Vulkan и RADV" />
          <CodeSnippet code="rpm -q mesa-vulkan-drivers.x86_64 mesa-vulkan-drivers.i686 vulkan-loader.x86_64 vulkan-loader.i686 vulkan-tools" label="Проверить 64-битный и 32-битный Vulkan-стек" />
        </div>
        <p className="mt-5">Нормальный результат - <Code>Kernel driver in use: amdgpu</Code>, RX 580 в сводке Vulkan и <Code>driverName: radv</Code> либо <Code>DRIVER_ID_MESA_RADV</Code>. Запрос RPM должен показать версии обоих <Code>mesa-vulkan-drivers</Code> и обоих <Code>vulkan-loader</Code>. Совпадение основной версии x86_64 и i686 полезно: разные поколения библиотек способны ломать только старые 32-битные игры, пока новые продолжают запускаться.</p>

        <CodeSnippet code="{ env; systemctl --user show-environment; } | grep -E '^(AMD_VULKAN_ICD|VK_DRIVER_FILES|VK_ICD_FILENAMES|MESA_LOADER_DRIVER_OVERRIDE|DRI_PRIME)=' || echo 'глобальных переопределений Vulkan и Mesa нет'" label="Найти глобальное принуждение драйвера или видеокарты" className="mt-5" />
        <p className="mt-4">На ПК с одной RX 580 пустой вывод является хорошим исходным состоянием. Не добавляй глобально <Code>AMD_VULKAN_ICD=RADV</Code>, если RADV и так выбран. Не ставь AMDVLK, проприетарный драйвер AMD или <Code>mesa-vulkan-drivers-git</Code> поверх штатной Mesa для лечения одной игры.</p>

        <SupportPanel title="Отсутствует один из пакетов i686">
          <p>Сначала закончи штатное обновление Nobara и перезагрузи ПК. Затем повтори запрос RPM. Если Steam или Wine-игра действительно требует отсутствующие 32-битные библиотеки, поставь ровно нативные пакеты из репозиториев системы:</p>
          <CodeSnippet code="sudo dnf install mesa-vulkan-drivers.i686 vulkan-loader.i686" label="Добавить только 32-битные Vulkan-библиотеки" className="mt-4" />
          <p className="mt-4">Это установка конкретных пакетов, а не обновление системы через <Code>dnf upgrade</Code>. Если DNF предлагает удалить Mesa, заменить Nobara-пакеты или тянет конфликтующий драйвер, ответь <Code>n</Code> и сначала запусти обычный <Code>nobara-sync</Code>. Команда <Code>nobara-sync repair</Code> нужна только если обновлятор сообщает о рассогласованных версиях или незавершенной транзакции.</p>
        </SupportPanel>
        <SupportPanel title="Игра Flatpak видит другую версию Mesa">
          <p>Flatpak-приложение использует графическое расширение своей среды выполнения, совместимое с драйвером хоста. Это не вторая прошивка RX 580 и не повод копировать системные библиотеки внутрь песочницы. Сначала посмотри пользовательские графические среды и обнови их в том же режиме User:</p>
          <div className="mt-4 space-y-3">
            <CodeSnippet code={'flatpak list --user --runtime --columns=application,branch | grep -E \'org\\.freedesktop\\.Platform\\.(GL|VAAPI)\''} label="Показать графические среды пользовательских Flatpak" />
            <CodeSnippet code="flatpak update --user" label="Обновить пользовательские приложения и их среды" />
          </div>
          <p className="mt-4">Нативные Steam, PortProton, Lutris и OBS из Nobara используют системную Mesa. Не диагностируй их по версии Flatpak-runtime, которого они не запускают.</p>
        </SupportPanel>
        <SupportPanel title="Одна игра требует переменную Mesa или RADV">
          <p>Добавляй переменную только в параметры запуска этой игры, запиши исходное состояние и проведи тот же A/B-тест. Глобальная запись в <Code>/etc/environment</Code> меняет браузер, OBS, рабочий стол и все игры сразу, поэтому превращает точечный обход ошибки в новый системный фактор.</p>
          <p className="mt-3">Откат у точечной переменной простой: удалить ее из параметров игры и полностью перезапустить лаунчер. Если совет не называет конкретную проблему, версию Mesa и команду отката, это не настройка, а записка из бутылки.</p>
        </SupportPanel>
      </StepBlock>

      <StepBlock id="tuning-boundaries" title="Отделяй механизм Nobara от стороннего твика" status="слой должен быть известен">
        <p>Штатная оптимизация уже включает zram, falcond, правила планировщиков диска, irqbalance и защиту от зависания при нехватке памяти. <Code>nobara-sync</Code> обслуживает пакеты и известные исправления дистрибутива. Ни один из этих механизмов сам не добавляет <Code>mitigations=off</Code>, не повышает TDP Ryzen 5 2600 и не устанавливает экспериментальную Mesa.</p>
        <Settings className="mt-5">
          <Setting label="Сбой обновления или пакетов" value="Nobara System Updater, nobara-sync repair" />
          <Setting label="Параметр одной игры" value="Лаунчер или профиль этой игры" />
          <Setting label="Параметр ядра" value="grubby, перезагрузка, /proc/cmdline" />
          <Setting label="RX 580 и напряжение" value="LACT, один профиль, отдельный тест" />
          <Setting label="BIOS, множитель и TDP" value="Не маскировать словом «оптимизация»" />
          <Setting label="Скрипт из интернета" value="Сначала прочитать каждое постоянное изменение" />
        </Settings>

        <p className="mt-5">Обычный запуск <Code>nobara-sync</Code> проверяет репозитории и обновления, применяет известные Nobara fixups, обновляет системные пакеты и выполняет нужные действия после обновления ядра. Ключ <Code>--all</Code> дополнительно включает пользовательские Flatpak-приложения. <Code>nobara-sync repair</Code> делает принудительную синхронизацию версий пакетов. Это аварийный инструмент после конфликта, а не еженедельный «ускоритель».</p>
        <CodeSnippet
          code={"printf 'Параметры текущего ядра:\\n'; cat /proc/cmdline\nprintf '\\nГлобальные переменные графики:\\n'; { env; systemctl --user show-environment; } | grep -E '^(AMD_VULKAN_ICD|VK_DRIVER_FILES|VK_ICD_FILENAMES|MESA_LOADER_DRIVER_OVERRIDE|DRI_PRIME)=' || echo 'нет'\nprintf '\\nТипичные сторонние службы:\\n'; systemctl list-unit-files --state=enabled --no-legend | grep -Ei 'tuned|ananicy|earlyoom|nohang|preload' || echo 'не включены'"}
          label="Снять безопасный слепок популярных постоянных твиков"
          className="mt-5"
        />
        <p className="mt-4">Команда ничего не исправляет и не удаляет. Она помогает заметить глобальный аргумент, переменную или второй демон, который спорит со штатной системой. Отсутствие этих строк не доказывает идеальность всех настроек, но отсекает популярный набор интернет-магии.</p>

        <SupportPanel title="Пять вопросов перед следующим низкоуровневым действием">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Какой измеримый симптом исправляет именно эта настройка?</li>
            <li>Не делает ли Nobara уже то же самое через falcond, zram, systemd или правила устройства?</li>
            <li>Где изменение сохранится: в игре, домашней папке, <Code>/etc</Code>, BLS, модуле ядра или BIOS?</li>
            <li>Какая команда или точное значение полностью возвращает исходное состояние?</li>
            <li>Каким одинаковым тестом будет доказана польза и какой результат заставит отказаться?</li>
          </ol>
          <p className="mt-3">Если хотя бы на один вопрос ответа нет, пока выполняй только диагностику. Продвинутость начинается не с количества <Code>sudo</Code>, а с умения не оставить после себя археологический слой конфигов.</p>
        </SupportPanel>
      </StepBlock>
    </GuideScreen>
  );
}
