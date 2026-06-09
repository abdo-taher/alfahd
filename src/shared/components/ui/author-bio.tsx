import Link from "next/link";

interface AuthorBioProps {
  locale: string;
  authorName: string;
  authorSlug: string | null;
}

/**
 * Displays a compact author bio card below a blog post.
 * Uses the authorName directly since a full team-member content repository
 * is not yet available.
 */
export async function AuthorBio({ locale, authorName, authorSlug }: AuthorBioProps) {
  if (!authorSlug) return null;
  const isAr = locale === "ar";

  const initial = authorName.charAt(authorName.length > 3 ? 3 : 0) ?? "م";

  return (
    <aside className="mt-10 pt-8 border-t border-gray-200 bg-white rounded-xl p-6 border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-[#002868] flex items-center justify-center text-white font-bold text-lg shrink-0">
          {initial}
        </div>
        <div className="flex-1">
          <p className="font-bold text-[#002868] text-sm">{authorName}</p>
          <p className="text-[#C5A880] text-xs font-mono mb-2">
            {isAr ? "مهندس متخصص" : "Specialist Engineer"}
          </p>
          <Link
            href={`/${locale}/team/${authorSlug}`}
            className="inline-block mt-2 text-xs text-[#002868] font-bold hover:text-[#C5A880] transition-colors"
          >
            {isAr ? "عرض الملف الشخصي ←" : "View Profile →"}
          </Link>
        </div>
      </div>
    </aside>
  );
}
