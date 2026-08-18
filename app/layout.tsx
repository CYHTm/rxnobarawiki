import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOBARA / НАСТРОЙКА - гайд для твоего ПК",
  description:
    "Полный гайд по Nobara Linux 43 KDE Plasma 6: RX 580, LACT, PortProton, OBS, PipeWire, две системы и два монитора.",
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
    description: "Nobara 43, RX 580, Acer 75 Гц, ViewSonic 60 Гц, игры и OBS.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#161616",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="dark">
      <body>{children}</body>
    </html>
  );
}
