import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";

// Reference blog posts with real images from data.ts
const blogPosts = [
  {
    slug: "future-smart-glass-facades",
    categoryAR: "دراسات تقنية",
    categoryEN: "Technical Studies",
    titleAR: "مستقبل الواجهات الزجاجية الذكية في المشاريع العملاقة",
    titleEN: "The Future of Smart Glass Facades in Megaprojects",
    excerptAR: "كيف تساهم التقنيات الحديثة في تحسين كفاءة الطاقة وتوفير بيئة عمل استثنائية من خلال زجاج ذكي.",
    excerptEN: "Discover how modern glass technology achieves critical thermal insulation and smart lighting in luxury skyscrapers.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCqxz2yV6Txg1Ylp40OjIw39_JzxcPzcHubVUqCSQjZaFpglU6tL2Sx6kaTyk5Ze_kSNZ2-8-Qph3MIpT0MUVfZbWYtNNfVmcG5_iHWcdZCE7WVgEKNtElpUuHYoL2k1_TKn-B2GeOYA0V3NjKpaUZ7IP1CRuiSZGqNao43nsTbs5kYIe9EV9pAkSA9gLIoxMXbmrheG4xLwUgaygPYbeQAx810fqP1wjiUHbK-iCZJInYlaSkpbDipGYqYuLGrrYPLN86cqBebFl6s",
    date: "May 15, 2026",
  },
  {
    slug: "riyadh-tower-phase-ii",
    categoryAR: "مشاريع الشركة",
    categoryEN: "Company News",
    titleAR: "توقيع عقد المرحلة الثانية لتطوير واجهات برج الرياض الدولي",
    titleEN: "Signing of Phase II for the Riyadh International Tower Facades",
    excerptAR: "أعلنت الفهد للمقاولات عن توقيع اتفاقية توريد وتجهيز أنظمة واجهات متكاملة لأحد كبرى الأبراج.",
    excerptEN: "Al-Fahd Contracting secures the major installation and cladding agreement for Riyadh's prominent landmark.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC47ms1XX8nur_QJz9udfz200farLOcBgEo2EcD8urd7YkAQoa5ZoVofVAQXzczuWZZQxInqG4msiee86bXeGCebBprae1LJWz7NwukGpZyD40qGsR912J8egmHRuvGw9LTlCuTRWlbndIdTJ3FrPuWGlPpeESCtP06FuNqszpTJBV_qgjzdN59DjjndbUqtnnsav6MpKMgBSKasENXAi6oT38lWxTAWiS16v-SSYwMb_cAa7xChfdhvLgqm9mfLgePujX2zYWFW1oM",
    date: "May 10, 2026",
  },
  {
    slug: "thermal-insulation-desert-climates",
    categoryAR: "دراسات تقنية",
    categoryEN: "Technical Studies",
    titleAR: "تأثير العزل الحراري في الواجهات على استهلاك الطاقة في المناخ الصحراوي",
    titleEN: "Thermal Insulation Impact on Facade Energy Consumption in Desert Climates",
    excerptAR: "دراسة هندسية تحليلية حول أهمية تكنولوجيا الحواجز الحرارية لتقليل أحمال التكييف.",
    excerptEN: "An analytical research on optimizing thermal break profiles for sustainable HVAC load reduction in KSA.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAw42ezMjfdpd-lA7_MW4p08Sop1r62HU8fY-tIf_mp0-Y4E1fQ0vkKswn7-ehKYrfYSGGNsB3vWsN8nOpDb5lshtj5VwUeeTKZQ5FWgm08KvRdaErnyqv3fF8E6jgOjc-3k4MAO1I7WZKhee9CgPDdFDbi0UVaGCUs85GuanN5fPu-6a7_C2ogyQXqdO-lie-nGV6yd3sNjsDhJD00m_R4hJ158xpOdcFA4qFElmiXfAJb6xnfRTH2YT5Nxk_9zhue72cSRIYfdJ__",
    date: "May 5, 2026",
  },
];

export async function Testimonials() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <section className="section-padding bg-white" aria-labelledby="media-heading">
      <div className="container-brand">
        {/* Header row */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span
              className="font-bold uppercase tracking-widest text-sm mb-4 block"
              style={{
                color: "#C5A880",
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: "10px",
                letterSpacing: "0.1em",
              }}
            >
              {t("mediaCenter")}
            </span>
            <h2
              id="media-heading"
              className="text-gray-950"
              style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: "1.2", fontWeight: 700 }}
            >
              {t("latestNews")}
            </h2>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-gray-950 font-bold text-xs uppercase tracking-wider border border-gray-950 px-6 py-3 hover:bg-gray-950 hover:text-white transition-all duration-200 shrink-0"
          >
            {t("viewAll")}
          </Link>
        </div>

        {/* 3-col article grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group">
              {/* Image — rounded-lg h-64 */}
              <div className="rounded-lg overflow-hidden mb-6 h-64">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={locale === "ar" ? post.titleAR : post.titleEN}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Category — gold mono */}
              <span
                className="font-bold uppercase tracking-widest block mb-2"
                style={{
                  color: "#C5A880",
                  fontSize: "10px",
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  letterSpacing: "0.1em",
                }}
              >
                {locale === "ar" ? post.categoryAR : post.categoryEN}
              </span>

              {/* Title — gold on hover */}
              <h3
                className="font-bold text-gray-900 mt-1 mb-3 group-hover:text-[#C5A880] transition-colors leading-snug"
                style={{ fontSize: "18px", lineHeight: "1.4" }}
              >
                {locale === "ar" ? post.titleAR : post.titleEN}
              </h3>

              {/* Excerpt */}
              <p
                className="text-gray-500 line-clamp-2 mb-4"
                style={{ fontSize: "14px", lineHeight: "1.7" }}
              >
                {locale === "ar" ? post.excerptAR : post.excerptEN}
              </p>

              {/* Date + Read more */}
              <div className="flex items-center justify-between">
                <span
                  className="text-gray-400"
                  style={{
                    fontSize: "10px",
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  }}
                >
                  {post.date}
                </span>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="text-xs font-bold text-gray-950 hover:text-[#C5A880] transition-colors flex items-center gap-1 group-hover:gap-2"
                >
                  {t("readMore")}
                  <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: "14px" }}>
                    {locale === "ar" ? "arrow_back" : "arrow_forward"}
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
