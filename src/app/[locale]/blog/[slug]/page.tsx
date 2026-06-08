import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { generateArticleMetadata } from "@/seo/metadata/article-metadata";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  coverImage: string;
  tags: string[];
  readingTime: number;
  featured?: boolean;
  badgeEN?: string;
  badgeAR?: string;
}

// ─── Data helpers ─────────────────────────────────────────────────────────────

async function getPosts(locale: string): Promise<BlogPost[]> {
  const data = await import(`@/content/${locale}/blog.json`);
  return data.default as BlogPost[];
}

async function getPost(locale: string, slug: string): Promise<BlogPost | undefined> {
  const posts = await getPosts(locale);
  return posts.find((p) => p.slug === slug);
}

// ─── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const locales = ["ar", "en"];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const posts = await getPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
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
  const post = await getPost(locale, slug);
  if (!post) return {};
  return generateArticleMetadata({
    title: post.title,
    excerpt: post.excerpt,
    path: `/${locale}/blog/${slug}`,
    locale,
    publishedAt: post.publishedAt,
    ogImage: post.coverImage,
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const [post, allPosts, t] = await Promise.all([
    getPost(locale, slug),
    getPosts(locale),
    getTranslations({ locale, namespace: "blog" }),
  ]);

  if (!post) notFound();

  const isAr = locale === "ar";

  // Format published date
  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    isAr ? "ar-SA" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  // Related posts: same category, excluding current
  const related = allPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);

  // Category label from i18n
  const categoryLabel = t(`categories.${post.category}` as Parameters<typeof t>[0]) ?? post.category;

  return (
    <div className="pt-20" style={{ background: "#FAF9F5" }}>
      {/* Hero */}
      <section className="relative bg-gray-950 overflow-hidden">
        {/* Cover image */}
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />
        </div>

        <div className="container-brand relative z-10 py-20 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-gray-500 text-xs" aria-label="breadcrumb">
            <Link href={`/${locale}`} className="hover:text-gray-300 transition-colors">
              {isAr ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/blog`} className="hover:text-gray-300 transition-colors">
              {t("title")}
            </Link>
            <span>/</span>
            <span className="text-gray-400 line-clamp-1">{post.title}</span>
          </nav>

          {/* Category chip */}
          <span
            className="inline-block px-3 py-1 font-bold uppercase tracking-wider text-gray-950 mb-6"
            style={{
              background: "#C5A880",
              fontSize: "9px",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {categoryLabel}
          </span>

          {/* Title */}
          <h1
            className="font-sans font-extrabold text-white mb-6 leading-tight"
            style={{ fontSize: "clamp(26px, 4vw, 48px)", lineHeight: 1.1 }}
          >
            {post.title}
          </h1>

          {/* Meta row */}
          <div
            className="flex flex-wrap items-center gap-4 text-gray-400"
            style={{ fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.publishedAt}>{formattedDate}</time>
            <span>•</span>
            <span>
              {post.readingTime} {t("readingTime")}
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-16">
        <div className="container-brand max-w-3xl">
          {/* Excerpt lead */}
          <p
            className="text-gray-600 leading-relaxed mb-10 border-s-4 ps-6"
            style={{ borderColor: "#C5A880", fontSize: "18px" }}
          >
            {post.excerpt}
          </p>

          {/* Content */}
          <div
            className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
            style={{ fontSize: "16px", lineHeight: "1.9" }}
          >
            {post.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container-brand">
            <h2
              className="font-bold text-gray-950 mb-10 uppercase tracking-wider"
              style={{ fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}
            >
              {isAr ? "مقالات ذات صلة" : "Related Articles"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${locale}/blog/${rel.slug}`}
                  className="group flex gap-4 items-start p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div className="relative w-24 h-20 flex-shrink-0 overflow-hidden rounded">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-bold text-gray-950 group-hover:text-[#C5A880] transition-colors line-clamp-2 mb-1"
                      style={{ fontSize: "14px", lineHeight: 1.4 }}
                    >
                      {rel.title}
                    </p>
                    <span
                      className="text-gray-400"
                      style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {rel.readingTime} {t("readingTime")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <section className="py-12 bg-gray-950 text-center">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-gray-300 hover:text-[#C5A880] transition-colors text-sm font-medium"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }} aria-hidden="true">
            {isAr ? "arrow_forward" : "arrow_back"}
          </span>
          {isAr ? "العودة إلى المدونة" : "Back to Blog"}
        </Link>
      </section>
    </div>
  );
}
