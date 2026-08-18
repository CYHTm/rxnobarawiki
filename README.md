# RX//NOBARA

Интерактивный русскоязычный гайд по настройке Nobara Linux 43 KDE Plasma 6 Wayland для стримера на Ryzen 5 2600 и RX 580.

## Что внутри

- первые шаги, обновление и Media Codecs;
- два монитора 144/165 + 60 Гц, Adaptive Sync и ввод;
- LACT, андервольт RX 580 и профиль вентиляторов;
- PortProton, Lesta Game Center и изоляция префиксов;
- OBS, VAAPI H.264, Vulkan capture и PipeWire;
- dual-boot с Windows 11 и аварийные команды;
- интерактивный чек-лист с сохранением в localStorage.

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

Сайт настроен на статический экспорт Next.js и автоматическую публикацию через GitHub Actions в GitHub Pages. После push в `main` workflow собирает каталог `out` и разворачивает его на Pages.

Актуальность материалов: 16 августа 2026 года. Основной источник рекомендаций - [официальная Nobara Wiki](https://wiki.nobaraproject.org/).
