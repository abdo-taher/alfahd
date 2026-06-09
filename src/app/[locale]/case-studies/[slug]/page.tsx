import type { Metadata } from "next";
import Link from "next/link";
import { ImageWithSkeleton } from "@/shared/components/ui/image-with-skeleton";
import { notFound } from "next/navigation";
import { contentRepository } from "@/lib/content/content-repository";
import { generateCaseStudyMetadata } from "@/seo/metadata/case-study-metadata";
import { articleSchema, breadcrumbSchema } from "@/seo/schema/organization";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";

export async function generateStaticParams() {
  const slugs = [
    "king-salman-tower-glass",
    "neom-steel-structures",
    "red-sea-pavilion-sustainable",
    "rolls-royce-showroom-glass",
  ];
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
  const study = await contentRepository.getCaseStudyBySlug(slug, locale);
  if (!study) return {};
  return generateCaseStudyMetadata({
    title: study.title,
    description: study.scope,
    path: `/${locale}/case-studies/${slug}`,
    locale,
    keywords: study.keywords[locale as "ar" | "en"] ?? [],
    ogImage: study.coverImage,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const study = await contentRepository.getCaseStudyBySlug(slug, locale);
  if (!study) notFound();

  const isAr = locale === "ar";
  const url = `${BASE_URL}/${locale}/case-studies/${slug}`;

  const articleSd = articleSchema({
    title: study.title,
    description: study.scope,
    url,
    publishedAt: `${study.year}-01-01`,
    image: study.coverImage,
  });

  const crumbs = breadcrumbSchema([
    { name: isAr ? "الرئيسية" : "Home", url: `${BASE_URL}/${locale}` },
    { name: isAr ? "دراسات الحالة" : "Case Studies", url: `${BASE_URL}/${locale}/case-studies` },
    { name: study.title, url },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...articleSd, articleSection: "Case Study" }).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs).replace(/</g, "\\u003c") }} />

      <div className="pt-20">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[440px] flex items-end overflow-hidden bg-gray-950">
          <ImageWithSkeleton
            src={study.coverImage}
            alt={study.title}
            fill
            className="object-cover opacity-45"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,20,70,0.95) 0%,rgba(0,20,70,0.5) 60%,transparent 100%)" }} aria-hidden="true" />
          <div className="relative z-10 container-brand pb-14 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/50 mb-6 font-mono" aria-label="breadcrumb">
              <Link href={`/${locale}`} className="hover:text-white transition-colors">{isAr ? "الرئيسية" : "Home"}</Link>
              <span aria-hidden="true">/</span>
              <Link href={`/${locale}/case-studies`} className="hover:text-white transition-colors">{isAr ? "دراسات الحالة" : "Case Studies"}</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/80 line-clamp-1">{study.title}</span>
            </nav>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#C5A880] text-[#001947] text-xs font-bold uppercase tracking-widest rounded">
                {isAr ? "دراسة حالة" : "Case Study"}
              </span>
              <span className="text-white/50 text-xs font-mono">{study.year}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">{study.title}</h1>
            <p className="mt-4 text-sm text-white/60 font-mono">{study.client} — {study.location}</p>
          </div>
        </section>

        {/* Project Overview */}
        <section className="section-py bg-[#FAF9F5]">
          <div className="container-brand">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { label: isAr ? "النطاق" : "Scope", value: study.scope },
                { label: isAr ? "العميل" : "Client", value: study.client },
                { label: isAr ? "الموقع" : "Location", value: study.location },
                { label: isAr ? "السنة" : "Year", value: String(study.year) },
              ].map((item) => (
                <div key={item.label} className="bg-white border border-gray-100 rounded-lg p-5">
                  <p className="font-mono text-[10px] text-[#747783] uppercase tracking-widest mb-2">{item.label}</p>
                  <p className="font-bold text-[#002868] text-sm leading-snug">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Challenge */}
              <div>
                <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-4">
                  {isAr ? "التحدي" : "The Challenge"}
                </span>
                <blockquote className="border-s-4 border-[#C5A880] ps-6">
                  <p className="text-[#434652] leading-relaxed text-base">{study.challenge}</p>
                </blockquote>
              </div>
              {/* Solution */}
              <div>
                <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-4">
                  {isAr ? "الحل" : "The Solution"}
                </span>
                <p className="text-[#434652] leading-relaxed text-base">{study.solution}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Results & Metrics */}
        <section className="section-py bg-[#002868]">
          <div className="container-brand">
            <div className="text-center mb-12">
              <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
                {isAr ? "النتائج والمقاييس" : "Results & Metrics"}
              </span>
              <h2 className="text-2xl font-bold text-white">{isAr ? "النتائج المحققة" : "Achieved Outcomes"}</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {study.results.map((r) => (
                <div key={r.metric} className="bg-white/10 border border-white/10 rounded-lg p-6 text-center">
                  <div className="text-2xl font-extrabold text-[#C5A880] font-mono mb-2">{r.value}</div>
                  <div className="text-xs text-white/60 uppercase tracking-widest">{r.metric}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Testimonial */}
        {study.testimonial && (
          <section className="section-py bg-white border-y border-gray-100">
            <div className="container-brand max-w-3xl">
              <blockquote className="text-center">
                <span className="text-5xl text-[#C5A880] font-serif leading-none" aria-hidden="true">"</span>
                <p className="text-xl font-bold text-[#002868] leading-relaxed mt-2 mb-6">
                  {study.testimonial.quote}
                </p>
                <footer>
                  <p className="font-bold text-[#434652] text-sm">{study.testimonial.author}</p>
                  <p className="text-[#747783] text-xs mt-1">{study.testimonial.role}</p>
                </footer>
              </blockquote>
            </div>
          </section>
        )}

        {/* Technologies */}
        {study.technologies.length > 0 && (
          <section className="section-py bg-[#FAF9F5]">
            <div className="container-brand max-w-3xl">
              <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-6">
                {isAr ? "التقنيات المستخدمة" : "Technologies Used"}
              </span>
              <div className="flex flex-wrap gap-3">
                {study.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-[#434652] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Gallery */}
        {study.gallery.length > 1 ? (
          <section className="section-py bg-white">
            <div className="container-brand">
              <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-8">
                {isAr ? "معرض الصور" : "Gallery"}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {study.gallery.map((img, i) => (
                  <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <ImageWithSkeleton
                      src={img}
                      alt={`${study.title} — ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width:768px) 100vw,(max-width:1280px) 50vw,33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="section-py bg-white">
            <div className="container-brand">
              <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden bg-gray-100">
                <ImageWithSkeleton
                  src={study.coverImage}
                  alt={study.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:1280px) 100vw,1024px"
                />
              </div>
            </div>
          </section>
        )}

        {/* Related Service + CTA */}
        <section className="bg-gray-950 text-white py-16">
          <div className="container-brand flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{isAr ? "الخدمة ذات الصلة" : "Related Service"}</p>
              <Link
                href={`/${locale}/services/${study.relatedServiceSlug}`}
                className="text-[#C5A880] font-bold hover:brightness-110 transition-all text-sm"
              >
                {isAr ? "← عرض الخدمة" : "View Service →"}
              </Link>
            </div>
            <Link
              href={`/${locale}/request-quote`}
              className="inline-flex items-center gap-3 bg-white text-gray-950 px-8 py-3 font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              {isAr ? "ابدأ مشروعاً مشابهاً" : "Start a Similar Project"}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
