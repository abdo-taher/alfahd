"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/shared/components/ui/button";

type NavLink = { label: string; href: string };

export function MobileMenu({ navLinks }: { navLinks: NavLink[] }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={menuRef} className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border hover:bg-muted transition-colors"
        aria-expanded={open}
        aria-label={open ? t("closeMenu") : t("menu")}
        aria-controls="mobile-menu"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t("menu")}
        className={[
          "fixed top-0 z-50 h-full w-[280px] bg-background shadow-xl transition-transform duration-300",
          "flex flex-col",
          locale === "ar" ? "right-0" : "left-0",
          open
            ? "translate-x-0"
            : locale === "ar"
            ? "translate-x-full"
            : "-translate-x-full",
        ].join(" ")}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="text-lg font-bold text-primary">الفهد للمقاولات</span>
          <button
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
            aria-label={t("closeMenu")}
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA at bottom */}
        <div className="p-4 border-t border-border">
          <Button asChild size="lg" variant="primary" className="w-full">
            <Link href={`/${locale}/request-quote`} onClick={() => setOpen(false)}>
              {t("requestQuote")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
