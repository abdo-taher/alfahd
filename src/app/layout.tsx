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
      <body suppressHydrationWarning>{children}</body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
