"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

// Static reference data with real images (matches content JSON)
const allProjects = [
  {
    id: "1",
    slug: "king-salman-financial-tower",
    titleEN: "King Salman Financial Tower",
    titleAR: "برج الملك سلمان المالي",
    category: "glass",
    locationEN: "Riyadh, KSA",
    locationAR: "الرياض، المملكة العربية السعودية",
    year: "2024",
    scaleEN: "45,000 m²",
    scaleAR: "٤٥,٠٠٠ م²",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvwblNQmF23c_-OuBV0Z0mf899U3_IkjyA5GnwYGAucjLJr5dMn4fIRHOfRhrQXKQp1a9UF4SKTzcHO07m1-nUIN8f_QUAjLWOljnWsKMOYjU7ZIn6cThWq5YIMviz3Qd7OUCZHsN6q0oRTv7_eVjGrBEZw7gJy4I-LzfztGObl7J5yG9JI_9gnbij6SjS2w2HIjWEm3bHFsUza4MeB5TPRd7ny3i0jgWuZ4MUHoJJl342TdyBkVCpsyd88Cfw5CrSk5MCpK67kb14",
  },
  {
    id: "2",
    slug: "neom-infrastructure-hub",
    titleEN: "NEOM Infrastructure Hub",
    titleAR: "مجمع بنيوم الإنشائي",
    category: "iron",
    locationEN: "NEOM, KSA",
    locationAR: "نيوم، المملكة العربية السعودية",
    year: "Ongoing",
    scaleEN: "120,000 m²",
    scaleAR: "١٢٠,٠٠٠ م²",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMnLDv35oEIlyXRgKy3LWwpROa09JaxlklFhgfUcCYnJsXR5yE3do-MNglVqtnZyeOJ79ALeaMSwzMztQ2PO4W0RcFPVEaPzdd8t8Gw2mGbP8044xWAvpE-6-q1-J_nWPmoHhjof27zsYyk1erwGEC6iFXB2HVKXmEtsS5DiD8HrqTbBqRFtrPZa5-MAbLLjWu-fR_-fw3g0jgKdsr0ADAqFxuC8YZJ0p0taaMAr9xj3kPl-crFJZugJfvuNMC6ZSRQTxIIUZocJ4g",
  },
  {
    id: "3",
    slug: "red-sea-global-pavilion",
    titleEN: "Red Sea Global Pavilion",
    titleAR: "جناح البحر الأحمر العالمي",
    category: "glass",
    locationEN: "Red Sea, KSA",
    locationAR: "البحر الأحمر، المملكة العربية السعودية",
    year: "2023",
    scaleEN: "18,500 m²",
    scaleAR: "١٨,٥٠٠ م²",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeXd_bsxIZ523NTAhdnr374o56ikad_BtTVJwWIwQCADfORBs28IQcapnWhHr_d8K3amACjUId2MiQEKt6mA8zyS-TdAB9fCvMs594dvGZS9bolZzlz91PkS-Td1aFw4NKPRg0bpm_5SyyAsXRN1YO3Yrz2tP3xIFJoII2TZf2OM2aKTaIGiz-BplENh_XB6x63o1H_vO74XQ3RbFVyvh1PmWmzlRXd1UcIkFYKqDZ8h1AM_2f_clnNqGfnIB_ht46rUVTjNGdbF5H",
  },
  {
    id: "4",
    slug: "commercial-crystal-tower",
    titleEN: "Commercial Crystal Tower",
    titleAR: "برج الكريستال التجاري",
    category: "aluminium",
    locationEN: "Riyadh, KSA",
    locationAR: "الرياض، المملكة العربية السعودية",
    year: "2024",
    scaleEN: "25,000 m²",
    scaleAR: "٢٥,٠٠٠ م²",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqlrwHcNt2VRqEMfO73px9Vmxt-L3lqQkb9Z9Ic8wI-Ni5nbyg3EdqYEcALDRyItBnvlZdhT3R0REdFKYGBxZ_dNQ7-q52XpgCuaoczp3r943lDomB3ge4cjixLDCBDVBTaJeRU3uCpEnAC8urEUKHRb-EsF0lCd_s4yBLak2G6eWTt1gDuhifEqG8bwolOmqlCludTY2XiyP0UU4trFEqMcXSvPqT3ISW-j6ikGon39ZKm0JfC22hGJUVpoZx6L0zBim6zzseeqJr",
  },
  {
    id: "5",
    slug: "al-nakheel-mall-atrium",
    titleEN: "Al Nakheel Mall Atrium",
    titleAR: "أتريوم مجمع النخيل",
    category: "glass",
    locationEN: "Jeddah, KSA",
    locationAR: "جدة، المملكة العربية السعودية",
    year: "2023",
    scaleEN: "12,000 m²",
    scaleAR: "١٢,٠٠٠ م²",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvNMXhx_PtZEjUvGER6vEwXdB5cRdkvrltMht8WC9l3SEbK28C07yPkcox9J-zjOUlBCKx9oW4smjdPDKeaXIpjWAgJy3ZnoCagzkfdJjlZ9bOviZBCRjR2Mz-JHQf6rpE0bA6Jf6NxI1oJDauUGz7QT3OxPTqIbJAc--XiSVUcy9fe_W0rzPOitHObQsXeDUscnLk143ZL-RXCIqLGuSOuaWtrpLFgC5Thy8YAJeu0ijswRmR5Uzmnybshd_sVTo8bBAcI0w6NkQY",
  },
  {
    id: "6",
    slug: "al-naseem-private-villa",
    titleEN: "Al Naseem Private Villa",
    titleAR: "فيلا النسيم الخاصة",
    category: "iron",
    locationEN: "Khobar, KSA",
    locationAR: "الخبر، المملكة العربية السعودية",
    year: "2024",
    scaleEN: "3,200 m²",
    scaleAR: "٣,٢٠٠ م²",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlI6giCcQB-rUvweBJJ-EAjJ2Qq6h0olzrcPKvnwcrqQw436rXYn789VL75xMSuDImoLKJAyQvjfA4_-aVeGjpW95RHsvMDV_RrhzN3jsRpcJ0T2nj7kudYoe99c5Ns8jw0PSiPB8Z_1uvcnrrU6-IHJqKzCyZtBp2f2t6NiwlgM-c5xP23fie1Qa25Fp6Vd8g72xTnqxMvUmqVqrAG2_pMHYOECspMCI4H8E4TZt-pp-X-ZWEy6v1hjs2cziW2PcYaBY-77teAFKU",
  },
  {
    id: "7",
    slug: "industrial-innovation-complex",
    titleEN: "Industrial Innovation Complex",
    titleAR: "مجمع الابتكار الصناعي",
    category: "aluminium",
    locationEN: "Jubail, KSA",
    locationAR: "الجبيل، المملكة العربية السعودية",
    year: "2023",
    scaleEN: "35,000 m²",
    scaleAR: "٣٥,٠٠٠ م²",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDThd-WgATXSWPGf34k60Y9gU_Fp5HXLZf9TQfJZfcdJFAQ0FojZZnbYkHWv4XzgMCwt47kAawrCIcZWA01A9xFLFyfSk4-YUaFfVFG0wtYfufH5Qqc-nP_CicFqhX3L73xEnZYZpu1Vi-KCjyNmo9gEoHWaQLsv5XNYJvQqm9aRZJU7eorQiAJSfAVDXqPAUR7dC2GPLGPOj2UyMTaZetg_ih6B9GLc_uW9_gksFCeIUSxQtIP4CVgmIN2aeILdqSSflW2Z2g_P-Xa",
  },
  {
    id: "8",
    slug: "rolls-royce-showroom",
    titleEN: "Rolls Royce Showroom",
    titleAR: "معرض رولز رويس",
    category: "glass",
    locationEN: "Riyadh, KSA",
    locationAR: "الرياض، المملكة العربية السعودية",
    year: "2023",
    scaleEN: "1,500 m²",
    scaleAR: "١,٥٠٠ م²",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCj6ujoVoJrgwr7_SM4IkWKmQ0g-6xEaO8h3m6OYGus18fY-bNHGDPAF4jph6YbhDIcjqZ67ek6D-cKKRsaZas0HJIsQyuWwGjY_luHLwyZze3kPRg0KQwcM7MLCcT0Hq0rAgrqDb485qtDrWPbt-Kz66pGU66ztQD0e5LFvGWmWdzxlpF7qcPsleej42OL-X2qgZrbYQKhQNZCxNte3z28ACD6e-G6Im9DEsSlXb4YPfk_-K0arDD5TVE0g1wvSkWC2oue_QRDN0co",
  },
  {
    id: "9",
    slug: "smart-pedestrian-bridge",
    titleEN: "Smart Pedestrian Bridge",
    titleAR: "جسر المشاة الذكي",
    category: "iron",
    locationEN: "KAFD, Riyadh",
    locationAR: "مركز الملك عبدالله المالي، الرياض",
    year: "2023",
    scaleEN: "4,800 m²",
    scaleAR: "٤,٨٠٠ م²",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7AbIbz53C_YURvbfL7IVSBiFB8YdS561Z73FqKXBlFaETJZReMjGUVLk6cfSR8JekGMFmxaZB5lXI9VX2q-iR0FGonumLvrKjT31CY9w4d1dY4ODxTEqwf9MRU5D_bphcM7zk3tigIPqVEC6cAjuIsIf4L-J1iDlUMXjWPfGB9mTkAHxKfcFTXITHDg1rSoS9GQQex0XAskrher-7TsLzL76NR6EbbMnAir8v3HKA3h9s6qt6-QpeLASxXuZ5qjDx2I6TinBVkv3g",
  },
];

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  ar: { all: "الكل", aluminium: "الألمنيوم", glass: "الزجاج", iron: "الحديد" },
  en: { all: "All", aluminium: "Aluminium", glass: "Glass", iron: "Iron" },
};

