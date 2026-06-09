import type { Metadata } from "next";
import Link from "next/link";
import { ImageWithSkeleton } from "@/shared/components/ui/image-with-skeleton";
import { notFound } from "next/navigation";
import { contentRepository } from "@/lib/content/content-repository";
import { generateLocationMetadata } from "@/seo/metadata/location-metadata";
import { localBusinessLocationSchema, breadcrumbSchema } from "@/seo/schema/organization";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";

export async function generateStaticParams() {
  const slugs = ["riyadh", "jeddah", "dammam", "neom", "mecca", "jubail"];
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
  const location = await contentRepository.getLocationBySlug(slug, locale);
  if (!location) return {};
  return generateLocationMetadata({
    title: location.title,
    description: location.description,
    path: `/${locale}/locations/${slug}`,
    locale,
    keywords: location.keywords[locale as "ar" | "en"] ?? [],
  });
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const location = await contentRepository.getLocationBySlug(slug, locale);
  if (!location) notFound();

  const isAr = locale === "ar";
  const url = `${BASE_URL}/${locale}/locations/${slug}`;

  const localBizSd = localBusinessLocationSchema(location.city, locale, url);
  const crumbs = breadcrumbSchema([
    { name: isAr ? "الرئيسية" : "Home", url: `${BASE_URL}/${locale}` },
    { name: isAr ? "المواقع" : "Locations", url: `${BASE_URL}/${locale}/locations` },
    { name: location.city, url },
  ]);

  // Projects in this location
  const allProjects = await contentRepository.getProjects(locale);
  const locationProjects = allProjects.filter((p) =>
    location.projectSlugs.includes(p.slug)
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs).replace(/</g, "\\u003c") }} />

      <div className="pt-20">
        {/* Hero */}
        <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden bg-gray-950">
          <ImageWithSkeleton
            src={location.heroImage}
            alt={location.title}
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
              <Link href={`/${locale}/locations`} className="hover:text-white transition-colors">{isAr ? "المواقع" : "Locations"}</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/80">{location.city}</span>
            </nav>
            <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">{location.city}</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight max-w-3xl">{location.title}</h1>
            <p className="mt-4 text-base text-white/70 max-w-2xl leading-relaxed">{location.shortDescription}</p>
          </div>
        </section>

        {/* Services Available */}
        <section className="section-py bg-[#FAF9F5]">
          <div className="container-brand">
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
                {isAr ? "خدماتنا في هذه المنطقة" : "Services in This Region"}
              </span>
              <h2 className="text-2xl font-bold text-[#002868]">{isAr ? "ما نقدمه في" : "What We Offer in"} {location.city}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {location.services.map((service, i) => (
                <div key={service} className="bg-white border border-gray-100 rounded-lg p-6 flex items-start gap-4 hover:border-[#002868] transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${i % 2 === 0 ? "bg-[#002868]" : "bg-[#C5A880]"}`}>
                    <span className="w-2 h-2 rounded-full bg-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#002868] text-sm">{service}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects in this Location */}
        {locationProjects.length > 0 && (
          <section className="section-py bg-white border-y border-gray-100">
            <div className="container-brand">
              <div className="text-center mb-16">
                <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
                  {isAr ? "أعمالنا المنجزة" : "Our Work"}
                </span>
                <h2 className="text-2xl font-bold text-[#002868]">
                  {isAr ? `مشاريعنا في ${location.city}` : `Our Projects in ${location.city}`}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {locationProjects.slice(0, 3).map((p) => (
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

        {/* Why Choose Us */}
        <section className="section-py bg-[#002868]">
          <div className="container-brand max-w-3xl">
            <div className="text-center mb-12">
              <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
                {isAr ? "لماذا تختارنا" : "Why Choose Us"}
              </span>
              <h2 className="text-2xl font-bold text-white">
                {isAr ? `تميزنا في ${location.city}` : `Our Advantage in ${location.city}`}
              </h2>
            </div>
            <div className="space-y-4">
              {location.whyChooseUs.map((point, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/10 border border-white/10 rounded-lg p-5">
                  <span className="w-8 h-8 rounded-full bg-[#C5A880] flex items-center justify-center text-[#001947] font-bold font-mono text-sm shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-white/80 text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / Map */}
        <section className="section-py bg-[#FAF9F5]">
          <div className="container-brand">
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-3">
                {isAr ? "تواصل معنا" : "Get in Touch"}
              </span>
              <h2 className="text-2xl font-bold text-[#002868]">{isAr ? "موقعنا وبياناتنا" : "Our Contact Details"}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#C5A880] text-2xl shrink-0" aria-hidden="true">location_on</span>
                  <div>
                    <p className="font-bold text-[#002868] text-sm mb-1">{isAr ? "العنوان" : "Address"}</p>
                    <p className="text-[#434652] text-sm">{location.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#C5A880] text-2xl shrink-0" aria-hidden="true">phone</span>
                  <div>
                    <p className="font-bold text-[#002868] text-sm mb-1">{isAr ? "الهاتف" : "Phone"}</p>
                    <a href={`tel:${location.phone}`} className="text-[#434652] text-sm hover:text-[#002868] transition-colors" dir="ltr">
                      {location.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#C5A880] text-2xl shrink-0" aria-hidden="true">email</span>
                  <div>
                    <p className="font-bold text-[#002868] text-sm mb-1">{isAr ? "البريد الإلكتروني" : "Email"}</p>
                    <a href={`mailto:${location.email}`} className="text-[#434652] text-sm hover:text-[#002868] transition-colors" dir="ltr">
                      {location.email}
                    </a>
                  </div>
                </div>
                <Link
                  href={`/${locale}/request-quote`}
                  className="inline-flex items-center gap-2 bg-[#002868] text-white px-8 py-3 rounded-lg text-sm font-bold hover:bg-[#0a3d91] transition-colors"
                >
                  {isAr ? "طلب عرض سعر" : "Request a Quote"}
                </Link>
              </div>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                Google Maps — {location.city}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
