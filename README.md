# NOBARA / ТВОЙ ПК

Интерактивный русскоязычный гайд по уже установленной Nobara Linux 43 KDE Plasma 6 Wayland для новичка, который переходит с Windows 11.

## Конфигурация

- Ryzen 5 2600;
- Radeon RX 580 8 ГБ;
- 16 ГБ оперативной памяти;
- Gigabyte B450M S2H;
- NVMe 512 ГБ с Windows 11 и Nobara;
- Acer 75 Гц и ViewSonic 60 Гц.

## Как устроен интерфейс

Сайт состоит из двух уровней:

1. `/` - самостоятельный полноэкранный Welcome с кнопками входа и настройки текста.
2. `/guide` - оболочка приложения с отдельным экраном для каждой темы.

Внутри гайда есть карта маршрута и семь тематических экранов:

- проверка dual-boot, `/boot` и общего EFI;
- Nobara Welcome, обновление, RPM и пользовательский Flatpak;
- мониторы, ввод, KWallet и Baloo;
- RX 580, установленный LACT, андервольт и откат;
- PortProton и универсальная схема Windows-игр;
- OBS, PipeWire и VK Видео Live;
- Windows UTC, GRUB и Nobara Drive Mount Manager.

Навигация меняет экраны без перезагрузки страницы. Диагностика и откат раскрываются непосредственно внутри связанного шага. На сайте нет чек-листа, отметок выполнения и общего прогресса.

## Стек

- Next.js 16 и React 19;
- TypeScript;
- Framer Motion для переходов, контейнерных анимаций и пружинного движения;
- Radix UI для диалогов, подсказок и раскрывающихся блоков;
- Zustand для состояния активного экрана без сохранения в браузере;
- Tailwind CSS и собственная система Material 3 Expressive токенов;
- Manrope Variable и JetBrains Mono Variable из npm-пакетов Fontsource.

LocalStorage используется только для размера типографики. Ключ: `rx-nobara-text-scale`.

## Структура проекта

- `app/page.tsx` - Welcome;
- `app/guide/page.tsx` - маршрут приложения;
- `components/welcome` - стартовый экран и переход во внутрь;
- `components/guide/GuideApp.tsx` - оболочка и смена сцен;
- `components/guide/GuideNavigation.tsx` - navigation rail, мобильный dock и переключение экранов;
- `components/guide/GuidePrimitives.tsx` - Material-компоненты действий, диагностики и настроек;
- `components/guide/screens` - отдельный модуль каждого раздела;
- `components/guide/guide-store.ts` - непостоянное Zustand-состояние;
- `app/globals.css` - токены, цветовые темы, адаптивность и движения.

## Локальный запуск

```bash
npm install
npm run dev
```

Открой `http://localhost:3000`.

## Проверка

```bash
npm run lint
npm run typecheck
npm run build
```

## Публикация

Сайт использует статический экспорт Next.js. Для GitHub Pages сборка создается с базовым путем репозитория, после чего содержимое `out` копируется в `docs`:

```bash
NEXT_PUBLIC_BASE_PATH=/rxnobarawiki npm run build
rm -rf docs
cp -R out docs
touch docs/.nojekyll
```

GitHub Pages раздает папку `/docs` из рабочей ветки. Основной источник системных рекомендаций - [официальная Nobara Wiki](https://wiki.nobaraproject.org/).
