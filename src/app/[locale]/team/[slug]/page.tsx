import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/seo/metadata/page-metadata";
import { personSchema, breadcrumbSchema } from "@/seo/schema/organization";
import { contentRepository } from "@/lib/content/content-repository";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfahd-contracting.com";

export async function generateStaticParams() {
  const members = await contentRepository.getTeamMembers("ar");
  return ["ar", "en"].flatMap((locale) =>
    members.map((m) => ({ locale, slug: m.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const member = await contentRepository.getTeamMemberBySlug(slug, locale);
  if (!member) return {};
  const isAr = locale === "ar";
  return generatePageMetadata({
    title: isAr
      ? `${member.name} | فريق الفهد الهندسي`
      : `${member.nameEn} | Al Fahd Engineering Team`,
    description: member.bio.slice(0, 160),
    path: `/${locale}/team/${slug}`,
    locale,
    keywords: isAr
      ? [member.name, "مهندس واجهات الرياض", "فريق الفهد"]
      : [member.nameEn, "facade engineer Riyadh"],
  });
}

export default async function TeamProfilePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const member = await contentRepository.getTeamMemberBySlug(slug, locale);
  if (!member) notFound();

  const isAr = locale === "ar";
  const url = `${BASE_URL}/${locale}/team/${slug}`;
  const displayName = isAr ? member.name : member.nameEn;
  const displayTitle = isAr ? member.jobTitle : member.jobTitleEn;

  const personSd = personSchema({
    name: displayName,
    jobTitle: displayTitle,
    slug,
  });
  const crumbs = breadcrumbSchema([
    { name: isAr ? "الرئيسية" : "Home", url: `${BASE_URL}/${locale}` },
    { name: isAr ? "الفريق الهندسي" : "Engineering Team", url: `${BASE_URL}/${locale}/team` },
    { name: displayName, url },
  ]);

  const allPosts = await contentRepository.getBlogPosts(locale);
  const authorPosts = allPosts.filter((p) => member.blogSlugs.includes(p.slug));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs).replace(/</g, "\\u003c") }} />
      <div className="pt-20">
        <section className="bg-[#002868] text-white py-20">
          <div className="container-brand max-w-4xl">
            <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold block mb-4">
              {isAr ? "فريقنا الهندسي" : "Our Engineering Team"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">{displayName}</h1>
            <p className="text-[#C5A880] font-mono text-sm">{displayTitle}</p>
            <p className="text-white/60 mt-1 text-sm">
              {member.yearsExperience} {isAr ? "سنة خبرة" : "years experience"}
            </p>
          </div>
        </section>
        <section className="section-py bg-[#FAF9F5]">
          <div className="container-brand max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-[#002868] mb-4">
                {isAr ? "نبذة مهنية" : "Professional Bio"}
              </h2>
              <p className="text-[#434652] leading-relaxed">{member.bio}</p>
            </div>
            <div>
              <h3 className="font-mono text-[10px] text-[#747783] uppercase tracking-widest font-bold mb-4">
                {isAr ? "التخصصات" : "Specialisations"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {member.specialisations.map((s: string) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-white border border-gray-200 rounded text-xs text-[#434652]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {authorPosts.length > 0 && (
            <div className="container-brand max-w-4xl mt-12">
              <h2 className="text-xl font-bold text-[#002868] mb-6">
                {isAr ? "مقالات المهندس" : "Articles by this Engineer"}
              </h2>
              <div className="space-y-4">
                {authorPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/${locale}/blog/${post.slug}`}
                    className="block bg-white border border-gray-100 rounded-lg p-5 hover:border-[#002868] transition-colors group"
                  >
                    <h3 className="font-bold text-[#002868] group-hover:text-[#C5A880] transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#434652] line-clamp-2">{post.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
