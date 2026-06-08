import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/seo/metadata/page-metadata";
import { contentRepository } from "@/lib/content/content-repository";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const isAr = locale === "ar";

  const keywords = isAr
    ? [
        "خدمات شركة الفهد للمقاولات",
        "أعمال الألمنيوم الرياض",
        "أعمال الزجاج الرياض",
        "أعمال الحديد الرياض",
        "واجهات زجاجية السعودية",
        "جدران ستائر الرياض",
        "هياكل معدنية الرياض",
        "مقاول متكامل الرياض",
      ]
    : [
        "Al Fahd Contracting services",
        "aluminum works Riyadh",
        "glass works Riyadh",
        "steel works Saudi Arabia",
        "curtain wall systems Riyadh",
        "glass facades Saudi Arabia",
        "steel structures Riyadh",
        "integrated contractor Saudi Arabia",
      ];

  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: `/${locale}/services`,
    locale,
    keywords,
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const services = await contentRepository.getServices(locale);

  return (
    <div className="pt-20">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="enterprise-gradient py-24 text-white">
        <div className="container-brand">
          <div className="max-w-3xl">
            <div className="gold-bar mb-6" aria-hidden="true" />
            <h1 className="text-display-mobile lg:text-display font-bold text-white mb-6 leading-tight">
              {t("title")}
            </h1>
            <p className="text-body-lg text-primary-fixed-dim leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Services — alternating image + content layout ─────── */}
      <section className="section-py bg-[#FAF9F5] dark:bg-gray-950">
        <div className="container-brand">
          <div className="flex flex-col gap-24">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={service.id}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm group"
                >
                  {/* ── Image ── */}
                  <div
                    className={`relative h-72 lg:h-auto min-h-[420px] overflow-hidden ${
                      isEven ? "lg:order-first" : "lg:order-last"
                    }`}
                  >
                    {/* Real service image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.image}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,40,104,0.75) 0%, rgba(0,40,104,0.2) 40%, transparent 100%)",
                      }}
                      aria-hidden="true"
                    />
                    {/* Service name on image bottom */}
                    <div className="absolute bottom-0 start-0 p-8">
                      <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-1">
                        {index < 10 ? `0${index + 1}` : index + 1}
                      </span>
                      <h3 className="text-2xl font-bold text-white leading-tight">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* ── Content ── */}
                  <div
                    className={`flex flex-col justify-center p-10 lg:p-14 ${
                      isEven ? "lg:order-last" : "lg:order-first"
                    }`}
                  >
                    <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-4">
                      {locale === "ar" ? "الخدمة" : "Service"}
                    </span>

                    <h2 className="text-3xl font-bold text-[#002868] dark:text-white mb-4 leading-snug">
                      {service.title}
                    </h2>

                    <p className="text-body-lg text-[#434652] dark:text-gray-400 leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Benefits list */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                      {service.benefits.slice(0, 6).map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0"
                            aria-hidden="true"
                          />
                          <span className="text-sm text-[#434652] dark:text-gray-400 leading-relaxed">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Applications tags */}
                    {service.applications && service.applications.length > 0 && (
                      <div className="mb-10">
                        <p className="font-mono text-[10px] text-[#747783] uppercase tracking-widest font-bold mb-3">
                          {locale === "ar" ? "التطبيقات" : "Applications"}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.applications.slice(0, 4).map((app) => (
                            <span
                              key={app}
                              className="px-3 py-1 bg-[#f3f3fb] dark:bg-gray-700 border border-[#c4c6d3]/40 dark:border-gray-600 text-[#434652] dark:text-gray-300 text-xs rounded font-medium"
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/${locale}/request-quote`}
                        className="inline-flex items-center justify-center bg-[#C5A880] text-[#001947] px-7 py-3 text-sm font-bold rounded hover:brightness-110 transition-all duration-200 active:scale-95"
                      >
                        {t("getQuote")}
                      </Link>
                      <Link
                        href={`/${locale}/services/${service.slug}`}
                        className="inline-flex items-center gap-2 border border-[#002868] dark:border-blue-300 text-[#002868] dark:text-blue-300 px-7 py-3 text-sm font-bold rounded hover:bg-[#002868]/5 dark:hover:bg-blue-300/10 transition-all duration-200"
                      >
                        {t("learnMore")}
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={`size-4 ${locale === "ar" ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────── */}
      <section className="section-py bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="container-brand">
          <div className="text-center mb-20">
            <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
              {locale === "ar" ? "منهجيتنا" : "Our Process"}
            </span>
            <h2 className="text-3xl font-bold text-[#002868] dark:text-white">
              {locale === "ar" ? "كيف نعمل" : "How We Work"}
            </h2>
            <div className="gold-bar-center mt-6" aria-hidden="true" />
          </div>

          {/* Connecting line */}
          <div className="relative">
            <div
              className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-gray-100 z-0"
              aria-hidden="true"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {[
                {
                  step: "01",
                  bg: "bg-[#002868] text-white",
                  title: locale === "ar" ? "الاستشارة" : "Consultation",
                  desc:
                    locale === "ar"
                      ? "نناقش متطلبات مشروعك ونفهم رؤيتك"
                      : "We discuss your requirements and understand your vision",
                },
                {
                  step: "02",
                  bg: "bg-[#C5A880] text-[#001947]",
                  title: locale === "ar" ? "التصميم" : "Design",
                  desc:
                    locale === "ar"
                      ? "نُعدّ التصاميم الهندسية التنفيذية"
                      : "We prepare engineering execution designs",
                },
                {
                  step: "03",
                  bg: "bg-[#002868] text-white",
                  title: locale === "ar" ? "التنفيذ" : "Execution",
                  desc:
                    locale === "ar"
                      ? "فريق متخصص ينفذ بأعلى معايير الجودة"
                      : "Specialized team executes to highest quality standards",
                },
                {
                  step: "04",
                  bg: "bg-[#C5A880] text-[#001947]",
                  title: locale === "ar" ? "التسليم" : "Handover",
                  desc:
                    locale === "ar"
                      ? "تسليم في الموعد مع ضمانات شاملة"
                      : "On-time delivery with comprehensive warranties",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm"
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold font-mono mb-6 ${item.bg}`}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-base font-bold text-[#002868] dark:text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-[#434652] dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="bg-gray-950 text-white py-24 text-center overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />
        <div className="container-brand relative z-10">
          <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-4">
            {locale === "ar" ? "ابدأ اليوم" : "Get Started"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mb-6 max-w-2xl mx-auto">
            {locale === "ar"
              ? "هل أنت جاهز لبدء مشروعك؟"
              : "Ready to Start Your Project?"}
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            {locale === "ar"
              ? "تواصل معنا للحصول على استشارة مجانية وعرض سعر تفصيلي"
              : "Contact us for a free consultation and detailed quote for your project"}
          </p>
          <Link
            href={`/${locale}/request-quote`}
            className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-gray-950 px-12 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 shadow-lg"
          >
            {locale === "ar" ? "طلب عرض سعر مجاني" : "Request a Free Quote"}
          </Link>
        </div>
      </section>
    </div>
  );
}
