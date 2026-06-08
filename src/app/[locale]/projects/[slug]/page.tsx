import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { generateProjectMetadata } from "@/seo/metadata/project-metadata";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  location: string;
  year: number;
  category: string;
  shortDescription: string;
  description: string;
  challenge: string;
  solution: string;
  scope: string[];
  technologies: string[];
  results: string[];
  coverImage: string;
  gallery: string[];
  featured?: boolean;
}

// ─── Data helpers ─────────────────────────────────────────────────────────────

async function getProjects(locale: string): Promise<Project[]> {
  const data = await import(`@/content/${locale}/projects.json`);
  return data.default as Project[];
}

async function getProject(locale: string, slug: string): Promise<Project | undefined> {
  const projects = await getProjects(locale);
  return projects.find((p) => p.slug === slug);
}

// ─── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const locales = ["ar", "en"];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const projects = await getProjects(locale);
    for (const project of projects) {
      params.push({ locale, slug: project.slug });
    }
  }
  return params;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProject(locale, slug);
  if (!project) return {};
  return generateProjectMetadata({
    name: project.title,
    location: project.location,
    path: `/${locale}/projects/${slug}`,
    locale,
    ogImage: project.coverImage,
  });
}

// ─── Category label map ───────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  ar: { aluminium: "الألمنيوم", glass: "الزجاج", iron: "الحديد" },
  en: { aluminium: "Aluminium", glass: "Glass", iron: "Iron" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const [project, allProjects, t] = await Promise.all([
    getProject(locale, slug),
    getProjects(locale),
    getTranslations({ locale, namespace: "projects" }),
  ]);

  if (!project) notFound();

  const isAr = locale === "ar";
  const catLabels = CATEGORY_LABELS[locale] ?? CATEGORY_LABELS.en;
  const categoryLabel = catLabels[project.category] ?? project.category;

  // Related: same category, excluding current, max 3
  const related = allProjects
    .filter((p) => p.slug !== slug && p.category === project.category)
    .slice(0, 3);

  return (
    <div className="pt-20" style={{ background: "#FAF9F5" }}>
      {/* Hero */}
      <section className="relative bg-gray-950 overflow-hidden min-h-[480px] flex items-end">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
        </div>

        <div className="container-brand relative z-10 pb-14 pt-20 max-w-5xl w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-gray-500 text-xs" aria-label="breadcrumb">
            <Link href={`/${locale}`} className="hover:text-gray-300 transition-colors">
              {isAr ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/projects`} className="hover:text-gray-300 transition-colors">
              {t("title")}
            </Link>
            <span>/</span>
            <span className="text-gray-400 line-clamp-1">{project.title}</span>
          </nav>

          {/* Category + year pill */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-block px-3 py-1 font-bold uppercase tracking-wider text-gray-950"
              style={{ background: "#C5A880", fontSize: "9px", fontFamily: "'JetBrains Mono', monospace" }}
            >
              {categoryLabel}
            </span>
            <span
              className="text-gray-400"
              style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}
            >
              {project.year}
            </span>
          </div>

          <h1
            className="font-sans font-extrabold text-white mb-4 leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.1 }}
          >
            {project.title}
          </h1>

          {/* Meta row */}
          <div
            className="flex flex-wrap items-center gap-4 text-gray-400"
            style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }} aria-hidden="true">
                business
              </span>
              {project.client}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }} aria-hidden="true">
                location_on
              </span>
              {project.location}
            </span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16">
        <div className="container-brand max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left — description */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div>
                <p
                  className="text-gray-700 leading-relaxed border-s-4 ps-6"
                  style={{ borderColor: "#C5A880", fontSize: "17px", lineHeight: "1.85" }}
                >
                  {project.description}
                </p>
              </div>

              {/* Challenge */}
              <div>
                <h2
                  className="font-bold uppercase tracking-wider text-gray-950 mb-4"
                  style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em" }}
                >
                  {t("challenge")}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">{project.challenge}</p>
              </div>

              {/* Solution */}
              <div>
                <h2
                  className="font-bold uppercase tracking-wider text-gray-950 mb-4"
                  style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em" }}
                >
                  {t("solution")}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">{project.solution}</p>
              </div>

              {/* Results */}
              <div>
                <h2
                  className="font-bold uppercase tracking-wider text-gray-950 mb-4"
                  style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em" }}
                >
                  {t("results")}
                </h2>
                <ul className="space-y-2">
                  {project.results.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <span
                        className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
                        style={{ background: "#C5A880" }}
                        aria-hidden="true"
                      >
                        <span className="material-symbols-outlined text-white" style={{ fontSize: "10px" }}>
                          check
                        </span>
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — sidebar */}
            <div className="space-y-8">
              {/* Scope */}
              <div className="bg-white border border-gray-100 rounded-lg p-6">
                <h3
                  className="font-bold uppercase tracking-wider text-gray-950 mb-4 border-b border-gray-100 pb-3"
                  style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em" }}
                >
                  {t("scope")}
                </h3>
                <ul className="space-y-2">
                  {project.scope.map((s, i) => (
                    <li key={i} className="text-gray-600 text-xs leading-relaxed flex items-start gap-2">
                      <span className="text-[#C5A880] mt-0.5" aria-hidden="true">›</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="bg-white border border-gray-100 rounded-lg p-6">
                <h3
                  className="font-bold uppercase tracking-wider text-gray-950 mb-4 border-b border-gray-100 pb-3"
                  style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em" }}
                >
                  {t("technologies")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-50 border border-gray-100 text-gray-600 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href={`/${locale}/request-quote`}
                className="block w-full bg-gray-950 text-white text-center py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors duration-200"
              >
                {isAr ? "طلب عرض سعر مشابه" : "Request a Similar Quote"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery.length > 1 && (
        <section className="pb-16">
          <div className="container-brand max-w-5xl">
            <h2
              className="font-bold uppercase tracking-wider text-gray-950 mb-6"
              style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em" }}
            >
              {isAr ? "معرض الصور" : "Gallery"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.gallery.map((img, i) => (
                <div key={i} className="relative overflow-hidden rounded-lg aspect-video bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${project.title} — ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related projects */}
      {related.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container-brand max-w-5xl">
            <h2
              className="font-bold uppercase tracking-wider text-gray-950 mb-8"
              style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em" }}
            >
              {isAr ? "مشاريع مشابهة" : "Related Projects"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${locale}/projects/${rel.slug}`}
                  className="group block overflow-hidden rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4">
                    <p
                      className="text-[#C5A880] font-bold uppercase mb-1"
                      style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {catLabels[rel.category] ?? rel.category} • {rel.year}
                    </p>
                    <p className="font-bold text-gray-950 group-hover:text-[#C5A880] transition-colors text-sm leading-snug">
                      {rel.title}
                    </p>
                    <p
                      className="text-gray-400 mt-1"
                      style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {rel.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back + CTA bar */}
      <section className="py-12 bg-gray-950">
        <div className="container-brand flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-gray-300 hover:text-[#C5A880] transition-colors text-sm font-medium"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }} aria-hidden="true">
              {isAr ? "arrow_forward" : "arrow_back"}
            </span>
            {isAr ? "العودة إلى المشاريع" : "Back to Projects"}
          </Link>
          <Link
            href={`/${locale}/request-quote`}
            className="inline-flex items-center gap-3 bg-white text-gray-950 px-8 py-3 font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors duration-200"
          >
            {isAr ? "طلب عرض سعر" : "Request a Quote"}
            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: "14px" }}>
              {isAr ? "arrow_back" : "arrow_forward"}
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
