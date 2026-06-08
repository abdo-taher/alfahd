"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";

// Reference-style project search data (hardcoded for client-side search)
const SEARCH_PROJECTS = [
  { id: "1", slug: "king-salman-financial-tower", titleEN: "King Salman Financial Tower", titleAR: "برج الملك سلمان المالي", categoryEN: "Structural Glass", categoryAR: "هياكل زجاجية", locationEN: "Riyadh, KSA", locationAR: "الرياض", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvwblNQmF23c_-OuBV0Z0mf899U3_IkjyA5GnwYGAucjLJr5dMn4fIRHOfRhrQXKQp1a9UF4SKTzcHO07m1-nUIN8f_QUAjLWOljnWsKMOYjU7ZIn6cThWq5YIMviz3Qd7OUCZHsN6q0oRTv7_eVjGrBEZw7gJy4I-LzfztGObl7J5yG9JI_9gnbij6SjS2w2HIjWEm3bHFsUza4MeB5TPRd7ny3i0jgWuZ4MUHoJJl342TdyBkVCpsyd88Cfw5CrSk5MCpK67kb14" },
  { id: "2", slug: "neom-infrastructure-hub", titleEN: "NEOM Infrastructure Hub", titleAR: "مجمع بنيوم الإنشائي", categoryEN: "Steel Systems", categoryAR: "أعمال حديد", locationEN: "NEOM, KSA", locationAR: "نيوم", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMnLDv35oEIlyXRgKy3LWwpROa09JaxlklFhgfUcCYnJsXR5yE3do-MNglVqtnZyeOJ79ALeaMSwzMztQ2PO4W0RcFPVEaPzdd8t8Gw2mGbP8044xWAvpE-6-q1-J_nWPmoHhjof27zsYyk1erwGEC6iFXB2HVKXmEtsS5DiD8HrqTbBqRFtrPZa5-MAbLLjWu-fR_-fw3g0jgKdsr0ADAqFxuC8YZJ0p0taaMAr9xj3kPl-crFJZugJfvuNMC6ZSRQTxIIUZocJ4g" },
  { id: "3", slug: "red-sea-global-pavilion", titleEN: "Red Sea Global Pavilion", titleAR: "جناح البحر الأحمر العالمي", categoryEN: "Sustainable Structural", categoryAR: "هياكل مستدامة", locationEN: "Red Sea, KSA", locationAR: "البحر الأحمر", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeXd_bsxIZ523NTAhdnr374o56ikad_BtTVJwWIwQCADfORBs28IQcapnWhHr_d8K3amACjUId2MiQEKt6mA8zyS-TdAB9fCvMs594dvGZS9bolZzlz91PkS-Td1aFw4NKPRg0bpm_5SyyAsXRN1YO3Yrz2tP3xIFJoII2TZf2OM2aKTaIGiz-BplENh_XB6x63o1H_vO74XQ3RbFVyvh1PmWmzlRXd1UcIkFYKqDZ8h1AM_2f_clnNqGfnIB_ht46rUVTjNGdbF5H" },
  { id: "4", slug: "commercial-crystal-tower", titleEN: "Commercial Crystal Tower", titleAR: "برج الكريستال التجاري", categoryEN: "Aluminum Systems", categoryAR: "واجهات ألمنيوم", locationEN: "Riyadh, KSA", locationAR: "الرياض", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqlrwHcNt2VRqEMfO73px9Vmxt-L3lqQkb9Z9Ic8wI-Ni5nbyg3EdqYEcALDRyItBnvlZdhT3R0REdFKYGBxZ_dNQ7-q52XpgCuaoczp3r943lDomB3ge4cjixLDCBDVBTaJeRU3uCpEnAC8urEUKHRb-EsF0lCd_s4yBLak2G6eWTt1gDuhifEqG8bwolOmqlCludTY2XiyP0UU4trFEqMcXSvPqT3ISW-j6ikGon39ZKm0JfC22hGJUVpoZx6L0zBim6zzseeqJr" },
  { id: "5", slug: "rolls-royce-showroom", titleEN: "Rolls Royce Showroom", titleAR: "معرض رولز رويس", categoryEN: "Structural Glass", categoryAR: "هياكل زجاجية", locationEN: "Riyadh, KSA", locationAR: "الرياض", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCj6ujoVoJrgwr7_SM4IkWKmQ0g-6xEaO8h3m6OYGus18fY-bNHGDPAF4jph6YbhDIcjqZ67ek6D-cKKRsaZas0HJIsQyuWwGjY_luHLwyZze3kPRg0KQwcM7MLCcT0Hq0rAgrqDb485qtDrWPbt-Kz66pGU66ztQD0e5LFvGWmWdzxlpF7qcPsleej42OL-X2qgZrbYQKhQNZCxNte3z28ACD6e-G6Im9DEsSlXh4YPfk_-K0arDD5TVE0g1wvSkWC2oue_QRDN0co" },
];

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const navLinks = [
    { label: t("home"),        href: `/${locale}` },
    { label: t("about"),       href: `/${locale}/about` },
    { label: t("services"),    href: `/${locale}/services` },
    { label: t("projects"),    href: `/${locale}/projects` },
    { label: t("blog"),        href: `/${locale}/blog` },
    { label: t("contact"),     href: `/${locale}/contact` },
    { label: t("portal"),      href: `/${locale}/portal` },
  ];

  // Search filtering
  const filteredProjects = searchQuery.trim()
    ? SEARCH_PROJECTS.filter((p) => {
        const q = searchQuery.toLowerCase();
        const title = locale === "ar" ? p.titleAR : p.titleEN;
        const cat = locale === "ar" ? p.categoryAR : p.categoryEN;
        const loc = locale === "ar" ? p.locationAR : p.locationEN;
        return (
          title.toLowerCase().includes(q) ||
          cat.toLowerCase().includes(q) ||
          loc.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3"
            : "bg-transparent py-5",
        ].join(" ")}
      >
        {/* Skip to content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:rounded focus:bg-gray-950 focus:px-4 focus:py-2 focus:text-white focus:text-sm"
        >
          {locale === "ar" ? "انتقل للمحتوى" : "Skip to content"}
        </a>

        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between gap-4">

          {/* ── Logo ──────────────────────────────────────────── */}
          <Link
            href={`/${locale}`}
            aria-label={locale === "ar" ? "شركة الفهد للمقاولات — الرئيسية" : "Al Fahd Contracting — Home"}
            className="flex items-center gap-3 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950 rounded group"
          >
            {/* Logo image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeYTKEmEgjxCOI4avUzqbo7nzIpjxLLbNp4wIGuCzQQuRrJp7mpFsVReC_HfbeHTJObjNB2QuRc2aiYL1ZouHV2gKCP7zQ6JaqXCYoeqTa9Tf957XZqyriAUVqmk0yJ7CxEvj1bhV-yJyXk7e-ZPCyeSaawiRBdxPADNCKqQ7IKqIQQb1tBUom2URpChFNODx6dzM-Pr8rxTwk49PqTjcsDhRkJ4cH7BHenMvK3WAGPb7xIPtxA5B5wZw7YTLtLPDDkYjG2p-A9kYgEF4"
              alt="Al-Fahd Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
              width={40}
              height={40}
            />
            <div className="flex flex-col leading-none">
              <span className="font-sans font-bold text-gray-900 text-base tracking-tight uppercase">
                {locale === "ar" ? "الفهد" : "Al-Fahd"}
              </span>
              <span
                className="text-[9px] text-[#C5A880] tracking-wider uppercase mt-0.5"
                style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
              >
                Contracting &amp; Engineering
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ───────────────────────────────────── */}
          <nav
            className="hidden lg:flex items-center gap-1"
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
                    "relative px-4 py-2 font-sans font-medium text-xs tracking-wider uppercase transition-colors duration-200 whitespace-nowrap rounded-sm",
                    isActive
                      ? "text-gray-950 font-bold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                  ].join(" ")}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#C5A880]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop Actions ───────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-500 hover:text-gray-900 rounded-sm hover:bg-gray-50 transition-colors"
              aria-label={t("search")}
            >
              <Search className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Language switcher */}
            <LanguageSwitcher />

            {/* Dark CTA — reference app style */}
            <Link
              href={`/${locale}/request-quote`}
              className="flex items-center gap-2 bg-gray-950 hover:bg-gray-800 text-white px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 whitespace-nowrap shadow-sm"
            >
              {t("requestQuote")}
              <span className="material-symbols-outlined text-sm" aria-hidden="true" style={{ fontSize: "14px" }}>
                {locale === "ar" ? "arrow_back" : "arrow_forward"}
              </span>
            </Link>
          </div>

          {/* ── Mobile: Search + Language + Hamburger ────────── */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-500 rounded-sm hover:bg-gray-50"
              aria-label={t("search")}
            >
              <Search className="w-4 h-4" aria-hidden="true" />
            </button>
            <div className="hidden sm:flex">
              <LanguageSwitcher />
            </div>
            <MobileMenu navLinks={navLinks} />
          </div>

        </div>
      </header>

      {/* ── Search Overlay (reference app style) ────────────── */}
      {searchOpen && (
        <div
          className="fixed inset-0 bg-gray-950/40 backdrop-blur-md z-[60] flex items-start justify-center pt-24 px-4"
          onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
          role="dialog"
          aria-label={locale === "ar" ? "بحث" : "Search"}
        >
          <div
            className="bg-white rounded-lg shadow-2xl border border-gray-100 max-w-xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input row */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <Search className="w-5 h-5 text-gray-400 shrink-0" aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={locale === "ar" ? "ابحث عن المشاريع..." : "Search projects & studies..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-gray-800 placeholder:text-gray-400 focus:outline-none font-sans text-sm"
                />
              </div>
              <button
                onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                className="px-2.5 py-1 text-xs text-gray-400 hover:text-gray-950 bg-gray-50 hover:bg-gray-100 rounded transition-colors font-semibold"
                aria-label={locale === "ar" ? "إغلاق" : "Close"}
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto p-2">
              {searchQuery.trim() === "" ? (
                <div className="p-4 text-center text-gray-400 text-xs font-sans">
                  {locale === "ar"
                    ? "اكتب للبحث بالعنوان أو الموقع أو الفئة..."
                    : "Type to search by title, location, or category..."}
                </div>
              ) : filteredProjects.length > 0 ? (
                <div className="space-y-1">
                  {filteredProjects.map((p) => (
                    <Link
                      key={p.id}
                      href={`/${locale}/projects/${p.slug}`}
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      className="w-full text-start p-3 hover:bg-gray-50 rounded-md transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.image}
                          alt=""
                          className="w-10 h-10 object-cover rounded-md"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-sans font-semibold text-sm text-gray-900 group-hover:text-amber-700 transition-colors">
                            {locale === "ar" ? p.titleAR : p.titleEN}
                          </p>
                          <p
                            className="text-[10px] text-gray-400"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {locale === "ar" ? p.categoryAR : p.categoryEN} •{" "}
                            {locale === "ar" ? p.locationAR : p.locationEN}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500 text-xs font-sans">
                  {locale === "ar"
                    ? `لا توجد نتائج لـ "${searchQuery}"`
                    : `No results for "${searchQuery}"`}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
