"use client";

import { CodeSnippet } from "@/components/CodeSnippet";
import { LactCalculator } from "@/components/LactCalculator";
import { Code, GuideScreen, Setting, Settings, StepBlock, SupportPanel } from "@/components/guide/GuidePrimitives";

export function LactScreen() {
  return (
    <GuideScreen id="lact" number="04" title="RX 580 и LACT" description="LACT уже установлен. Сначала проверяем службу, карту и датчики, только потом разрешаем управление напряжением.">
      <StepBlock id="lact-install" title="Проверь установленный LACT и службу lactd">
        LACT уже стоит, поэтому переустанавливать его поверх рабочей системы не надо. Сначала открой Konsole и проверь пакет, автозапуск фоновой службы и ее текущее состояние.
        <CodeSnippet code={"rpm -q lact\nsystemctl is-enabled lactd\nsystemctl is-active lactd"} label="Проверить пакет, автозапуск и текущее состояние" className="mt-6" />
        <p className="mt-5">Первая строка должна показать имя и версию пакета, вторая - <Code>enabled</Code>, третья - <Code>active</Code>. Затем открой LACT из меню Plasma. В окне должны определиться RX 580, текущая температура, частота ядра и скорость вентиляторов.</p>
        <p className="mt-4">Пока это просто проверка. Не нажимай «Применить» и не включай автоматическую загрузку профиля, если не сохранил исходные значения. Скриншот стартового экрана LACT уже будет нормальной точкой отката.</p>
        <SupportPanel title="Пакет есть, но служба inactive или disabled">
          <p className="mb-4">Включи службу сейчас и добавь ее в автозапуск. Затем снова проверь статус и открой LACT.</p>
          <div className="space-y-3">
            <CodeSnippet code="sudo systemctl enable --now lactd" label="Включить lactd сейчас и при следующих загрузках" />
            <CodeSnippet code="systemctl is-active lactd" label="Убедиться, что ответ теперь active" />
          </div>
        </SupportPanel>
        <SupportPanel title="Служба не запускается или LACT не видит карту">
          <p className="mb-4">Последние 80 строк журнала обычно называют причину. Эта команда ничего не меняет.</p>
          <CodeSnippet code="journalctl -u lactd -b --no-pager -n 80" label="Посмотреть журнал lactd текущей загрузки" />
          <p className="mb-4 mt-5">Если после включения службы появились проблемы, останови ее и убери из автозапуска. Управление драйвером AMD вернется к обычным настройкам ядра.</p>
          <CodeSnippet code="sudo systemctl disable --now lactd" label="Отключить службу LACT" />
        </SupportPanel>
        <SupportPanel title="Только если rpm сообщает, что LACT не установлен">
          <p className="mb-4">Тогда установленного пакета действительно нет. Поставь нативную версию из репозитория Nobara и включи службу.</p>
          <CodeSnippet code={"sudo dnf install lact -y\nsudo systemctl enable --now lactd"} label="Запасная установка из репозитория Nobara" />
          <p className="mt-3">Сторонний COPR для LACT не подключай. Для этой утилиты сначала используется пакет из репозитория Nobara.</p>
        </SupportPanel>
      </StepBlock>

      <StepBlock id="lact-mask" title="Если напряжение скрыто, разреши управление RX 580" status="только при необходимости">
        Сначала открой вкладку настройки GPU в LACT. Если управление напряжением уже доступно, весь этот шаг пропусти. Если ползунков нет, драйвер AMD скрывает ручное управление. Для RX 580 на архитектуре Polaris можно добавить условный параметр ядра.
        <CodeSnippet code="sudo grubby --update-kernel=ALL --args='amdgpu.ppfeaturemask=0xfffd7fff'" label="Добавить параметр ко всем ядрам" className="mt-6" />
        <p className="mt-5">Полностью перезагрузи ПК и снова открой LACT. Ползунки напряжения должны появиться. Убедиться, что ядро действительно получило параметр, можно без изменения системы:</p>
        <CodeSnippet code="cat /proc/cmdline | grep -o 'amdgpu.ppfeaturemask=[^ ]*'" label="Проверить параметр после перезагрузки" className="mt-4" />
        <SupportPanel title="Что означает маска 0xfffd7fff">
          Маска открывает управление питанием и напряжением, но не включает вообще все экспериментальные функции подряд. Для Polaris это консервативнее, чем маска из одних единиц. Она также отключает GFXOFF и Stutter Mode, поэтому на отдельных картах может немного вырасти потребление в простое.
        </SupportPanel>
        <SupportPanel title="Ползунки не появились или после команды начались проблемы">
          <p className="mb-4">Если проверка выше ничего не вывела, параметр не применился - не переходи к андервольту. Если появились черный экран, артефакты, странности двух мониторов или выросло потребление, удали ровно тот же параметр и перезагрузи ПК.</p>
          <CodeSnippet code="sudo grubby --update-kernel=ALL --remove-args='amdgpu.ppfeaturemask=0xfffd7fff'" label="Полный откат параметра" />
        </SupportPanel>
      </StepBlock>

      <StepBlock id="undervolt" title="Начни с 1125 мВ и тестируй шагами">
        Андервольт снижает напряжение видеокарты. Цель - меньше нагрева и шума без потери стабильности. Он не гарантирует одинаковый результат на двух RX 580, даже если модели совпадают.
        <p className="mt-4">Сохрани исходный профиль. Поставь 1125 мВ и запусти тяжелую реальную игру на 15-30 минут. Если нет цветных точек, полос, вылета драйвера или черного экрана, снижай по 10-15 мВ. При первой ошибке верни последнее стабильное значение. Не начинай с 1065 мВ, карта тебе ничего не должна.</p>
        <div className="mt-5"><LactCalculator /></div>
        <SupportPanel title="Быстрый откат нестабильного профиля">
          Открой LACT и загрузи сохраненный исходный профиль или нажми сброс параметров видеокарты. Не включай автоматическое применение нового андервольта при запуске, пока он не пережил несколько игр и хотя бы одну полную перезагрузку.
        </SupportPanel>
        <SupportPanel title="Простой профиль вентиляторов">
          <Settings>
            <Setting label="40°C" value="28%" />
            <Setting label="55°C" value="45%" />
            <Setting label="68°C hotspot" value="70%" />
            <Setting label="80°C" value="90%" />
          </Settings>
          <p className="mt-4">Это стартовый пример, а не обязательная кривая. Смотри на hotspot и шум своей карты. Если вентиляторы резко прыгают между соседними точками, разнеси точки по температуре.</p>
        </SupportPanel>
      </StepBlock>
    </GuideScreen>
  );
}
