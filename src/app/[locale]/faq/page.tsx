import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/seo/metadata/page-metadata";
import { faqSchema, breadcrumbSchema } from "@/seo/schema/organization";
import { contentRepository } from "@/lib/content/content-repository";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return generatePageMetadata({
    title: isAr
      ? "الأسئلة الشائعة | مؤسسة الفهد للمقاولات"
      : "FAQ | Al Fahd Contracting",
    description: isAr
      ? "إجابات شاملة لأكثر الأسئلة التي يطرحها عملاؤنا حول أعمال الألمنيوم والزجاج والحديد."
      : "Comprehensive answers to the most common questions about aluminium, glass, and steel works.",
    path: `/${locale}/faq`,
    locale,
    keywords: isAr
      ? ["أسئلة شائعة مقاولات الرياض", "FAQ ألمنيوم", "أسئلة أعمال الزجاج"]
      : ["FAQ aluminum Riyadh", "contracting FAQ Saudi Arabia"],
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const faqHub = await contentRepository.getFaqHub(locale);
  const allQs = faqHub.categories.flatMap((c) => c.questions);
  const faqSd = faqSchema(allQs);
  const crumbs = breadcrumbSchema([
    { name: isAr ? "الرئيسية" : "Home", url: `${BASE_URL}/${locale}` },
    { name: isAr ? "الأسئلة الشائعة" : "FAQ", url: `${BASE_URL}/${locale}/faq` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs).replace(/</g, "\\u003c") }} />
      <div className="pt-20">
        <section className="bg-[#002868] text-white py-20 text-center">
          <div className="container-brand">
            <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-4">
              {isAr ? "مركز المساعدة" : "Help Center"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
              {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h1>
            <p className="text-white/70 max-w-xl mx-auto leading-relaxed">
              {isAr
                ? "إجابات شاملة لأكثر الأسئلة التي يطرحها عملاؤنا"
                : "Comprehensive answers to our most common client questions"}
            </p>
          </div>
        </section>
        <section className="section-py bg-[#FAF9F5]">
          <div className="container-brand max-w-4xl">
            {faqHub.categories.map((category) => (
              <div key={category.id} className="mb-12">
                <h2 className="text-xl font-bold text-[#002868] mb-6 border-s-4 border-[#C5A880] ps-4">
                  {category.label}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((item, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                      <h3 className="font-bold text-[#002868] mb-3 flex items-start gap-3">
                        <span className="font-mono text-[#C5A880] text-sm shrink-0">
                          {i < 9 ? `0${i + 1}` : i + 1}
                        </span>
                        {item.question}
                      </h3>
                      <p className="text-sm text-[#434652] leading-relaxed ps-8">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-16 text-center bg-white border border-gray-100 rounded-xl p-10">
              <h3 className="text-xl font-bold text-[#002868] mb-3">
                {isAr ? "لم تجد إجابتك؟" : "Didn't find your answer?"}
              </h3>
              <p className="text-[#434652] mb-6">
                {isAr ? "فريقنا الهندسي جاهز للإجابة" : "Our engineering team is ready to help"}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center bg-[#002868] text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-[#0a3d91] transition-colors"
              >
                {isAr ? "تواصل معنا مباشرة" : "Contact Us Directly"}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
