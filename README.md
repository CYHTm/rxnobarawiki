# RX//NOBARA

Русскоязычный гайд по настройке уже установленной Nobara Linux 43 KDE Plasma 6 Wayland для новичка, который переходит с Windows 11.

## Конфигурация

- Ryzen 5 2600;
- Radeon RX 580 8 ГБ;
- 16 ГБ оперативной памяти;
- Gigabyte B450M S2H;
- NVMe 512 ГБ с Windows 11 и Nobara;
- Acer 75 Гц и ViewSonic 60 Гц.

## Что внутри

- проверка `/boot`, общего EFI-раздела и свободного места без повторной установки;
- Nobara Welcome, штатное обновление, Media Codecs, RPM и пользовательские Flatpak;
- мониторы, Adaptive Sync, мышь, KWallet и Baloo;
- проверка установленного LACT, условный параметр RX 580, андервольт и откат;
- PortProton, отдельные Wine-префиксы и диагностика любых Windows-игр;
- нативный OBS, VAAPI H.264, PipeWire и VK Видео Live;
- Windows UTC, GRUB и автомонтирование игровых дисков;
- три размера текста с сохранением единственной настройки в LocalStorage.

Диагностика и откат находятся рядом с соответствующим действием. На сайте нет чек-листа, отметок выполнения и общего прогресса.

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

Сайт использует статический экспорт Next.js. Для GitHub Pages сборка создается с базовым путем репозитория, после чего содержимое `out` синхронизируется в `docs`:

```bash
NEXT_PUBLIC_BASE_PATH=/rxnobarawiki npm run build
rm -rf docs
cp -R out docs
touch docs/.nojekyll
```

GitHub Pages раздает папку `/docs` из ветки публикации. Основной источник системных рекомендаций - [официальная Nobara Wiki](https://wiki.nobaraproject.org/).
