import type { Metadata } from "next";
import { generatePageMetadata } from "./page-metadata";

export function generateCaseStudyMetadata({
  title,
  description,
  path,
  locale,
  keywords,
  ogImage,
}: {
  title: string;
  description: string;
  path: string;
  locale: string;
  keywords: string[];
  ogImage?: string;
}): Metadata {
  const company = locale === "ar" ? "مؤسسة الفهد للمقاولات" : "Al Fahd Contracting";
  return generatePageMetadata({
    title: `${title} | ${company}`,
    description,
    path,
    locale,
    keywords,
    ogImage,
  });
}
