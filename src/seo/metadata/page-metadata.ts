import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";

/** Shared brand keywords injected on every page for baseline authority signals */
const BRAND_KEYWORDS_AR = [
  "مؤسسة الفهد للمقاولات",
  "أعمال الألمنيوم الرياض",
  "أعمال الزجاج الرياض",
  "أعمال الحديد الرياض",
  "مقاول الرياض",
  "مقاولات المملكة العربية السعودية",
  "واجهات زجاجية",
  "هياكل معدنية",
];

const BRAND_KEYWORDS_EN = [
  "Al Fahd Contracting",
  "aluminum works Riyadh",
  "glass works Riyadh",
  "steel works Riyadh",
  "contractor Riyadh",
  "contracting Saudi Arabia",
  "glass facades",
  "steel structures",
];

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

  // Merge page-specific keywords with brand keywords, deduplicated
  const brandKw = locale === "ar" ? BRAND_KEYWORDS_AR : BRAND_KEYWORDS_EN;
  const allKeywords = keywords
    ? [...new Set([...keywords, ...brandKw])]
    : brandKw;

  const ogImageUrl = ogImage
    ? `${BASE_URL}${ogImage}`
    : `${BASE_URL}/images/og-default.jpg`;

  return {
    title,
    description,
    keywords: allKeywords.join(", "),
    alternates: {
      canonical,
      languages: {
        "x-default": `${BASE_URL}/ar`,
        [locale]: canonical,
        [altLocale]: `${BASE_URL}${altPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: locale === "ar" ? "مؤسسة الفهد للمقاولات" : "Al Fahd Contracting",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
