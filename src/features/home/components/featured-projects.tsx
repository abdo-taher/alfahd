import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { contentRepository } from "@/lib/content/content-repository";

export async function FeaturedProjects() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.projects" });
  const projects = await contentRepository.getFeaturedProjects(locale);

  const [mainProject, secondProject] = projects;

  const filterLabels = [
    locale === "ar" ? "الكل" : "All",
    locale === "ar" ? "زجاج" : "Glass",
    locale === "ar" ? "ألمنيوم" : "Aluminium",
    locale === "ar" ? "حديد" : "Iron",
  ];

  return (
    <section className="section-padding bg-white dark:bg-gray-900" aria-labelledby="projects-heading">
      <div className="container-brand">
        {/* Header row */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span
              className="font-bold uppercase tracking-widest mb-4 block"
              style={{
                color: "#C5A880",
                fontSize: "10px",
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                letterSpacing: "0.1em",
              }}
            >
              {locale === "ar" ? "سجل الإنجازات" : "Achievement Record"}
            </span>
            <h2
              id="projects-heading"
              className="text-gray-950 dark:text-white"
              style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: "1.2", fontWeight: 700 }}
            >
              {locale === "ar"
                ? "مشاريع تركت أثراً في أفق مدننا"
                : "Projects That Shaped Our City Skylines"}
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {filterLabels.map((label, i) => (
              <button
                key={i}
                className={[
                  "px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200",
                  i === 0
                    ? "bg-gray-950 text-white dark:bg-white dark:text-gray-950"
                    : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700",
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric 12-column grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Large card — col-span-8 */}
          {mainProject ? (
            <Link
              href={`/${locale}/projects/${mainProject.slug}`}
              className="col-span-12 md:col-span-8 group relative rounded-lg overflow-hidden h-[600px] shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mainProject.coverImage}
                alt={mainProject.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(3,7,18,0.92) 0%, rgba(3,7,18,0.3) 50%, transparent 100%)",
                }}
                aria-hidden="true"
              />
              <div className="absolute bottom-8 end-8 start-8 text-white">
                {/* Gold chip */}
                <span
                  className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4"
                  style={{
                    background: "#C5A880",
                    color: "#111827",
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  }}
                >
                  {locale === "ar" ? "مشروع رائد" : "Flagship Project"}
                </span>
                <h3
                  className="font-bold mb-3"
                  style={{ fontSize: "clamp(22px, 3vw, 32px)", lineHeight: 1.2 }}
                >
                  {mainProject.title}
                </h3>
                <p className="text-white/70 max-w-xl text-sm leading-relaxed">
                  {mainProject.shortDescription}
                </p>
              </div>
            </Link>
          ) : (
            <div className="col-span-12 md:col-span-8 rounded-lg overflow-hidden h-[600px] bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 font-bold">
                {locale === "ar" ? "مشروع رائد" : "Flagship Project"}
              </span>
            </div>
          )}

          {/* Secondary card — col-span-4 */}
          {secondProject ? (
            <Link
              href={`/${locale}/projects/${secondProject.slug}`}
              className="col-span-12 md:col-span-4 group relative rounded-lg overflow-hidden h-[600px] shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={secondProject.coverImage}
                alt={secondProject.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(3,7,18,0.90) 0%, rgba(3,7,18,0.25) 50%, transparent 100%)",
                }}
                aria-hidden="true"
              />
              <div className="absolute bottom-8 end-8 start-8 text-white">
                <h3
                  className="font-bold mb-2"
                  style={{ fontSize: "20px", lineHeight: 1.3 }}
                >
                  {secondProject.title}
                </h3>
                <p className="text-white/70 text-xs leading-relaxed">
                  {secondProject.shortDescription}
                </p>
              </div>
            </Link>
          ) : (
            <div className="col-span-12 md:col-span-4 rounded-lg overflow-hidden h-[600px] bg-gray-50 flex items-center justify-center">
              <span className="text-gray-400 font-bold">
                {locale === "ar" ? "مشروع" : "Project"}
              </span>
            </div>
          )}
        </div>

        {/* View all */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 border border-gray-950 dark:border-white text-gray-950 dark:text-white px-10 py-3.5 font-bold text-xs uppercase tracking-wider hover:bg-gray-950 dark:hover:bg-white hover:text-white dark:hover:text-gray-950 transition-all duration-200"
          >
            {t("viewAll")}
            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: "14px" }}>
              {locale === "ar" ? "arrow_back" : "arrow_forward"}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
