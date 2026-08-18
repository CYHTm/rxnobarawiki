import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOBARA / НАСТРОЙКА - гайд для твоего ПК",
  description:
    "Пошаговый гайд по установке и настройке Nobara Linux 43 для новичка: Windows 11 рядом, RX 580, LACT, игры, OBS и два монитора.",
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
    description: "Установка и настройка Nobara 43 для новичка: Windows 11 рядом, RX 580, два монитора, игры и OBS.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#424242",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="dark">
      <body>{children}</body>
    </html>
  );
}
