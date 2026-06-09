import type { Metadata } from "next";
import Link from "next/link";
import { ImageWithSkeleton } from "@/shared/components/ui/image-with-skeleton";
import { notFound } from "next/navigation";
import { contentRepository } from "@/lib/content/content-repository";
import { generateSubServiceMetadata } from "@/seo/metadata/service-metadata";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/seo/schema/organization";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";

export const dynamicParams = false;

export async function generateStaticParams() {
  // Hardcoded to avoid dynamic import failures at build time.
  // Add new sub-service slugs here when content is added.
  const subServiceMap: Record<string, string[]> = {
    "aluminum-works": [
      "curtain-wall-systems",
      "aluminum-windows-doors",
      "aluminum-cladding",
      "aluminum-facades",
      "structural-glazing",
    ],
    "glass-works": [
      "structural-glass-facades",
      "spider-glass-systems",
      "fire-rated-glass",
      "insulating-glass-units",
      "low-iron-glass",
    ],
    "steel-works": [
      "steel-structures",
      "steel-warehouses",
      "ornamental-iron",
      "steel-canopies",
      "pedestrian-bridges",
    ],
  };

  return ["ar", "en"].flatMap((locale) =>
    Object.entries(subServiceMap).flatMap(([slug, subSlugs]) =>
      subSlugs.map((subSlug) => ({ locale, slug, "sub-slug": subSlug }))
    )
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string; "sub-slug": string }>;
}): Promise<Metadata> {
  const { locale, slug, "sub-slug": subSlug } = await params;
  const [subService, parentService] = await Promise.all([
    contentRepository.getSubServiceBySlug(slug, subSlug, locale),
    contentRepository.getServiceBySlug(slug, locale),
  ]);
  if (!subService || !parentService) return {};
  return generateSubServiceMetadata({
    subServiceTitle: subService.title,
    parentServiceTitle: parentService.title,
    slug: subSlug,
    parentSlug: slug,
    locale,
    path: `/${locale}/services/${slug}/${subSlug}`,
    keywords: subService.keywords[locale as "ar" | "en"] ?? [],
  });
}

