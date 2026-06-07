import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";

export function generatePageMetadata({
  title,
  description,
  path,
  locale,
  ogImage,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  locale: string;
  ogImage?: string;
  keywords?: string[];
}): Metadata {
  const canonical = `${BASE_URL}${path}`;
  const altLocale = locale === "ar" ? "en" : "ar";
  const altPath = path.replace(`/${locale}`, `/${altLocale}`);

  return {
    title,
    description,
    keywords: keywords?.join(", "),
    alternates: {
      canonical,
      languages: {
        [locale]: canonical,
        [altLocale]: `${BASE_URL}${altPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      images: ogImage
        ? [{ url: `${BASE_URL}${ogImage}`, width: 1200, height: 630, alt: title }]
        : [{ url: `${BASE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [`${BASE_URL}${ogImage}`] : [`${BASE_URL}/images/og-default.jpg`],
    },
  };
}
