import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "NOBARA / ТВОЙ ПК",
  description:
    "Интерактивный гайд по уже установленной Nobara Linux 43 для твоего ПК: штатная оптимизация, Windows 11, Wayland, игры, стрим, устройства и восстановление системы.",
  keywords: [
    "Nobara Linux 43",
    "RX 580",
    "LACT",
    "PortProton",
    "Bottles",
    "OBS VAAPI",
    "PipeWire",
    "KDE Plasma 6",
    "falcond",
    "zram",
  ],
  authors: [{ name: "NOBARA / ТВОЙ ПК" }],
  openGraph: {
    title: "NOBARA / ТВОЙ ПК",
    description: "Одиннадцать экранов настройки, штатной оптимизации, безопасных команд и восстановления уже установленной Nobara 43 для твоего ПК.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111117",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="dark">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
