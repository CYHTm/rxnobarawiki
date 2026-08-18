"use client";

import { CodeSnippet } from "@/components/CodeSnippet";
import { Code, GuideScreen, Setting, Settings, StepBlock, SupportPanel } from "@/components/guide/GuidePrimitives";

export function SystemScreen() {
  return (
    <GuideScreen id="start" number="02" title="База после установки" description="Система уже запускалась, но эти проверки все равно делаем один раз: штатное обновление, кодеки и понятная схема программ.">
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

      <StepBlock id="apps" title="Поставь qBittorrent, Vesktop и Chrome через Flatpak">
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

    </GuideScreen>
  );
}
