import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/seo/metadata/page-metadata";
import { breadcrumbSchema } from "@/seo/schema/organization";
import { ProjectsClient } from "./projects-client";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  const isAr = locale === "ar";
  const keywords = isAr
    ? [
        "مشاريع الفهد للمقاولات",
        "مشاريع ألمنيوم الرياض",
        "مشاريع زجاج السعودية",
        "مشاريع هياكل حديدية",
        "محفظة أعمال مقاولات",
        "تنفيذ واجهات زجاجية السعودية",
        "مشاريع مباني تجارية الرياض",
        "مقاولات الرياض منجزات",
      ]
    : [
        "Al Fahd Contracting projects",
        "aluminum projects Riyadh",
        "glass projects Saudi Arabia",
        "steel structure projects",
        "contracting portfolio Riyadh",
        "facade projects Saudi Arabia",
        "commercial building projects Riyadh",
      ];

  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: `/${locale}/projects`,
    locale,
    keywords,
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const breadcrumbs = breadcrumbSchema([
    { name: locale === "ar" ? "الرئيسية" : "Home", url: `${BASE_URL}/${locale}` },
    { name: locale === "ar" ? "مشاريعنا" : "Projects", url: `${BASE_URL}/${locale}/projects` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }}
      />
      <ProjectsClient />
    </>
  );
}
