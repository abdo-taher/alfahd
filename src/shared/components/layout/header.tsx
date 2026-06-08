"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t("home"),     href: `/${locale}` },
    { label: t("about"),    href: `/${locale}/about` },
    { label: t("services"), href: `/${locale}/services` },
    { label: t("projects"), href: `/${locale}/projects` },
    { label: t("blog"),     href: `/${locale}/blog` },
    { label: t("contact"),  href: `/${locale}/contact` },
  ];

  return (
    <header
      className={[
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "h-16 bg-white/95 backdrop-blur-[20px] border-b border-[#c4c6d3]/40 shadow-sm"
          : "h-20 bg-white/85 backdrop-blur-[20px] border-b border-transparent",
      ].join(" ")}
    >
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:rounded focus:bg-[#002868] focus:px-4 focus:py-2 focus:text-white focus:text-sm"
      >
        {locale === "ar" ? "انتقل للمحتوى" : "Skip to content"}
      </a>

      {/* Inner container */}
      <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between gap-4">

        {/* ── Logo ──────────────────────────────────────────── */}
        <Link
          href={`/${locale}`}
          aria-label={locale === "ar" ? "شركة الفهد للمقاولات — الرئيسية" : "Al Fahd Contracting — Home"}
          className="flex items-center gap-2 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002868] rounded"
        >
          {/* Text logo — swap for <Image> when logo asset is available */}
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold text-[#002868] tracking-tight">الفهد</span>
            <span className="text-[10px] text-[#747783] tracking-[0.18em] uppercase">للمقاولات</span>
          </div>
        </Link>

        {/* ── Desktop Nav ───────────────────────────────────── */}
        <nav
          className="hidden lg:flex items-center gap-8"
          role="navigation"
          aria-label={t("menu")}
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === `/${locale}`
                ? pathname === link.href
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "relative py-1 text-sm font-bold uppercase tracking-wider transition-colors duration-200 whitespace-nowrap",
                  isActive
                    ? "text-[#C8A75D] border-b-2 border-[#C8A75D] pb-1"
                    : "text-[#434652] hover:text-[#C8A75D]",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ── Desktop Actions ───────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Phone number */}
          <a
            href="tel:+966920000000"
            className="flex items-center gap-1.5 text-[#002868] font-bold text-sm hover:text-[#C8A75D] transition-colors"
            dir="ltr"
          >
            <span className="material-symbols-outlined text-base" aria-hidden="true">phone</span>
            +966 92 000 000
          </a>

          <LanguageSwitcher />

          {/* Gold CTA */}
          <Link
            href={`/${locale}/request-quote`}
            className="flex items-center gap-1.5 bg-[#C8A75D] text-[#001947] px-5 py-2 font-bold text-sm rounded-xl hover:brightness-110 hover:shadow-lg transition-all duration-200 active:scale-95 whitespace-nowrap"
          >
            {t("requestQuote")}
          </Link>
        </div>

        {/* ── Mobile: Language + Hamburger ─────────────────── */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Mini language toggle — visible on mobile outside drawer */}
          <div className="hidden sm:flex">
            <LanguageSwitcher />
          </div>
          <MobileMenu navLinks={navLinks} />
        </div>

      </div>
    </header>
  );
}
