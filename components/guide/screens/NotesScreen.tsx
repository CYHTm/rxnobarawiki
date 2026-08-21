import { Heart, ShieldCheck, Sparkles } from "lucide-react";
import { CodeSnippet } from "@/components/CodeSnippet";
import { Code, GuideScreen } from "@/components/guide/GuidePrimitives";

const commands = [
  {
    group: "Обновление Nobara",
    title: "Проверить репозитории и наличие обновлений",
    command: "nobara-sync check-repos && nobara-sync check-updates",
    label: "Только проверка",
    safety: "Только читает",
    description: "Проверяет репозитории и показывает доступные обновления, но ничего не устанавливает.",
    expected: "увидишь состояние репозиториев и список ожидающих пакетов либо сообщение, что обновлений нет.",
  },
  {
    group: "Обновление Nobara",
    title: "Запустить штатное обновление системы",
    command: "nobara-sync",
    label: "Штатное обновление Nobara",
    safety: "Штатное действие",
    description: "Запускает официальный обновлятор Nobara с проверкой репозиториев, синхронизацией пакетов и системными исправлениями дистрибутива.",
    expected: "обновлятор сам запросит пароль, покажет операции и сообщит об успешном завершении.",
  },
  {
    group: "Обновление Nobara",
    title: "Починить прерванное или конфликтующее обновление",
    command: "nobara-sync repair",
    label: "Штатный ремонт обновления",
    safety: "Только при ошибке",
    description: "Используй только после ошибки обычного обновлятора. Команда возвращает пакеты к согласованному состоянию Nobara.",
    expected: "увидишь синхронизацию пакетов и итоговый журнал ремонта. Не закрывай Konsole посреди процесса.",
  },
  {
    group: "Система",
    title: "Показать короткую сводку о компьютере",
    command: "fastfetch",
    label: "Сводка о системе",
    safety: "Только читает",
    description: "Показывает Nobara, ядро, Plasma, процессор, видеокарту и память одним аккуратным блоком.",
    expected: "получишь сводку, которую удобно сверить или отправить кенту при диагностике.",
  },
  {
    group: "Система",
    title: "Узнать текущее ядро",
    command: "uname -r",
    label: "Версия запущенного ядра",
    safety: "Только читает",
    description: "Показывает ядро, с которым компьютер загрузился прямо сейчас.",
    expected: "одна строка с версией ядра. Она полезна после обновления или запуска прошлого ядра из GRUB.",
  },
  {
    group: "Система",
    title: "Проверить графический сеанс",
    command: "echo $XDG_SESSION_TYPE",
    label: "Wayland или X11",
    safety: "Только читает",
    description: "Показывает протокол текущего графического сеанса без изменения настроек Plasma.",
    expected: "для этой установки нормальный ответ - wayland.",
  },
  {
    group: "Диски и память",
    title: "Проверить свободное место",
    command: "df -h / /home /boot /boot/efi",
    label: "Свободное место на разделах",
    safety: "Только читает",
    description: "Показывает заполнение системы, домашней папки, загрузочного раздела и общего EFI реальными цифрами.",
    expected: "таблица с общим, занятым и свободным местом. Повторяющиеся строки на btrfs не являются ошибкой.",
  },
  {
    group: "Диски и память",
    title: "Посмотреть диски и файловые системы",
    command: "lsblk -f",
    label: "Схема накопителей",
    safety: "Только читает",
    description: "Показывает NVMe, разделы, файловые системы, метки и точки подключения. Ничего не монтирует и не форматирует.",
    expected: "дерево дисков, по которому можно отличить Windows, Nobara, /boot и /boot/efi.",
  },
  {
    group: "Диски и память",
    title: "Проверить оперативную память",
    command: "free -h",
    label: "Использование оперативной памяти",
    safety: "Только читает",
    description: "Показывает занятую, свободную и доступную оперативную память в понятных единицах.",
    expected: "смотри прежде всего на столбец available: Linux специально использует свободную память под кэш.",
  },
  {
    group: "RX 580 и игры",
    title: "Проверить видеокарту и драйвер",
    command: "lspci -k | grep -EA3 'VGA|3D|Display'",
    label: "Видеокарта и модуль ядра",
    safety: "Только читает",
    description: "Находит графический адаптер и показывает, какой модуль ядра им управляет.",
    expected: "в строках RX 580 должен быть указан используемый модуль amdgpu.",
  },
  {
    group: "RX 580 и игры",
    title: "Проверить службу LACT",
    command: "systemctl status lactd --no-pager",
    label: "Состояние lactd",
    safety: "Только читает",
    description: "Показывает, запущен ли установленный демон LACT, не перезапуская его и не меняя профиль видеокарты.",
    expected: "строка Active: active (running). Для выхода из длинного вывода ничего нажимать не нужно.",
  },
  {
    group: "RX 580 и игры",
    title: "Проверить игровые и стриминговые RPM-пакеты",
    command: "rpm -q lact mangohud mangojuice obs-studio",
    label: "Проверка установленных RPM",
    safety: "Только читает",
    description: "Спрашивает локальную базу RPM, установлены ли LACT, MangoHUD, MangoJuice и OBS Studio.",
    expected: "для установленного пакета появится точная версия, для отсутствующего - спокойное сообщение о том, что пакет не установлен.",
  },
  {
    group: "Приложения",
    title: "Показать пользовательские Flatpak-приложения",
    command: "flatpak list --user --app --columns=name,application,version",
    label: "Список Flatpak User",
    safety: "Только читает",
    description: "Показывает только приложения текущего пользователя, их точные идентификаторы и версии.",
    expected: "получишь список без системных RPM-пакетов и без изменения установленных приложений.",
  },
  {
    group: "Приложения",
    title: "Обновить только пользовательские Flatpak",
    command: "flatpak update --user",
    label: "Обновление Flatpak User",
    safety: "Штатное действие",
    description: "Обновляет приложения и среды Flatpak текущего пользователя, не трогая RPM-систему Nobara.",
    expected: "Flatpak покажет список и попросит подтверждение. Если обновлений нет, так и напишет.",
  },
  {
    group: "Сеть и VPN",
    title: "Показать активные сетевые соединения",
    command: "nmcli connection show --active",
    label: "Активные соединения NetworkManager",
    safety: "Только читает",
    description: "Показывает, какие соединения сейчас подняты: обычный Ethernet и не больше одного VPN.",
    expected: "увидишь проводное соединение и, если туннель включен, ровно одну VPN-запись. Два VPN сразу - ошибка настройки.",
  },
  {
    group: "Сеть и VPN",
    title: "Проверить, кто отвечает за DNS",
    command: "resolvectl status",
    label: "Состояние systemd-resolved",
    safety: "Только читает",
    description: "Показывает DNS текущих интерфейсов. Ничего не меняет и не переписывает resolv.conf.",
    expected: "для обычной Nobara отвечает systemd-resolved. После отключения VPN не должно остаться чужого DNS только от клиента.",
  },
  {
    group: "Звук и устройства",
    title: "Показать все звуковые устройства и потоки",
    command: "wpctl status",
    label: "Схема звука PipeWire",
    safety: "Только читает",
    description: "Показывает выходы, микрофоны, приложения и устройство, выбранное по умолчанию.",
    expected: "звездочка отмечает текущий выход или микрофон, а запущенные приложения видны отдельными потоками.",
  },
  {
    group: "Звук и устройства",
    title: "Проверить службы PipeWire",
    command: "systemctl --user status pipewire pipewire-pulse wireplumber --no-pager",
    label: "Состояние звуковых служб",
    safety: "Только читает",
    description: "Показывает состояние звукового движка, совместимости PulseAudio и менеджера устройств WirePlumber.",
    expected: "у трех пользовательских служб должно быть active или активированное сокетом рабочее состояние.",
  },
  {
    group: "Звук и устройства",
    title: "Показать подключенные Bluetooth-устройства",
    command: "bluetoothctl devices Connected",
    label: "Активные подключения Bluetooth",
    safety: "Только читает",
    description: "Выводит только устройства, которые BlueZ считает подключенными прямо сейчас.",
    expected: "увидишь адрес и имя наушников или контроллера. Пустой вывод означает, что активного подключения нет.",
  },
  {
    group: "Звук и устройства",
    title: "Проверить, видит ли система контроллер",
    command: "grep -i -A 8 -E 'gamepad|joystick|xbox|sony|wireless controller' /proc/bus/input/devices",
    label: "Поиск игрового контроллера",
    safety: "Только читает",
    description: "Ищет контроллер в списке устройств ядра без установки драйверов и изменения Steam Input.",
    expected: "имя контроллера и строка Handlers означают, что Linux уже видит устройство.",
  },
  {
    group: "Wayland и Plasma",
    title: "Проверить порталы захвата экрана",
    command: "systemctl --user status xdg-desktop-portal xdg-desktop-portal-kde --no-pager",
    label: "Состояние порталов Wayland",
    safety: "Только читает",
    description: "Показывает службы, через которые браузер, Vesktop и OBS получают разрешение на захват экрана.",
    expected: "обе службы должны быть активны без повторяющихся ошибок в последних строках.",
  },
  {
    group: "Wayland и Plasma",
    title: "Перезапустить зависший выбор экрана",
    command: "systemctl --user restart xdg-desktop-portal xdg-desktop-portal-kde",
    label: "Перезапуск порталов Wayland",
    safety: "Штатное действие",
    description: "Перезапускает только пользовательские порталы, если окно выбора монитора не появилось или захват стал черным.",
    expected: "текущий захват оборвется. После команды заново открой приложение и выбери экран в окне Plasma.",
  },
  {
    group: "Wayland и Plasma",
    title: "Перезапустить панель и рабочий стол Plasma",
    command: "systemctl --user restart plasma-plasmashell.service",
    label: "Перезапуск Plasmashell",
    safety: "Штатное действие",
    description: "Перезапускает оболочку Plasma, когда зависла панель или рабочий стол, но приложения и TTY продолжают работать.",
    expected: "панель ненадолго исчезнет и появится снова. Открытые приложения не должны закрыться.",
  },
  {
    group: "Диагностика",
    title: "Показать предупреждения текущей загрузки",
    command: "journalctl -b -p warning --no-pager",
    label: "Журнал текущей загрузки",
    safety: "Только читает",
    description: "Читает предупреждения и ошибки с момента включения компьютера. Журнал может быть длинным, и не каждая строка означает поломку.",
    expected: "ищи повторяющиеся сообщения рядом со временем реального сбоя, а не пытайся победить весь красный текст мира.",
  },
  {
    group: "Диагностика",
    title: "Проверить время и синхронизацию",
    command: "timedatectl",
    label: "Время системы",
    safety: "Только читает",
    description: "Показывает локальное время, часовой пояс, UTC и состояние сетевой синхронизации без изменения часов.",
    expected: "часовой пояс должен быть твоим, а System clock synchronized обычно показывает yes.",
  },
] as const;

