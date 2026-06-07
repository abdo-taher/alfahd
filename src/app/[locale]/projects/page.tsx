"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Calendar } from "lucide-react";

// Static data — in production replace with server-fetched content
const projectsData = {
  ar: [
    {
      id: "1",
      slug: "riyadh-commercial-tower",
      title: "برج تجاري في الرياض",
      category: "aluminum",
      location: "الرياض",
      year: 2023,
      shortDescription: "تركيب واجهات ألمنيوم وزجاج لبرج تجاري من 20 طابقاً في قلب الرياض",
      coverImage: "/images/projects/riyadh-tower.jpg",
      featured: true,
    },
    {
      id: "2",
      slug: "jeddah-villa-complex",
      title: "مجمع فلل فاخر في جدة",
      category: "glass",
      location: "جدة",
      year: 2023,
      shortDescription: "أعمال زجاج وألمنيوم متكاملة لمجمع يضم 50 فيلا فاخرة في جدة",
      coverImage: "/images/projects/jeddah-villas.jpg",
      featured: true,
    },
    {
      id: "3",
      slug: "dammam-industrial-warehouse",
      title: "مستودع صناعي في الدمام",
      category: "steel",
      location: "الدمام",
      year: 2022,
      shortDescription: "هيكل حديدي ضخم لمستودع صناعي بمساحة 5000 متر مربع",
      coverImage: "/images/projects/dammam-warehouse.jpg",
      featured: true,
    },
  ],
  en: [
    {
      id: "1",
      slug: "riyadh-commercial-tower",
      title: "Commercial Tower in Riyadh",
      category: "aluminum",
      location: "Riyadh",
      year: 2023,
      shortDescription: "Aluminum and glass facade installation for a 20-story commercial tower in Riyadh",
      coverImage: "/images/projects/riyadh-tower.jpg",
      featured: true,
    },
    {
      id: "2",
      slug: "jeddah-villa-complex",
      title: "Luxury Villa Complex in Jeddah",
      category: "glass",
      location: "Jeddah",
      year: 2023,
      shortDescription: "Integrated glass and aluminum works for a complex of 50 luxury villas",
      coverImage: "/images/projects/jeddah-villas.jpg",
      featured: true,
    },
    {
      id: "3",
      slug: "dammam-industrial-warehouse",
      title: "Industrial Warehouse in Dammam",
      category: "steel",
      location: "Dammam",
      year: 2022,
      shortDescription: "Large steel structure for a 5,000 sqm industrial warehouse",
      coverImage: "/images/projects/dammam-warehouse.jpg",
      featured: true,
    },
  ],
};

const categoryLabels: Record<string, Record<string, string>> = {
  ar: { all: "الكل", aluminum: "الألمنيوم", glass: "الزجاج", steel: "الحديد" },
  en: { all: "All", aluminum: "Aluminum", glass: "Glass", steel: "Steel" },
};

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const locale = useLocale() as "ar" | "en";
  const [active, setActive] = useState("all");

  const projects = projectsData[locale] ?? projectsData.en;
  const labels = categoryLabels[locale] ?? categoryLabels.en;
  const categories = ["all", "aluminum", "glass", "steel"];

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="enterprise-gradient py-24 text-white">
        <div className="container-brand">
          <div className="max-w-3xl">
            <div className="gold-bar mb-6" aria-hidden="true" />
            <h1 className="text-display-mobile lg:text-display font-bold text-white mb-6">
              {t("title")}
            </h1>
            <p className="text-body-lg text-primary-fixed-dim leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section-py bg-surface">
        <div className="container-brand">
          {/* Category filter */}
          <div className="flex flex-wrap gap-3 mb-16 justify-center" role="group" aria-label={t("allCategories")}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={[
                  "px-6 py-2.5 text-label-bold rounded transition-all duration-200",
                  active === cat
                    ? "bg-primary text-on-primary"
                    : "border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary",
                ].join(" ")}
              >
                {labels[cat] ?? cat}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <Link
                key={project.id}
                href={`/${locale}/projects/${project.slug}`}
                className="group flex flex-col overflow-hidden bg-surface-container-lowest rounded-lg luxury-shadow hover:luxury-shadow-hover transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-surface-container">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                      // hide broken images
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 card-image-gradient" aria-hidden="true" />
                  {/* Category badge */}
                  <div className="absolute top-4 start-4 z-10">
                    <span className="bg-gold text-on-primary-fixed text-caption font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {labels[project.category] ?? project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-7">
                  <h3 className="text-headline-sm text-on-surface group-hover:text-primary transition-colors mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant leading-relaxed flex-1 mb-4">
                    {project.shortDescription}
                  </p>
                  <div className="flex items-center gap-4 text-caption text-outline">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3.5" aria-hidden="true" />
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3.5" aria-hidden="true" />
                      {project.year}
                    </span>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-label-bold text-primary group-hover:gap-4 transition-all duration-300">
                    {t("viewProject")}
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
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-on-surface-variant">
              <p className="text-body-lg">
                {locale === "ar" ? "لا توجد مشاريع في هذه الفئة" : "No projects in this category"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="enterprise-gradient py-24 text-center">
        <div className="container-brand">
          <h2 className="text-display-mobile lg:text-headline-md text-white mb-6">
            {locale === "ar" ? "هل مشروعك القادم؟" : "Is Your Project Next?"}
          </h2>
          <Link
            href={`/${locale}/request-quote`}
            className="inline-flex items-center justify-center bg-gold text-on-primary-fixed px-12 py-4 text-label-bold rounded hover:brightness-110 transition-all duration-300"
          >
            {locale === "ar" ? "طلب عرض سعر" : "Request a Quote"}
          </Link>
        </div>
      </section>
    </div>
  );
}
