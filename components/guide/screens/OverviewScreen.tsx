"use client";

import { ArrowUpRight, Cpu, HardDrive, MemoryStick, MonitorUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { GuideScreen, Term } from "@/components/guide/GuidePrimitives";
import { guideScreens } from "@/components/guide/guide-map";
import { openGuideScreen } from "@/components/guide/guide-navigation";

const specs = [
  { icon: Cpu, label: "Процессор", value: "Ryzen 5 2600", className: "spec-cpu" },
  { icon: Sparkles, label: "Видеокарта", value: "RX 580 · 8 ГБ", className: "spec-gpu" },
  { icon: MemoryStick, label: "Оперативная память", value: "16 ГБ", className: "spec-memory" },
  { icon: HardDrive, label: "Один NVMe", value: "512 ГБ · общий EFI", className: "spec-drive" },
  { icon: MonitorUp, label: "Два монитора", value: "75 Гц + 60 Гц", className: "spec-display" },
];

export function OverviewScreen() {
  return (
    <GuideScreen
      id="overview"
      number="00"
      title="Карта твоей Nobara"
      description="Система уже установлена рядом с Windows. Здесь не будет второго круга установки: сначала разберемся в словах, затем спокойно настроим то, что уже работает."
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, type: "spring", stiffness: 180, damping: 24 }}
        className="overview-state-card"
      >
        <div>
          <span className="overview-state-label">Исходная точка</span>
          <h2>Nobara стоит. Windows осталась. План жив.</h2>
          <p>PortProton, Lesta Game Center и Tanks Blitz уже установлены. LACT тоже есть, но еще не открывался. Поэтому проверяем состояние, а не долбим кнопку установки второй раз.</p>
        </div>
        <div className="overview-state-orb" aria-hidden="true"><span>43</span><small>KDE</small></div>
      </motion.div>

      <div className="specs-grid" aria-label="Конфигурация компьютера">
        {specs.map((spec, index) => {
          const Icon = spec.icon;
          return (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.12 + index * 0.04, type: "spring", stiffness: 210, damping: 24 }}
              className={`spec-tile ${spec.className}`}
            >
              <Icon aria-hidden="true" />
              <span>{spec.label}</span>
              <strong>{spec.value}</strong>
            </motion.div>
          );
        })}
      </div>

      <section className="route-section" aria-labelledby="route-title">
        <div className="route-heading">
          <div>
            <span>Навигация без простыни</span>
            <h2 id="route-title">Один раздел - один экран</h2>
          </div>
          <p>Открывай по порядку в первый раз. Потом прыгай сразу к нужной теме через панель слева или меню снизу.</p>
        </div>
        <div className="route-grid">
          {guideScreens.slice(1).map((screen) => {
            const Icon = screen.icon;
            return (
              <motion.button
                key={screen.id}
                type="button"
                onClick={() => openGuideScreen(screen.id)}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 360, damping: 24 }}
                className="route-card"
                data-tone={screen.tone}
              >
                <span className="route-card-icon"><Icon aria-hidden="true" /></span>
                <span className="route-card-number">{screen.number}</span>
                <strong>{screen.shortLabel}</strong>
                <small>{screen.summary}</small>
                <ArrowUpRight className="route-card-arrow" aria-hidden="true" />
              </motion.button>
            );
          })}
        </div>
      </section>

      <section className="terms-section" aria-labelledby="terms-title">
        <div className="terms-heading">
          <span>Не Википедия, а перевод с линуксячьего</span>
          <h2 id="terms-title">Восемь слов перед первой командой</h2>
          <p>Прочитай один раз. Этого хватит, чтобы не принять пакетный менеджер за новый игровой лаунчер.</p>
        </div>
        <dl className="terms-grid">
          <Term name="Nobara и Fedora">Nobara собрана на базе Fedora, но имеет собственные пакеты, ядро и механизм обновления. Случайная команда для Fedora не всегда подходит Nobara.</Term>
          <Term name="KDE Plasma">Панель, меню, окна и Параметры системы. Это графический интерфейс, который ты видишь после входа.</Term>
          <Term name="Wayland">Слой, который связывает приложения, мониторы, видеокарту и устройства ввода. Это не отдельный драйвер.</Term>
          <Term name="Пакет и репозиторий">Пакет - программа в формате установки. Репозиторий - проверенный каталог, откуда система получает пакет и его обновления.</Term>
          <Term name="RPM">Нативный пакет системы. Ядро, службы, LACT и OBS ставятся в этом формате.</Term>
          <Term name="DNF App Center">Графический центр RPM-пакетов и штатного обновления Nobara. Flatpak он не обслуживает.</Term>
          <Term name="Flatpak и Flathub">Flatpak изолирует обычные приложения, а Flathub служит их каталогом. Ставим только для текущего пользователя.</Term>
          <Term name="Konsole и sudo">Konsole - окно для текстовых команд. Кнопка «Копировать» берет только команду: вставь ее в Konsole и нажми Enter. sudo временно запускает одно действие с правами администратора. При вводе пароля символы не видны - это нормально.</Term>
        </dl>
      </section>
    </GuideScreen>
  );
}