export default async function SubServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; "sub-slug": string }>;
}) {
  const { locale, slug, "sub-slug": subSlug } = await params;
  const [subService, parentService] = await Promise.all([
    contentRepository.getSubServiceBySlug(slug, subSlug, locale),
    contentRepository.getServiceBySlug(slug, locale),
  ]);
  if (!subService || !parentService) notFound();

  const isAr = locale === "ar";
  const url = `${BASE_URL}/${locale}/services/${slug}/${subSlug}`;

  const svcSd = serviceSchema({ name: subService.title, description: subService.description, url });
  const faqItems = subService.faq ?? [];
  const faqSd = faqItems.length > 0 ? faqSchema(faqItems) : null;
  const crumbs = breadcrumbSchema([
    { name: isAr ? "الرئيسية" : "Home", url: `${BASE_URL}/${locale}` },
    { name: isAr ? "خدماتنا" : "Services", url: `${BASE_URL}/${locale}/services` },
    { name: parentService.title, url: `${BASE_URL}/${locale}/services/${slug}` },
    { name: subService.title, url },
  ]);

  let relatedProjects: Awaited<ReturnType<typeof contentRepository.getProjectsByCategory>> = [];
  try {
    relatedProjects = (await contentRepository.getProjectsByCategory(subService.relatedProjectCategory, locale)).slice(0, 3);
  } catch { /* empty */ }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(svcSd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs).replace(/</g, "\\u003c") }} />
      {faqSd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSd).replace(/</g, "\\u003c") }} />}

      <div className="pt-20">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden bg-gray-950">
          <ImageWithSkeleton
            src={parentService.image}
            alt={subService.title}
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
              <Link href={`/${locale}/services`} className="hover:text-white transition-colors">{isAr ? "خدماتنا" : "Services"}</Link>
              <span aria-hidden="true">/</span>
              <Link href={`/${locale}/services/${slug}`} className="hover:text-white transition-colors">{parentService.title}</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/80">{subService.title}</span>
            </nav>
            <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">{parentService.title}</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight max-w-3xl">{subService.title}</h1>
            <p className="mt-4 text-base text-white/70 max-w-2xl leading-relaxed">{subService.shortDescription}</p>
          </div>
        </section>

        {/* Description + Benefits */}
        <section className="section-py bg-[#FAF9F5]">
          <div className="container-brand">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-7">
                <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-4">{isAr ? "نبذة عن الخدمة" : "About This Service"}</span>
                <h2 className="text-2xl font-bold text-[#002868] mb-6">{subService.title}</h2>
                <p className="text-base text-[#434652] leading-relaxed mb-8">{subService.description}</p>
                {subService.applications.length > 0 && (
                  <div>
                    <h3 className="font-mono text-[10px] text-[#747783] uppercase tracking-widest font-bold mb-4">{isAr ? "التطبيقات والاستخدامات" : "Applications & Uses"}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {subService.applications.map((app: string) => (
                        <div key={app} className="flex items-center gap-3 bg-white border border-gray-100 rounded-lg px-4 py-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" aria-hidden="true" />
                          <span className="text-sm text-[#434652]">{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="lg:col-span-5">
                <div className="bg-[#002868] rounded-2xl p-8 text-white sticky top-28">
                  <h3 className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold mb-6">{isAr ? "المزايا الرئيسية" : "Key Benefits"}</h3>
                  <ul className="space-y-4">
                    {subService.benefits.map((b: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 w-5 h-5 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/30 flex items-center justify-center shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" aria-hidden="true" />
                        </span>
                        <span className="text-sm text-white/80 leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 pt-8 border-t border-white/10">
                    <Link
                      href={`/${locale}/request-quote`}
                      className="flex items-center justify-center bg-[#C5A880] text-[#001947] py-3.5 rounded-lg text-sm font-bold hover:brightness-110 transition-all active:scale-95"
                    >
                      {isAr ? "طلب عرض سعر" : "Get a Quote"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        {subService.process.length > 0 && (
          <section className="section-py bg-white border-y border-gray-100">
            <div className="container-brand">
              <div className="text-center mb-16">
                <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">{isAr ? "مسار التنفيذ" : "Execution Path"}</span>
                <h2 className="text-2xl font-bold text-[#002868]">{isAr ? "كيف ننفذ مشروعك" : "How We Execute Your Project"}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {subService.process.map((step: { step: number; title: string; description: string }, i: number) => (
                  <div key={step.step} className="flex flex-col items-center text-center bg-white rounded-lg border border-gray-100 p-8 shadow-sm">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold font-mono mb-6 ${i % 2 === 0 ? "bg-[#002868] text-white" : "bg-[#C5A880] text-[#001947]"}`}>
                      {step.step < 10 ? `0${step.step}` : step.step}
                    </div>
                    <h3 className="text-base font-bold text-[#002868] mb-3">{step.title}</h3>
                    <p className="text-sm text-[#434652] leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="section-py bg-[#FAF9F5]">
            <div className="container-brand">
              <div className="text-center mb-16">
                <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">{isAr ? "أعمالنا المنجزة" : "Our Portfolio"}</span>
                <h2 className="text-2xl font-bold text-[#002868]">{isAr ? "مشاريع ذات صلة" : "Related Projects"}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProjects.map((p) => (
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

        {/* FAQ */}
        {faqItems.length > 0 && (
          <section className="section-py bg-white">
            <div className="container-brand max-w-3xl">
              <div className="text-center mb-16">
                <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">{isAr ? "الأسئلة الشائعة" : "FAQ"}</span>
                <h2 className="text-2xl font-bold text-[#002868]">{isAr ? "أسئلة وأجوبة" : "Frequently Asked Questions"}</h2>
              </div>
              <div className="space-y-4">
                {faqItems.map((item: { question: string; answer: string }, i: number) => (
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

        {/* Back + CTA */}
        <section className="bg-gray-950 text-white py-16">
          <div className="container-brand flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              href={`/${locale}/services/${slug}`}
              className="inline-flex items-center gap-2 text-gray-300 hover:text-[#C5A880] transition-colors text-sm font-medium"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }} aria-hidden="true">
                {isAr ? "arrow_forward" : "arrow_back"}
              </span>
              {isAr ? `العودة إلى ${parentService.title}` : `Back to ${parentService.title}`}
            </Link>
            <Link
              href={`/${locale}/request-quote`}
              className="inline-flex items-center gap-3 bg-white text-gray-950 px-8 py-3 font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              {isAr ? "طلب عرض سعر" : "Request a Quote"}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
