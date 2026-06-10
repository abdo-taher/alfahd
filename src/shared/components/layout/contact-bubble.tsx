"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const WHATSAPP_NUMBER = "966531028822";
const PHONE_NUMBER = "+966114459222";

const WhatsAppSVG = ({ size = 24 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function ContactBubble() {
  const locale = useLocale();
  const pathname = usePathname();
  const isRTL = locale === "ar";

  const [open, setOpen] = useState(false);
  // visible = the entire widget is shown vs hidden (scroll/touch hide)
  const [visible, setVisible] = useState(true);

  const ref = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  const hidden =
    pathname.includes("portal") || pathname.includes("request-quote");

  // ── Hide on scroll / touch ────────────────────────────────────────────
  const handleHide = useCallback(() => {
    setVisible(false);
    setOpen(false);
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => setVisible(true), 1500);
  }, []);

  useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY;
      // only hide when actually scrolling (delta > 4px to avoid micro-jitter)
      if (Math.abs(currentY - lastScrollY.current) > 4) {
        lastScrollY.current = currentY;
        handleHide();
      }
    }
    function onTouchMove() {
      handleHide();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", onTouchMove);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [handleHide]);

  // ── Close on outside click ────────────────────────────────────────────
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  if (hidden) return null;

  return (
    <>
      {/* ── DESKTOP: green WhatsApp FAB ───────────────────────────────── */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isRTL ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
        onClick={() => trackEvent("click_whatsapp", { location: "floating_button" })}
        className={[
          "hidden md:flex",
          "fixed bottom-6 z-50 size-14 items-center justify-center rounded-full",
          "bg-[#25D366] text-white shadow-lg hover:bg-[#20bc5a] opacity-80",
          "transition-all duration-300 hover:scale-110 active:scale-95",
          isRTL ? "left-6" : "right-6",
        ].join(" ")}
      >
        <WhatsAppSVG size={28} />
      </a>

      {/* ── MOBILE: half-hidden pill ─────────────────────────────────── */}
      {/*
        RTL (Arabic)  → right-0, closed = translateX(+50%) so right-half is hidden
        LTR (English) → left-0,  closed = translateX(-50%) so left-half is hidden
        On scroll/touch → entire widget fades out + slides off edge, reappears after 1.5s
      */}
      <div
        ref={ref}
        className={[
          "md:hidden fixed z-50",
          "bottom-1/3",
          isRTL ? "right-0" : "left-0",
        ].join(" ")}
        style={{
          // Scroll/touch hide: fade + extra edge slide
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0)"
            : isRTL
            ? "translateX(30%)"
            : "translateX(-30%)",
          transition: "opacity 350ms ease, transform 350ms ease",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        {/* Sliding inner container */}
        <div
          style={{
            transition: "transform 380ms cubic-bezier(0.34,1.2,0.64,1)",
            transform: open
              ? "translateX(0)"
              : isRTL
              ? "translateX(50%)"
              : "translateX(-50%)",
          }}
          className="flex flex-col items-center gap-3 py-4 px-1"
        >

          {/* ── WhatsApp action ── */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={isRTL ? "واتساب" : "WhatsApp"}
            tabIndex={open ? 0 : -1}
            onClick={() => {
              trackEvent("click_whatsapp", { location: "mobile_bubble" });
              setOpen(false);
            }}
            style={{
              transition: "opacity 220ms ease, transform 280ms cubic-bezier(0.34,1.5,0.64,1)",
              transitionDelay: open ? "80ms" : "0ms",
              opacity: open ? 1 : 0,
              transform: open ? "scale(1) translateY(0)" : "scale(0.3) translateY(12px)",
              pointerEvents: open ? "auto" : "none",
            }}
            className="group relative flex size-12 items-center justify-center active:scale-90"
          >
            {/* Glow ring */}
            <span
              className="absolute inset-0 rounded-full bg-[#25D366]/20 scale-0 group-active:scale-150 transition-transform duration-300"
              aria-hidden="true"
            />
            {/* Icon circle */}
            <span className="relative flex size-11 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(37,211,102,0.35)] border border-[#25D366]/30 text-[#25D366]">
              <WhatsAppSVG size={26} />
            </span>
          </a>

          {/* ── Call action ── */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            aria-label={isRTL ? "اتصل الآن" : "Call Now"}
            tabIndex={open ? 0 : -1}
            onClick={() => {
              trackEvent("click_call", { location: "mobile_bubble" });
              setOpen(false);
            }}
            style={{
              transition: "opacity 220ms ease, transform 280ms cubic-bezier(0.34,1.5,0.64,1)",
              transitionDelay: open ? "0ms" : "80ms",
              opacity: open ? 1 : 0,
              transform: open ? "scale(1) translateY(0)" : "scale(0.3) translateY(12px)",
              pointerEvents: open ? "auto" : "none",
            }}
            className="group relative flex size-12 items-center justify-center active:scale-90"
          >
            {/* Glow ring */}
            <span
              className="absolute inset-0 rounded-full bg-[#002868]/15 scale-0 group-active:scale-150 transition-transform duration-300"
              aria-hidden="true"
            />
            {/* Icon circle */}
            <span className="relative flex size-11 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(0,40,104,0.25)] border border-[#002868]/20">
              <span
                className="material-symbols-outlined text-[#002868]"
                style={{ fontSize: "24px", fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                aria-hidden="true"
              >
                call
              </span>
            </span>
          </a>

          {/* ── Trigger button ── */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={
              isRTL
                ? open ? "إغلاق" : "تواصل معنا"
                : open ? "Close" : "Contact us"
            }
            style={{
              opacity: open ? 0 : 1,
              pointerEvents: open ? "none" : "auto",
              transition: "opacity 200ms ease, transform 200ms ease",
              transform: open ? "scale(0.7)" : "scale(1)",
            }}
            className="group relative flex size-12 items-center justify-center active:scale-90"
          >
            {/* Pulsing halo — only when closed */}
            {!open && (
              <span
                className="absolute inset-0 rounded-full animate-ping bg-[#002868]/20"
                aria-hidden="true"
              />
            )}
            {/* Main circle */}
            <span className="relative flex size-11 items-center justify-center rounded-full bg-[#002868] shadow-[0_6px_24px_rgba(0,40,104,0.45)]">
              <span
                className="material-symbols-outlined text-white"
                style={{
                  fontSize: "22px",
                  fontVariationSettings: "'FILL' 1, 'wght' 500",
                  transition: "transform 300ms cubic-bezier(0.34,1.2,0.64,1)",
                  transform: open ? "rotate(45deg)" : "rotate(0deg)",
                  display: "block",
                }}
                aria-hidden="true"
              >
                chat
              </span>
            </span>
          </button>

        </div>
      </div>
    </>
  );
}
