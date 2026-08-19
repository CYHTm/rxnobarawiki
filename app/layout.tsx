import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "NOBARA / ТВОЙ ПК",
  description:
    "Интерактивный гайд по уже установленной Nobara Linux 43 для твоего ПК: штатная оптимизация, измеримые низкоуровневые эксперименты, Windows 11, игры, стрим и восстановление системы.",
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
    "MangoHud",
    "Btrfs",
    "Mesa RADV",
    "grubby",
  ],
  authors: [{ name: "NOBARA / ТВОЙ ПК" }],
  openGraph: {
    title: "NOBARA / ТВОЙ ПК",
    description: "Двенадцать экранов настройки, штатной оптимизации, измеримых экспериментов и восстановления уже установленной Nobara 43 для твоего ПК.",
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
