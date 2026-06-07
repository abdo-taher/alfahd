"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

export function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden" aria-label={t("title")}>
      {/* Background video/image */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay muted loop playsInline preload="none"
          aria-hidden="true"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay — from primary on one side to transparent */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#002868]/95 via-[#002868]/60 to-transparent" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-brand w-full">
        <div className="max-w-2xl text-white">
          {/* Gold badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-bar" aria-hidden="true" />
              <span className="text-label-bold text-[#dae2ff] uppercase tracking-widest">
                {t("tagline")}
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-display-mobile lg:text-display font-bold leading-tight text-white mb-6 text-balance"
          >
            {t("title")}{" "}
            <span className="text-[--color-brand-gold]">{t("titleHighlight")}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg text-[#dae2ff]/90 mb-10 leading-relaxed max-w-xl"
          >
            {t("description")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href={`/${locale}/request-quote`}
              className="inline-flex items-center justify-center bg-[--color-brand-gold] text-[#001947] px-10 py-4 text-label-bold rounded hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300 luxury-shadow active:scale-95"
            >
              {t("ctaPrimary")}
            </Link>
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center justify-center border border-white/30 bg-white/10 backdrop-blur-sm text-white px-10 py-4 text-label-bold rounded hover:bg-white/20 transition-all duration-300 active:scale-95"
            >
              {t("ctaSecondary")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
