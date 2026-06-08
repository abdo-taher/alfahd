"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(next: "ar" | "en") {
    if (next === locale) return;
    // Swap locale segment: /ar/services → /en/services
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || `/${next}`);
  }

  return (
    <div
      className="flex items-center rounded overflow-hidden border border-gray-200"
      role="group"
      aria-label="Language selector"
    >
      {(["ar", "en"] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => switchLocale(lang)}
          className={cn(
            "px-3 py-1.5 text-xs font-bold tracking-wider uppercase transition-colors duration-200",
            locale === lang
              ? "bg-gray-950 text-white"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          )}
          aria-pressed={locale === lang}
          aria-label={lang === "ar" ? "العربية" : "English"}
        >
          {lang === "ar" ? "عر" : "EN"}
        </button>
      ))}
    </div>
  );
}
