"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const WHATSAPP_NUMBER = "966531028822";
const PHONE_NUMBER = "+966114459222";

export function ContactBubble() {
  const locale = useLocale();
  const pathname = usePathname();
  const isRTL = locale === "ar";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const hidden =
    pathname.includes("portal") || pathname.includes("request-quote");

  // Close on outside click
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

  const side = isRTL ? "left-5" : "right-5";

  return (
    <>
      {/* ── DESKTOP: original floating WhatsApp circle ── */}
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
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-7" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ── MOBILE: speed-dial FAB ── */}
      <div
        ref={ref}
        className={["md:hidden fixed bottom-6 z-50 flex flex-col items-center gap-3", side].join(" ")}
      >
        {/* Child action — WhatsApp (fans up first) */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={isRTL ? "واتساب" : "WhatsApp"}
          tabIndex={open ? 0 : -1}
          onClick={() => trackEvent("click_whatsapp", { location: "fab_mobile" })}
          style={{
            transitionProperty: "opacity, transform",
            transitionDuration: "250ms",
            transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
            transitionDelay: open ? "60ms" : "0ms",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.7)",
            pointerEvents: open ? "auto" : "none",
          }}
          className="flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        {/* Child action — Phone call (fans up second) */}
        <a
          href={`tel:${PHONE_NUMBER}`}
          aria-label={isRTL ? "اتصل الآن" : "Call Now"}
          tabIndex={open ? 0 : -1}
          onClick={() => trackEvent("click_call", { location: "fab_mobile" })}
          style={{
            transitionProperty: "opacity, transform",
            transitionDuration: "250ms",
            transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
            transitionDelay: open ? "0ms" : "60ms",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.7)",
            pointerEvents: open ? "auto" : "none",
          }}
          className="flex size-12 items-center justify-center rounded-full bg-primary text-white shadow-lg active:scale-95"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "22px" }} aria-hidden="true">
            call
          </span>
        </a>

        {/* Main toggle button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={isRTL ? (open ? "إغلاق" : "تواصل معنا") : (open ? "Close" : "Contact us")}
          className={[
            "flex size-14 items-center justify-center rounded-full text-white",
            "shadow-[0_4px_20px_rgba(0,40,104,0.4)]",
            "transition-all duration-300 active:scale-95",
            open ? "bg-on-surface-variant rotate-45" : "bg-primary",
          ].join(" ")}
          style={{ transitionProperty: "background-color, transform" }}
        >
          {/* Plus → X morph via rotation */}
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "26px",
              transition: "transform 300ms cubic-bezier(0.34,1.56,0.64,1)",
              transform: open ? "rotate(45deg)" : "rotate(0deg)",
            }}
            aria-hidden="true"
          >
            {open ? "close" : "add"}
          </span>
        </button>
      </div>
    </>
  );
}
