import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { contentRepository } from "@/lib/content/content-repository";

export async function FeaturedProjects() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.projects" });
  const pt = await getTranslations({ locale, namespace: "projects" });
  const projects = await contentRepository.getFeaturedProjects(locale);

  const [mainProject, secondProject] = projects;

  return (
    <section className="section-padding bg-white" aria-labelledby="projects-heading">
      <div className="container-brand">
        {/* Header row — left text + right filter pills */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-[#C8A75D] font-bold uppercase tracking-widest text-sm mb-4 block">
              {locale === "ar" ? "سجل الإنجازات" : "Achievement Record"}
            </span>
            <h2
              id="projects-heading"
              className="text-[#002868]"
              style={{ fontSize: "48px", lineHeight: "1.2", fontWeight: 700 }}
            >
              {locale === "ar"
                ? "مشاريع تركت أثراً في أفق مدننا"
                : "Projects That Shaped Our City Skylines"}
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-4">
            {[
              locale === "ar" ? "الكل" : "All",
              locale === "ar" ? "حكومية" : "Government",
              locale === "ar" ? "تجارية" : "Commercial",
              locale === "ar" ? "سكنية" : "Residential",
            ].map((label, i) => (
              <button
                key={i}
                className={`px-6 py-2 rounded-full font-bold transition-colors duration-200 ${
                  i === 0
                    ? "bg-[#002868] text-white"
                    : "bg-[#F4F7FA] text-[#434652] hover:bg-[#002868]/10"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric 12-column grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Large card — col-span-8 */}
          {mainProject ? (
            <Link
              href={`/${locale}/projects/${mainProject.slug}`}
              className="col-span-12 md:col-span-8 group relative rounded-3xl overflow-hidden h-[600px] premium-shadow"
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
                  background: "linear-gradient(to top, rgba(0,40,104,0.9) 0%, rgba(0,40,104,0.2) 50%, transparent 100%)",
                  opacity: 0.85,
                }}
                aria-hidden="true"
              />
              <div className="absolute bottom-10 end-10 start-10 text-white">
                <span className="bg-[#C8A75D] text-[#001947] px-4 py-1 rounded-full text-xs font-bold mb-4 inline-block uppercase tracking-wide">
                  {locale === "ar" ? "مشروع رائد" : "Flagship Project"}
                </span>
                <h3 className="text-4xl font-bold mb-4">{mainProject.title}</h3>
                <p className="text-white/80 max-w-xl">{mainProject.shortDescription}</p>
              </div>
            </Link>
          ) : (
            <div className="col-span-12 md:col-span-8 rounded-3xl overflow-hidden h-[600px] premium-shadow bg-[#F4F7FA] flex items-center justify-center">
              <span className="text-[#002868] font-bold text-xl">
                {locale === "ar" ? "مشروع رائد" : "Flagship Project"}
              </span>
            </div>
          )}

          {/* Secondary card — col-span-4 */}
          {secondProject ? (
            <Link
              href={`/${locale}/projects/${secondProject.slug}`}
              className="col-span-12 md:col-span-4 group relative rounded-3xl overflow-hidden h-[600px] premium-shadow"
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
                  background: "linear-gradient(to top, rgba(0,40,104,0.9) 0%, rgba(0,40,104,0.2) 50%, transparent 100%)",
                  opacity: 0.8,
                }}
                aria-hidden="true"
              />
              <div className="absolute bottom-10 end-10 start-10 text-white">
                <h3 className="text-2xl font-bold mb-2">{secondProject.title}</h3>
                <p className="text-white/80 text-sm">{secondProject.shortDescription}</p>
              </div>
            </Link>
          ) : (
            <div className="col-span-12 md:col-span-4 rounded-3xl overflow-hidden h-[600px] premium-shadow bg-[#eeedf5] flex items-center justify-center">
              <span className="text-[#002868] font-bold">
                {locale === "ar" ? "مشروع" : "Project"}
              </span>
            </div>
          )}
        </div>

        {/* View all */}
        <div className="mt-14 text-center">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center justify-center border-2 border-[#002868] text-[#002868] px-10 py-3 font-bold rounded-xl hover:bg-[#002868]/5 transition-all duration-200"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
