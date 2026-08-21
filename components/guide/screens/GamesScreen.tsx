"use client";

import { CodeSnippet } from "@/components/CodeSnippet";
import { Code, GuideScreen, Setting, Settings, StepBlock, SupportPanel, Warning } from "@/components/guide/GuidePrimitives";

export function GamesScreen() {
  return (
    <GuideScreen id="games" number="06" title="Игры без зоопарка лаунчеров" description="Рабочие PortProton, Lesta Game Center и Tanks Blitz остаются на месте. Вокруг них строим понятную схему для Steam, других магазинов, старых игр и честной диагностики RX 580.">
      <Warning>
        Одна и та же Windows-игра не становится совместимее от тройной установки в PortProton, Lutris и Bottles. Выбери один основной инструмент, сохрани рабочий префикс и меняй по одному параметру. Лаунчеры не покемоны, собирать всех необязательно.
      </Warning>

      <StepBlock id="portproton" title="Оставь рабочую связку PortProton как контрольный пример">
        Открой PortProton из меню Plasma, затем запусти уже установленный Lesta Game Center и из него Tanks Blitz. Ничего не переустанавливай поверх рабочей копии. Задача этого прохода - подтвердить вход в аккаунт, изображение, звук, управление, сворачивание и нормальный выход обратно в PortProton.
        <p className="mt-4">Если хочется уточнить тип установки PortProton, выполни безопасную проверку:</p>
        <CodeSnippet code="rpm -q portproton" label="Посмотреть версию RPM-пакета PortProton" className="mt-4" />
        <p className="mt-4">Команда покажет имя и версию, если PortProton установлен как RPM. Ответ <Code>package portproton is not installed</Code> при рабочем приложении означает, что его могли поставить иначе. Это не повод удалять рабочую копию: сначала посмотри свойства ярлыка и путь запуска.</p>
        <Settings className="mt-5">
          <Setting label="PortProton" value="Уже рабочая среда Lesta" />
          <Setting label="Lesta Game Center" value="Не переносить в другой лаунчер" />
          <Setting label="Tanks Blitz" value="Контроль графики, звука и ввода" />
          <Setting label="Новая игра" value="Свой инструмент и отдельный префикс" />
        </Settings>
        <SupportPanel title="Что такое Wine, Proton и префикс">
          <strong className="text-white">Wine</strong> создает знакомую Windows-программе структуру диска C и переводит ее обращения к системе. <strong className="text-white">Proton</strong> добавляет игровые исправления поверх Wine. <strong className="text-white">Префикс</strong> - отдельная папка с виртуальным диском C, реестром и библиотеками игры или лаунчера. Это не виртуальная машина, и отдельная Windows туда не ставится.
        </SupportPanel>
        <SupportPanel title="PortProton открывается, но игра не показывает картинку">
          <p className="mb-4">Убедись, что Vulkan видит RX 580. В сводке должно быть имя AMD Radeon RX 580 и версия Vulkan. Команда ничего не меняет.</p>
          <CodeSnippet code="vulkaninfo --summary" label="Проверить Vulkan и видеокарту" />
          <p className="mt-4">Если команды нет, установи <Code>vulkan-tools</Code> через DNF App Center. Если RX 580 отсутствует, закончи штатное обновление Nobara и перезагрузи ПК. Не ставь драйвер с сайта AMD поверх Mesa.</p>
        </SupportPanel>
        <SupportPanel title="Контрольный прогон рабочей игры">
          Поиграй 10-15 минут, один раз свернись, вернись и нормально выйди через меню. Одновременно открой показатели MangoHUD из последнего этапа. Если пример стабилен, драйвер, Vulkan, Wine-окружение и звук прошли базовый тест. Это не гарантирует запуск любой другой игры: конкретный античит или лаунчер все еще может поставить шлагбаум.
        </SupportPanel>
      </StepBlock>

      <StepBlock id="game-tools" title="Выбирай инструмент по источнику игры, а не по настроению">
        У каждого инструмента есть нормальная работа. Пересечения неизбежны, но они не заставляют переносить уже настроенные игры. Сначала смотри, где игра куплена или откуда взят установщик, затем выбирай одну строку ниже.
        <Settings className="mt-5">
          <Setting label="Steam" value="Steam-библиотека и Proton" />
          <Setting label="PortProton" value="Уже настроенные Windows-игры и лаунчеры" />
          <Setting label="Lutris" value="Разные библиотеки, runners и готовые сценарии" />
          <Setting label="Heroic" value="Epic, GOG и Amazon Games" />
          <Setting label="DOSBox Staging" value="Игры для MS-DOS" />
          <Setting label="ScummVM" value="Только игры из списка совместимости ScummVM" />
          <Setting label="Bottles" value="Обычные Windows-программы, не основная игровая полка" />
        </Settings>
        <p className="mt-5"><strong className="text-white">Steam.</strong> Используй нативный RPM-пакет Nobara. Для Windows-игры сначала оставь выбранную Steam версию Proton по умолчанию. Принудительно включай Proton Experimental или другую версию только в Свойствах конкретной игры и только после проверки свежих отчетов.</p>
        <p className="mt-4"><strong className="text-white">Lutris.</strong> Это каталог игр и запускаторов с разными runners, включая Wine и эмуляторы, плюс общественные сценарии установки. Он полезен для Battle.net, Ubisoft Connect и старых нестандартных игр. Он сильно пересекается с PortProton, поэтому Lesta туда не переносим.</p>
        <p className="mt-4"><strong className="text-white">Heroic.</strong> Это отдельный открытый клиент для библиотек Epic, GOG и Amazon Games. Он умеет ставить игры, управлять Wine/Proton и облачными сохранениями. Официального клиента Epic для Linux ради него запускать не нужно.</p>
        <p className="mt-4"><strong className="text-white">DOSBox Staging и ScummVM.</strong> Первый эмулирует старый DOS-компьютер. Второй запускает только поддерживаемые им игровые движки и требует оригинальные файлы игры. Если покупка Steam или GOG уже содержит настроенный DOSBox либо ScummVM, сначала используй готовый запуск магазина.</p>
        <SupportPanel title="Проверить нативные игровые инструменты Nobara">
          <CodeSnippet code="rpm -q steam lutris mangohud mangojuice" label="Показать установленные RPM-пакеты" />
          <p className="mt-4">Отсутствующее нужное приложение ищи в DNF App Center. Steam, Lutris, MangoHUD и MangoJuice официальная Wiki Nobara предпочитает в нативном виде, потому что им нужен прямой доступ к драйверам и игровым хукам. Не ставь их второй копией из Flathub.</p>
        </SupportPanel>
        <SupportPanel title="Поставить только действительно нужный дополнительный инструмент">
          <p className="mb-4">Heroic, DOSBox Staging и ScummVM можно поставить как пользовательские Flatpak. Выполняй только строку нужного приложения, а не все три ради красивого меню.</p>
          <div className="space-y-3">
            <CodeSnippet code="flatpak install --user flathub com.heroicgameslauncher.hgl" label="Heroic для Epic, GOG и Amazon" />
            <CodeSnippet code="flatpak install --user flathub io.github.dosbox-staging" label="DOSBox Staging для DOS-игр" />
            <CodeSnippet code="flatpak install --user flathub org.scummvm.ScummVM" label="ScummVM для поддерживаемых квестов" />
          </div>
          <p className="mt-4">После установки Heroic используй его встроенный Wine Manager: Flatpak-версия не обязана видеть системные Wine и Proton из <Code>/usr/bin</Code>. Для ScummVM сначала сверь игру с официальной таблицей совместимости и положи ее файлы в доступную приложению папку Documents.</p>
        </SupportPanel>
        <SupportPanel title="Где здесь Bottles">
          Bottles оставлен на экране «Система» для отдельных Windows-программ: редакторов, утилит и старых приложений. Игру он тоже способен запустить, но Steam, PortProton, Lutris или Heroic обычно лучше понимают библиотеки, игровые версии Proton и параметры запуска. Не переноси игру в Bottles, если ее текущий лаунчер уже работает.
        </SupportPanel>
        <SupportPanel title="Как отменить добавление нового инструмента">
          Нативный RPM удаляй через DNF App Center. Flatpak удаляй его точным идентификатором через графический Flatpak-менеджер User или <Code>flatpak uninstall --user ИДЕНТИФИКАТОР</Code>. Сначала удали игры внутри лаунчера, если хочешь вернуть место: удаление самого интерфейса не всегда удаляет библиотеки и префиксы.
        </SupportPanel>
      </StepBlock>

      <StepBlock id="compatibility" title="Проверь совместимость до скачивания ста гигабайт" status="экономит вечер">
        Название «работает через Proton» слишком расплывчато. Отдельно проверяй саму игру, античит и способ установки. Для одной версии магазина результат может отличаться от другой из-за лаунчера, DRM или набора файлов.
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-6 text-zinc-200">
          <li><strong className="text-white">Найди точное издание.</strong> Сверь магазин, дату свежих отчетов и режим игры. Одиночная кампания и сетевой матч могут вести себя по-разному.</li>
          <li><strong className="text-white">Для Steam открой ProtonDB.</strong> Это общественная база, а не гарантия Valve. Сильнее всего похожи свежие отчеты настольных ПК с AMD. Отметка Steam Deck полезна, но не равна RX 580 и двум мониторам.</li>
          <li><strong className="text-white">Проверь античит.</strong> Easy Anti-Cheat и BattlEye способны работать через Proton только если разработчик включил поддержку для конкретной игры. Сверь официальную поддержку игры и общественную базу Are We Anti-Cheat Yet.</li>
          <li><strong className="text-white">Для Lutris проверь сценарий.</strong> Посмотри дату, комментарии и что именно он установит. Общественный сценарий не является официальным установщиком издателя.</li>
          <li><strong className="text-white">Выбери один первый запуск.</strong> Начни со стандартной версии Proton или рекомендуемого runner. Не добавляй сразу десять DLL, параметры ядра и чужой префикс.</li>
        </ol>
        <Settings className="mt-5">
          <Setting label="Свежие успешные отчеты" value="Можно пробовать стандартный запуск" />
          <Setting label="Нужен один известный параметр" value="Применить и записать только его" />
          <Setting label="Античит не поддержан" value="Играть в Windows, не обходить защиту" />
          <Setting label="Отчетов нет" value="Считать запуск экспериментом" />
        </Settings>
        <p className="mt-5">Ожидаемый результат этапа - еще до установки понятно, какой лаунчер использовать, какой runner пробовать первым и работает ли сетевой режим. Если античит заблокирован, законный откат очень простой: ничего не ломать в Nobara и запускать эту игру в сохраненной Windows 11.</p>
        <SupportPanel title="Игра работала, а после обновления перестала">
          Сначала верни последнюю рабочую версию Proton или runner только у этой игры. Затем проверь новые отчеты и журнал запуска. Не откатывай всю Nobara из-за одного лаунчера. Если проблема совпала с обновлением ядра или Mesa и затронула несколько игр, используй маршрут «Скорая помощь» и сравни загрузку прошлого ядра.
        </SupportPanel>
      </StepBlock>

      <StepBlock id="prefixes" title="Новую Windows-игру изолируй и меняй по одному параметру">
        Для отдельного <Code>setup.exe</Code> создай в PortProton новый префикс с названием игры. Не ставь ее в префикс Lesta. В стороннем установщике не добавляй старые DirectX и Visual C++ поверх компонентов, которыми уже управляет выбранный инструмент, если инструкция конкретной игры этого не требует.
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-6 text-zinc-200">
          <li>Запиши источник установщика и выбранный префикс.</li>
          <li>Установи игру стандартным способом без дополнительных твиков.</li>
          <li>Запусти один раз и сохрани журнал ошибки, если окно закрылось.</li>
          <li>Проверь только один следующий вариант: другую версию Proton/Wine или один известный параметр.</li>
          <li>Если стало хуже, верни прошлое значение до новой попытки.</li>
        </ol>
        <SupportPanel title="Универсальная диагностика игры, которая не запустилась">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Закрой игру и перезапусти только ее, не весь ПК.</li>
            <li>Сохрани последние строки журнала PortProton, Lutris или Heroic с <Code>error</Code> и <Code>failed</Code>.</li>
            <li>Проверь, находится ли префикс на Linux-разделе, а дополнительный диск подключен через Drive Mount Manager.</li>
            <li>Отдели вход в лаунчер, запуск самой игры, графику, звук и сетевой матч. Это разные точки сбоя.</li>
            <li>Для сетевой игры отдельно проверь античит и состояние серверов.</li>
          </ol>
          <CodeSnippet code="journalctl --user -b --since '-10 min' --no-pager" label="События приложений за последние 10 минут" className="mt-4" />
          <p className="mt-3">Перед публикацией журнала убери токены, логины и полные пути с настоящим именем. Скрин точной ошибки и журнал полезнее сообщения «не работает, спасай».</p>
        </SupportPanel>
        <SupportPanel title="Игра лежит на диске Windows">
          Установщик можно прочитать с NTFS, но префикс лучше держать на ext4 или btrfs. Wine использует права доступа и ссылки Linux, которых на NTFS нет. При странной ошибке прав первым делом перенеси префикс на Linux-раздел. Не открывай один и тот же префикс попеременно из Windows и Nobara.
        </SupportPanel>
        <SupportPanel title="Удалить неудачный префикс">
          Используй штатное удаление именно в том инструменте, который его создал. Это сотрет виртуальный диск C, настройки и возможные локальные сохранения внутри него. Сначала проверь облачную синхронизацию и точный путь. Не удаляй похожую скрытую папку руками на глаз.
        </SupportPanel>
        <SupportPanel title="Как захватывать разные игры в OBS">
          Для Vulkan, DXVK и VKD3D нативная сборка OBS Nobara включает Game Capture глобально. Для OpenGL-игры из Steam добавь параметр ниже. Если конкретная игра не ловится, используй захват окна, а не всего экрана с уведомлениями и перепиской.
          <CodeSnippet code="obs-gamecapture %command%" label="Параметры запуска Steam только для OpenGL" className="mt-3" />
        </SupportPanel>
      </StepBlock>

      <StepBlock id="mangohud" title="Измеряй игру через MangoHUD, настраивай через MangoJuice">
        <strong className="text-white">MangoHUD</strong> рисует поверх игры цифры производительности. <strong className="text-white">MangoJuice</strong> - графическое окно для его настройки. Открой MangoJuice и оставь полезный минимум: FPS, график времени кадра, загрузку и температуру GPU, загрузку CPU, RAM и VRAM.
        <p className="mt-4"><strong className="text-white">Время кадра</strong> показывает, насколько ровно приходят отдельные кадры. Средние 60 FPS с постоянными пиками на графике ощущаются хуже, чем ровные 55. Поэтому один большой счетчик FPS не является медицинской картой игры.</p>
        <Settings className="mt-5">
          <Setting label="GPU 95-100%, кадры ровные" value="Упор в RX 580, снижай графику" />
          <Setting label="VRAM близко к 8 ГБ, есть рывки" value="Снижай текстуры и тяжелые эффекты" />
          <Setting label="GPU недогружен, CPU скачет" value="Проверь процессорные настройки и лимит" />
          <Setting label="Пики только после обновления" value="Возможна компиляция шейдеров" />
          <Setting label="Ровные 60 для эфира" value="Лучше дерганых 75 при полной нагрузке" />
        </Settings>
        <SupportPanel title="Включить MangoHUD в разных лаунчерах">
          <p><strong className="text-white">Steam:</strong> открой Свойства игры - Общие - Параметры запуска и добавь:</p>
          <CodeSnippet code="mangohud %command%" label="MangoHUD для одной Steam-игры" className="mt-3" />
          <p className="mt-4"><strong className="text-white">PortProton, Lutris и Heroic:</strong> включи переключатель MangoHUD в настройках именно этой игры или префикса. Название и вкладка могут немного меняться между версиями. Не добавляй команду Steam внутрь чужого лаунчера.</p>
        </SupportPanel>
        <SupportPanel title="Как провести сравнимый тест">
          Выбери один и тот же участок на 10 минут. Первый прогон сделай с текущими настройками, второй - изменив только один параметр. Для обычной игры на Acer попробуй лимит 75 FPS, если RX 580 держит его ровно. Для проверки стрима поставь 60 FPS, открой статистику OBS и убедись, что у видеокарты остался запас.
        </SupportPanel>
        <SupportPanel title="Оверлей не появился">
          Проверь <Code>rpm -q mangohud mangojuice</Code>. Если пакет отсутствует, установи нативную версию через DNF App Center. Убедись, что переключатель включен для конкретной игры, затем полностью перезапусти лаунчер. Если оверлей ломает только одну игру, отключи его там и собирай статистику другими средствами, не переустанавливая драйвер.
        </SupportPanel>
        <SupportPanel title="Откат диагностики">
          Удали <Code>mangohud %command%</Code> из параметров Steam или выключи переключатель в лаунчере. MangoJuice меняет конфигурацию оверлея, а не напряжение RX 580 и не графику самой игры. Удалять пакет после каждого теста не нужно.
        </SupportPanel>
      </StepBlock>
    </GuideScreen>
  );
}
