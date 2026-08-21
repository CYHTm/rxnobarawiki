"use client";

import { CodeSnippet } from "@/components/CodeSnippet";
import { Code, GuideScreen, Setting, Settings, StepBlock, SupportPanel, Warning } from "@/components/guide/GuidePrimitives";

export function VpnScreen() {
  return (
    <GuideScreen
      id="vpn"
      number="03"
      title="Клиент подписки, не «просто VPN»"
      description="На Windows и Android у тебя уже есть подписка и клиенты вроде V2RayTun, FLClash и Karing. На Nobara ставим такой же класс программ: один клиент, та же ссылка подписки, без чужих Fedora-репозиториев."
    >
      <Warning>
        Это не Mullvad и не Amnezia «нажал Connect». Клиент сам серверы не дает: он только читает твою подписку (Clash / VLESS / VMess / sing-box) и поднимает прокси или TUN. Ставь один клиент. Два TUN сразу рвут маршруты. RPM с левого сайта и скрипт <Code>curl | bash</Code> на кастомном ядре Nobara не нужны.
      </Warning>

      <StepBlock id="vpn-choice" title="Выбери один клиент под ту же подписку">
        <p>Ссылка подписки с Windows копируется как есть. Не ищи «ключи» на сторонних сайтах и не качай сборки с зеркал без GitHub/официальной страницы разработчика. Если GitHub из Nobara не открывается, скачай файл в Windows и перенеси на Linux.</p>
        <Settings className="mt-5">
          <Setting label="FLClash" value="Тот же Clash Meta, что на Windows/Android. AppImage с GitHub" />
          <Setting label="Karing" value="Тот же клиент, что на Android/Windows. AppImage или локальный RPM" />
          <Setting label="Вместо V2RayTun" value="v2rayN: тот же Xray и подписка. У V2RayTun Linux слабее" />
          <Setting label="Формат Nobara" value="Сначала AppImage, не репозиторий DNF" />
          <Setting label="Не ставить" value="Второй клиент, .deb, случайный Clash с агрегаторов" />
        </Settings>
        <p className="mt-5">Официальные страницы, только они:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-200">
          <li>FLClash: <Code>https://github.com/chen08209/FlClash/releases/latest</Code> — файл <Code>FlClash-*-linux-amd64.AppImage</Code>. RPM с того же релиза можно, но AppImage не пишет пакеты в систему.</li>
          <li>Karing: <Code>https://karing.app/download</Code> или <Code>https://github.com/KaringX/karing/releases/latest</Code> — <Code>karing_*_linux_amd64.AppImage</Code>. Официальный Linux RPM с karing.app допустим как разовая установка <Code>sudo dnf install ./файл.rpm</Code> без добавления репозитория.</li>
          <li>v2rayN: <Code>https://github.com/2dust/v2rayN/releases/latest</Code> — Linux x64 из раздела релизов. Это ближайшая замена V2RayTun: ядро Xray, импорт той же подписки. Сам V2RayTun на Linux либо экспериментальный, либо раздается отдельно у автора; чужие «v2raytun linux» с SEO-сайтов не качай.</li>
        </ul>
        <SupportPanel title="Почему не Amnezia, Proton и Flatpak-VPN">
          <p>Amnezia ставит свой стек и свои протоколы. У тебя уже оплаченные узлы и готовая подписка — ей нужен Clash/Xray/sing-box клиент, а не второй сервис. Репозиторий Proton для Fedora тянет GNOME-приложение и может оставить kill switch в NetworkManager. Неофициальный Flatpak VPN часто не умеет TUN. Snap еще сильнее режет сеть.</p>
        </SupportPanel>
      </StepBlock>

      <StepBlock id="appimage" title="AppImage не ставится через DNF App Center" status="это файл, не пакет">
        <p><strong className="text-white">DNF App Center</strong> ставит RPM из репозиториев Nobara и умеет открыть скачанный <Code>.rpm</Code>. Файл <Code>.AppImage</Code> он не устанавливает: это не пакет системы, а готовая программа в одном файле, ближе к portable-папке в Windows, чем к установщику.</p>
        <Settings className="mt-5">
          <Setting label="DNF App Center" value="Только .rpm и каталог RPM" />
          <Setting label="Bazaar / Flatpost" value="Только Flatpak из Flathub" />
          <Setting label=".AppImage" value="Скачал → разрешил запуск → открыл" />
          <Setting label="Gear Lever" value="Необязательный ярлык в меню Plasma" />
        </Settings>
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-6 text-zinc-200">
          <li>Скачай <Code>amd64</Code>/<Code>x64</Code> AppImage с официальной страницы выбранного клиента в Загрузки.</li>
          <li>В Dolphin создай папку <Code>Applications</Code> в домашней директории и перетащи туда файл. Так он не потеряется среди установщиков.</li>
          <li>Правая кнопка по файлу - Свойства - вкладка Права. Включи «Разрешить выполнение как программы» или «Исполняемый». Закрой окно.</li>
          <li>Открой файл двойным щелчком. Должно появиться окно клиента, не мастер DNF.</li>
        </ol>
        <p className="mt-5">Konsole нужен только если клик ничего не делает. Подставь настоящее имя файла:</p>
        <CodeSnippet
          code={"mkdir -p \"$HOME/Applications\"\nchmod +x \"$HOME/Applications\"/FlClash-*-linux-amd64.AppImage\n\"$HOME/Applications\"/FlClash-*-linux-amd64.AppImage"}
          label="Тот же запуск FLClash через Konsole"
          className="mt-4"
        />
        <p className="mt-4">Karing запускается так же. Если v2rayN пришел архивом <Code>.zip</Code>, распакуй его в <Code>~/Applications/v2rayN</Code> и запускай бинарник оттуда, не через <Code>sudo</Code>.</p>
        <p className="mt-4">На Fedora/Nobara части AppImage нужен <Code>libfuse.so.2</Code>. Это единственное, что можно поставить из репозиториев системы. Сам клиент через DNF App Center не ищи.</p>
        <div className="mt-4 space-y-3">
          <CodeSnippet code="rpm -q fuse-libs" label="Проверить библиотеку FUSE 2 для AppImage" />
          <CodeSnippet code="sudo dnf install fuse-libs" label="Поставить только fuse-libs, если пакета нет" />
        </div>
        <p className="mt-5">Ярлык в меню Plasma не появляется сам. Если хочешь иконку как у обычной программы, в Nobara Welcome - Recommended Additions поставь <Code>Gear Lever</Code> (это Flatpak, не RPM) и открой AppImage через него. Wiki Nobara предлагает Gear Lever именно для AppImage. Для первого запуска он не обязателен.</p>
        <SupportPanel title="AppImage пишет, что не найден libfuse.so.2">
          <p>Поставь <Code>fuse-libs</Code> командой выше и запусти файл снова. Не ставь пакет с именем из Ubuntu-гайда и не качай FUSE с постороннего сайта. Если файл все равно не открывается, проверь что скачал <Code>amd64</Code>/<Code>x64</Code>, а не arm64.</p>
        </SupportPanel>
        <SupportPanel title="Если все-таки поставил RPM Karing или FLClash">
          <p className="mb-4">Локальный RPM не добавляет репозиторий, но появляется в базе пакетов. Удаление только через DNF, не руками из <Code>/opt</Code>:</p>
          <div className="space-y-3">
            <CodeSnippet code="rpm -q karing flclash FlClash" label="Уточнить точное имя установленного пакета" />
            <CodeSnippet code="sudo dnf remove karing" label="Пример удаления, имя возьми из rpm -q" />
          </div>
        </SupportPanel>
      </StepBlock>

      <StepBlock id="subscription" title="Вставь ту же подписку, что на Windows">
        Открой клиент. Найди добавление подписки / profile / URL. Вставь ссылку, которой уже пользуешься в FLClash, Karing или V2RayTun. Дождись обновления списка узлов. Выбери рабочий узел так же, как на Windows: не первый попавшийся, а тот, который у тебя обычно живой.
        <p className="mt-4">Режим подключения:</p>
        <Settings className="mt-4">
          <Setting label="System Proxy" value="Только приложения, которые слушают системный прокси" />
          <Setting label="TUN" value="Почти весь трафик, как «VPN-режим» на телефоне" />
          <Setting label="Первый тест" value="Сначала браузер через System Proxy" />
          <Setting label="Steam, Konsole, OBS" value="Если без TUN не ходят — включи TUN в том же клиенте" />
        </Settings>
        <p className="mt-5">На KDE System Proxy иногда покрывает не все программы. Если Chrome ходит, а <Code>nobara-sync</Code> или Steam нет — это нормально, не ставь второй клиент. Включи TUN в уже открытом FLClash/Karing/v2rayN. Пароль <Code>sudo</Code>/<Code>pkexec</Code> для TUN один раз допустим: клиент поднимает виртуальный интерфейс. Не отключай firewalld ради этого.</p>
        <SupportPanel title="Как понять, что подписка подхватилась">
          <p>В клиенте должен появиться список узлов, не пустая страница и не вечная загрузка. Если список пуст, ссылка не того формата для этого клиента: FLClash ждет Clash/Meta, Karing ест Clash, V2Ray и sing-box, v2rayN — VMess/VLESS/Clash в зависимости от ядра. Не конвертируй подписку через случайный сайт. Возьми из кабинета провайдера формат, который этот клиент умеет, как на Windows.</p>
        </SupportPanel>
      </StepBlock>

      <StepBlock id="vpn-check" title="Проверь туннель и выключи клиента целиком">
        Подключи узел, открой сайт, который без подписки не грузится. В трее Plasma должен быть один клиент, не два.
        <CodeSnippet code="nmcli connection show --active" label="Посмотреть, не висят ли лишние туннели" className="mt-4" />
        <p className="mt-5">В активных соединениях допустимы Ethernet и один TUN/VPN от выбранного клиента. Если после выключения клиента интернет умер, закрой процесс полностью и перезапусти сеть:</p>
        <CodeSnippet code="systemctl restart NetworkManager" label="Вернуть маршруты после обрыва TUN" className="mt-4" />
        <Settings className="mt-5">
          <Setting label="Игры с античитом ядра" value="По-прежнему Windows, клиент их не лечит" />
          <Setting label="Эфир VK" value="Лишняя задержка, для теста лучше без TUN" />
          <Setting label="Обновление Nobara" value="nobara-sync может требовать TUN, если репозитории режут" />
        </Settings>
        <SupportPanel title="Как убрать клиент без следов в системе">
          <p>AppImage: выключи туннель в программе, закрой окно, удали файл из <Code>~/Applications</Code>. Если ставил через Gear Lever — удали там. RPM: <Code>sudo dnf remove</Code> с точным именем. Не чисти <Code>/etc</Code> и не трогай NetworkManager вручную, пока <Code>nmcli connection show --active</Code> не покажет лишнее соединение с именем клиента.</p>
        </SupportPanel>
      </StepBlock>
    </GuideScreen>
  );
}