export function ProjectsClient() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const isAr = locale === "ar";
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");

  const labels = CATEGORY_LABELS[locale] ?? CATEGORY_LABELS.en;
  const categories = ["all", "aluminium", "glass", "iron"];

  const filtered = allProjects.filter((p) => {
    const matchesCat = active === "all" || p.category === active;
    const title = isAr ? p.titleAR : p.titleEN;
    const loc = isAr ? p.locationAR : p.locationEN;
    const matchesSearch =
      search.trim() === "" ||
      title.toLowerCase().includes(search.toLowerCase()) ||
      loc.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-20 bg-[#FAF9F5] dark:bg-gray-950">
      {/* Editorial header */}
      <section className="bg-gray-950 py-20 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.05,
          }}
          aria-hidden="true"
        />
        <div className="container-brand relative z-10">
          <div className="max-w-3xl">
            <span
              className="block mb-4 font-bold uppercase tracking-widest"
              style={{
                color: "#C5A880",
                fontSize: "10px",
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                letterSpacing: "0.1em",
              }}
            >
              {isAr ? "محفظة الأعمال" : "Project Portfolio"}
            </span>
            <h1
              className="font-sans font-extrabold text-white uppercase mb-4"
              style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            >
              {t("title")}
            </h1>
            <p className="text-gray-400 text-base leading-relaxed max-w-xl">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      {/* Filter + Search */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-5 sticky top-16 z-30">
        <div className="container-brand flex flex-wrap items-center justify-between gap-4">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label={t("allCategories")}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={[
                  "px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200",
                  active === cat
                    ? "bg-gray-950 dark:bg-white text-white dark:text-gray-950"
                    : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500",
                ].join(" ")}
              >
                {labels[cat] ?? cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-3 py-2 rounded">
            <span className="material-symbols-outlined text-gray-400" aria-hidden="true" style={{ fontSize: "16px" }}>
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isAr ? "ابحث في المشاريع..." : "Search projects..."}
              className="bg-transparent text-xs text-gray-800 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none w-40"
            />
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-16">
        <div className="container-brand">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-base">
                {isAr ? "لا توجد مشاريع في هذه الفئة" : "No projects found"}
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((project) => {
                const title = isAr ? project.titleAR : project.titleEN;
                const location = isAr ? project.locationAR : project.locationEN;
                const scale = isAr ? project.scaleAR : project.scaleEN;
                const catLabel = labels[project.category] ?? project.category;

                return (
                  <Link
                    key={project.id}
                    href={`/${locale}/projects/${project.slug}`}
                    className="group block break-inside-avoid"
                  >
                    <div className="relative overflow-hidden rounded-lg bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={title}
                        className="w-full h-auto object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                        style={{ aspectRatio: "4/3" }}
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(3,7,18,0.85) 0%, transparent 60%)",
                        }}
                        aria-hidden="true"
                      />
                      <div className="absolute bottom-0 start-0 end-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                        <p
                          className="text-[#C5A880] font-bold uppercase mb-1"
                          style={{
                            fontSize: "9px",
                            fontFamily: "'JetBrains Mono', monospace",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {catLabel} • {project.year}
                        </p>
                        <h3 className="text-white font-bold text-sm leading-snug">
                          {title}
                        </h3>
                        <p
                          className="text-white/60 mt-0.5"
                          style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {location} • {scale}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-950 py-20 text-center">
        <div className="container-brand">
          <h2
            className="font-sans font-extrabold text-white uppercase mb-6"
            style={{ fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.01em" }}
          >
            {isAr ? "مشروعك القادم؟" : "Is Your Project Next?"}
          </h2>
          <Link
            href={`/${locale}/request-quote`}
            className="inline-flex items-center gap-3 bg-white text-gray-950 px-10 py-4 font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-all duration-200"
          >
            {isAr ? "طلب عرض سعر" : "Request a Quote"}
            <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: "14px" }}>
              {isAr ? "arrow_back" : "arrow_forward"}
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
