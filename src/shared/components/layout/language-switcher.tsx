"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  function switchLang(locale: "en" | "ar") {
    if (locale === currentLocale) return;

    // Swap the locale segment at the start of the path: /en/... → /ar/...
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/") || "/");
  }

  return (
    <div className="flex gap-2 text-sm">
      <button
        onClick={() => switchLang("en")}
        className={currentLocale === "en" ? "font-semibold" : "opacity-60 hover:opacity-100"}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="opacity-30">|</span>
      <button
        onClick={() => switchLang("ar")}
        className={currentLocale === "ar" ? "font-semibold" : "opacity-60 hover:opacity-100"}
        aria-label="Switch to Arabic"
      >
        AR
      </button>
    </div>
  );
}
