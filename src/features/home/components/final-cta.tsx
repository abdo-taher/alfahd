"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function FinalCta() {
  const locale = useLocale();
  const t = useTranslations("home.cta");

  return (
    <section
      className="relative bg-gray-950 text-white py-24 text-center overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      {/* Dot-grid decorative overlay — reference app signature */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.08,
        }}
        aria-hidden="true"
      />

      <div className="container-brand relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Gold eyebrow */}
          <span
            className="block mb-6 font-bold uppercase tracking-widest text-xs"
            style={{
              color: "#C5A880",
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            }}
          >
            {locale === "ar" ? "الخطوة التالية" : "The Next Step"}
          </span>

          <h2
            id="final-cta-heading"
            className="font-sans font-extrabold uppercase tracking-tight text-white mb-6"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            {locale === "ar"
              ? "جاهز لبناء صرحك المعماري القادم؟"
              : "READY TO FORGE EXCELLENCE?"}
          </h2>

          <p
            className="text-gray-400 mb-10 max-w-2xl mx-auto"
            style={{ fontSize: "16px", lineHeight: "1.8" }}
          >
            {t("description")}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/request-quote`}
              className="inline-flex items-center gap-3 bg-white text-gray-950 px-8 py-4 font-sans font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all duration-200 active:scale-95"
            >
              {t("primary")}
              <span
                className="material-symbols-outlined"
                aria-hidden="true"
                style={{ fontSize: "14px" }}
              >
                {locale === "ar" ? "arrow_back" : "arrow_forward"}
              </span>
            </Link>

            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 font-sans font-bold text-xs uppercase tracking-widest text-white transition-all duration-200"
              style={{ border: "2px solid rgba(255,255,255,0.2)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.2)";
              }}
            >
              {t("secondary")}
            </a>
          </div>

          {/* Contact info */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <a
              href="tel:+96611445922"
              className="flex items-center gap-2 text-gray-400 hover:text-[#C5A880] transition-colors text-sm"
              dir="ltr"
            >
              <span className="material-symbols-outlined text-[#C5A880]" aria-hidden="true" style={{ fontSize: "18px" }}>phone</span>
              +966 11 445 9222
            </a>
            <a
              href="mailto:engineering@al-fahd.com.sa"
              className="flex items-center gap-2 text-gray-400 hover:text-[#C5A880] transition-colors text-sm"
            >
              <span className="material-symbols-outlined text-[#C5A880]" aria-hidden="true" style={{ fontSize: "18px" }}>mail</span>
              engineering@al-fahd.com.sa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
