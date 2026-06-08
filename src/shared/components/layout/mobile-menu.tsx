"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./language-switcher";

type NavLink = { label: string; href: string };

export function MobileMenu({
  navLinks,
  onOpenChange,
  isTransparent = false,
}: {
  navLinks: NavLink[];
  onOpenChange?: (open: boolean) => void;
  isTransparent?: boolean;
}) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isRTL = locale === "ar";

  const handleOpen = (value: boolean) => {
    setOpen(value);
    onOpenChange?.(value);
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        handleOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Lock body scroll when open — iOS-safe fixed position technique
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape, restore focus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        handleOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Focus first link when drawer opens
  useEffect(() => {
    if (open) {
      const firstLink = drawerRef.current?.querySelector("a");
      setTimeout(() => (firstLink as HTMLElement)?.focus(), 100);
    }
  }, [open]);

  return (
    <div className="lg:hidden">
      {/* Hamburger trigger */}
      <button
        ref={triggerRef}
        onClick={() => handleOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        aria-label={t("menu")}
        className={[
          "flex h-10 w-10 items-center justify-center rounded-xl transition-colors focus-visible:outline-2",
          isTransparent
            ? "text-white/90 hover:bg-white/10 focus-visible:outline-white"
            : "text-[#002868] hover:bg-[#002868]/5 focus-visible:outline-[#002868]",
        ].join(" ")}
      >
        <span className="material-symbols-outlined" aria-hidden="true">menu</span>
      </button>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => handleOpen(false)}
        className={[
          "fixed inset-0 z-40 bg-[#002868]/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={t("menu")}
        className={[
          "fixed top-0 z-50 h-full w-[300px] sm:w-[340px]",
          "flex flex-col bg-white dark:bg-gray-900 shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          isRTL ? "right-0" : "left-0",
          open
            ? "translate-x-0"
            : isRTL
            ? "translate-x-full"
            : "-translate-x-full",
        ].join(" ")}
      >
        {/* ── Drawer Header ─────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#c4c6d3]/40 bg-[#002868]">
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold text-white tracking-tight">الفهد</span>
            <span className="text-[11px] text-white/60 tracking-widest uppercase">للمقاولات</span>
          </div>
          <button
            onClick={() => handleOpen(false)}
            aria-label={t("closeMenu")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-xl" aria-hidden="true">close</span>
          </button>
        </div>

        {/* ── Nav Links ─────────────────────────────────────── */}
        <nav
          className="flex flex-col flex-1 overflow-y-auto px-4 py-4"
          role="navigation"
          aria-label={t("menu")}
        >
          {navLinks.map((link, i) => {
            const isActive =
              link.href === `/${locale}`
                ? pathname === link.href
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-200",
                  isActive
                    ? "bg-[#002868] text-white"
                    : "text-[#434652] dark:text-gray-300 hover:bg-[#002868]/5 dark:hover:bg-gray-800 hover:text-[#002868] dark:hover:text-white",
                ].join(" ")}
                style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
              >
                {isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#C8A75D] shrink-0"
                    aria-hidden="true"
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ── Contact Info ──────────────────────────────────── */}
        <div className="px-6 py-4 border-t border-[#c4c6d3]/30 dark:border-gray-800 bg-[#f3f3fb] dark:bg-gray-800">
          <a
            href="tel:+966920000000"
            className="flex items-center gap-3 text-sm text-[#002868] dark:text-blue-300 font-semibold hover:text-[#C8A75D] transition-colors"
            dir="ltr"
          >
            <span className="material-symbols-outlined text-[#C8A75D] text-base" aria-hidden="true">phone</span>
            +966 92 000 0000
          </a>
          <a
            href="mailto:info@alfahd-contracting.com"
            className="flex items-center gap-3 text-sm text-[#434652] dark:text-gray-400 mt-2 hover:text-[#002868] dark:hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[#C8A75D] text-base" aria-hidden="true">mail</span>
            info@alfahd-contracting.com
          </a>
        </div>

        {/* ── Bottom: CTA + Language ────────────────────────── */}
        <div className="px-5 py-5 border-t border-[#c4c6d3]/30 flex flex-col gap-3">
          <Link
            href={`/${locale}/request-quote`}
            onClick={() => handleOpen(false)}
            className="flex w-full items-center justify-center gap-2 bg-[#C8A75D] text-[#001947] py-3.5 rounded-xl font-bold text-sm hover:brightness-110 active:scale-95 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-base" aria-hidden="true">description</span>
            {t("requestQuote")}
          </Link>

          {/* Language switcher */}
          <div className="flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}
