"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

// ── Search index — projects + services + blog (bilingual, client-side) ────────────
type SearchItem = {
  id: string;
  slug: string;
  type: "project" | "service" | "blog";
  titleEN: string;
  titleAR: string;
  categoryEN: string;
  categoryAR: string;
  locationEN: string;
  locationAR: string;
  image: string;
  excerptEN?: string;
  excerptAR?: string;
};

const SEARCH_INDEX: SearchItem[] = [
  // ── Projects ──────────────────────────────────────────────────────────────
  { id: "p1", type: "project", slug: "king-salman-financial-tower",     titleEN: "King Salman Financial Tower",     titleAR: "برج الملك سلمان المالي",          categoryEN: "Structural Glass",       categoryAR: "هياكل زجاجية",     locationEN: "Riyadh, KSA",      locationAR: "الرياض",            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvwblNQmF23c_-OuBV0Z0mf899U3_IkjyA5GnwYGAucjLJr5dMn4fIRHOfRhrQXKQp1a9UF4SKTzcHO07m1-nUIN8f_QUAjLWOljnWsKMOYjU7ZIn6cThWq5YIMviz3Qd7OUCZHsN6q0oRTv7_eVjGrBEZw7gJy4I-LzfztGObl7J5yG9JI_9gnbij6SjS2w2HIjWEm3bHFsUza4MeB5TPRd7ny3i0jgWuZ4MUHoJJl342TdyBkVCpsyd88Cfw5CrSk5MCpK67kb14" },
  { id: "p2", type: "project", slug: "neom-infrastructure-hub",         titleEN: "NEOM Infrastructure Hub",         titleAR: "مجمع بنيوم الإنشائي",             categoryEN: "Steel Systems",          categoryAR: "أعمال حديد",       locationEN: "NEOM, KSA",        locationAR: "نيوم",              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMnLDv35oEIlyXRgKy3LWwpROa09JaxlklFhgfUcCYnJsXR5yE3do-MNglVqtnZyeOJ79ALeaMSwzMztQ2PO4W0RcFPVEaPzdd8t8Gw2mGbP8044xWAvpE-6-q1-J_nWPmoHhjof27zsYyk1erwGEC6iFXB2HVKXmEtsS5DiD8HrqTbBqRFtrPZa5-MAbLLjWu-fR_-fw3g0jgKdsr0ADAqFxuC8YZJ0p0taaMAr9xj3kPl-crFJZugJfvuNMC6ZSRQTxIIUZocJ4g" },
  { id: "p3", type: "project", slug: "red-sea-global-pavilion",         titleEN: "Red Sea Global Pavilion",         titleAR: "جناح البحر الأحمر العالمي",       categoryEN: "Sustainable Structural", categoryAR: "هياكل مستدامة",    locationEN: "Red Sea, KSA",     locationAR: "البحر الأحمر",     image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeXd_bsxIZ523NTAhdnr374o56ikad_BtTVJwWIwQCADfORBs28IQcapnWhHr_d8K3amACjUId2MiQEKt6mA8zyS-TdAB9fCvMs594dvGZS9bolZzlz91PkS-Td1aFw4NKPRg0bpm_5SyyAsXRN1YO3Yrz2tP3xIFJoII2TZf2OM2aKTaIGiz-BplENh_XB6x63o1H_vO74XQ3RbFVyvh1PmWmzlRXd1UcIkFYKqDZ8h1AM_2f_clnNqGfnIB_ht46rUVTjNGdbF5H" },
  { id: "p4", type: "project", slug: "commercial-crystal-tower",        titleEN: "Commercial Crystal Tower",        titleAR: "برج الكريستال التجاري",           categoryEN: "Aluminum Systems",       categoryAR: "واجهات ألمنيوم",   locationEN: "Riyadh, KSA",      locationAR: "الرياض",            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqlrwHcNt2VRqEMfO73px9Vmxt-L3lqQkb9Z9Ic8wI-Ni5nbyg3EdqYEcALDRyItBnvlZdhT3R0REdFKYGBxZ_dNQ7-q52XpgCuaoczp3r943lDomB3ge4cjixLDCBDVBTaJeRU3uCpEnAC8urEUKHRb-EsF0lCd_s4yBLak2G6eWTt1gDuhifEqG8bwolOmqlCludTY2XiyP0UU4trFEqMcXSvPqT3ISW-j6ikGon39ZKm0JfC22hGJUVpoZx6L0zBim6zzseeqJr" },
  { id: "p5", type: "project", slug: "al-nakheel-mall-atrium",          titleEN: "Al Nakheel Mall Atrium",          titleAR: "أتريوم مجمع النخيل",              categoryEN: "Structural Glass",       categoryAR: "هياكل زجاجية",     locationEN: "Jeddah, KSA",      locationAR: "جدة",               image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvNMXhx_PtZEjUvGER6vEwXdB5cRdkvrltMht8WC9l3SEbK28C07yPkcox9J-zjOUlBCKx9oW4smjdPDKeaXIpjWAgJy3ZnoCagzkfdJjlZ9bOviZBCRjR2Mz-JHQf6rpE0bA6Jf6NxI1oJDauUGz7QT3OxPTqIbJAc--XiSVUcy9fe_W0rzPOitHObQsXeDUscnLk143ZL-RXCIqLGuSOuaWtrpLFgC5Thy8YAJeu0ijswRmR5Uzmnybshd_sVTo8bBAcI0w6NkQY" },
  { id: "p6", type: "project", slug: "al-naseem-private-villa",         titleEN: "Al Naseem Private Villa",         titleAR: "فيلا النسيم الخاصة",              categoryEN: "Ornamental Iron",        categoryAR: "أعمال حديد",       locationEN: "Khobar, KSA",      locationAR: "الخبر",             image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlI6giCcQB-rUvweBJJ-EAjJ2Qq6h0olzrcPKvnwcrqQw436rXYn789VL75xMSuDImoLKJAyQvjfA4_-aVeGjpW95RHsvMDV_RrhzN3jsRpcJ0T2nj7kudYoe99c5Ns8jw0PSiPB8Z_1uvcnrrU6-IHJqKzCyZtBp2f2t6NiwlgM-c5xP23fie1Qa25Fp6Vd8g72xTnqxMvUmqVqrAG2_pMHYOECspMCI4H8E4TZt-pp-X-ZWEy6v1hjs2cziW2PcYaBY-77teAFKU" },
  { id: "p7", type: "project", slug: "industrial-innovation-complex",   titleEN: "Industrial Innovation Complex",   titleAR: "مجمع الابتكار الصناعي",           categoryEN: "Aluminum Systems",       categoryAR: "واجهات ألمنيوم",   locationEN: "Jubail, KSA",      locationAR: "الجبيل",            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDThd-WgATXSWPGf34k60Y9gU_Fp5HXLZf9TQfJZfcdJFAQ0FojZZnbYkHWv4XzgMCwt47kAawrCIcZWA01A9xFLFyfSk4-YUaFfVFG0wtYfufH5Qqc-nP_CicFqhX3L73xEnZYZpu1Vi-KCjyNmo9gEoHWaQLsv5XNYJvQqm9aRZJU7eorQiAJSfAVDXqPAUR7dC2GPLGPOj2UyMTaZetg_ih6B9GLc_uW9_gksFCeIUSxQtIP4CVgmIN2aeILdqSSflW2Z2g_P-Xa" },
  { id: "p8", type: "project", slug: "rolls-royce-showroom",            titleEN: "Rolls Royce Showroom",            titleAR: "معرض رولز رويس",                  categoryEN: "Structural Glass",       categoryAR: "هياكل زجاجية",     locationEN: "Riyadh, KSA",      locationAR: "الرياض",            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCj6ujoVoJrgwr7_SM4IkWKmQ0g-6xEaO8h3m6OYGus18fY-bNHGDPAF4jph6YbhDIcjqZ67ek6D-cKKRsaZas0HJIsQyuWwGjY_luHLwyZze3kPRg0KQwcM7MLCcT0Hq0rAgrqDb485qtDrWPbt-Kz66pGU66ztQD0e5LFvGWmWdzxlpF7qcPsleej42OL-X2qgZrbYQKhQNZCxNte3z28ACD6e-G6Im9DEsSlXh4YPfk_-K0arDD5TVE0g1wvSkWC2oue_QRDN0co" },
  { id: "p9", type: "project", slug: "smart-pedestrian-bridge",         titleEN: "Smart Pedestrian Bridge",         titleAR: "جسر المشاة الذكي",                categoryEN: "Steel Systems",          categoryAR: "أعمال حديد",       locationEN: "KAFD, Riyadh",     locationAR: "مركز الملك عبدالله المالي", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7AbIbz53C_YURvbfL7IVSBiFB8YdS561Z73FqKXBlFaETJZReMjGUVLk6cfSR8JekGMFmxaZB5lXI9VX2q-iR0FGonumLvrKjT31CY9w4d1dY4ODxTEqwf9MRU5D_bphcM7zk3tigIPqVEC6cAjuIsIf4L-J1iDlUMXjWPfGB9mTkAHxKfcFTXITHDg1rSoS9GQQex0XAskrher-7TsLzL76NR6EbbMnAir8v3HKA3h9s6gt6-QpeLASxXuZ5qjDx2I6TinBVkv3g" },
  // ── Services ──────────────────────────────────────────────────────────────
  { id: "s1", type: "service", slug: "aluminum-works",  titleEN: "Aluminum Works",  titleAR: "أعمال الألمنيوم", categoryEN: "Service", categoryAR: "خدمة", locationEN: "Saudi Arabia", locationAR: "المملكة العربية السعودية", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGOdoQi-_FUUElyQKlxwamDcsiwTfqzxmZ_qFLc1Kv59CwcOThsop-Jyj0M8OFnUDZKbaupukNVYDIiP-D_Q8VYv-gNWVLRS3nwb4r4IGontoX3F2qWIMCUhwBV3CNbHBv-xIA7kBdCyZr3ukA8vvJUEfSrWqbUu1RENuk628Z65oXfDhBZRinieXB0ruYzjzt2oIbtfWZLrAgsMdW5mt83UXzpFO2qlHktEgBgK5H_c8fzcJnHOZI_oSmQs5A-paC7QBDCpgj5dwu", excerptEN: "Premium window, door and curtain-wall aluminium profiles with top-grade thermal and acoustic insulation", excerptAR: "واجهات وأبواب ونوافذ ألمنيوم بأعلى جودة وأحدث التصاميم" },
  { id: "s2", type: "service", slug: "glass-works",     titleEN: "Glass Works",     titleAR: "أعمال الزجاج",   categoryEN: "Service", categoryAR: "خدمة", locationEN: "Saudi Arabia", locationAR: "المملكة العربية السعودية", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQdq7sec-c4BVOpEzZI_8KrEC917dHvJmdnrGkazvwgPDcuieAXevWOWv34nx2xDLAMy1n1Qh8tRztxuDOtZcXeQCJDn2h_7GHMoHqGvGtCZl5hlIti-KDbA26-F2gNspFVTIePUL3oSh5ABss6GSuso_nNvZKeMI_lsKPLqbn23zml-ufugj-_4Ye-xW_NK3HzsWqEfVBeSxgKAvoqi-00jalei1utYNDl4EpmJ4Y7_hPHgDhC7g1dxiKn1XZS3DmhuJlBTmT64jJ", excerptEN: "Comprehensive glass facade systems for towers and major administrative buildings, frameless and point-fixed", excerptAR: "حلول زجاجية متكاملة للواجهات والأقسام الداخلية والمداخل" },
  { id: "s3", type: "service", slug: "steel-works",     titleEN: "Steel Works",     titleAR: "أعمال الحديد",   categoryEN: "Service", categoryAR: "خدمة", locationEN: "Saudi Arabia", locationAR: "المملكة العربية السعودية", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXGixeSqm7JqZKiH5qs61ww7454H8GnClR-Cyq-x1mEkcMU3U0OxG2zhFYJWl4sQIFq6D5QAFjLrj6tuDoUd0hD7TXMIB1IINft9VH9OyeAmZxzqdvNR5UzZxAjx4M3cwJRDiSyWKxr9OfL2EMAlipzxcuGKAy1rYyHvxSKoRdhwVLroFDhf0nEJhPSnq4B2PPMnj4IrJx96xXyREztFmL3vBOzGr2TKtWHL_0NQxefDWggnBgU59YCU2yrufTAc2BpHy9jRgkNtg8", excerptEN: "Fabrication and erection of complex steel structures for factories, warehouses and hybrid buildings", excerptAR: "هياكل ومنشآت حديدية متينة للمشاريع الصناعية والتجارية الكبرى" },
  // ── Blog Posts ────────────────────────────────────────────────────────────
  { id: "b1", type: "blog", slug: "future-smart-glass-facades",      titleEN: "The Future of Smart Glass Facades in Megaprojects",                      titleAR: "مستقبل الواجهات الزجاجية الذكية في المشاريع العملاقة",                  categoryEN: "Technical Studies", categoryAR: "دراسات تقنية",   locationEN: "Blog", locationAR: "المدونة", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqxz2yV6Txg1Ylp40OjIw39_JzxcPzcHubVUqCSQjZaFpglU6tL2Sx6kaTyk5Ze_kSNZ2-8-Qph3MIpT0MUVfZbWYtNNfVmcG5_iHWcdZCE7WVgEKNtElpUuHYoL2k1_TKn-B2GeOYA0V3NjKpaUZ7IP1CRuiSZGqNao43nsTbs5kYIe9EV9pAkSA9gLIoxMXbmrheG4xLwUgaygPYbeQAx810fqP1wjiUHbK-iCZJInYlaSkpbDipGYqYuLGrrYPLN86cqBebFl6s", excerptEN: "Discover how modern glass technology achieves critical thermal insulation and smart lighting in luxury skyscrapers.", excerptAR: "كيف تساهم التقنيات الحديثة في تحسين كفاءة الطاقة وتوفير بيئة عمل استثنائية من خلال زجاج ذكي." },
  { id: "b2", type: "blog", slug: "riyadh-tower-phase-ii",           titleEN: "Signing of Phase II for the Riyadh International Tower Facades",        titleAR: "توقيع عقد المرحلة الثانية لتطوير واجهات برج الرياض الدولي",           categoryEN: "Company News",      categoryAR: "مشاريع الشركة", locationEN: "Blog", locationAR: "المدونة", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC47ms1XX8nur_QJz9udfz200farLOcBgEo2EcD8urd7YkAQoa5ZoVofVAQXzczuWZZQxInqG4msiee86bXeGCebBprae1LJWz7NwukGpZyD40qGsR912J8egmHRuvGw9LTlCuTRWlbndIdTJ3FrPuWGlPpeESCtP06FuNqszpTJBV_qgjzdN59DjjndbUqtnnsav6MpKMgBSKasENXAi6oT38lWxTAWiS16v-SSYwMb_cAa7xChfdhvLgqm9mfLgePujX2zYWFW1oM", excerptEN: "Al-Fahd Contracting secures the major installation and cladding agreement for Riyadh's prominent landmark.", excerptAR: "أعلنت الفهد للمقاولات عن شراكة جديدة وتوقيع اتفاقية توريد وتجهيز أنظمة واجهات متكاملة." },
  { id: "b3", type: "blog", slug: "thermal-insulation-desert-climates", titleEN: "Thermal Insulation Impact on Facade Energy Consumption in Desert Climates", titleAR: "تأثير العزل الحراري في الواجهات على استهلاك الطاقة في المناخ الصحراوي", categoryEN: "Technical Studies", categoryAR: "دراسات تقنية",   locationEN: "Blog", locationAR: "المدونة", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw42ezMjfdpd-lA7_MW4p08Sop1r62HU8fY-tIf_mp0-Y4E1fQ0vkKswn7-ehKYrfYSGGNsB3vWsN8nOpDb5lshtj5VwUeeTKZQ5FWgm08KvRdaErnyqv3fF8E6jgOjc-3k4MAO1I7WZKhee9CgPDdFDbi0UVaGCUs85GuanN5fPu-6a7_C2ogyQXqdO-lie-nGV6yd3sNjsDhJD00m_R4hJ158xpOdcFA4qFElmiXfAJb6xnfRTH2YT5Nxk_9zhue72cSRIYfdJ__", excerptEN: "An analytical research on optimizing thermal break profiles for sustainable HVAC load reduction in KSA.", excerptAR: "دراسة هندسية تحليلية حول أهمية تكنولوجيا الحواجز الحرارية لتقليل أحمال التكييف وتوفير الطاقة." },
];

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Only the home page has a full-viewport dark hero — all other pages need a
  // solid header from the very top so the logo/nav are legible.
  const isHomePage = pathname === `/${locale}` || pathname === "/";
  const isTransparent = isHomePage && !scrolled && !mobileMenuOpen;

  useEffect(() => {
    const onScroll = () => {
      // Don't update scroll state while mobile menu is open (body is fixed)
      if (!mobileMenuOpen) {
        setScrolled(window.scrollY > 20);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileMenuOpen]);

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

  // Search filtering — covers all 9 projects + 3 services + 3 blog posts
  const filteredResults = searchQuery.trim()
    ? SEARCH_INDEX.filter((item) => {
        const q = searchQuery.toLowerCase();
        const title = locale === "ar" ? item.titleAR : item.titleEN;
        const cat = locale === "ar" ? item.categoryAR : item.categoryEN;
        const loc = locale === "ar" ? item.locationAR : item.locationEN;
        const excerpt = locale === "ar" ? (item.excerptAR ?? "") : (item.excerptEN ?? "");
        return (
          title.toLowerCase().includes(q) ||
          cat.toLowerCase().includes(q) ||
          loc.toLowerCase().includes(q) ||
          excerpt.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          !isTransparent
            ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800 py-3"
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
            aria-label={locale === "ar" ? "مؤسسة الفهد للمقاولات — الرئيسية" : "Al Fahd Contracting — Home"}
            className="flex items-center gap-3 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950 rounded group"
          >
            {/* Logo — white when header is transparent (over dark hero), blue/black when scrolled */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={!isTransparent ? "/images/logo-dark.png" : "/images/logo-white.png"}
              alt="Al-Fahd Logo"
              className="h-20 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              width={80}
              height={80}
            />
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
                      ? "text-gray-950 dark:text-white font-bold"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800",
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
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              aria-label={t("search")}
            >
              <Search className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Language switcher */}
            <LanguageSwitcher />

            {/* Theme toggle */}
            <ThemeToggle />

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
              className={[
                "p-2 rounded-sm transition-colors",
                isTransparent
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800",
              ].join(" ")}
              aria-label={t("search")}
            >
              <Search className="w-4 h-4" aria-hidden="true" />
            </button>
            <div className="hidden sm:flex">
              <LanguageSwitcher />
            </div>
            <ThemeToggle />
            <MobileMenu navLinks={navLinks} onOpenChange={setMobileMenuOpen} isTransparent={isTransparent} />
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
            className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-100 dark:border-gray-800 max-w-xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input row */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <Search className="w-5 h-5 text-gray-400 shrink-0" aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={locale === "ar" ? "ابحث عن المشاريع والخدمات والمقالات..." : "Search projects, services & articles..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none font-sans text-sm"
                />
              </div>
              <button
                onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                className="px-2.5 py-1 text-xs text-gray-400 hover:text-gray-950 dark:hover:text-white bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors font-semibold"
                aria-label={locale === "ar" ? "إغلاق" : "Close"}
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto p-2">
              {searchQuery.trim() === "" ? (
                <div className="p-4 text-center text-gray-400 dark:text-gray-500 text-xs font-sans">
                  {locale === "ar"
                    ? "اكتب للبحث بالعنوان أو الفئة أو محتوى المقال..."
                    : "Type to search by title, category, or article content..."}
                </div>
              ) : filteredResults.length > 0 ? (
                <div className="space-y-1">
                  {filteredResults.map((item) => {
                    const href =
                      item.type === "project"
                        ? `/${locale}/projects/${item.slug}`
                        : item.type === "service"
                        ? `/${locale}/services/${item.slug}`
                        : `/${locale}/blog/${item.slug}`;
                    const typeLabel =
                      item.type === "project"
                        ? locale === "ar" ? "مشروع" : "Project"
                        : item.type === "service"
                        ? locale === "ar" ? "خدمة" : "Service"
                        : locale === "ar" ? "مقال" : "Article";

                    return (
                      <Link
                        key={item.id}
                        href={href}
                        onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                        className="w-full text-start p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={locale === "ar" ? item.titleAR : item.titleEN}
                            className="w-10 h-10 object-cover rounded-md shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-sans font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover:text-amber-700 dark:group-hover:text-[#C5A880] transition-colors">
                              {locale === "ar" ? item.titleAR : item.titleEN}
                            </p>
                            <p
                              className="text-[10px] text-gray-400 dark:text-gray-500"
                              style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                              {typeLabel} •{" "}
                              {locale === "ar" ? item.categoryAR : item.categoryEN}
                              {item.type === "project" && (
                                <> • {locale === "ar" ? item.locationAR : item.locationEN}</>
                              )}
                            </p>                          </div>
                        </div>
                        {/* Enter arrow */}
                        <svg
                          className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-600 dark:group-hover:text-gray-300 shrink-0"
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400 text-xs font-sans">
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
