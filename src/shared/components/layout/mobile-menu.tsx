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

  // Close on outside click (backdrop click is handled separately)
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
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
      setTimeout(() => (firstLink as HTMLElement)?.focus(), 150);
    }
  }, [open]);

  // Nav link icon map
  const navIcons: Record<string, string> = {
    home: "home",
    about: "info",
    services: "construction",
    projects: "business_center",
    blog: "article",
    contact: "call",
    portal: "lock",
  };

  return (
    <div className="lg:hidden">
      {/* ── Hamburger trigger ───────────────────────────────── */}
      <button
        ref={triggerRef}
        onClick={() => handleOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        aria-label={open ? t("closeMenu") : t("menu")}
        className={[
          "flex h-10 w-10 items-center justify-center rounded-xl transition-colors focus-visible:outline-2",
          isTransparent
            ? "text-white/90 hover:bg-white/10 focus-visible:outline-white"
            : "text-[#002868] dark:text-white hover:bg-[#002868]/5 dark:hover:bg-white/10 focus-visible:outline-[#002868]",
        ].join(" ")}
      >
        <span
          className="material-symbols-outlined transition-all duration-200"
          aria-hidden="true"
          style={{ fontSize: "22px" }}
        >
          {open ? "close" : "menu"}
        </span>
      </button>

      {/* ── Backdrop ────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={() => handleOpen(false)}
        className={[
          "fixed inset-0 z-40 bg-[#001947]/70 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* ── Drawer ──────────────────────────────────────────── */}
      <div
        ref={drawerRef}
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={t("menu")}
        className={[
          // Full height, max 85vw so the backdrop always peeks on the other side
          "fixed top-0 z-50 h-[100dvh] w-[85vw] max-w-[340px]",
          "flex flex-col bg-white dark:bg-gray-900",
          "shadow-[0_0_60px_rgba(0,40,104,0.25)]",
          "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          isRTL ? "right-0" : "left-0",
          open
            ? "translate-x-0"
            : isRTL
            ? "translate-x-full"
            : "-translate-x-full",
        ].join(" ")}
      >
        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#002868] shrink-0">
          {/* Brand mark */}
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-white.png"
              alt="Al-Fahad Logo"
              className="h-10 w-auto object-contain"
              width={40}
              height={40}
            />
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold text-white tracking-tight">الفهد</span>
              <span className="text-[10px] text-white/50 tracking-widest uppercase mt-0.5">
                للمقاولات
              </span>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => handleOpen(false)}
            aria-label={t("closeMenu")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span
              className="material-symbols-outlined"
              aria-hidden="true"
              style={{ fontSize: "20px" }}
            >
              close
            </span>
          </button>
        </div>

        {/* ── Scrollable body ─────────────────────────────────── */}
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto overscroll-contain">
          {/* Nav links */}
          <nav
            className="flex flex-col px-3 pt-3 pb-2"
            role="navigation"
            aria-label={t("menu")}
          >
            {navLinks.map((link, i) => {
              const isActive =
                link.href === `/${locale}`
                  ? pathname === link.href
                  : pathname.startsWith(link.href);

              // Derive icon key from the href segment
              const segment = link.href.split("/").pop() || "home";
              const iconName = navIcons[segment] ?? "chevron_right";

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                    // Stagger in on open
                    open ? "opacity-100 translate-x-0" : "opacity-0",
                    isActive
                      ? "bg-[#002868] text-white"
                      : "text-[#434652] dark:text-gray-300 hover:bg-[#002868]/8 dark:hover:bg-gray-800 hover:text-[#002868] dark:hover:text-white",
                  ].join(" ")}
                  style={{
                    transitionDelay: open ? `${i * 35}ms` : "0ms",
                  }}
                >
                  {/* Icon container */}
                  <span
                    className={[
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                      isActive
                        ? "bg-white/15"
                        : "bg-[#002868]/8 dark:bg-white/5",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    <span
                      className={[
                        "material-symbols-outlined",
                        isActive ? "text-[#C8A75D]" : "text-[#002868] dark:text-gray-400",
                      ].join(" ")}
                      style={{ fontSize: "16px" }}
                    >
                      {iconName}
                    </span>
                  </span>

                  <span className="flex-1 tracking-wide">{link.label}</span>

                  {/* Active indicator */}
                  {isActive && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#C8A75D] shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="mx-5 my-1 h-px bg-[#c4c6d3]/30 dark:bg-gray-700" aria-hidden="true" />

          {/* Quick contact info */}
          <div className="px-5 py-3 space-y-2">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#747783] dark:text-gray-500 mb-3">
              {locale === "ar" ? "تواصل معنا" : "Contact"}
            </p>
            <a
              href="tel:+966920000000"
              className="flex items-center gap-3 py-2 text-sm text-[#002868] dark:text-blue-300 font-semibold hover:text-[#C8A75D] transition-colors"
              dir="ltr"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C8A75D]/10"
                aria-hidden="true"
              >
                <span
                  className="material-symbols-outlined text-[#C8A75D]"
                  style={{ fontSize: "16px" }}
                >
                  phone
                </span>
              </span>
              +966 92 000 0000
            </a>
            <a
              href="mailto:info@alfahd-contracting.com"
              className="flex items-center gap-3 py-2 text-sm text-[#434652] dark:text-gray-400 hover:text-[#002868] dark:hover:text-white transition-colors"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C8A75D]/10"
                aria-hidden="true"
              >
                <span
                  className="material-symbols-outlined text-[#C8A75D]"
                  style={{ fontSize: "16px" }}
                >
                  mail
                </span>
              </span>
              <span className="truncate text-xs">info@alfahd-contracting.com</span>
            </a>
          </div>
        </div>

        {/* ── Footer: CTA + Language ───────────────────────────── */}
        <div className="px-4 py-4 border-t border-[#c4c6d3]/30 dark:border-gray-700 space-y-3 shrink-0 bg-white dark:bg-gray-900">
          <Link
            href={`/${locale}/request-quote`}
            onClick={() => handleOpen(false)}
            className="flex w-full items-center justify-center gap-2 bg-[#C8A75D] text-[#001947] py-3 rounded-xl font-bold text-sm hover:brightness-110 active:scale-95 transition-all duration-200"
          >
            <span
              className="material-symbols-outlined"
              aria-hidden="true"
              style={{ fontSize: "18px" }}
            >
              description
            </span>
            {t("requestQuote")}
          </Link>

          <div className="flex items-center justify-between gap-3">
            {/* Language switcher */}
            <LanguageSwitcher />

            {/* Social links */}
            <div className="flex items-center gap-2">
              {[
                { href: "https://twitter.com", icon: "X", label: "Twitter" },
                { href: "https://linkedin.com", icon: "in", label: "LinkedIn" },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#c4c6d3]/50 dark:border-gray-700 text-[#747783] dark:text-gray-500 hover:text-[#002868] hover:border-[#002868] dark:hover:text-white dark:hover:border-white transition-colors text-xs font-bold"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
