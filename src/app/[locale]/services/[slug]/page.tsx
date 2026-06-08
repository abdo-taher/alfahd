import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { contentRepository } from "@/lib/content/content-repository";
import { generateServiceMetadata } from "@/seo/metadata/service-metadata";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/seo/schema/organization";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";

// ── Static params for all service slugs ────────────────────────────────────
export async function generateStaticParams() {
  const slugs = ["aluminum-works", "glass-works", "steel-works"];
  const locales = ["ar", "en"];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

// ── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await contentRepository.getServiceBySlug(slug, locale);
  if (!service) return {};
  return generateServiceMetadata({
    service: service.title,
    locale,
    path: `/${locale}/services/${slug}`,
  });
}

// ── Page ────────────────────────────────────────────────────────────────────
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = await contentRepository.getServiceBySlug(slug, locale);

  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: "services" });

  const svcSchema = serviceSchema({
    name: service.title,
    description: service.description,
    url: `${BASE_URL}/${locale}/services/${slug}`,
  });

  const faqItems = service.faq ?? [];
  const faqSd = faqItems.length > 0 ? faqSchema(faqItems) : null;

  const breadcrumbs = breadcrumbSchema([
    { name: locale === "ar" ? "الرئيسية" : "Home", url: `${BASE_URL}/${locale}` },
    { name: locale === "ar" ? "خدماتنا" : "Services", url: `${BASE_URL}/${locale}/services` },
    { name: service.title, url: `${BASE_URL}/${locale}/services/${slug}` },
  ]);

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(svcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      {faqSd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSd) }} />}

      <div className="pt-20">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden bg-gray-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.image}
            alt={service.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,20,70,0.95) 0%, rgba(0,20,70,0.5) 50%, transparent 100%)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 container-brand pb-16 w-full">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-white/50 mb-6 font-mono" aria-label="breadcrumb">
              <Link href={`/${locale}`} className="hover:text-white transition-colors">
                {locale === "ar" ? "الرئيسية" : "Home"}
              </Link>
              <span aria-hidden="true">/</span>
              <Link href={`/${locale}/services`} className="hover:text-white transition-colors">
                {locale === "ar" ? "خدماتنا" : "Services"}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/80">{service.title}</span>
            </nav>

            <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
              {locale === "ar" ? "تخصصاتنا الهندسية" : "Engineering Specialties"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight max-w-3xl">
              {service.title}
            </h1>
            <p className="mt-4 text-base text-white/70 max-w-2xl leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </section>

        {/* ── Description + Benefits ────────────────────────────── */}
        <section className="section-py bg-[#FAF9F5]">
          <div className="container-brand">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

              {/* Left: full description */}
              <div className="lg:col-span-7">
                <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-4">
                  {locale === "ar" ? "نبذة عن الخدمة" : "About This Service"}
                </span>
                <h2 className="text-2xl font-bold text-[#002868] mb-6">
                  {service.title}
                </h2>
                <p className="text-base text-[#434652] leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Applications */}
                {service.applications && service.applications.length > 0 && (
                  <div>
                    <h3 className="font-mono text-[10px] text-[#747783] uppercase tracking-widest font-bold mb-4">
                      {locale === "ar" ? "التطبيقات والاستخدامات" : "Applications & Uses"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.applications.map((app) => (
                        <div key={app} className="flex items-center gap-3 bg-white border border-gray-100 rounded-lg px-4 py-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" aria-hidden="true" />
                          <span className="text-sm text-[#434652]">{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: benefits card */}
              <div className="lg:col-span-5">
                <div className="bg-[#002868] rounded-2xl p-8 text-white sticky top-28">
                  <h3 className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold mb-6">
                    {locale === "ar" ? "المزايا الرئيسية" : "Key Benefits"}
                  </h3>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 w-5 h-5 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/30 flex items-center justify-center shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" aria-hidden="true" />
                        </span>
                        <span className="text-sm text-white/80 leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA inside card */}
                  <div className="mt-10 pt-8 border-t border-white/10 flex flex-col gap-3">
                    <Link
                      href={`/${locale}/request-quote`}
                      className="flex items-center justify-center bg-[#C5A880] text-[#001947] py-3.5 rounded-lg text-sm font-bold hover:brightness-110 transition-all active:scale-95"
                    >
                      {t("getQuote")}
                    </Link>
                    <a
                      href="https://wa.me/966500000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 border border-white/20 text-white py-3 rounded-lg text-sm font-semibold hover:bg-white/10 transition-all"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Process Steps ─────────────────────────────────────── */}
        {service.process && service.process.length > 0 && (
          <section className="section-py bg-white border-y border-gray-100">
            <div className="container-brand">
              <div className="text-center mb-16">
                <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
                  {locale === "ar" ? "مسار التنفيذ" : "Execution Path"}
                </span>
                <h2 className="text-2xl font-bold text-[#002868]">
                  {locale === "ar" ? "كيف ننفذ مشروعك" : "How We Execute Your Project"}
                </h2>
              </div>

              <div className="relative">
                <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gray-100 z-0" aria-hidden="true" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {service.process.map((step, i) => (
                    <div
                      key={step.step}
                      className="flex flex-col items-center text-center bg-white rounded-lg border border-gray-100 p-8 shadow-sm"
                    >
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold font-mono mb-6 ${
                          i % 2 === 0
                            ? "bg-[#002868] text-white"
                            : "bg-[#C5A880] text-[#001947]"
                        }`}
                      >
                        {step.step < 10 ? `0${step.step}` : step.step}
                      </div>
                      <h3 className="text-base font-bold text-[#002868] mb-3">{step.title}</h3>
                      <p className="text-sm text-[#434652] leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ───────────────────────────────────────────────── */}
        {faqItems.length > 0 && (
          <section className="section-py bg-[#FAF9F5]">
            <div className="container-brand max-w-3xl">
              <div className="text-center mb-16">
                <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
                  {locale === "ar" ? "الأسئلة الشائعة" : "FAQ"}
                </span>
                <h2 className="text-2xl font-bold text-[#002868]">
                  {locale === "ar" ? "أسئلة وأجوبة" : "Frequently Asked Questions"}
                </h2>
              </div>

              <div className="space-y-4">
                {faqItems.map((item, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                    <h3 className="font-bold text-[#002868] mb-3 flex items-start gap-3">
                      <span className="font-mono text-[#C5A880] text-sm shrink-0">
                        {i < 9 ? `0${i + 1}` : i + 1}
                      </span>
                      {item.question}
                    </h3>
                    <p className="text-sm text-[#434652] leading-relaxed ps-8">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Related Projects ──────────────────────────────────── */}
        <RelatedProjects locale={locale} category={slug} />

        {/* ── Final CTA ─────────────────────────────────────────── */}
        <section className="bg-gray-950 text-white py-24 text-center overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
            aria-hidden="true"
          />
          <div className="container-brand relative z-10">
            <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-4">
              {locale === "ar" ? "ابدأ مشروعك" : "Start Your Project"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-4 max-w-2xl mx-auto">
              {locale === "ar" ? "هل أنت جاهز للبدء؟" : "Ready to Get Started?"}
            </h2>
            <p className="text-sm text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed">
              {locale === "ar"
                ? "تواصل مع فريقنا الهندسي للحصول على استشارة مجانية وعرض سعر مفصل"
                : "Contact our engineering team for a free consultation and detailed quote"}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/request-quote`}
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-gray-950 px-10 py-4 text-xs font-bold uppercase tracking-widest transition-all active:scale-95 shadow-lg"
              >
                {t("getQuote")}
              </Link>
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center justify-center border border-white/30 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                {locale === "ar" ? "جميع الخدمات" : "All Services"}
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

// ── Related Projects sub-component ─────────────────────────────────────────
async function RelatedProjects({
  locale,
  category,
}: {
  locale: string;
  category: string;
}) {
  // Map service slug → project category
  const categoryMap: Record<string, string> = {
    "aluminum-works": "aluminum",
    "glass-works": "glass",
    "steel-works": "steel",
  };
  const projectCategory = categoryMap[category] ?? "aluminum";

  let projects = await contentRepository.getProjectsByCategory(projectCategory, locale);

  // Fallback to all projects if none found in category
  if (projects.length === 0) {
    projects = await contentRepository.getFeaturedProjects(locale);
  }

  const shown = projects.slice(0, 3);
  if (shown.length === 0) return null;

  return (
    <section className="section-py bg-white">
      <div className="container-brand">
        <div className="text-center mb-16">
          <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
            {locale === "ar" ? "أعمالنا المنجزة" : "Our Portfolio"}
          </span>
          <h2 className="text-2xl font-bold text-[#002868]">
            {locale === "ar" ? "مشاريع ذات صلة" : "Related Projects"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((project) => (
            <Link
              key={project.id}
              href={`/${locale}/projects/${project.slug}`}
              className="group relative rounded-lg overflow-hidden h-64 bg-gray-900 shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.coverImage}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,20,70,0.9) 0%, transparent 60%)" }}
                aria-hidden="true"
              />
              <div className="absolute bottom-0 start-0 p-5 text-white">
                <p className="font-mono text-[9px] text-[#C5A880] uppercase tracking-widest mb-1">{project.location} • {project.year}</p>
                <h3 className="text-sm font-bold leading-snug group-hover:text-[#C5A880] transition-colors">
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
