import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/app/globals.css";

if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
  console.warn(
    "[SEO] NEXT_PUBLIC_SITE_URL is not set. " +
    "Canonical URLs, sitemap, and OG tags will fall back to https://alfahd-contracting.com. " +
    "Set this environment variable in your Vercel project settings."
  );
}

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
  title: "مؤسسة الفهد للمقاولات",
  description:
    "مؤسسة الفهد للمقاولات — متخصصون في أعمال الألمنيوم والزجاج والحديد بالمملكة العربية السعودية",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
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
      dir="rtl"
      lang="ar"
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
