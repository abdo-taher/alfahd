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
      className="flex items-center rounded-lg border border-border overflow-hidden"
      role="group"
      aria-label="Language selector"
    >
      {(["ar", "en"] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => switchLocale(lang)}
          className={cn(
            "px-3 py-1.5 text-xs font-semibold transition-colors",
            locale === lang
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
