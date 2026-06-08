import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/seo/metadata/page-metadata";
import { NewsletterForm } from "./newsletter-form";

// ── Types ────────────────────────────────────────────────────────────────────
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  coverImage: string;
  readingTime: number;
  featured?: boolean;
  badgeAR?: string;
  badgeEN?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const isAr = locale === "ar";

  const keywords = isAr
    ? [
        "مدونة الفهد للمقاولات",
        "مقالات أعمال الألمنيوم",
        "دراسات الزجاج الإنشائي",
        "أخبار قطاع المقاولات السعودية",
        "هندسة الواجهات الرياض",
        "نصائح الهياكل الحديدية",
        "تقنيات البناء الرياض",
      ]
    : [
        "Al Fahd Contracting blog",
        "aluminum works articles",
        "glass facade engineering studies",
        "contracting industry news Saudi Arabia",
        "facade engineering Riyadh",
        "steel structure tips",
        "construction technology Saudi Arabia",
      ];

  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: `/${locale}/blog`,
    locale,
    keywords,
  });
}

// Category label map
const CATEGORY_LABELS: Record<string, { ar: string; en: string }> = {
  "technical-studies": { ar: "دراسات تقنية", en: "Technical Studies" },
  "company-news":      { ar: "أخبار الشركة",  en: "Company News" },
  "industry-insights": { ar: "رؤى الصناعة",   en: "Industry Insights" },
};

function formatDate(iso: string, isAr: boolean) {
  return new Date(iso).toLocaleDateString(isAr ? "ar-SA" : "en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function readTimeLabel(mins: number, isAr: boolean) {
  return isAr ? `${mins} دقائق قراءة` : `${mins} min read`;
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const isAr = locale === "ar";

  const posts: BlogPost[] = (await import(`@/content/${locale}/blog.json`)).default;
  const [featured, ...rest] = posts;

  return (
    <div className="pt-20 bg-[#FAF9F5] dark:bg-gray-950">
      {/* Hero */}
      <section className="bg-gray-950 py-20 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.05,
          }}
          aria-hidden="true"
        />
        <div className="container-brand relative z-10">
          <div className="max-w-3xl">
            <span
              className="block mb-4 font-bold uppercase tracking-widest"
              style={{
                color: "#C5A880",
                fontSize: "10px",
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                letterSpacing: "0.1em",
              }}
            >
              {isAr ? "المركز الإعلامي" : "Media Center"}
            </span>
            <h1
              className="font-sans font-extrabold text-white uppercase mb-4"
              style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              {t("title")}
            </h1>
            <p className="text-gray-400 text-base leading-relaxed max-w-xl">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-brand">
          {/* Featured hero card */}
          <div className="mb-16">
            <Link
              href={`/${locale}/blog/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 lg:h-auto overflow-hidden min-h-[280px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent" aria-hidden="true" />
                <div className="absolute bottom-0 start-0 p-6 z-10">
                  <span
                    className="inline-block px-3 py-1 font-bold uppercase tracking-wider text-gray-950"
                    style={{ background: "#C5A880", fontSize: "9px", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {isAr ? (featured.badgeAR ?? CATEGORY_LABELS[featured.category]?.ar) : (featured.badgeEN ?? CATEGORY_LABELS[featured.category]?.en)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <span
                  className="font-bold uppercase tracking-widest block mb-4"
                  style={{ color: "#C5A880", fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}
                >
                  {isAr ? "مقال رئيسي" : "Featured Article"}
                </span>
                <h2
                  className="font-sans font-bold text-gray-950 dark:text-white group-hover:text-[#C5A880] transition-colors mb-4 leading-snug"
                  style={{ fontSize: "clamp(20px, 2.5vw, 28px)", lineHeight: 1.3 }}
                >
                  {featured.title}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6 text-sm">
                  {featured.excerpt}
                </p>
                <div
                  className="flex items-center gap-3 text-gray-400 mb-6"
                  style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <span>{formatDate(featured.publishedAt, isAr)}</span>
                  <span>•</span>
                  <span>{readTimeLabel(featured.readingTime, isAr)}</span>
                </div>
                <span className="text-xs font-bold text-gray-950 dark:text-white inline-flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                  {t("readMore")}
                  <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: "14px" }}>
                    {isAr ? "arrow_back" : "arrow_forward"}
                  </span>
                </span>
              </div>
            </Link>
          </div>

          {/* 3-col article grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="group bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-500 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-0 start-0 p-4 z-10">
                    <span
                      className="inline-block px-2 py-1 font-bold uppercase tracking-wider text-gray-950"
                      style={{ background: "#C5A880", fontSize: "9px", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {CATEGORY_LABELS[post.category]?.[isAr ? "ar" : "en"] ?? post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h3
                    className="font-bold text-gray-950 dark:text-white group-hover:text-[#C5A880] transition-colors mb-3 leading-snug"
                    style={{ fontSize: "16px", lineHeight: 1.4 }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-4 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div
                    className="flex items-center gap-3 text-gray-400"
                    style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    <span>{formatDate(post.publishedAt, isAr)}</span>
                    <span>•</span>
                    <span>{readTimeLabel(post.readingTime, isAr)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-950 py-20 text-center">
        <div className="container-brand">
          <h2
            className="font-sans font-extrabold text-white uppercase mb-4"
            style={{ fontSize: "clamp(22px, 3vw, 36px)", letterSpacing: "-0.01em" }}
          >
            {t("newsletter")}
          </h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto text-sm leading-relaxed">
            {t("newsletterSub")}
          </p>
          <NewsletterForm
            placeholder={isAr ? "بريدك الإلكتروني" : "Your email address"}
            submitLabel={t("subscribe")}
          />
        </div>
      </section>
    </div>
  );
}
