import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/app/globals.css";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "شركة الفهد للمقاولات",
  description:
    "شركة الفهد للمقاولات — متخصصون في أعمال الألمنيوم والزجاج والحديد بالمملكة العربية السعودية",
};

// Root layout: owns <html> and <body>.
// Lang/dir are set here using a suppressHydrationWarning approach;
// the [locale] layout overrides them via script-free server rendering.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${ibmPlexArabic.variable} ${inter.variable}`}
    >
      <head>
        {/* JetBrains Mono — used for mono labels throughout the site */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
        />
        {/* Material Symbols Outlined — used by service cards, certifications, etc. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
      <GoogleAnalytics gaId="G-7MMSL4M3CH" />
    </html>
  );
}
