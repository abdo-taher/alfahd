"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  return (
    <section
      className="relative h-screen w-full flex items-center overflow-hidden"
      aria-label={t("title")}
    >
      {/* Background video */}
      <video
        className="absolute inset-0 z-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* hero-vignette overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,40,104,0.4) 100%), linear-gradient(to left, rgba(10,61,145,0.9), rgba(10,61,145,0.2))",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 container-brand w-full">
        <div className="max-w-4xl text-right">

          {/* Tagline row: gold label + gold line */}
          <div className="flex items-center gap-4 justify-end mb-8">
            <span className="text-[--color-brand-gold] font-bold tracking-[0.3em] uppercase text-xs">
              Architectural Excellence
            </span>
            <span className="h-[1px] w-12 bg-[--color-brand-gold]/50" aria-hidden="true" />
          </div>

          {/* Headline */}
          <h1
            className="font-bold text-white mb-8"
            style={{ fontSize: "clamp(48px, 7vw, 84px)", lineHeight: 1 }}
          >
            {t("title")}{" "}
            <br />
            <span className="text-[--color-brand-gold]">{t("titleHighlight")}</span>
          </h1>

          {/* Description */}
          <p className="text-white/80 text-lg md:text-xl max-w-2xl ms-auto mb-14 font-light leading-relaxed">
            {t("description")}
          </p>

          {/* CTAs */}
          <div
            className={`flex gap-8 items-center ${
              locale === "ar" ? "flex-row-reverse justify-start" : "flex-row justify-start"
            }`}
          >
            {/* Primary — gold filled */}
            <Link
              href={`/${locale}/request-quote`}
              className="bg-[--color-brand-gold] text-[#001947] font-bold px-12 py-6 rounded-sm text-lg hover:bg-white hover:text-[--color-brand-primary] transition-all duration-500 shadow-2xl shadow-[#C8A75D]/20 active:scale-95"
            >
              {t("ctaPrimary")}
            </Link>

            {/* Secondary — ghost with play icon */}
            <Link
              href={`/${locale}/projects`}
              className="group flex items-center gap-4 text-white font-medium text-lg hover:text-[--color-brand-gold] transition-colors"
            >
              {/* Play circle icon (SVG, no external font dependency) */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-10 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                  clipRule="evenodd"
                />
              </svg>
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40 z-10"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-8 text-white"
        >
          <path
            fillRule="evenodd"
            d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </section>
  );
}
