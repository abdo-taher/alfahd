import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/seo/metadata/page-metadata";
import { QuoteClient } from "./quote-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quote" });

  const isAr = locale === "ar";
  const keywords = isAr
    ? [
        "طلب عرض سعر مقاولات الرياض",
        "عرض سعر أعمال ألمنيوم",
        "عرض سعر أعمال زجاج",
        "عرض سعر أعمال حديد",
        "طلب عرض سعر واجهات",
        "أسعار مقاول ألمنيوم الرياض",
        "أسعار أعمال الزجاج الرياض",
        "أسعار هياكل حديدية",
        "استشارة مجانية مقاولات",
      ]
    : [
        "request quote aluminum contractor Riyadh",
        "aluminum works quotation Saudi Arabia",
        "glass works quote Riyadh",
        "steel works price Saudi Arabia",
        "free consultation contracting Riyadh",
        "aluminum facade price Riyadh",
        "curtain wall quote Saudi Arabia",
      ];

  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: `/${locale}/request-quote`,
    locale,
    keywords,
  });
}

export default async function RequestQuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <QuoteClient />;
}
