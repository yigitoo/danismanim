import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Danışmanım | Yurtdışı Eğitim Danışmanlığı",
  description: "Yeni Zelanda başta olmak üzere dünyanın farklı ülkelerinde lise, üniversite, dil okulu ve kariyer fırsatları için profesyonel eğitim danışmanlığı.",
  keywords: ["yurtdışı eğitim", "eğitim danışmanlığı", "Yeni Zelanda", "üniversite", "dil okulu", "öğrenci danışmanlığı", "danışmanım"],
  authors: [{ name: "Danışmanım" }],
  openGraph: {
    title: "Danışmanım | Yurtdışı Eğitim Danışmanlığı",
    description: "Yeni Zelanda başta olmak üzere dünyanın farklı ülkelerinde lise, üniversite, dil okulu ve kariyer fırsatları için profesyonel eğitim danışmanlığı.",
    url: "https://danismanim.co",
    siteName: "Danışmanım",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Danışmanım | Yurtdışı Eğitim Danışmanlığı",
    description: "Yeni Zelanda başta olmak üzere dünyanın farklı ülkelerinde lise, üniversite, dil okulu ve kariyer fırsatları için profesyonel eğitim danışmanlığı.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
