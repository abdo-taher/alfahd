import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/seo/metadata/page-metadata";
import { ContactClient } from "./contact-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  const isAr = locale === "ar";
  const keywords = isAr
    ? [
        "تواصل مع مؤسسة الفهد للمقاولات",
        "رقم شركة ألمنيوم بالرياض",
        "عنوان شركة مقاولات الرياض",
        "بريد شركة الفهد",
        "اتصل بمقاول ألمنيوم الرياض",
        "واتساب مقاول الرياض",
      ]
    : [
        "contact Al Fahd Contracting",
        "aluminum contractor phone Riyadh",
        "contracting company address Riyadh",
        "reach glass contractor Saudi Arabia",
        "WhatsApp contractor Riyadh",
      ];

  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: `/${locale}/contact`,
    locale,
    keywords,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // params consumed to satisfy Next.js server component conventions;
  // the client component reads locale via next-intl's useLocale()
  await params;
  return <ContactClient />;
}
