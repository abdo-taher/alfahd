import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Providers } from "@/app/providers";
import { Header } from "@/shared/components/layout/header";
import { Footer } from "@/shared/components/layout/footer";
import { WhatsAppButton } from "@/shared/components/layout/whatsapp-button";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";

  return {
    title: {
      default: t("siteTitle"),
      template: `%s | ${t("siteTitle")}`,
    },
    description: t("siteDescription"),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        ar: `${baseUrl}/ar`,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      siteName: t("siteTitle"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      className={`${ibmPlexArabic.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
