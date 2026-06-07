import type { Metadata } from "next";
import { generatePageMetadata } from "./page-metadata";

export function generateProjectMetadata({
  name,
  location,
  path,
  locale,
  ogImage,
}: {
  name: string;
  location: string;
  path: string;
  locale: string;
  ogImage?: string;
}): Metadata {
  const isAr = locale === "ar";
  const companyName = isAr ? "شركة الفهد للمقاولات" : "Al Fahd Contracting";

  const title = isAr
    ? `${name} — ${location} | ${companyName}`
    : `${name} — ${location} | ${companyName}`;

  const description = isAr
    ? `تفاصيل مشروع ${name} في ${location} — ${companyName}`
    : `Project details for ${name} in ${location} — ${companyName}`;

  return generatePageMetadata({ title, description, path, locale, ogImage });
}
