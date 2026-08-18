import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOBARA / НАСТРОЙКА - гайд для твоего ПК",
  description:
    "Пошаговая настройка уже установленной Nobara Linux 43 для новичка: Windows 11 рядом, RX 580, LACT, игры, VK Видео Live и два монитора.",
  keywords: [
    "Nobara Linux 43",
    "RX 580",
    "LACT",
    "PortProton",
    "OBS VAAPI",
    "PipeWire",
    "KDE Plasma 6",
  ],
  authors: [{ name: "RX//NOBARA" }],
  openGraph: {
    title: "NOBARA / НАСТРОЙКА - гайд для твоего ПК",
    description: "Настройка установленной Nobara 43 для новичка: Windows 11 рядом, RX 580, игры, OBS и VK Видео Live.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101219",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="dark">
      <body>{children}</body>
    </html>
  );
}
