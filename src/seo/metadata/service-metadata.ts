import type { Metadata } from "next";
import { generatePageMetadata } from "./page-metadata";

// ── Enterprise keyword maps per service slug ────────────────────────────────

const SERVICE_KEYWORDS_AR: Record<string, string[]> = {
  "aluminum-works": [
    "أعمال الألمنيوم الرياض",
    "مقاول ألمنيوم الرياض",
    "شركة ألمنيوم بالرياض",
    "تركيب ألمنيوم الرياض",
    "أبواب ألمنيوم",
    "شبابيك ألمنيوم",
    "واجهات ألمنيوم",
    "ستائر زجاجية ألمنيوم",
    "أنظمة الألمنيوم المعمارية",
    "تركيب شبابيك ألمنيوم بالرياض",
    "مقاول واجهات ألمنيوم بالرياض",
    "تنفيذ واجهات ألمنيوم للمباني التجارية",
    "أسعار أعمال الألمنيوم",
    "طلب عرض سعر ألمنيوم",
    "أفضل مقاول ألمنيوم بالرياض",
  ],
  "glass-works": [
    "أعمال الزجاج الرياض",
    "شركة زجاج بالرياض",
    "مقاول زجاج الرياض",
    "تركيب زجاج واجهات",
    "واجهات زجاجية بالرياض",
    "زجاج سيكوريت",
    "زجاج مصفح",
    "قواطع زجاجية",
    "زجاج حمامات",
    "تركيب زجاج سيكوريت بالرياض",
    "تنفيذ واجهات زجاجية للمباني التجارية",
    "أسعار الزجاج بالرياض",
    "طلب عرض سعر زجاج",
    "أفضل شركة زجاج بالرياض",
  ],
  "steel-works": [
    "أعمال الحديد الرياض",
    "مقاول حديد بالرياض",
    "هياكل حديدية",
    "تصنيع وتركيب الحديد",
    "شركة حديد إنشائي",
    "الهياكل الحديدية",
    "المنشآت المعدنية",
    "مستودعات حديدية",
    "مظلات حديدية",
    "أعمال معدنية",
    "تنفيذ الهياكل الحديدية بالرياض",
    "شركة إنشاء مستودعات حديدية",
    "طلب عرض سعر حديد",
    "مقاول حديد معتمد",
    "شركة هياكل حديدية",
  ],
};

const SERVICE_KEYWORDS_EN: Record<string, string[]> = {
  "aluminum-works": [
    "aluminum works Riyadh",
    "aluminum contractor Riyadh",
    "aluminum fabrication Saudi Arabia",
    "aluminum installation Riyadh",
    "aluminum company Riyadh",
    "aluminum doors",
    "aluminum windows",
    "curtain wall systems",
    "aluminum facades",
    "architectural aluminum",
    "aluminum windows installation in Riyadh",
    "custom aluminum facade contractor Riyadh",
    "aluminum curtain wall systems Saudi Arabia",
    "best aluminum contractor Riyadh",
    "aluminum quotation Riyadh",
    "commercial aluminum works contractor",
  ],
  "glass-works": [
    "glass contractor Riyadh",
    "glass works Riyadh",
    "glass installation company",
    "architectural glass Saudi Arabia",
    "glass facade contractor",
    "tempered glass",
    "laminated glass",
    "office partitions",
    "glass facades",
    "glass facade contractor Riyadh",
    "tempered glass installation Riyadh",
    "commercial glass solutions Saudi Arabia",
    "glass quotation Riyadh",
    "best glass company Riyadh",
  ],
  "steel-works": [
    "steel contractor Riyadh",
    "structural steel works",
    "steel fabrication Riyadh",
    "steel installation Saudi Arabia",
    "steel structures contractor",
    "metal fabrication",
    "industrial steel works",
    "steel warehouses",
    "steel canopies",
    "structural steel contractor Riyadh",
    "steel warehouse construction Saudi Arabia",
    "industrial steel fabrication Riyadh",
    "steel fabrication quote Riyadh",
    "structural steel company",
  ],
};

export function generateServiceMetadata({
  service,
  slug,
  locale,
  path,
}: {
  service: string;
  slug: string;
  locale: string;
  path: string;
}): Metadata {
  const isAr = locale === "ar";
  const companyName = isAr ? "شركة الفهد للمقاولات" : "Al Fahd Contracting";

  const title = isAr
    ? `${service} في الرياض | ${companyName}`
    : `${service} in Riyadh | ${companyName}`;

  const description = isAr
    ? `${service} — تنفيذ احترافي في الرياض والمملكة العربية السعودية. خبرة 15+ عاماً، جودة معتمدة، وعروض أسعار مجانية. ${companyName}`
    : `${service} in Riyadh & Saudi Arabia — professional execution, 15+ years experience, certified quality, free quotes. ${companyName}`;

  const keywordMap = isAr ? SERVICE_KEYWORDS_AR : SERVICE_KEYWORDS_EN;
  const keywords = keywordMap[slug] ?? [service, isAr ? "مقاولات الرياض" : "contracting Riyadh"];

  return generatePageMetadata({ title, description, path, locale, keywords });
}
