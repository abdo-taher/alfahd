"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function HeroSection() {
  const t = useTranslations("home.hero");
  const st = useTranslations("home.stats");
  const locale = useLocale();
  const stats = st.raw("items") as Array<{ value: string; suffix: string; label: string }>;

  return (
    <section
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      aria-label={t("title")}
    >
      {/* Background image with gradient overlay — matching master reference */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-l from-primary/90 to-primary/40 z-10" aria-hidden="true" />
        {/* Hero background — using video as fallback to static color */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="container-brand relative z-20 w-full">
        <div className="max-w-4xl text-white">
          {/* Eyebrow badge — master reference style */}
          <span
            className="inline-block mb-6 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-xs"
            style={{
              background: "rgba(200,167,93,0.2)",
              border: "1px solid rgba(200,167,93,0.3)",
              color: "#C8A75D",
            }}
          >
            {locale === "ar"
              ? "الفهد للمقاولات | التميز الهندسي"
              : "Al-Fahad Contracting | Engineering Excellence"}
          </span>

          {/* H1 — display-xl 72px desktop, 48px mobile */}
          <h1
            className="font-bold text-white mb-6 leading-tight"
            style={{ fontSize: "clamp(48px, 6vw, 72px)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            {t("title")}{" "}
            <span className="text-gradient-gold">{t("titleHighlight")}</span>
          </h1>

          {/* Body — 18px weight 300, lineHeight 1.8 */}
          <p
            className="text-white mb-10 max-w-2xl"
            style={{ fontSize: "18px", lineHeight: "1.8", fontWeight: 300, opacity: 0.9 }}
          >
            {t("description")}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-6 mb-16">
            {/* Primary: gold button */}
            <Link
              href={`/${locale}/request-quote`}
              className="inline-flex items-center gap-3 bg-[#C8A75D] text-[#001947] px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-xl"
            >
              {t("ctaPrimary")}
              <span className="material-symbols-outlined text-xl" aria-hidden="true">arrow_back</span>
            </Link>

            {/* Secondary: ghost */}
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-lg text-white"
              style={{
                border: "1px solid rgba(255,255,255,0.3)",
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "white";
                (e.currentTarget as HTMLAnchorElement).style.color = "#002868";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "";
                (e.currentTarget as HTMLAnchorElement).style.color = "white";
              }}
            >
              {t("ctaSecondary")}
            </Link>
          </div>

          {/* Stats row INSIDE hero — 4 stats below CTA with border-t */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/20">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-[#C8A75D] mb-1">
                  +{stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
