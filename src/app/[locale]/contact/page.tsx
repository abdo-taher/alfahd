import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/seo/metadata/page-metadata";
import { contactPageSchema, breadcrumbSchema } from "@/seo/schema/organization";
import { ContactClient } from "./contact-client";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";

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
  const { locale } = await params;

  const contactSd = contactPageSchema();
  const breadcrumbs = breadcrumbSchema([
    { name: locale === "ar" ? "الرئيسية" : "Home", url: `${BASE_URL}/${locale}` },
    { name: locale === "ar" ? "تواصل معنا" : "Contact", url: `${BASE_URL}/${locale}/contact` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }}
      />
      <ContactClient />
    </>
  );
}
