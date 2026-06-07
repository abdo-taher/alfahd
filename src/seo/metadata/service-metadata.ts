import type { Metadata } from "next";
import { generatePageMetadata } from "./page-metadata";

export function generateServiceMetadata({
  service,
  locale,
  path,
}: {
  service: string;
  locale: string;
  path: string;
}): Metadata {
  const isAr = locale === "ar";
  const companyName = isAr ? "شركة الفهد للمقاولات" : "Al Fahd Contracting";

  const title = `${service} | ${companyName}`;
  const description = isAr
    ? `خدمات ${service} في المملكة العربية السعودية بأعلى جودة وأفضل سعر — ${companyName}`
    : `${service} services across Saudi Arabia with premium quality — ${companyName}`;

  const keywords = isAr
    ? [`${service}`, "مقاولات", "المملكة العربية السعودية", "الرياض", "جدة"]
    : [service, "contracting", "Saudi Arabia", "Riyadh", "Jeddah"];

  return generatePageMetadata({ title, description, path, locale, keywords });
}
