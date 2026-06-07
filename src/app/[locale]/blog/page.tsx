import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { generatePageMetadata } from "@/seo/metadata/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return generatePageMetadata({
    title: t("title"),
    description: t("description"),
    path: `/${locale}/blog`,
    locale,
  });
}

// Static placeholder articles until a real blog content source is wired up
function getBlogPosts(locale: string) {
  const ar = [
    {
      slug: "aluminum-facades-guide",
      title: "دليل شامل لواجهات الألمنيوم في المباني التجارية",
      excerpt: "كل ما تحتاج معرفته عند اختيار واجهات الألمنيوم لمشروعك التجاري — من اختيار الخامة إلى التركيب والصيانة",
      category: "aluminum",
      author: "فريق الفهد",
      publishedAt: "2024-03-15",
      readingTime: 7,
    },
    {
      slug: "glass-insulation-types",
      title: "أنواع الزجاج العازل وكيفية اختيار المناسب لمشروعك",
      excerpt: "مقارنة مفصلة بين الزجاج المزدوج والمقسى والذكي وكيف تختار الأنسب لمشروعك السعودي",
      category: "glass",
      author: "م. أحمد السليم",
      publishedAt: "2024-02-28",
      readingTime: 5,
    },
    {
      slug: "steel-structures-benefits",
      title: "مزايا الهياكل الحديدية في مشاريع المستودعات الصناعية",
      excerpt: "لماذا تعتمد كبرى المصانع السعودية على الهياكل الحديدية؟ وما مزاياها على الخرسانة التقليدية؟",
      category: "steel",
      author: "م. خالد الدوسري",
      publishedAt: "2024-02-10",
      readingTime: 6,
    },
    {
      slug: "project-management-tips",
      title: "٥ نصائح أساسية لإدارة مشاريع المقاولات بنجاح",
      excerpt: "من التخطيط إلى التسليم — نصائح عملية من خبرتنا في تنفيذ أكثر من ٥٠٠ مشروع",
      category: "project-management",
      author: "فريق الفهد",
      publishedAt: "2024-01-20",
      readingTime: 8,
    },
  ];

  const en = [
    {
      slug: "aluminum-facades-guide",
      title: "Complete Guide to Aluminum Facades for Commercial Buildings",
      excerpt: "Everything you need to know when choosing aluminum facades for your commercial project — from material selection to installation and maintenance",
      category: "aluminum",
      author: "Al Fahd Team",
      publishedAt: "2024-03-15",
      readingTime: 7,
    },
    {
      slug: "glass-insulation-types",
      title: "Types of Insulated Glass and How to Choose the Right One",
      excerpt: "A detailed comparison of double-glazed, tempered, and smart glass — and how to choose the best for your Saudi project",
      category: "glass",
      author: "Eng. Ahmed Al-Salim",
      publishedAt: "2024-02-28",
      readingTime: 5,
    },
    {
      slug: "steel-structures-benefits",
      title: "Benefits of Steel Structures for Industrial Warehouses",
      excerpt: "Why do Saudi Arabia's largest factories rely on steel structures? And what are their advantages over traditional concrete?",
      category: "steel",
      author: "Eng. Khalid Al-Dosari",
      publishedAt: "2024-02-10",
      readingTime: 6,
    },
    {
      slug: "project-management-tips",
      title: "5 Essential Tips for Successful Contracting Project Management",
      excerpt: "From planning to handover — practical tips from our experience delivering over 500 projects",
      category: "project-management",
      author: "Al Fahd Team",
      publishedAt: "2024-01-20",
      readingTime: 8,
    },
  ];

  return locale === "ar" ? ar : en;
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getBlogPosts(locale);
  const [featured, ...rest] = posts;

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

      <section className="section-py bg-surface">
        <div className="container-brand">
          {/* Featured post */}
          <div className="mb-20">
            <Link
              href={`/${locale}/blog/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-surface-container-lowest rounded-lg overflow-hidden luxury-shadow hover:luxury-shadow-hover transition-all duration-500"
            >
              {/* Image placeholder */}
              <div className="relative h-72 lg:h-auto enterprise-gradient min-h-[280px]">
                <div className="absolute inset-0 card-image-gradient" aria-hidden="true" />
                <div className="absolute bottom-0 start-0 p-8 z-10">
                  <span className="bg-gold text-on-primary-fixed text-caption font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {t(`categories.${featured.category}` as Parameters<typeof t>[0])}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-10 lg:p-14 flex flex-col justify-center">
                <span className="text-label-bold text-primary uppercase tracking-widest block mb-4">
                  {locale === "ar" ? "المقال المميز" : "Featured Article"}
                </span>
                <h2 className="text-headline-md text-on-surface group-hover:text-primary transition-colors mb-4 leading-snug">
                  {featured.title}
                </h2>
                <p className="text-body-lg text-on-surface-variant leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-caption text-outline mb-6">
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span>{featured.publishedAt}</span>
                  <span>·</span>
                  <span>
                    {featured.readingTime} {t("readingTime")}
                  </span>
                </div>
                <span className="text-label-bold text-primary inline-flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                  {t("readMore")}
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
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="group flex flex-col bg-surface-container-lowest rounded-lg overflow-hidden luxury-shadow hover:luxury-shadow-hover transition-all duration-500"
              >
                {/* Image placeholder */}
                <div className="relative h-48 enterprise-gradient overflow-hidden">
                  <div className="absolute inset-0 card-image-gradient" aria-hidden="true" />
                  <div className="absolute bottom-0 start-0 p-5 z-10">
                    <span className="bg-gold text-on-primary-fixed text-caption font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {t(`categories.${post.category}` as Parameters<typeof t>[0])}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-7">
                  <h3 className="text-headline-sm text-on-surface group-hover:text-primary transition-colors mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant leading-relaxed flex-1 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-caption text-outline">
                    <span>{post.publishedAt}</span>
                    <span>·</span>
                    <span>
                      {post.readingTime} {t("readingTime")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="enterprise-gradient py-24 text-center">
        <div className="container-brand">
          <h2 className="text-display-mobile lg:text-headline-md text-white mb-4">
            {locale === "ar" ? "اشترك في نشرتنا البريدية" : "Subscribe to Our Newsletter"}
          </h2>
          <p className="text-body-lg text-primary-fixed mb-10 max-w-lg mx-auto">
            {locale === "ar"
              ? "احصل على أحدث المقالات والأخبار مباشرة في بريدك"
              : "Get the latest articles and news directly in your inbox"}
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder={locale === "ar" ? "بريدك الإلكتروني" : "Your email address"}
              className="flex-1 px-5 py-3 text-body-md rounded bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="bg-gold text-on-primary-fixed px-8 py-3 text-label-bold rounded hover:brightness-110 transition-all duration-200"
            >
              {locale === "ar" ? "اشترك" : "Subscribe"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
