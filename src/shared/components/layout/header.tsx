"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/shared/components/ui/container";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
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
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled
          ? "glass-header border-[--color-border] shadow-sm py-3"
          : "bg-[--color-brand-surface]/80 backdrop-blur-md border-transparent py-4",
      ].join(" ")}
    >
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {locale === "ar" ? "انتقل للمحتوى" : "Skip to content"}
      </a>

      <Container>
        <div className="flex items-center justify-between gap-6">
          {/* Logo — RTL: right side */}
          <div className={locale === "ar" ? "order-last" : "order-first"}>
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-ring rounded"
              aria-label={locale === "ar" ? "شركة الفهد للمقاولات" : "Al Fahd Contracting"}
            >
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-[--color-brand-primary] tracking-tight">
                  {locale === "ar" ? "الفهد" : "Al Fahd"}
                </span>
                <span className="text-[11px] text-[--color-muted-foreground] tracking-widest uppercase">
                  {locale === "ar" ? "للمقاولات" : "Contracting"}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav
            className={[
              "hidden lg:flex items-center gap-8",
              locale === "ar" ? "flex-row-reverse" : "",
            ].join(" ")}
            role="navigation"
            aria-label={t("menu")}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-label-bold text-[--color-muted-foreground] hover:text-[--color-brand-primary] transition-colors duration-200 relative py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={[
            "flex items-center gap-3",
            locale === "ar" ? "order-first flex-row-reverse" : "order-last",
          ].join(" ")}>
            <LanguageSwitcher />

            <Link
              href={`/${locale}/request-quote`}
              className="hidden sm:inline-flex items-center justify-center bg-[--color-brand-primary] text-white px-5 py-2.5 text-label-bold rounded hover:bg-[--color-brand-container] transition-all duration-200 active:scale-95"
            >
              {t("requestQuote")}
            </Link>

            <MobileMenu navLinks={navLinks} />
          </div>
        </div>
      </Container>
    </header>
  );
}
