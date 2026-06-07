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
  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: `/${locale}/services`,
    locale,
  });
}

const serviceIconPaths: Record<string, React.ReactNode> = {
  "aluminum-works": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-10" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm0 9.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 018.25 20.25H6A2.25 2.25 0 013.75 18v-2.25zm9.75-9.75A2.25 2.25 0 0115.75 3.75H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zm0 9.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  "glass-works": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-10" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  ),
  "steel-works": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-10" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
};

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

      {/* Services Grid */}
      <section className="section-py bg-surface">
        <div className="container-brand">
          <div className="grid grid-cols-1 gap-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Image placeholder */}
                <div
                  className={`relative h-80 lg:h-[480px] rounded-lg overflow-hidden enterprise-gradient ${
                    index % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-gold/30">
                    <div className="text-gold">
                      {serviceIconPaths[service.slug]}
                    </div>
                  </div>
                  <div className="absolute inset-0 card-image-gradient" aria-hidden="true" />
                  <div className="absolute bottom-0 start-0 p-8">
                    <h3 className="text-headline-sm text-white font-semibold">{service.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div className="text-gold mb-6">{serviceIconPaths[service.slug]}</div>
                  <h2 className="text-display-mobile lg:text-headline-md text-primary mb-4">
                    {service.title}
                  </h2>
                  <p className="text-body-lg text-on-surface-variant leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.benefits.slice(0, 4).map((benefit) => (
                      <div key={benefit} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                        <span className="text-body-md text-on-surface-variant">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/${locale}/request-quote`}
                      className="inline-flex items-center justify-center bg-primary text-on-primary px-8 py-3 text-label-bold rounded hover:bg-primary-container transition-all duration-200"
                    >
                      {t("getQuote")}
                    </Link>
                    <Link
                      href={`/${locale}/services/${service.slug}`}
                      className="inline-flex items-center justify-center border border-primary text-primary px-8 py-3 text-label-bold rounded hover:bg-primary/5 transition-all duration-200"
                    >
                      {t("learnMore")}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-py bg-surface-container-low">
        <div className="container-brand">
          <div className="text-center mb-20">
            <span className="text-label-bold text-primary uppercase tracking-widest block mb-3">
              {locale === "ar" ? "منهجيتنا" : "Our Process"}
            </span>
            <h2 className="text-display-mobile lg:text-headline-md text-primary">
              {locale === "ar" ? "كيف نعمل" : "How We Work"}
            </h2>
            <div className="gold-bar-center mt-6" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: locale === "ar" ? "الاستشارة" : "Consultation",
                desc: locale === "ar" ? "نناقش متطلبات مشروعك ونفهم رؤيتك" : "We discuss your requirements and understand your vision",
              },
              {
                step: "02",
                title: locale === "ar" ? "التصميم" : "Design",
                desc: locale === "ar" ? "نُعدّ التصاميم الهندسية التنفيذية" : "We prepare engineering execution designs",
              },
              {
                step: "03",
                title: locale === "ar" ? "التنفيذ" : "Execution",
                desc: locale === "ar" ? "فريق متخصص ينفذ بأعلى معايير الجودة" : "Specialized team executes to highest quality standards",
              },
              {
                step: "04",
                title: locale === "ar" ? "التسليم" : "Handover",
                desc: locale === "ar" ? "تسليم في الموعد مع ضمانات شاملة" : "On-time delivery with comprehensive warranties",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-surface-container-lowest rounded-lg p-8 border border-outline-variant luxury-shadow text-center group hover:border-primary transition-colors duration-300"
              >
                <div className="text-4xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors mb-4">
                  {item.step}
                </div>
                <h3 className="text-headline-sm text-primary mb-3">{item.title}</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="enterprise-gradient py-24 text-center">
        <div className="container-brand">
          <h2 className="text-display-mobile lg:text-headline-md text-white mb-6">
            {locale === "ar" ? "هل أنت جاهز لبدء مشروعك؟" : "Ready to Start Your Project?"}
          </h2>
          <p className="text-body-lg text-primary-fixed mb-10 max-w-xl mx-auto">
            {locale === "ar"
              ? "تواصل معنا للحصول على استشارة مجانية وعرض سعر تفصيلي"
              : "Contact us for a free consultation and detailed quote"}
          </p>
          <Link
            href={`/${locale}/request-quote`}
            className="inline-flex items-center justify-center bg-gold text-on-primary-fixed px-12 py-4 text-label-bold rounded hover:brightness-110 transition-all duration-300"
          >
            {locale === "ar" ? "طلب عرض سعر مجاني" : "Request a Free Quote"}
          </Link>
        </div>
      </section>
    </div>
  );
}
