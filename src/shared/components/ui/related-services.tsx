import Link from "next/link";

const SERVICE_NAMES: Record<string, Record<string, string>> = {
  ar: { "aluminum-works": "أعمال الألمنيوم", "glass-works": "أعمال الزجاج", "steel-works": "أعمال الحديد" },
  en: { "aluminum-works": "Aluminium Works", "glass-works": "Glass Works", "steel-works": "Steel Works" },
};

interface RelatedServicesProps {
  locale: string;
  currentServiceSlug?: string;
}

export function RelatedServices({ locale, currentServiceSlug }: RelatedServicesProps) {
  const isAr = locale === "ar";
  const names = SERVICE_NAMES[locale] ?? SERVICE_NAMES.ar;
  const services = Object.entries(names).filter(([slug]) => slug !== currentServiceSlug);

  return (
    <aside className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="font-mono text-[10px] text-[#747783] uppercase tracking-widest font-bold mb-4">
        {isAr ? "خدمات ذات صلة" : "Related Services"}
      </h3>
      <div className="flex flex-wrap gap-3">
        {services.map(([slug, name]) => (
          <Link
            key={slug}
            href={`/${locale}/services/${slug}`}
            className="px-4 py-2 border border-[#002868] text-[#002868] rounded-lg text-sm font-bold hover:bg-[#002868] hover:text-white transition-colors"
          >
            {name}
          </Link>
        ))}
      </div>
    </aside>
  );
}