export function NotesScreen() {
  return (
    <GuideScreen
      id="notes"
      number="12"
      title="Заметки"
      description="Команды, которые реально нужны под рукой: все сразу видны, каждая копируется одной кнопкой, никакого аккордеона и терминального сатанизма."
    >
      <section className="notes-safety-card" aria-labelledby="notes-safety-title">
        <span className="notes-safety-icon" aria-hidden="true"><ShieldCheck /></span>
        <div>
          <span className="notes-safety-kicker">Белый список команд</span>
          <h2 id="notes-safety-title">Читаем состояние или используем штатный инструмент</h2>
          <p>Здесь нет удаления файлов, форматирования, ручной правки EFI, <Code>--allowerasing</Code> и случайного ковыряния репозиториев. Команды с меткой «Только читает» ничего не меняют. «Штатное действие» выполняет ровно подписанную операцию и может попросить подтверждение.</p>
          <p>Да, на CachyOS путь с обычным <Code>pacman -Syu</Code> прямее. У Nobara обновлятор дополнительно выполняет синхронизацию и собственные исправления, поэтому здесь вместо обычного DNF используется <Code>nobara-sync</Code>. Не потому что терминал обидел разработчиков, а потому что у дистрибутива такой техпроцесс.</p>
        </div>
      </section>

      <ol className="notes-command-list">
        {commands.map((item, index) => (
          <li key={item.command} className="notes-command-card">
            <div className="notes-command-copy">
              <div className="notes-command-meta">
                <span className="notes-command-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="notes-command-group">{item.group}</span>
                <span className="notes-command-safety" data-action={item.safety !== "Только читает" || undefined}>{item.safety}</span>
              </div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p className="notes-command-result"><strong>Что ждать:</strong> {item.expected}</p>
            </div>
            <CodeSnippet code={item.command} label={item.label} />
          </li>
        ))}
      </ol>

      <footer className="notes-signature">
        <div className="notes-signature-heart" aria-hidden="true"><Heart fill="currentColor" /></div>
        <div>
          <span><Sparkles aria-hidden="true" /> Сделано с ♥ и подозрительно широкими полномочиями</span>
          <strong>Модератором / Менеджером / Другом aka Кентом aka БОССОМ</strong>
          <p><b>noenemies</b>, он же <b>CYHTm</b>. Личин много, виновник один.</p>
        </div>
      </footer>
    </GuideScreen>
  );
}
