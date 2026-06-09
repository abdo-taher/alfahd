import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { contentRepository } from "@/lib/content/content-repository";
import { generateCostMetadata } from "@/seo/metadata/cost-metadata";
import { faqSchema, breadcrumbSchema } from "@/seo/schema/organization";
import type { PricingFactor } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";

export async function generateStaticParams() {
  const slugs = ["aluminum-works-cost", "glass-works-cost", "steel-works-cost", "curtain-wall-cost"];
  return ["ar", "en"].flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = await contentRepository.getCostGuideBySlug(slug, locale);
  if (!guide) return {};
  return generateCostMetadata({
    title: guide.title,
    description: guide.description,
    path: `/${locale}/cost/${slug}`,
    locale,
    keywords: guide.keywords[locale as "ar" | "en"] ?? [],
  });
}

function impactColors(impact: PricingFactor["impact"]) {
  if (impact === "high") return "text-red-600 bg-red-50 border-red-100";
  if (impact === "medium") return "text-yellow-700 bg-yellow-50 border-yellow-100";
  return "text-green-700 bg-green-50 border-green-100";
}

function impactLabel(impact: PricingFactor["impact"], isAr: boolean) {
  if (impact === "high") return isAr ? "تأثير عالٍ" : "High Impact";
  if (impact === "medium") return isAr ? "تأثير متوسط" : "Medium Impact";
  return isAr ? "تأثير منخفض" : "Low Impact";
}

export default async function CostGuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const guide = await contentRepository.getCostGuideBySlug(slug, locale);
  if (!guide) notFound();

  const isAr = locale === "ar";
  const url = `${BASE_URL}/${locale}/cost/${slug}`;

  const faqItems = guide.faq ?? [];
  const faqSd = faqItems.length > 0 ? faqSchema(faqItems) : null;
  const crumbs = breadcrumbSchema([
    { name: isAr ? "الرئيسية" : "Home", url: `${BASE_URL}/${locale}` },
    { name: isAr ? "دليل الأسعار" : "Price Guide", url: `${BASE_URL}/${locale}/cost` },
    { name: guide.title, url },
  ]);

  return (
    <>
      {faqSd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSd).replace(/</g, "\\u003c") }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs).replace(/</g, "\\u003c") }} />

      <div className="pt-20">
        {/* Hero */}
        <section className="bg-[#002868] text-white py-20">
          <div className="container-brand max-w-4xl">
            <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-4">
              {isAr ? "دليل الأسعار 2026" : "Price Guide 2026"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase leading-tight mb-4">{guide.title}</h1>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl">{guide.description}</p>
          </div>
        </section>

        {/* Disclaimer Banner */}
        <div className="bg-[#C5A880] py-4 px-6">
          <div className="container-brand text-center">
            <p className="text-[#001947] font-bold text-sm">
              {isAr
                ? "⚠️ الأسعار تختلف حسب مواصفات المشروع — احصل على عرض سعر مجاني"
                : "⚠️ Prices vary by project specifications — get a free quote"}
            </p>
          </div>
        </div>

        {/* Pricing Factors */}
        <section className="section-py bg-[#FAF9F5]">
          <div className="container-brand">
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
                {isAr ? "محددات التكلفة" : "Cost Determinants"}
              </span>
              <h2 className="text-2xl font-bold text-[#002868]">{isAr ? "العوامل المؤثرة في السعر" : "Factors That Affect Pricing"}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guide.pricingFactors.map((f) => (
                <div key={f.factor} className="bg-white border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-[#002868] text-sm">{f.factor}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${impactColors(f.impact)}`}>
                      {impactLabel(f.impact, isAr)}
                    </span>
                  </div>
                  <p className="text-sm text-[#434652] leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* System Tiers */}
        <section className="section-py bg-white border-y border-gray-100">
          <div className="container-brand">
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
                {isAr ? "مستويات الأنظمة" : "System Tiers"}
              </span>
              <h2 className="text-2xl font-bold text-[#002868]">{isAr ? "مقارنة الأنظمة والتكاليف النسبية" : "System Comparison & Relative Costs"}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {guide.systemTiers.map((tier, i) => (
                <div
                  key={tier.name}
                  className={`rounded-xl p-8 flex flex-col ${i === 1 ? "bg-[#002868] text-white border-2 border-[#C5A880]" : "bg-[#FAF9F5] border border-gray-100"}`}
                >
                  <h3 className={`font-bold text-lg mb-3 ${i === 1 ? "text-white" : "text-[#002868]"}`}>{tier.name}</h3>
                  <p className={`text-sm leading-relaxed mb-6 flex-1 ${i === 1 ? "text-white/80" : "text-[#434652]"}`}>{tier.description}</p>
                  <div className={`text-xs font-bold px-4 py-2 rounded-lg text-center ${i === 1 ? "bg-[#C5A880] text-[#001947]" : "bg-gray-100 text-[#434652]"}`}>
                    {tier.relativeRange}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Get Best Price */}
        <section className="section-py bg-[#FAF9F5]">
          <div className="container-brand max-w-3xl">
            <div className="text-center mb-12">
              <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
                {isAr ? "نصائح عملية" : "Practical Tips"}
              </span>
              <h2 className="text-2xl font-bold text-[#002868]">{isAr ? "كيف تحصل على أفضل سعر" : "How to Get the Best Price"}</h2>
            </div>
            <ol className="space-y-4">
              {guide.howToGetBestPrice.map((tip, i) => (
                <li key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-lg p-5">
                  <span className="w-8 h-8 rounded-full bg-[#002868] flex items-center justify-center text-white font-bold font-mono text-sm shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-[#434652] text-sm leading-relaxed">{tip}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        {faqItems.length > 0 && (
          <section className="section-py bg-white">
            <div className="container-brand max-w-3xl">
              <div className="text-center mb-16">
                <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
                  {isAr ? "الأسئلة الشائعة" : "FAQ"}
                </span>
                <h2 className="text-2xl font-bold text-[#002868]">{isAr ? "أسئلة وأجوبة" : "Frequently Asked Questions"}</h2>
              </div>
              <div className="space-y-4">
                {faqItems.map((item, i) => (
                  <div key={i} className="bg-[#FAF9F5] border border-gray-100 rounded-lg p-6">
                    <h3 className="font-bold text-[#002868] mb-3 flex items-start gap-3">
                      <span className="font-mono text-[#C5A880] text-sm shrink-0">{i < 9 ? `0${i + 1}` : i + 1}</span>
                      {item.question}
                    </h3>
                    <p className="text-sm text-[#434652] leading-relaxed ps-8">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-gray-950 text-white py-16 text-center">
          <div className="container-brand">
            <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-4">
              {isAr ? "احصل على عرض سعر دقيق ومجاني" : "Get an Accurate Free Quote"}
            </h2>
            <p className="text-sm text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
              {isAr
                ? "أرسل مواصفاتك وسنرد خلال 48 ساعة بعرض سعر مفصل"
                : "Send us your specifications and we'll respond within 48 hours with a detailed quote"}
            </p>
            <Link
              href={`/${locale}/request-quote`}
              className="inline-flex items-center justify-center bg-white text-gray-950 px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              {isAr ? "طلب عرض سعر مجاني" : "Request a Free Quote"}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
