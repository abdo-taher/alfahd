"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/shared/components/ui/container";
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
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled
          ? "glass-header border-[--color-border] shadow-sm py-3"
          : "bg-[--color-brand-surface]/80 backdrop-blur-md border-transparent py-4",
      ].join(" ")}
    >
      {/* Skip to content — text only, no image inside */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        aria-label={locale === "ar" ? "انتقل للمحتوى" : "Skip to content"}
      >
        {locale === "ar" ? "انتقل للمحتوى" : "Skip to content"}
      </a>

      <Container>
        <div className="flex items-center justify-between gap-6">
          {/* Logo — RTL: rendered last visually but first in DOM */}
          <div className={locale === "ar" ? "order-last" : "order-first"}>
            <Link
              href={`/${locale}`}
              className="flex items-center focus-visible:outline-2 focus-visible:outline-ring rounded"
              aria-label={locale === "ar" ? "شركة الفهد للمقاولات" : "Al Fahd Contracting"}
            >
              <Image
                src="/images/logo.svg"
                alt={locale === "ar" ? "شركة الفهد للمقاولات" : "Al Fahd Contracting"}
                width={160}
                height={48}
                priority
                className="h-10 md:h-12 w-auto object-contain"
              />
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
            {navLinks.map((link) => {
              const isActive =
                link.href === `/${locale}`
                  ? pathname === link.href
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "text-label-bold relative py-1 uppercase tracking-wider transition-colors duration-200",
                    isActive
                      ? "text-[#C8A75D] font-bold border-b-2 border-[#C8A75D] pb-1"
                      : "text-[--color-muted-foreground] hover:text-[#C8A75D]",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div
            className={[
              "flex items-center gap-3",
              locale === "ar" ? "order-first flex-row-reverse" : "order-last",
            ].join(" ")}
          >
            {/* Phone number — visible on desktop (master reference) */}
            <span className="hidden lg:flex items-center gap-2 text-[#002868] font-bold text-sm" dir="ltr">
              <span className="material-symbols-outlined text-base" aria-hidden="true">phone</span>
              92000XXXX
            </span>

            <LanguageSwitcher />

            {/* Gold CTA button — matching master reference */}
            <Link
              href={`/${locale}/request-quote`}
              className="hidden sm:inline-flex items-center justify-center bg-[#C8A75D] text-[#001947] px-6 py-2 font-bold rounded-xl hover:shadow-lg transition-all duration-300 active:scale-95 text-sm"
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
