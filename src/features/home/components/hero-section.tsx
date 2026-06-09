import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";

export async function HeroSection() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "home.hero" });

  const stats = [
    { value: "40+", label: t("statsYears") },
    { value: "1,200+", label: t("statsProjects") },
    { value: "50,000+", label: t("statsProduction") },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gray-950"
      aria-label={t("title")}
    >
      {/* Background architectural image */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvwblNQmF23c_-OuBV0Z0mf899U3_IkjyA5GnwYGAucjLJr5dMn4fIRHOfRhrQXKQp1a9UF4SKTzcHO07m1-nUIN8f_QUAjLWOljnWsKMOYjU7ZIn6cThWq5YIMviz3Qd7OUCZHsN6q0oRTv7_eVjGrBEZw7gJy4I-LzfztGObl7J5yG9JI_9gnbij6SjS2w2HIjWEm3bHFsUza4MeB5TPRd7ny3i0jgWuZ4MUHoJJl342TdyBkVCpsyd88Cfw5CrSk5MCpK67kb14"
          alt=""
          className="w-full h-full object-cover opacity-25"
          aria-hidden="true"
        />
        {/* Dark overlay with slight gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(3,7,18,0.95) 0%, rgba(3,7,18,0.70) 60%, rgba(3,7,18,0.85) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Hero video fallback (optional) */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-15 z-[1]"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="container-brand relative z-20 w-full py-16 md:py-24">
        <div className="max-w-4xl text-white">

          {/* Gold pill badge — reference style */}
          <span
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#C5A880",
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" aria-hidden="true" />
            {t("badge")}
          </span>

          {/* H1 */}
          <h1
            className="font-sans font-extrabold text-white mb-6 uppercase tracking-tight"
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {t("title")}{" "}
            <span className="text-gradient-gold">{t("titleHighlight")}</span>
          </h1>

          {/* Description */}
          <p
            className="text-white/75 mb-10 max-w-2xl"
            style={{ fontSize: "18px", lineHeight: "1.8", fontWeight: 300 }}
          >
            {t("description")}
          </p>

          {/* CTAs — reference style */}
          <div className="flex flex-wrap gap-4 mb-16">
            {/* Primary: white button */}
            <Link
              href={`/${locale}/request-quote`}
              className="inline-flex items-center gap-3 bg-white text-gray-950 px-8 py-4 font-sans font-bold text-sm uppercase tracking-wider hover:bg-gray-100 transition-all duration-200 active:scale-95 shadow-lg"
            >
              {t("ctaPrimary")}
              <span
                className="material-symbols-outlined"
                aria-hidden="true"
                style={{ fontSize: "16px" }}
              >
                {locale === "ar" ? "arrow_back" : "arrow_forward"}
              </span>
            </Link>

            {/* Secondary: ghost */}
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-3 px-8 py-4 font-sans font-bold text-sm uppercase tracking-wider text-white transition-all duration-200 border-2 border-white/25 hover:border-white/60"
            >
              {t("ctaSecondary")}
            </Link>
          </div>

          {/* Stats row — reference style */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
            {stats.map((stat, i) => (
              <div key={i}>
                <div
                  className="font-sans font-bold mb-1"
                  style={{
                    fontSize: "clamp(24px, 3vw, 36px)",
                    color: "#C5A880",
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-gray-400 uppercase"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
