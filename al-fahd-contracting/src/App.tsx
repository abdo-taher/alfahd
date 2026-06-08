/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Flame,
  ShieldAlert,
  Layers,
  Award,
  Clock,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Search,
  Check,
  Building,
  Eye,
  FileText,
  UserCheck
} from 'lucide-react';
import { Language, Page, Project, BlogPost } from './types';
import { PROJECTS, BLOG_POSTS, TRANSLATIONS } from './data';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RFQForm } from './components/RFQForm';
import { PortalDashboard } from './components/PortalDashboard';
import { Preloader } from './components/Preloader';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [page, setPage] = useState<Page>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [expandedPost, setExpandedPost] = useState<BlogPost | null>(null);
  const [fabTab, setFabTab] = useState<'cnc' | 'tempering'>('cnc');
  const [portalRefresh, setPortalRefresh] = useState(0);
  const [loading, setLoading] = useState(true);

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  // Prevent scroll when structural calibration pre-loader is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loading]);

  // Parse URL hash for clean routing integration
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      const validPages: Page[] = ['home', 'about', 'services', 'projects', 'blog', 'contact', 'portal'];
      if (validPages.includes(hash as Page)) {
        setPage(hash as Page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on initial load
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update document language attribute & page update helper
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [lang, isRtl]);

  const navigateToPage = (targetPage: Page) => {
    window.location.hash = `#/${targetPage}`;
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSelect = (projectId: string) => {
    const found = PROJECTS.find((p) => p.id === projectId);
    if (found) {
      setSelectedProject(found);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader key="app-preloader" onComplete={() => setLoading(false)} lang={lang} />
        )}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col bg-[#FAF9F5] font-sans selection:bg-[#C5A880]/30 selection:text-gray-950">
        {/* Universal Header */}
        <Header
          currentLang={lang}
          setLang={setLang}
          currentPage={page}
          setCurrentPage={navigateToPage}
          onSearchSelect={handleSearchSelect}
          onTriggerLoader={() => setLoading(true)}
        />

      {/* Main Body Dynamic Render Section (Sliding cinematic transitions) */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* ======= HOME VIEW ======= */}
            {page === 'home' && (
              <div className="space-y-20 pb-20">
                {/* Parallax Hero Banner */}
                <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-gray-950">
                  <div className="absolute inset-0">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDScQQz-0k7wAMs-7fy1rOTVgV59olg4wNSXIW3DHO8gf-9iLNezKKrIEy2S0z9TaVwTz7XZvVlrA4A4_QEuZUtL9Q74JVZ5BjeZClpXrIP8mDsw6IOwE40yoONLNodTIQuQFEICeP4UkaP7tsW0FHBsLIkGBj5TfWy87fDar_hclkSUzC02Fp03N5mMcQlsCjVccIGHZ7_FgqXIrA8ZcWbOwrr_7pvPL59DjIUuQHoIgZqbuZwCy0Q_gXdcFCfjSdLrv52d67Lj0kL"
                      alt="Al-Fahd Tower Structure"
                      className="w-full h-full object-cover opacity-35 scale-105 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
                  </div>

                  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6 z-10">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="inline-flex items-center space-x-2 gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-mono text-[#C5A880] uppercase tracking-widest"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.heroBadge}</span>
                    </motion.div>

                    <h1 className="font-sans font-extrabold text-4xl sm:text-6xl tracking-tight uppercase leading-none max-w-4xl mx-auto">
                      {isRtl ? 'الفهد لأنظمة الواجهات الهندسية' : 'Al-Fahd Facade Engineering & Contracting'}
                    </h1>

                    <p className="font-sans text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
                      {t.footerDesc}
                    </p>

                    <div className="pt-6 flex flex-wrap justify-center items-center gap-4">
                      <button
                        onClick={() => navigateToPage('projects')}
                        className="px-7 py-3.5 bg-white hover:bg-gray-100 text-gray-950 font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg cursor-pointer"
                        id="h-explore-projects"
                      >
                        {isRtl ? 'استعراض مشاريعنا' : 'Explore Portfolio'}
                      </button>
                      <button
                        onClick={() => navigateToPage('contact')}
                        className="px-7 py-3.5 bg-transparent hover:bg-white/10 border-2 border-white text-white font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
                        id="h-contact-btn"
                      >
                        {isRtl ? 'اطلب عرض سعر الآن' : 'Request Technical Evaluation'}
                      </button>
                    </div>

                    {/* Regional stats indicators */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-16 max-w-3xl mx-auto text-center border-t border-white/10 mt-10">
                      <div>
                        <p className="font-mono text-3xl sm:text-4xl text-[#C5A880] font-bold">40+</p>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-1">{t.statsTrust}</p>
                      </div>
                      <div>
                        <p className="font-mono text-3xl sm:text-4xl text-[#C5A880] font-bold">1,200+</p>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-1">{t.statsProjects}</p>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <p className="font-mono text-3xl sm:text-4xl text-[#C5A880] font-bold">50,000+</p>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-1">{t.statsProduction}</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* The Three Elite Pillars Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center space-y-3 mb-12">
                    <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-bold">Our Philosophy</span>
                    <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-gray-950 uppercase tracking-tight">
                      {t.pillarsTitle}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {t.pillars.map((p, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-gray-100 rounded-lg p-6 relative hover:shadow-xl transition-all duration-300 group"
                        id={`pillar-card-${idx}`}
                      >
                        <div className="absolute top-6 right-6 font-mono text-xs font-bold text-[#C5A880]/35 group-hover:text-[#C5A880]/70 transition-colors">
                          {p.num}
                        </div>
                        <h3 className="font-sans font-bold text-base text-gray-900 group-hover:text-amber-800 transition-colors pt-4 pb-2">
                          {p.title}
                        </h3>
                        <p className="font-sans text-xs text-gray-500 leading-relaxed">
                          {p.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Dynamic Sliding Premium Showcase (Bento Showcase Panel) */}
                <section className="bg-white border-y border-gray-100 py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                      <div className="space-y-2">
                        <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-extrabold">Active Architecture Works</span>
                        <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-gray-950 uppercase tracking-tight">
                          {t.bentoHeader}
                        </h2>
                      </div>
                      <button
                        onClick={() => navigateToPage('projects')}
                        className="mt-4 md:mt-0 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-sm font-sans text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center space-x-2 gap-2 cursor-pointer"
                        id="h-view-all-projects-link"
                      >
                        <span>{t.viewArchive}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[500px]">
                      {/* Big Highlight Box (King Salman Financial Tower) */}
                      <div
                        onClick={() => handleSearchSelect('1')}
                        className="md:col-span-7 relative group overflow-hidden rounded-lg cursor-pointer shadow-sm border border-gray-100 h-[300px] md:h-full"
                        id="bento-featured-1"
                      >
                        <div className="absolute inset-0">
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvwblNQmF23c_-OuBV0Z0mf899U3_IkjyA5GnwYGAucjLJr5dMn4fIRHOfRhrQXKQp1a9UF4SKTzcHO07m1-nUIN8f_QUAjLWOljnWsKMOYjU7ZIn6cThWq5YIMviz3Qd7OUCZHsN6q0oRTv7_eVjGrBEZw7gJy4I-LzfztGObl7J5yG9JI_9gnbij6SjS2w2HIjWEm3bHFsUza4MeB5TPRd7ny3i1jgWuZ4MUHoJJl342TdyBkVCpsyd88Cfw5CrSk5MCpK67kb14"
                            alt="King Salman Financial Tower"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />
                        </div>
                        <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-amber-400 bg-amber-950/65 px-2 py-0.5 rounded-sm inline-block">
                            {lang === 'en' ? 'Featured Masterwork' : 'عمل متميز معتمد'}
                          </span>
                          <h3 className="font-sans font-bold text-lg sm:text-xl">
                            {lang === 'en' ? 'King Salman Financial Tower' : 'برج الملك سلمان المالي'}
                          </h3>
                          <p className="text-gray-300 text-xs font-sans max-w-md hidden sm:block">
                            {lang === 'en' ? 'Extreme thermal performance double-glazed curtain walls.' : 'أنظمة جدران فنية مزدوجة لعزل الحرارة القصوى.'}
                          </p>
                        </div>
                      </div>

                      {/* Side Bento Column */}
                      <div className="md:col-span-5 grid grid-rows-2 gap-6 h-full">
                        {/* Red Sea Global Pavilion */}
                        <div
                          onClick={() => handleSearchSelect('3')}
                          className="relative group overflow-hidden rounded-lg cursor-pointer shadow-sm border border-gray-100 h-[200px] md:h-full"
                          id="bento-featured-2"
                        >
                          <div className="absolute inset-0">
                            <img
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeXd_bsxIZ523NTAhdnr374o56ikad_BtTVJwWIwQCADfORBs28IQcapnWhHr_d8K3amACjUId2MiQEKt6mA8zyS-TdAB9fCvMs594dvGZS9bolZzlz91PkS-Td1aFw4NKPRg0bpm_5SyyAsXRN1YO3Yrz2tP3xIFJoII2TZf2OM2aKTaIGiz-BplENh_XB6x63o1H_vO74XQ3RbFVyvh1PmWmzlRXd1UcIkFYKqDZ8h1AM_2f_clnNqGfnIB_ht46rUVTjNGdbF5H"
                              alt="Red Sea Global Pavilion"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/10 to-transparent" />
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 text-white space-y-0.5">
                            <span className="font-mono text-[8px] uppercase tracking-widest text-[#C5A880] block">
                              Sustainable System
                            </span>
                            <h4 className="font-sans font-bold text-sm">
                              {lang === 'en' ? 'Red Sea Global Pavilion' : 'جناح البحر الأحمر العالمي'}
                            </h4>
                          </div>
                        </div>

                        {/* NEOM Infrastructure Hub */}
                        <div
                          onClick={() => handleSearchSelect('2')}
                          className="relative group overflow-hidden rounded-lg cursor-pointer shadow-sm border border-gray-100 h-[200px] md:h-full"
                          id="bento-featured-3"
                        >
                          <div className="absolute inset-0">
                            <img
                              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMnLDv35oEIlyXRgKy3LWwpROa09JaxlklFhgfUcCYnJsXR5yE3do-MNglVqtnZyeOJ79ALeaMSwzMztQ2PO4W0RcFPVEaPzdd8t8Gw2mGbP8044xWAvpE-6-q1-J_nWPmoHhjof27zsYyk1erwGEC6iFXB2HVKXmEtsS5DiD8HrqTbBqRFtrPZa5-MAbLLjWu-fR_-fw3g0jgKdsr0ADAqFxuC8YZJ0p0taaMAr9xj3kPl-crFJZugJfvuNMC6ZSRQTxIIUZocJ4g"
                              alt="NEOM Hub"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/10 to-transparent" />
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 text-white space-y-0.5">
                            <span className="font-mono text-[8px] uppercase tracking-widest text-blue-400 block animate-pulse">
                              Active Steel Mega-joint
                            </span>
                            <h4 className="font-sans font-bold text-sm">
                              {lang === 'en' ? 'NEOM Infrastructure Hub' : 'مجمع بنيوم الإنشائي'}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Fabrication Floor Segment Slider ("The Factory Floor") */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="factory-floor-section">
                  <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-6 mb-8">
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-extrabold">{t.factoryFloorBadge}</span>
                      <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-gray-950 uppercase tracking-tight">{t.factoryFloorTitle}</h2>
                    </div>
                    {/* Switcher tabs */}
                    <div className="flex space-x-1 gap-1.5 mt-4 md:mt-0 font-sans text-xs font-semibold">
                      <button
                        onClick={() => setFabTab('cnc')}
                        className={`px-4 py-2 rounded-sm cursor-pointer transition-colors duration-200 ${
                          fabTab === 'cnc'
                            ? 'bg-gray-950 text-white'
                            : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-100'
                        }`}
                        id="tab-cnc-robotics"
                      >
                        CNC Laser Robotics
                      </button>
                      <button
                        onClick={() => setFabTab('tempering')}
                        className={`px-4 py-2 rounded-sm cursor-pointer transition-colors duration-200 ${
                          fabTab === 'tempering'
                            ? 'bg-gray-950 text-white'
                            : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-100'
                        }`}
                        id="tab-glass-tempering"
                      >
                        Glass Tempering
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="lg:col-span-5 space-y-4">
                      {fabTab === 'cnc' ? (
                        <motion.div
                          key="cnc-detail-pane"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-4"
                        >
                          <span className="font-mono text-xs text-[#C5A880] block font-bold">01 / MICRO-MILIMETER EXTRACTIONS</span>
                          <h3 className="font-sans font-bold text-lg text-gray-900">
                            {lang === 'en' ? 'Sub-millimeter Laser Robotics' : 'أنظمة القطع الآلي الدقيق CNC'}
                          </h3>
                          <p className="font-sans text-xs text-gray-500 leading-relaxed">
                            {lang === 'en'
                              ? 'Our Italian and German CNC industrial platforms process solid extrusions up to 18 meters in height, ensuring flawless curtain wall interlocking seals that can withstand desert heat expansion.'
                              : 'تضمن منصتنا الإيطالية والألمانية للـ CNC معالجة التشكيلات المعقدة بارتفاعات تصل إلى ١٨ مترًا مع تفاوت خطأ يقل عن ميكرون، مما يمنع تسرب الرمال والهواء الساخن تمامًا.'}
                          </p>
                          <div className="space-y-2 text-xs font-mono text-gray-600 bg-gray-50 p-3 rounded border border-gray-100">
                            <p>• Max Extrusion Height: 18.2m</p>
                            <p>• Axis Degrees of Freedom: 5-Axis Linear Vector</p>
                            <p>• Surface Tolerances: Less than 0.15mm</p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="tempering-detail-pane"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-4"
                        >
                          <span className="font-mono text-xs text-[#C5A880] block font-bold">02 / INTEGRATED THERMAL TEMPERING</span>
                          <h3 className="font-sans font-bold text-lg text-gray-900">
                            {lang === 'en' ? 'High-Performance Lamination and Tempering' : 'أفران المعالجة الحرارية المتكاملة لمتانة الزجاج'}
                          </h3>
                          <p className="font-sans text-xs text-gray-500 leading-relaxed">
                            {lang === 'en'
                              ? 'Featuring double-chamber heavy convection tempering furnaces to output certified structural panels robust enough to bear up to 4.5kPa wind loads, critical for commercial skyscrapers.'
                              : 'تتميز مصانعنا بأفران ثنائية الغرفة ثقيلة الوزن لإنتاج زجاج مقسى يعالج حرارياً ويتحمل أحمال الرياح الفائقة حتى ٤.٥ كيلو باسكال لمقاومة عواصف الخماسين والرياح المرتفعة.'}
                          </p>
                          <div className="space-y-2 text-xs font-mono text-gray-600 bg-gray-50 p-3 rounded border border-gray-100">
                            <p>• Wind Load Capacity: Up to 4.5 kPa</p>
                            <p>• Convection Heating: Dual Chamber Computerized Control</p>
                            <p>• Certification Standards: ASTM C1048 / EN 12150</p>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="lg:col-span-7 h-[300px] rounded-md overflow-hidden relative shadow-inner">
                      {fabTab === 'cnc' ? (
                        <motion.img
                          key="cnc-img"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCijFCAWV1wG4PQ2oHJ9dNbTkR6_YEhJNpwopsMxEXlQv3X6bWZ0GcN4NliTFdvIPmoTMHgTeFcUJbs2C8NE-aGDALj4mUiqqhPKylsZaQGt_wlP_3rVX-jidijmwA3HA-A5d2_ksWvxuo47Emcs44iAfqaMff3aubOwd6yIscA2tXWH20dGK3hczXkLDgIiAEYIwhL8_EFabAkZq_CWPwW7XfhT7I5RDO9fzLvGUj_6jszSMCeiiWUW6YAoj7EH8B2WdsXgWNRJDV9"
                          alt="CNC Robot Cutter"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <motion.img
                          key="tempering-img"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_S5ziMylscIGIDX2J7Uawe0ahG1IDoe_zcuYtOp3B836rwXt8i8nxRc0LPhrS7s7DLs2zAZTyLQdyO-Fejsy5R9xdrunp0Czyp00LvmI3D7mM0DdziQYTNVIVL3HD_-w9lxhfKaoLmacEcX8abiF5ee03TeiIVzeP4qfnwSHI7GzJ3RmwSbx-g8o-cojhvIQwlljv1X1O1zUieSSsjNBlFYBxQ8EBDx8k1Yko64DDfxUtJFrIzxGGlI4beSY9Rz31UdKgD6t9gRWi"
                          alt="Glass oven detail"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                  </div>
                </section>

                {/* Final Slate CTA banner */}
                <section className="bg-gray-950 text-white py-16 text-center overflow-hidden relative">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
                  </div>
                  <div className="relative max-w-4xl mx-auto px-4 space-y-5 z-10">
                    <h3 className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tight uppercase">
                      {t.ctaForgeTitle}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
                      {t.ctaForgeDesc}
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => navigateToPage('contact')}
                        className="px-8 py-3.5 bg-white hover:bg-gray-100 text-gray-950 font-sans text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-lg"
                        id="h-cta-bottom"
                      >
                        {isRtl ? 'عرض استمارة تقديم الطلب' : 'Formulate Proposal Request'}
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* ======= ABOUT VIEW ======= */}
            {page === 'about' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
                <div className="text-center space-y-2">
                  <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-extrabold">About Our Legacy</span>
                  <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-950 uppercase tracking-tight">40 Years of Facade Mastery</h1>
                </div>

                {/* Horizontal Timeline */}
                <section className="space-y-6">
                  <h3 className="font-sans font-bold text-sm text-gray-950 uppercase tracking-wider border-b border-gray-150 pb-2">Institutional Timeline</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                      { year: '1984', title: 'Founding Base', text: 'Established in Riyadh as a specialized iron fabrication workshop servicing early developments.' },
                      { year: '1998', title: 'Aluminum Pivot', text: 'Commissioned our first aluminum extrusion cutting machinery, aligning with modern skyscraper demand.' },
                      { year: '2012', title: 'Megaproject Lead', text: 'Secured primary supplier and instillation certificates for landmark structural glass works across Riyadh.' },
                      { year: '2026', title: 'Vision 2030 Partner', text: 'Direct framework agreements in NEOM and Red Sea Global specializing in complex eco-facades.' }
                    ].map((step, index) => (
                      <div key={index} className="bg-white border border-gray-100 p-5 rounded-lg shadow-sm space-y-3 relative group hover:border-[#C5A880] transition-colors" id={`timeline-step-${index}`}>
                        <span className="font-mono text-xl font-bold text-[#C5A880] block">{step.year}</span>
                        <h4 className="font-sans font-bold text-xs text-gray-900 uppercase tracking-wide">{step.title}</h4>
                        <p className="font-sans text-[11px] text-gray-650 leading-relaxed">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Leadership Portrait Board */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
                  <div className="lg:col-span-5 relative">
                    <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-md border-4 border-[#FAF9F5]/80">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEfvBp22oZL6GJgkTDi1DHg72lzen4batZAfRPX30xtxdUTYrxtXLRQ59hvSJcYNot20t6XnE6kTqKIZK5Mv-fqz11k3m17R9N6PKJHCqM4jQd85TzOc6t5NTdpyvHnOum9apAMzWQVHS7YecgR8yd6DTRHRNB9JSpVI0yxjwQ4Za2FEx9peEhzq3At2Km_5_kR8IIvNCYAU9xZ2UgOu2N5CFjOcDurJRu7S_vX53sAjrYyyN9y-RxlmPmwW0ZsZKdTMcYUBKru3Z6"
                        alt="Eng. Fahd Al-Rashid"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Floating badge */}
                    <div className="absolute bottom-4 left-4 bg-gray-950 text-white px-3 py-1.5 rounded text-[10px] font-mono tracking-wider uppercase border border-gray-800">
                      Eng. Fahd Al-Rashid
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#C5A880] font-bold">Executive Council Statement</span>
                      <h3 className="font-sans font-extrabold text-2xl text-gray-950 uppercase tracking-tight">{t.leadershipTitle}</h3>
                      <p className="font-sans text-xs font-semibold text-gray-500 uppercase">{t.leadershipFounder}</p>
                    </div>

                    <blockquote className="border-l-4 border-amber-653 pl-4 italic text-sm text-gray-700 leading-relaxed font-sans" style={{ borderLeftColor: '#C5A880' }}>
                      {lang === 'en'
                        ? '"Precision is not a metric; it is our promise to the skyline of tomorrow. We don\'t just build facades; we engineer the interfaces between humanity and the environment."'
                        : '"الدقة ليست مجرد مقياس ميكانيكي؛ بل إنها طريقتنا لترسيخ صروح الغد. إننا لا نبني واجهات فحسب، بل نصنع الواجهة التنفيذية التي تجمع بين الإنسان واستدامته الجوية."'}
                    </blockquote>

                    <p className="font-sans text-xs text-gray-600 leading-relaxed">
                      {lang === 'en'
                        ? 'Under the progressive direction of Eng. Fahd Al-Rashid, Al-Fahd Contracting has transformed from a localized steel works mill into KSA’s premier specialized contractor. We partner with international starchitects to deliver double-skin systems, high-tension glass fins and structural canopies compliant with the strict parameters of the Saudi Building Code.'
                        : 'تحت القيادة الحكيمة لمجلس الإدارة بقيادة المهندس فهد الرشيد، واصلت الفهد ريادة الابتكار والتوطين في صناعة الواجهات، حيث قمنا بتوريد وتركيب أحدث أنظمة الجدران الستائرية الموفرة للطاقة تماشيًا مع أهداف رؤية ٢٠٣٠ لبناء غدٍ أكثر رفاهية وأمان.'}
                    </p>

                    <div className="pt-2 text-xs flex flex-wrap gap-2 text-gray-500 font-mono">
                      <span className="bg-gray-105 border border-gray-200 px-2 py-1 rounded">✓ Vision 2030 National Content Compliant</span>
                      <span className="bg-gray-105 border border-gray-200 px-2 py-1 rounded">✓ Over 40 Key Municipal Awards</span>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* ======= SERVICES VIEW ======= */}
            {page === 'services' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
                <div className="text-center space-y-2">
                  <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-extrabold">{t.servicesSub}</span>
                  <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-950 uppercase tracking-tight">{t.servicesTitle}</h1>
                  <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">{t.servicesDesc}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {t.serviceItems.map((item, index) => (
                    <div key={index} className="bg-white border border-gray-100 rounded-lg p-6 relative hover:shadow-lg transition-all duration-300 space-y-4" id={`service-card-${index}`}>
                      <span className="font-mono text-2xl font-bold text-[#C5A880]/30 block">{item.id}</span>
                      <h3 className="font-sans font-bold text-sm text-gray-950 uppercase tracking-wider">{item.title}</h3>
                      <p className="font-sans text-xs text-gray-500 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>

                {/* Flow diagrams */}
                <section className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-150 space-y-6">
                  <h3 className="font-sans font-bold text-sm text-gray-950 uppercase tracking-wider text-center">Process Workflow & Project Pipeline</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                    {[
                      { step: '01', title: 'Blueprint Intake', desc: 'Secure upload and vector intake of CAD drawings.' },
                      { step: '02', title: 'Value Engineering', desc: 'Optimizing profile dimensions to limit weight loads.' },
                      { step: '03', title: 'Team Sourcing', desc: 'Sourcing of thermal-break aluminum and safety glass.' },
                      { step: '04', title: 'Micro Fabrication', desc: 'Automatic CNC robot milling and quality checks.' },
                      { step: '05', title: 'Site Elevation', desc: 'Installation on site with spider lifts and scaffolding.' }
                    ].map((fw, offset) => (
                      <div key={offset} className="text-center p-4 border border-gray-50 rounded-lg bg-gray-50/50 space-y-2 relative" id={`flow-fw-${offset}`}>
                        <span className="w-8 h-8 rounded-full bg-gray-950 text-white font-mono text-xs font-bold inline-flex items-center justify-center">{fw.step}</span>
                        <h4 className="font-sans font-bold text-xs text-gray-900 uppercase">{fw.title}</h4>
                        <p className="font-sans text-[10px] text-gray-500 leading-normal">{fw.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* ======= PROJECTS GALLERY VIEW ======= */}
            {page === 'projects' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
                <div className="text-center space-y-2">
                  <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-extrabold font-bold">The Portfolio</span>
                  <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-950 uppercase tracking-tight">Specialized Civil Works</h1>
                </div>

                {/* Complete grid of active portfolio items. Clicking pops a modular detail layout. */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PROJECTS.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => handleSearchSelect(project.id)}
                      className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col justify-between"
                      id={`project-card-${project.id}`}
                    >
                      <div className="relative aspect-video overflow-hidden bg-gray-100">
                        <img
                          src={project.image}
                          alt={lang === 'en' ? project.titleEN : project.titleAR}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 flex gap-1 bg-gray-950/80 backdrop-blur-md px-2.5 py-1 border border-white/10 rounded font-sans text-[9px] text-white uppercase font-bold tracking-wider">
                          {lang === 'en' ? project.locationEN : project.locationAR}
                        </div>
                      </div>

                      <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                        <div className="space-y-1">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#C5A880] font-bold block">
                            {lang === 'en' ? project.categoryEN : project.categoryAR}
                          </span>
                          <h3 className="font-sans font-bold text-xs sm:text-sm text-gray-950 group-hover:text-amber-800 transition-colors">
                            {lang === 'en' ? project.titleEN : project.titleAR}
                          </h3>
                        </div>
                        <p className="font-sans text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                          {lang === 'en' ? project.descriptionEN : project.descriptionAR}
                        </p>
                      </div>

                      <div className="p-4 border-t border-gray-50 flex items-center justify-between text-[11px] font-mono text-gray-400">
                        <span>{isRtl ? 'سنة التسليم:' : 'Delivery:'} <strong>{project.year}</strong></span>
                        <span className="text-amber-700 font-semibold group-hover:underline flex items-center gap-1">
                          {isRtl ? 'المواصفات الفنية' : 'Inspect Specs'}
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ======= BLOG VIEW ======= */}
            {page === 'blog' && (
              <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
                <div className="text-center space-y-2">
                  <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-extrabold font-bold">Scientific & Technical Archives</span>
                  <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-950 uppercase tracking-tight">Technical Publications</h1>
                </div>

                <div className="space-y-10">
                  {BLOG_POSTS.map((post) => {
                    const isExpanded = expandedPost?.id === post.id;
                    return (
                      <article key={post.id} className="bg-white border border-gray-100 rounded-lg p-5 md:p-6 shadow-sm space-y-4" id={`story-entry-${post.id}`}>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b border-gray-50 pb-3">
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-[#C5A880] bg-[#C5A880]/10 px-2 py-0.5 rounded-sm inline-block">
                              {lang === 'en' ? post.categoryEN : post.categoryAR}
                            </span>
                            <h2 className="font-sans font-bold text-sm sm:text-base text-gray-950">
                              {lang === 'en' ? post.titleEN : post.titleAR}
                            </h2>
                          </div>
                          <span className="font-mono text-[10px] text-gray-440 flex-shrink-0">
                            {post.date} • {lang === 'en' ? post.readTimeEN : post.readTimeAR}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                          <div className="md:col-span-1 h-36 rounded overflow-hidden">
                            <img
                              src={post.image}
                              alt=""
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="md:col-span-2 space-y-3">
                            <p className="font-sans text-xs text-gray-500 leading-relaxed">
                              {lang === 'en' ? post.excerptEN : post.excerptAR}
                            </p>
                            
                            <button
                              onClick={() => setExpandedPost(isExpanded ? null : post)}
                              className="px-3.5 py-2 bg-gray-50 hover:bg-gray-100 text-[#C5A880] hover:text-amber-900 border border-gray-150 rounded font-sans text-[11px] font-bold uppercase transition-colors tracking-wider cursor-pointer"
                              id={`read-${post.id}`}
                            >
                              {isExpanded ? (isRtl ? 'إغلاق المادة' : 'Close Article') : (isRtl ? 'قراءة الدراسة المعيارية' : 'Read Full Investigation')}
                            </button>
                          </div>
                        </div>

                        {/* Slide open extended content panel */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden border-t border-gray-100 pt-4 mt-2"
                            >
                              <div className="p-4 bg-gray-50 rounded text-xs leading-relaxed text-gray-600 font-sans space-y-3">
                                <p className="font-bold text-gray-800 font-mono">
                                  {lang === 'en' ? 'DOCUMENT REFERENCE SEC-441-A' : 'مرجع وثيقة التقييم الهندسي ف-١٤'}
                                </p>
                                <p>
                                  {lang === 'en' ? post.contentEN : post.contentAR}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ======= CONTACT & RFQ VIEW ======= */}
            {page === 'contact' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: RFQ Form wizard */}
                  <div className="lg:col-span-7">
                    <RFQForm
                      currentLang={lang}
                      onInquiryCreated={() => setPortalRefresh((prev) => prev + 1)}
                    />
                  </div>

                  {/* Right Column: Branch map + details */}
                  <div className="lg:col-span-5 bg-white border border-gray-100 rounded-lg p-6 shadow-sm space-y-6">
                    <div className="space-y-1">
                      <h3 className="font-sans font-bold text-sm text-gray-950 uppercase tracking-widest text-[#C5A880]">
                        {t.contactSidebarTitle}
                      </h3>
                      <p className="font-sans text-xs text-gray-500 leading-relaxed">
                        {t.contactSidebarDesc}
                      </p>
                    </div>

                    {/* Static Map Visual Frame */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden relative shadow-inner aspect-[4/3]" id="contact-map-frame">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv1U34Q_f3TS3F5DXPM7Q3IcqOH4pxCf73EO0Dcwl3Pzo8Zi7ltNcMqGPOeutIcHt9kLn5lnkDZkVMN1O8ln7pPBoW-UumqBOeWWZzLnB7i7RSgGc9Pnmzelw05eW30zj4MhnLs3a85hIkYEnO4Yft5FjHqEPosrFJY-BdGu5joQP6hVmGWfq7Q4qUqUthE1iZBVBy0eWt9bDWvoXtesFNmr5AnfvGsrpsCT_q7h28BPZD-7xvTkBql5AFkIyAvKlhipiTeJIeo1Wr"
                        alt="KAFD Riyadh Map Coordinates"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-gray-950/80 backdrop-blur-sm px-3 py-1.5 border border-white/10 rounded font-mono text-[9px] text-white">
                        📍 24°45'42.1"N • 46°38'21.4"E
                      </div>
                    </div>

                    <div className="space-y-3 font-sans text-xs">
                      <div className="border-t border-gray-100 pt-4">
                        <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wide block">Riyadh Regional HQ</span>
                        <p className="font-bold text-gray-900">Al-Fahd Tower, Olaya Commercial District</p>
                        <p className="text-[11px] text-gray-500">P.O. Box 44109, Riyadh 11591, Saudi Arabia</p>
                      </div>

                      <div>
                        <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wide block">Operational Hours</span>
                        <span className="font-sans text-gray-800">{t.officeHours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======= CLIENT PORTAL VIEW ======= */}
            {page === 'portal' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
                <div className="text-center space-y-2">
                  <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-widest font-extrabold font-bold">Secure Administrative Access</span>
                  <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-950 uppercase tracking-tight">{t.portal}</h1>
                  <p className="font-sans text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
                    Track currently logging structural projects, trace blueprint inspection stages, and access engineering boards estimations instantly.
                  </p>
                </div>

                <PortalDashboard currentLang={lang} triggerRefresh={portalRefresh} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Detail Showcase Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-gray-950/50 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
            id="global-project-detail-overlay"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-lg shadow-2xl border border-gray-150 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <img
                  src={selectedProject.image}
                  alt=""
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-gray-950/80 hover:bg-gray-950 text-white rounded-full p-2 border border-white/25 cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs font-sans">
                <div className="border-b border-gray-100 pb-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#C5A880] block font-bold">
                    {lang === 'en' ? selectedProject.categoryEN : selectedProject.categoryAR}
                  </span>
                  <h3 className="font-sans font-extrabold text-lg sm:text-xl text-gray-950 leading-tight">
                    {lang === 'en' ? selectedProject.titleEN : selectedProject.titleAR}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div>
                    <span className="text-gray-440 block text-[9.5px] uppercase font-bold tracking-wide">Year</span>
                    <strong className="text-gray-800 text-[11px]">{selectedProject.year}</strong>
                  </div>
                  <div>
                    <span className="text-gray-440 block text-[9.5px] uppercase font-bold tracking-wide">Municipal</span>
                    <strong className="text-gray-800 text-[11px]">{lang === 'en' ? selectedProject.locationEN : selectedProject.locationAR}</strong>
                  </div>
                  <div>
                    <span className="text-gray-440 block text-[9.5px] uppercase font-bold tracking-wide">Sector</span>
                    <strong className="text-gray-850 text-[11px]">{lang === 'en' ? selectedProject.sectorEN : selectedProject.sectorAR}</strong>
                  </div>
                  <div>
                    <span className="text-gray-440 block text-[9.5px] uppercase font-bold tracking-wide">Complexity</span>
                    <strong className="text-amber-700 text-[11px] font-bold">{lang === 'en' ? selectedProject.complexityEN || 'Exceeding SBC' : selectedProject.complexityAR || 'مطابق الكود السعودي'}</strong>
                  </div>
                </div>

                <div className="space-y-1 bg-white pt-2">
                  <span className="text-gray-440 block text-[9.5px] uppercase font-bold tracking-wide">Design Specification Narrative</span>
                  <p className="text-gray-700 text-xs leading-relaxed font-sans">
                    {lang === 'en' ? selectedProject.descriptionEN : selectedProject.descriptionAR}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-2 text-[10px] font-mono text-gray-400">
                  <span>SBC-301 STRUCTURAL FORCES COMPLIANT</span>
                  <span>•</span>
                  <span>CLASS-A THERMAL PERFORMANCE</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Universal Footer */}
      <Footer currentLang={lang} setCurrentPage={navigateToPage} />
    </div>
    </>
  );
}
