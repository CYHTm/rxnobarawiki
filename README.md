# RX//NOBARA

Интерактивный русскоязычный гайд по настройке Nobara Linux 43 KDE Plasma 6 Wayland для стримера на Ryzen 5 2600 и RX 580.

## Что внутри

- первые шаги, обновление и Media Codecs;
- мониторы Acer 75 Гц + ViewSonic 60 Гц, Adaptive Sync и ввод;
- LACT, андервольт RX 580 и профиль вентиляторов;
- PortProton, Lesta Game Center и изоляция префиксов;
- OBS, VAAPI H.264, Vulkan capture и PipeWire;
- две системы с Windows 11 и аварийные команды;
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

Сайт настроен на статический экспорт Next.js. Для публикации содержимое каталога `out` копируется в `docs`, а GitHub Pages раздает папку `/docs` из ветки публикации.

Актуальность материалов: 16 августа 2026 года. Основной источник рекомендаций - [официальная Nobara Wiki](https://wiki.nobaraproject.org/).
