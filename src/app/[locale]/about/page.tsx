import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/seo/metadata/page-metadata";
import { aboutPageSchema, breadcrumbSchema } from "@/seo/schema/organization";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const isAr = locale === "ar";

  const keywords = isAr
    ? [
        "عن مؤسسة الفهد للمقاولات",
        "تاريخ شركة مقاولات الرياض",
        "مقاول ألمنيوم معتمد السعودية",
        "شركة مقاولات ISO الرياض",
        "مهندسو الواجهات الرياض",
        "رسالة الفهد للمقاولات",
        "قيم شركة مقاولات الرياض",
      ]
    : [
        "about Al Fahd Contracting",
        "aluminum contractor company Riyadh",
        "ISO certified contractor Saudi Arabia",
        "facade engineering company Riyadh",
        "contracting company history Saudi Arabia",
      ];

  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: `/${locale}/about`,
    locale,
    keywords,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const aboutSd = aboutPageSchema(locale);
  const breadcrumbs = breadcrumbSchema([
    { name: locale === "ar" ? "الرئيسية" : "Home", url: `${BASE_URL}/${locale}` },
    { name: locale === "ar" ? "من نحن" : "About", url: `${BASE_URL}/${locale}/about` },
  ]);

  const values = [
    {
      title: locale === "ar" ? "الجودة" : "Quality",
      description:
        locale === "ar"
          ? "نلتزم بأعلى معايير الجودة في كل مشروع"
          : "We commit to the highest quality standards in every project",
      icon: "✦",
    },
    {
      title: locale === "ar" ? "الالتزام" : "Commitment",
      description:
        locale === "ar"
          ? "نسلّم مشاريعنا في الموعد المحدد دون تنازلات"
          : "We deliver on time, every time, without compromise",
      icon: "◈",
    },
    {
      title: locale === "ar" ? "الابتكار" : "Innovation",
      description:
        locale === "ar"
          ? "نعتمد أحدث التقنيات والأساليب الهندسية"
          : "We adopt the latest technologies and engineering methods",
      icon: "◆",
    },
    {
      title: locale === "ar" ? "النزاهة" : "Integrity",
      description:
        locale === "ar"
          ? "نبني علاقاتنا على الشفافية والأمانة"
          : "We build our relationships on transparency and trust",
      icon: "◉",
    },
  ];

  const timeline = [
    {
      year: "1999",
      title: locale === "ar" ? "التأسيس" : "Founded",
      desc:
        locale === "ar"
          ? "تأسست مؤسسة الفهد للمقاولات في الرياض عام ١٩٩٩"
          : "Al Fahd Contracting was founded in Riyadh in 1999",
    },
    {
      year: "2012",
      title: locale === "ar" ? "التوسع" : "Expansion",
      desc:
        locale === "ar"
          ? "توسعنا لتشمل عملياتنا جدة والدمام"
          : "Expanded operations to Jeddah and Dammam",
    },
    {
      year: "2016",
      title: locale === "ar" ? "الاعتماد الدولي" : "International Accreditation",
      desc:
        locale === "ar"
          ? "حصلنا على شهادة ISO 9001:2015"
          : "Achieved ISO 9001:2015 certification",
    },
    {
      year: "2020",
      title: locale === "ar" ? "٣٠٠ مشروع" : "300 Projects",
      desc:
        locale === "ar"
          ? "أتممنا مشروعنا الثلاثمئة في المملكة"
          : "Completed our 300th project across the Kingdom",
    },
    {
      year: "2023",
      title: locale === "ar" ? "٥٠٠ مشروع" : "500 Projects",
      desc:
        locale === "ar"
          ? "وصلنا لإنجاز ٥٠٠ مشروع مع ٢٠٠+ عميل راضٍ"
          : "Reached 500 projects with 200+ satisfied clients",
    },
  ];

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }}
      />
    <div className="pt-20">
      {/* Hero */}
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

      {/* Mission & Vision */}
      <section className="section-py bg-surface dark:bg-gray-950">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-surface-container-low dark:bg-gray-800 rounded-lg p-10 border border-outline-variant dark:border-gray-700">
              <div className="w-12 h-12 rounded-lg enterprise-gradient flex items-center justify-center text-white text-xl font-bold mb-6">
                ◎
              </div>
              <h2 className="text-headline-sm text-primary mb-4">{t("mission")}</h2>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">{t("missionText")}</p>
            </div>
            <div className="bg-surface-container-low dark:bg-gray-800 rounded-lg p-10 border border-outline-variant dark:border-gray-700">
              <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xl font-bold mb-6">
                ◈
              </div>
              <h2 className="text-headline-sm text-primary mb-4">{t("vision")}</h2>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">{t("visionText")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-py bg-surface-container-low dark:bg-gray-900">
        <div className="container-brand">
          <div className="text-center mb-20">
            <span className="text-label-bold text-primary uppercase tracking-widest block mb-3">
              {locale === "ar" ? "مسيرتنا" : "Our Journey"}
            </span>
            <h2 className="text-display-mobile lg:text-headline-md text-primary">
              {locale === "ar" ? "تاريخ الشركة" : "Company History"}
            </h2>
            <div className="gold-bar-center mt-6" aria-hidden="true" />
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute start-1/2 top-0 bottom-0 w-px bg-outline-variant -translate-x-1/2 hidden lg:block"
              aria-hidden="true"
            />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "lg:text-end" : "lg:text-start"}`}>
                    <div
                      className={`bg-surface-container-lowest dark:bg-gray-800 rounded-lg p-8 border border-outline-variant dark:border-gray-700 luxury-shadow inline-block w-full`}
                    >
                      <p className="text-label-bold text-gold uppercase tracking-widest mb-2">{item.year}</p>
                      <h3 className="text-headline-sm text-primary mb-2">{item.title}</h3>
                      <p className="text-body-md text-on-surface-variant">{item.desc}</p>
                    </div>
                  </div>
                  {/* Centre dot */}
                  <div className="hidden lg:flex w-4 h-4 rounded-full enterprise-gradient shrink-0 ring-4 ring-surface" aria-hidden="true" />
                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-py bg-surface dark:bg-gray-950">
        <div className="container-brand">
          <div className="text-center mb-20">
            <span className="text-label-bold text-primary uppercase tracking-widest block mb-3">
              {t("values")}
            </span>
            <h2 className="text-display-mobile lg:text-headline-md text-primary dark:text-white">
              {locale === "ar" ? "ما يميّزنا" : "What Defines Us"}
            </h2>
            <div className="gold-bar-center mt-6" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <div
                key={val.title}
                className="group flex flex-col p-8 bg-surface-container-lowest dark:bg-gray-800 rounded-lg border border-outline-variant dark:border-gray-700 luxury-shadow hover:border-primary transition-all duration-300"
              >
                <div className="text-3xl text-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                  {val.icon}
                </div>
                <h3 className="text-headline-sm text-primary mb-3">{val.title}</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="enterprise-gradient py-24">
        <div className="container-brand">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "500+", label: locale === "ar" ? "مشروع منجز" : "Projects Completed" },
              { value: "25+",  label: locale === "ar" ? "سنة خبرة" : "Years Experience" },
              { value: "200+", label: locale === "ar" ? "عميل راضٍ" : "Satisfied Clients" },
              { value: "98%",  label: locale === "ar" ? "نسبة رضا" : "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-display-mobile font-bold text-gold leading-none">{stat.value}</div>
                <div className="text-label-bold text-primary-fixed mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links section */}
      <section className="section-py bg-surface dark:bg-gray-950">
        <div className="container-brand">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link href={`/${locale}/services`} className="group block bg-white border border-gray-100 rounded-xl p-6 hover:border-[#002868] transition-colors text-center">
              <span className="material-symbols-outlined text-[#002868] text-3xl mb-3 block">construction</span>
              <h3 className="font-bold text-[#002868] group-hover:text-[#C5A880] transition-colors">{locale === "ar" ? "خدماتنا" : "Our Services"}</h3>
            </Link>
            <Link href={`/${locale}/projects`} className="group block bg-white border border-gray-100 rounded-xl p-6 hover:border-[#002868] transition-colors text-center">
              <span className="material-symbols-outlined text-[#002868] text-3xl mb-3 block">apartment</span>
              <h3 className="font-bold text-[#002868] group-hover:text-[#C5A880] transition-colors">{locale === "ar" ? "مشاريعنا" : "Our Projects"}</h3>
            </Link>
            <Link href={`/${locale}/request-quote`} className="group block bg-[#002868] rounded-xl p-6 transition-colors text-center">
              <span className="material-symbols-outlined text-[#C5A880] text-3xl mb-3 block">request_quote</span>
              <h3 className="font-bold text-white">{locale === "ar" ? "طلب عرض سعر" : "Request a Quote"}</h3>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
