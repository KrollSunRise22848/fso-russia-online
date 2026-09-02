import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ФСО — Россия Онлайн | Официальный портал",
  description: "Федеральная Служба Охраны — Россия Онлайн. Официальный портал государственной структуры. Приказы, новости, состав руководства.",
  keywords: ["ФСО", "Россия Онлайн", "GTA 5", "Федеральная Служба Охраны", "УСН", "правительство", "официальный портал"],
  authors: [{ name: "ФСО — Россия Онлайн" }],
  icons: {
    icon: "/images/fso-emblem.png",
  },
  openGraph: {
    title: "ФСО — Россия Онлайн",
    description: "Официальный портал Федеральной Службы Охраны",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cormorant.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
