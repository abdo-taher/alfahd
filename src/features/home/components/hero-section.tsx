"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[--color-brand-secondary]"
      aria-label={t("title")}
    >
      {/* Video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        preload="none"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[--color-brand-secondary]/70 via-[--color-brand-secondary]/80 to-[--color-brand-secondary]"
        aria-hidden="true"
      />

      {/* Gold glow */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-96 bg-[--color-brand-accent] opacity-5 blur-[100px] rounded-full"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Tagline badge */}
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[--color-brand-accent]/30 bg-[--color-brand-accent]/10 px-4 py-1.5 text-sm font-medium text-[--color-brand-accent]">
            {t("tagline")}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl text-balance"
        >
          {t("title")}{" "}
          <span className="text-[--color-brand-accent]">{t("titleHighlight")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base text-white/70 leading-relaxed sm:text-lg"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button asChild size="xl" variant="accent">
            <Link href={`/${locale}/request-quote`}>
              {t("ctaPrimary")}
              <ArrowIcon className="size-5" />
            </Link>
          </Button>

          <Button asChild size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50">
            <Link href={`/${locale}/projects`}>
              {t("ctaSecondary")}
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-white/40 uppercase tracking-widest">{t("scrollDown")}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="size-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
