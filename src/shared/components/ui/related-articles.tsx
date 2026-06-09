import Link from "next/link";
import { contentRepository } from "@/lib/content/content-repository";

interface RelatedArticlesProps {
  locale: string;
  serviceSlug: string;
}

export async function RelatedArticles({ locale, serviceSlug }: RelatedArticlesProps) {
  const isAr = locale === "ar";
  const allPosts = await contentRepository.getBlogPosts(locale);
  // Filter by relatedServiceSlug if field exists, otherwise fall back to empty
  const related = allPosts
    .filter((p: Record<string, unknown>) => p.relatedServiceSlug === serviceSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="section-py bg-white border-t border-gray-100">
      <div className="container-brand">
        <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-4">
          {isAr ? "مقالات ذات صلة" : "Related Articles"}
        </span>
        <h2 className="text-xl font-bold text-[#002868] mb-8">
          {isAr ? "من مدونتنا الهندسية" : "From Our Engineering Blog"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {related.map((post: Record<string, unknown>) => (
            <Link
              key={post.slug as string}
              href={`/${locale}/blog/${post.slug}`}
              className="group block bg-[#FAF9F5] border border-gray-100 rounded-lg p-5 hover:border-[#002868] transition-colors"
            >
              <h3 className="font-bold text-[#002868] group-hover:text-[#C5A880] transition-colors mb-2 line-clamp-2 text-sm leading-snug">
                {post.title as string}
              </h3>
              <p className="text-xs text-[#747783] line-clamp-2">{post.excerpt as string}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
