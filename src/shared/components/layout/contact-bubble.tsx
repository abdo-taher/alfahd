"use client";

import { useState, useEffect, useRef } from "react";
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
  const ref = useRef<HTMLDivElement>(null);

  const hidden =
    pathname.includes("portal") || pathname.includes("request-quote");

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

  // ── Desktop: original floating green WhatsApp circle ──────────────────
  // ── Mobile: half-hidden trigger icon, expands to show WA + Call ───────

  return (
    <>
      {/* ── DESKTOP only ─────────────────────────────────────────────── */}
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

      {/* ── MOBILE only ──────────────────────────────────────────────── */}
      {/*
        Layout:
          Arabic (RTL)  → anchored RIGHT edge, half-hidden to the right
          English (LTR) → anchored LEFT  edge, half-hidden to the left

        Closed: trigger icon is 50% off-screen (translate ±50%)
        Open:   trigger hides, WA + Call icons slide fully into view
      */}
      <div
        ref={ref}
        className={[
          "md:hidden fixed z-50",
          "bottom-1/3",                  // vertically centered-ish
          isRTL ? "right-0" : "left-0",  // anchor edge
        ].join(" ")}
      >
        {/* Container that slides in/out */}
        <div
          style={{
            transition: "transform 300ms cubic-bezier(0.34,1.2,0.64,1)",
            // Closed: shift so only half the trigger is visible
            // Open: fully on screen
            transform: open
              ? "translateX(0)"
              : isRTL
              ? "translateX(50%)"   // RTL: slide right (off right edge)
              : "translateX(-50%)", // LTR: slide left  (off left edge)
          }}
          className={[
            "flex flex-col items-center gap-2 py-3 px-2",
            // No background — icons only, as requested
          ].join(" ")}
        >
          {/* WhatsApp icon — visible only when open */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={isRTL ? "واتساب" : "WhatsApp"}
            tabIndex={open ? 0 : -1}
            onClick={() => {
              trackEvent("click_whatsapp", { location: "mobile_bubble" });
              setOpen(false); // collapse after tap
            }}
            style={{
              transition: "opacity 200ms ease, transform 250ms cubic-bezier(0.34,1.4,0.64,1)",
              transitionDelay: open ? "60ms" : "0ms",
              opacity: open ? 1 : 0,
              transform: open ? "scale(1)" : "scale(0.4)",
              pointerEvents: open ? "auto" : "none",
            }}
            className="flex size-12 items-center justify-center text-[#25D366] drop-shadow-lg active:scale-90"
          >
            <WhatsAppSVG size={44} />
          </a>

          {/* Call icon — visible only when open */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            aria-label={isRTL ? "اتصل الآن" : "Call Now"}
            tabIndex={open ? 0 : -1}
            onClick={() => {
              trackEvent("click_call", { location: "mobile_bubble" });
              setOpen(false); // collapse after tap
            }}
            style={{
              transition: "opacity 200ms ease, transform 250ms cubic-bezier(0.34,1.4,0.64,1)",
              transitionDelay: open ? "0ms" : "60ms",
              opacity: open ? 1 : 0,
              transform: open ? "scale(1)" : "scale(0.4)",
              pointerEvents: open ? "auto" : "none",
            }}
            className="flex size-12 items-center justify-center text-primary drop-shadow-lg active:scale-90"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "44px", fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              aria-hidden="true"
            >
              call
            </span>
          </a>

          {/* Trigger icon — always visible (half-hidden when closed) */}
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
              transition: "opacity 200ms ease",
            }}
            className="flex size-12 items-center justify-center text-primary drop-shadow-lg active:scale-90 transition-transform duration-200"
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "40px",
                fontVariationSettings: "'FILL' 1, 'wght' 400",
                transition: "transform 300ms ease",
                transform: open ? "rotate(45deg)" : "rotate(0deg)",
                display: "block",
              }}
              aria-hidden="true"
            >
              {open ? "close" : "add_comment"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
