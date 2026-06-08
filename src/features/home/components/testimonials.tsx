import { getTranslations, getLocale } from "next-intl/server";

const articles = [
  {
    slug: "aluminum-facades-guide",
    categoryAr: "الألمنيوم",
    categoryEn: "Aluminum",
    titleAr: "دليل شامل لواجهات الألمنيوم في المباني التجارية",
    titleEn: "Complete Guide to Aluminum Facades for Commercial Buildings",
    excerptAr: "كل ما تحتاج معرفته عند اختيار واجهات الألمنيوم لمشروعك — من اختيار الخامة إلى التركيب والصيانة",
    excerptEn: "Everything you need to know when choosing aluminum facades — from material selection to installation and maintenance",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    date: "2024-03-15",
  },
  {
    slug: "glass-insulation-types",
    categoryAr: "الزجاج",
    categoryEn: "Glass",
    titleAr: "أنواع الزجاج العازل وكيفية اختيار المناسب لمشروعك",
    titleEn: "Types of Insulated Glass and How to Choose the Right One",
    excerptAr: "مقارنة مفصلة بين الزجاج المزدوج والمقسى والذكي وكيف تختار الأنسب لمشروعك",
    excerptEn: "A detailed comparison of double-glazed, tempered, and smart glass for your Saudi project",
    image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=600&q=80",
    date: "2024-02-28",
  },
  {
    slug: "steel-structures-benefits",
    categoryAr: "الهياكل المعدنية",
    categoryEn: "Steel",
    titleAr: "مزايا الهياكل الحديدية في مشاريع المستودعات الصناعية",
    titleEn: "Benefits of Steel Structures for Industrial Warehouse Projects",
    excerptAr: "لماذا تعتمد كبرى المصانع السعودية على الهياكل الحديدية؟ وما مزاياها على الخرسانة؟",
    excerptEn: "Why do Saudi Arabia's largest factories rely on steel structures, and what are their advantages?",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    date: "2024-02-10",
  },
];

export async function Testimonials() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.testimonials" });

  return (
    <section className="section-padding bg-white" aria-labelledby="media-heading">
      <div className="container-brand">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-[#C8A75D] font-bold uppercase tracking-widest text-sm mb-4 block">
              {locale === "ar" ? "المركز الإعلامي" : "Media Center"}
            </span>
            <h2
              id="media-heading"
              className="text-[#002868]"
              style={{ fontSize: "48px", lineHeight: "1.2", fontWeight: 700 }}
            >
              {locale === "ar"
                ? "آخر الأخبار والمقالات"
                : "Latest News & Articles"}
            </h2>
          </div>
          <a
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 border-2 border-[#002868] text-[#002868] px-8 py-3 font-bold rounded-xl hover:bg-[#002868]/5 transition-all duration-200 shrink-0"
          >
            {locale === "ar" ? "عرض الكل" : "View All"}
          </a>
        </div>

        {/* 3-col article grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles.map((article) => (
            <article key={article.slug} className="group">
              {/* Image container — rounded-3xl h-64 */}
              <div className="rounded-3xl overflow-hidden mb-6 h-64">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={locale === "ar" ? article.titleAr : article.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Category */}
              <span className="text-[#C8A75D] text-xs font-bold uppercase tracking-widest">
                {locale === "ar" ? article.categoryAr : article.categoryEn}
              </span>

              {/* Title — gold on hover */}
              <h3 className="text-xl font-bold text-[#002868] mt-2 mb-4 group-hover:text-[#C8A75D] transition-colors leading-snug">
                {locale === "ar" ? article.titleAr : article.titleEn}
              </h3>

              {/* Excerpt */}
              <p
                className="text-[#434652] line-clamp-2"
                style={{ fontSize: "16px", lineHeight: "1.8" }}
              >
                {locale === "ar" ? article.excerptAr : article.excerptEn}
              </p>

              {/* Date + read more */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-[#747783]">{article.date}</span>
                <a
                  href={`/${locale}/blog/${article.slug}`}
                  className="text-sm font-bold text-[#002868] hover:text-[#C8A75D] transition-colors flex items-center gap-1 group-hover:gap-2"
                >
                  {locale === "ar" ? "اقرأ المزيد" : "Read More"}
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_back</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
