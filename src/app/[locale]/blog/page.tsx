import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { generatePageMetadata } from "@/seo/metadata/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: `/${locale}/blog`,
    locale,
  });
}

// Real blog data from reference app
const blogData = [
  {
    slug: "future-smart-glass-facades",
    titleEN: "The Future of Smart Glass Facades in Megaprojects",
    titleAR: "مستقبل الواجهات الزجاجية الذكية في المشاريع العملاقة",
    excerptEN: "Discover how modern glass technology achieves critical thermal insulation and smart lighting in luxury skyscrapers.",
    excerptAR: "كيف تساهم التقنيات الحديثة في تحسين كفاءة الطاقة وتوفير بيئة عمل استثنائية من خلال زجاج ذكي يتكيف مع الطقس الوعر في المملكة.",
    categoryEN: "Technical Studies",
    categoryAR: "دراسات تقنية",
    badgeEN: "Featured Post",
    badgeAR: "مقال مختار",
    date: "15 May 2026",
    readTimeEN: "5 min read",
    readTimeAR: "٥ دقائق قراءة",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqxz2yV6Txg1Ylp40OjIw39_JzxcPzcHubVUqCSQjZaFpglU6tL2Sx6kaTyk5Ze_kSNZ2-8-Qph3MIpT0MUVfZbWYtNNfVmcG5_iHWcdZCE7WVgEKNtElpUuHYoL2k1_TKn-B2GeOYA0V3NjKpaUZ7IP1CRuiSZGqNao43nsTbs5kYIe9EV9pAkSA9gLIoxMXbmrheG4xLwUgaygPYbeQAx810fqP1wjiUHbK-iCZJInYlaSkpbDipGYqYuLGrrYPLN86cqBebFl6s",
  },
  {
    slug: "riyadh-tower-phase-ii",
    titleEN: "Signing of Phase II for the Riyadh International Tower Facades",
    titleAR: "توقيع عقد المرحلة الثانية لتطوير واجهات برج الرياض الدولي",
    excerptEN: "Al-Fahd Contracting secures the major installation and cladding agreement for Riyadh's prominent landmark.",
    excerptAR: "أعلنت الفهد للمقاولات عن شراكة جديدة وتوقيع اتفاقية توريد وتجهيز أنظمة واجهات متكاملة لأحد كبرى الأبراج الاستثمارية بالرياض.",
    categoryEN: "Company News",
    categoryAR: "مشاريع الشركة",
    date: "10 May 2026",
    readTimeEN: "3 min read",
    readTimeAR: "٣ دقائق قراءة",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC47ms1XX8nur_QJz9udfz200farLOcBgEo2EcD8urd7YkAQoa5ZoVofVAQXzczuWZZQxInqG4msiee86bXeGCebBprae1LJWz7NwukGpZyD40qGsR912J8egmHRuvGw9LTlCuTRWlbndIdTJ3FrPuWGlPpeESCtP06FuNqszpTJBV_qgjzdN59DjjndbUqtnnsav6MpKMgBSKasENXAi6oT38lWxTAWiS16v-SSYwMb_cAa7xChfdhvLgqm9mfLgePujX2zYWFW1oM",
  },
  {
    slug: "thermal-insulation-desert-climates",
    titleEN: "Thermal Insulation Impact on Facade Energy Consumption in Desert Climates",
    titleAR: "تأثير العزل الحراري في الواجهات على استهلاك الطاقة في المناخ الصحراوي",
    excerptEN: "An analytical research on optimizing thermal break profiles for sustainable HVAC load reduction in KSA.",
    excerptAR: "دراسة هندسية تحليلية حول أهمية تكنولوجيا الحواجز الحرارية لتقليل أحمال التكييف وتوفير الطاقة بشكل فعال ومطابق للأكواد الوطنية.",
    categoryEN: "Technical Studies",
    categoryAR: "دراسات تقنية",
    date: "05 May 2026",
    readTimeEN: "8 min read",
    readTimeAR: "٨ دقائق قراءة",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw42ezMjfdpd-lA7_MW4p08Sop1r62HU8fY-tIf_mp0-Y4E1fQ0vkKswn7-ehKYrfYSGGNsB3vWsN8nOpDb5lshtj5VwUeeTKZQ5FWgm08KvRdaErnyqv3fF8E6jgOjc-3k4MAO1I7WZKhee9CgPDdFDbi0UVaGCUs85GuanN5fPu-6a7_C2ogyQXqdO-lie-nGV6yd3sNjsDhJD00m_R4hJ158xpOdcFA4qFElmiXfAJb6xnfRTH2YT5Nxk_9zhue72cSRIYfdJ__",
  },
];

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const isAr = locale === "ar";

  const [featured, ...rest] = blogData;

  return (
    <div className="pt-20" style={{ background: "#FAF9F5" }}>
      {/* Hero */}
      <section className="bg-gray-950 py-20 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.05,
          }}
          aria-hidden="true"
        />
        <div className="container-brand relative z-10">
          <div className="max-w-3xl">
            <span
              className="block mb-4 font-bold uppercase tracking-widest"
              style={{
                color: "#C5A880",
                fontSize: "10px",
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                letterSpacing: "0.1em",
              }}
            >
              {isAr ? "المركز الإعلامي" : "Media Center"}
            </span>
            <h1
              className="font-sans font-extrabold text-white uppercase mb-4"
              style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              {t("title")}
            </h1>
            <p className="text-gray-400 text-base leading-relaxed max-w-xl">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-brand">
          {/* Featured hero card */}
          <div className="mb-16">
            <Link
              href={`/${locale}/blog/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 lg:h-auto overflow-hidden min-h-[280px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.image}
                  alt={isAr ? featured.titleAR : featured.titleEN}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent" aria-hidden="true" />
                <div className="absolute bottom-0 start-0 p-6 z-10">
                  <span
                    className="inline-block px-3 py-1 font-bold uppercase tracking-wider text-gray-950"
                    style={{
                      background: "#C5A880",
                      fontSize: "9px",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {isAr ? (featured.badgeAR ?? featured.categoryAR) : (featured.badgeEN ?? featured.categoryEN)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <span
                  className="font-bold uppercase tracking-widest block mb-4"
                  style={{
                    color: "#C5A880",
                    fontSize: "10px",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: "0.1em",
                  }}
                >
                  {isAr ? "مقال رئيسي" : "Featured Article"}
                </span>
                <h2
                  className="font-sans font-bold text-gray-950 group-hover:text-[#C5A880] transition-colors mb-4 leading-snug"
                  style={{ fontSize: "clamp(20px, 2.5vw, 28px)", lineHeight: 1.3 }}
                >
                  {isAr ? featured.titleAR : featured.titleEN}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6 text-sm">
                  {isAr ? featured.excerptAR : featured.excerptEN}
                </p>
                <div
                  className="flex items-center gap-3 text-gray-400 mb-6"
                  style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <span>{featured.date}</span>
                  <span>•</span>
                  <span>{isAr ? featured.readTimeAR : featured.readTimeEN}</span>
                </div>
                <span className="text-xs font-bold text-gray-950 inline-flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                  {t("readMore")}
                  <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: "14px" }}>
                    {isAr ? "arrow_back" : "arrow_forward"}
                  </span>
                </span>
              </div>
            </Link>
          </div>

          {/* 3-col article grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-500 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={isAr ? post.titleAR : post.titleEN}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-0 start-0 p-4 z-10">
                    <span
                      className="inline-block px-2 py-1 font-bold uppercase tracking-wider text-gray-950"
                      style={{
                        background: "#C5A880",
                        fontSize: "9px",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {isAr ? post.categoryAR : post.categoryEN}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h3
                    className="font-bold text-gray-950 group-hover:text-[#C5A880] transition-colors mb-3 leading-snug"
                    style={{ fontSize: "16px", lineHeight: 1.4 }}
                  >
                    {isAr ? post.titleAR : post.titleEN}
                  </h3>
                  <p className="text-gray-500 leading-relaxed flex-1 mb-4 text-sm line-clamp-3">
                    {isAr ? post.excerptAR : post.excerptEN}
                  </p>
                  <div
                    className="flex items-center gap-3 text-gray-400"
                    style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{isAr ? post.readTimeAR : post.readTimeEN}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-950 py-20 text-center">
        <div className="container-brand">
          <h2
            className="font-sans font-extrabold text-white uppercase mb-4"
            style={{ fontSize: "clamp(22px, 3vw, 36px)", letterSpacing: "-0.01em" }}
          >
            {t("newsletter")}
          </h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto text-sm leading-relaxed">
            {t("newsletterSub")}
          </p>
          <form
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder={isAr ? "بريدك الإلكتروني" : "Your email address"}
              className="flex-1 px-4 py-3 text-sm rounded bg-gray-900 border border-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-600 transition-colors"
            />
            <button
              type="submit"
              className="bg-amber-700 hover:bg-amber-600 text-white px-8 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200"
            >
              {t("subscribe")}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
