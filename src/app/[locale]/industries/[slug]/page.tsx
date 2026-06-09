import type { Metadata } from "next";
import Link from "next/link";
import { ImageWithSkeleton } from "@/shared/components/ui/image-with-skeleton";
import { notFound } from "next/navigation";
import { contentRepository } from "@/lib/content/content-repository";
import { generateIndustryMetadata } from "@/seo/metadata/industry-metadata";
import { industryPageSchema, faqSchema, breadcrumbSchema } from "@/seo/schema/organization";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";

export async function generateStaticParams() {
  const slugs = ["commercial", "residential", "government", "industrial", "hospitality", "healthcare"];
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
  const industry = await contentRepository.getIndustryBySlug(slug, locale);
  if (!industry) return {};
  return generateIndustryMetadata({
    title: industry.title,
    description: industry.description,
    path: `/${locale}/industries/${slug}`,
    locale,
    keywords: industry.keywords[locale as "ar" | "en"] ?? [],
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const industry = await contentRepository.getIndustryBySlug(slug, locale);
  if (!industry) notFound();

  const isAr = locale === "ar";
  const url = `${BASE_URL}/${locale}/industries/${slug}`;

  const industrySd = industryPageSchema(industry.title, url, industry.description);
  const faqItems = industry.faq ?? [];
  const faqSd = faqItems.length > 0 ? faqSchema(faqItems) : null;
  const crumbs = breadcrumbSchema([
    { name: isAr ? "الرئيسية" : "Home", url: `${BASE_URL}/${locale}` },
    { name: isAr ? "القطاعات" : "Industries", url: `${BASE_URL}/${locale}/industries` },
    { name: industry.title, url },
  ]);

  // Fetch related projects by IDs
  const allProjects = await contentRepository.getProjects(locale);
  const relatedProjects = allProjects.filter((p) =>
    industry.relatedProjectIds.includes(p.slug)
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(industrySd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs).replace(/</g, "\\u003c") }} />
      {faqSd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSd).replace(/</g, "\\u003c") }} />}

      <div className="pt-20">
        {/* Hero */}
        <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden bg-gray-950">
          <ImageWithSkeleton
            src={industry.heroImage}
            alt={industry.title}
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,20,70,0.95) 0%,rgba(0,20,70,0.5) 60%,transparent 100%)" }} aria-hidden="true" />
          <div className="relative z-10 container-brand pb-14 w-full">
            <nav className="flex items-center gap-2 text-xs text-white/50 mb-6 font-mono" aria-label="breadcrumb">
              <Link href={`/${locale}`} className="hover:text-white transition-colors">{isAr ? "الرئيسية" : "Home"}</Link>
              <span aria-hidden="true">/</span>
              <Link href={`/${locale}/industries`} className="hover:text-white transition-colors">{isAr ? "القطاعات" : "Industries"}</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/80">{industry.title}</span>
            </nav>
            <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
              {isAr ? "خبرتنا في القطاعات" : "Sector Expertise"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight max-w-3xl">
              {industry.title}
            </h1>
            <p className="mt-4 text-base text-white/70 max-w-2xl leading-relaxed">{industry.shortDescription}</p>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-[#002868] py-10">
          <div className="container-brand">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {industry.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-extrabold text-white font-mono">{stat.value}</div>
                  <div className="text-xs text-white/60 mt-2 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="section-py bg-[#FAF9F5]">
          <div className="container-brand max-w-4xl">
            <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-4">
              {isAr ? "نبذة عن القطاع" : "About the Sector"}
            </span>
            <h2 className="text-2xl font-bold text-[#002868] mb-6">{industry.title}</h2>
            <p className="text-base text-[#434652] leading-relaxed">{industry.description}</p>
          </div>
        </section>

        {/* Services We Provide */}
        <section className="section-py bg-white border-y border-gray-100">
          <div className="container-brand">
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
                {isAr ? "خدماتنا في هذا القطاع" : "Our Services in This Sector"}
              </span>
              <h2 className="text-2xl font-bold text-[#002868]">
                {isAr ? "ما نقدمه لهذا القطاع" : "What We Provide"}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {industry.servicesUsed.map((service, i) => (
                <div
                  key={service}
                  className="flex flex-col items-start bg-[#FAF9F5] border border-gray-100 rounded-lg p-6 hover:border-[#002868] transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${i % 2 === 0 ? "bg-[#002868]" : "bg-[#C5A880]"}`}>
                    <span className="w-3 h-3 rounded-full bg-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-bold text-[#002868] leading-snug">{service}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="section-py bg-[#FAF9F5]">
            <div className="container-brand">
              <div className="text-center mb-16">
                <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
                  {isAr ? "أعمالنا المنجزة" : "Our Portfolio"}
                </span>
                <h2 className="text-2xl font-bold text-[#002868]">{isAr ? "مشاريع في هذا القطاع" : "Projects in This Sector"}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProjects.slice(0, 3).map((p) => (
                  <Link key={p.slug} href={`/${locale}/projects/${p.slug}`} className="group relative rounded-lg overflow-hidden h-56 bg-gray-900">
                    <ImageWithSkeleton
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw,33vw"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,20,70,0.9) 0%,transparent 60%)" }} aria-hidden="true" />
                    <div className="absolute bottom-0 start-0 p-4 text-white">
                      <p className="font-mono text-[9px] text-[#C5A880] uppercase tracking-widest mb-1">{p.location} • {p.year}</p>
                      <h3 className="text-sm font-bold group-hover:text-[#C5A880] transition-colors">{p.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Certifications */}
        <section className="section-py bg-[#002868]">
          <div className="container-brand">
            <div className="text-center mb-12">
              <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
                {isAr ? "الاعتمادات والشهادات" : "Certifications & Accreditations"}
              </span>
              <h2 className="text-2xl font-bold text-white">{isAr ? "جودة معتمدة دولياً" : "Internationally Certified Quality"}</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {industry.certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-5 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm font-bold text-white"
                >
                  {cert}
                </span>
              ))}
            </div>
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
            <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-4">
              {isAr ? "ابدأ مشروعك" : "Start Your Project"}
            </span>
            <h2 className="text-2xl font-extrabold uppercase tracking-tight mb-4">{isAr ? "هل أنت جاهز للبدء؟" : "Ready to Get Started?"}</h2>
            <p className="text-sm text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
              {isAr ? "تواصل مع فريقنا الهندسي للحصول على استشارة مجانية" : "Contact our engineering team for a free consultation"}
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
