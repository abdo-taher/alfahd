import Link from "next/link";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { MapPin, Calendar } from "lucide-react";
import { contentRepository } from "@/lib/content/content-repository";

export async function FeaturedProjects() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.projects" });
  const pt = await getTranslations({ locale, namespace: "projects" });
  const projects = await contentRepository.getFeaturedProjects(locale);

  return (
    <section className="section-py bg-[#f3f3fb]">
      <div className="container-brand">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-label-bold text-[--color-brand-primary] uppercase tracking-widest block mb-3">
            {t("title")}
          </span>
          <h2 className="text-display-mobile lg:text-headline-md text-[--color-brand-primary]">
            {t("title")}
          </h2>
          <p className="text-body-lg text-[#434652] max-w-2xl mx-auto mt-4 leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="gold-bar-center mt-8" aria-hidden="true" />
        </div>

        {/* Projects grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/${locale}/projects/${project.slug}`}
              className="group flex flex-col overflow-hidden bg-white rounded-lg luxury-shadow luxury-shadow-hover transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[#eeedf5]">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 card-image-gradient" aria-hidden="true" />
                {/* Category chip */}
                <div className="absolute top-4 start-4 z-10">
                  <span className="bg-[--color-brand-gold] text-[#001947] text-caption font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-7">
                <h3 className="text-headline-sm text-[#1a1b21] group-hover:text-[--color-brand-primary] transition-colors mb-2 leading-snug">
                  {project.title}
                </h3>
                <p className="text-body-md text-[#434652] leading-relaxed flex-1 mb-4">
                  {project.shortDescription}
                </p>
                <div className="flex items-center gap-4 text-caption text-[#747783]">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5" aria-hidden="true" />
                    {project.year}
                  </span>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-label-bold text-[--color-brand-primary] group-hover:gap-4 transition-all duration-300">
                  {pt("viewProject")}
                  <svg viewBox="0 0 20 20" fill="currentColor" className={`size-4 ${locale === "ar" ? "rotate-180" : ""}`} aria-hidden="true">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="mt-14 text-center">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center justify-center border-2 border-[--color-brand-primary] text-[--color-brand-primary] px-10 py-3 text-label-bold rounded hover:bg-[--color-brand-primary]/5 transition-all duration-200"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
