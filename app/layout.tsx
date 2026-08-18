import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RX//NOBARA - гайд для стримера на Nobara Linux 43",
  description:
    "Полный гайд по Nobara Linux 43 KDE Plasma 6: RX 580, LACT, PortProton, OBS, PipeWire, dual-boot и два монитора.",
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
    title: "RX//NOBARA - настройка стрим-машины",
    description: "Nobara 43, RX 580, два монитора, игры и OBS без шаманства.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070a12",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="dark">
      <body>{children}</body>
    </html>
  );
}
