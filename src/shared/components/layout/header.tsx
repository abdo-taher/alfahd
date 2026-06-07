"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { Container } from "@/shared/components/ui/container";
import { Button } from "@/shared/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
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
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background border-b border-transparent",
      ].join(" ")}
    >
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        {/* t("common.skipToContent") is in layout, using static fallback */}
        Skip to content
      </a>

      <Container className="flex h-16 items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-md"
          aria-label="شركة الفهد للمقاولات — الرئيسية"
        >
          <span className="text-xl font-bold text-primary leading-none">
            الفهد
          </span>
          <span className="hidden sm:block text-xs text-muted-foreground leading-none mt-0.5">
            للمقاولات
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-1"
          role="navigation"
          aria-label={t("menu")}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          <Button
            asChild
            size="sm"
            variant="primary"
            className="hidden sm:inline-flex"
          >
            <Link href={`/${locale}/request-quote`}>
              {t("requestQuote")}
            </Link>
          </Button>

          <MobileMenu navLinks={navLinks} />
        </div>
      </Container>
    </header>
  );
}
