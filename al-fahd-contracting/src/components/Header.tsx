/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Search, ArrowRight, CornerDownLeft } from 'lucide-react';
import { Language, Page } from '../types';
import { TRANSLATIONS, PROJECTS } from '../data';

interface HeaderProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onSearchSelect: (projectId: string) => void;
  onTriggerLoader?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  setLang,
  currentPage,
  setCurrentPage,
  onSearchSelect,
  onTriggerLoader,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; id: Page }[] = [
    { label: t.navHome, id: 'home' },
    { label: t.navAbout, id: 'about' },
    { label: t.navServices, id: 'services' },
    { label: t.navProjects, id: 'projects' },
    { label: t.navBlog, id: 'blog' },
    { label: t.navContact, id: 'contact' },
    { label: t.portal, id: 'portal' },
  ];

  const toggleLanguage = () => {
    setLang(currentLang === 'en' ? 'ar' : 'en');
  };

  const filteredProjects = searchQuery.trim()
    ? PROJECTS.filter(p => {
        const query = searchQuery.toLowerCase();
        const title = currentLang === 'en' ? p.titleEN : p.titleAR;
        const cat = currentLang === 'en' ? p.categoryEN : p.categoryAR;
        const loc = currentLang === 'en' ? p.locationEN : p.locationAR;
        return (
          title.toLowerCase().includes(query) ||
          cat.toLowerCase().includes(query) ||
          loc.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        );
      })
    : [];

  const handleSearchResultClick = (id: string) => {
    onSearchSelect(id);
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
            : 'bg-transparent py-5'
        }`}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-3 gap-3 cursor-pointer group"
              id="h-logo-btn"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeYTKEmEgjxCOI4avUzqbo7nzIpjxLLbNp4wIGuCzQQuRrJp7mpFsVReC_HfbeHTJObjNB2QuRc2aiYL1ZouHV2gKCP7zQ6JaqXCYoeqTa9Tf957XZqyriAUVqmk0yJ7CxEvj1bhV-yJyXk7e-ZPCyeSaawiRBdxPADNCKqQ7IKqIQQb1tBUom2URpChFNODx6dzM-Pr8rxTwk49PqTjcsDhRkJ4cH7BHenMvK3WAGPb7xIPtxA5B5wZw7YTLtLPDDkYjG2p-A9kYgEF4"
                alt="Al-Fahd Logo"
                className="h-10 w-auto object-contain scale-110 transition-transform duration-500 group-hover:scale-115"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col items-start leading-none h-9 justify-center">
                <span className="font-sans font-bold text-gray-900 text-lg tracking-tight uppercase">
                  {t.brand}
                </span>
                <span className="font-mono text-[9px] text-[#C5A880] tracking-wider uppercase mt-0.5">
                  Contracting & Engineering
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 gap-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`relative px-4 py-2 font-sans font-medium text-xs tracking-wider uppercase cursor-pointer rounded-sm transition-colors duration-200 ${
                      isActive
                        ? 'text-gray-950 font-bold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    id={`nav-${item.id}`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#C5A880]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3 gap-3">
              {/* Diagnostics Calibrate Trigger */}
              {onTriggerLoader && (
                <button
                  onClick={onTriggerLoader}
                  className="flex items-center space-x-1.5 gap-1.5 px-3 py-1.5 text-stone-600 hover:text-amber-800 bg-[#FAF9F5]/90 hover:bg-amber-500/5 transition-all duration-300 font-mono text-[9px] font-semibold border border-stone-200/80 rounded cursor-pointer uppercase shadow-sm group"
                  title={isRtl ? 'بدء فحص الأنظمة وأحمال الرياح' : 'Calibrate Systems & Wind Tolerances'}
                  id="diag-recalibrate-btn"
                >
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block group-hover:bg-[#C5A880] transition-colors" />
                  <span>{isRtl ? 'محاكاة الواجهات' : 'DIAG_CALIBRATE'}</span>
                </button>
              )}

              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-500 hover:text-gray-900 rounded-sm hover:bg-gray-50 transition-colors cursor-pointer"
                aria-label="Toggle Search"
                id="search-btn"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Language Switch */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 gap-1.5 px-3 py-2 text-gray-600 hover:text-gray-950 rounded-sm hover:bg-gray-50 transition-colors font-sans text-xs font-semibold cursor-pointer border border-gray-100 uppercase"
                id="lang-toggle-btn"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{t.langToggle}</span>
              </button>

              {/* CTA */}
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-5 py-2.5 bg-gray-950 hover:bg-gray-900 text-white font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm flex items-center space-x-2 gap-2 cursor-pointer group"
                id="header-cta"
              >
                <span>{t.ctaQuote}</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </button>
            </div>

            {/* Mobile Actions / Toggle */}
            <div className="flex lg:hidden items-center space-x-2 gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-500 rounded-sm hover:bg-gray-50 cursor-pointer"
                id="m-search-btn"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 text-xs font-bold text-gray-700 bg-gray-50 rounded-sm border border-gray-100 uppercase"
                id="m-lang-toggle"
              >
                {t.langToggle}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 rounded-sm hover:bg-gray-50 cursor-pointer"
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-950/40 backdrop-blur-md z-[60] flex items-start justify-center pt-24 px-4"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            <motion.div
              initial={{ y: -20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -20, scale: 0.95 }}
              className="bg-white rounded-lg shadow-2xl border border-gray-100 max-w-xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-3 gap-3 flex-1">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none text-gray-800 placeholder-hide placeholder-gray-400 focus:outline-none font-sans text-sm"
                    autoFocus
                    id="search-input"
                  />
                </div>
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-1 px-2.5 text-xs text-gray-400 hover:text-gray-950 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors font-semibold"
                  id="search-close-btn"
                >
                  ESC
                </button>
              </div>

              {/* Suggestions / Results */}
              <div className="max-h-72 overflow-y-auto p-2">
                {searchQuery.trim() === '' ? (
                  <div className="p-4 text-center text-gray-400 text-xs font-sans">
                    Type to search by title, location, or system category (e.g., Glass, Steel)...
                  </div>
                ) : filteredProjects.length > 0 ? (
                  <div className="space-y-1">
                    {filteredProjects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSearchResultClick(p.id)}
                        className="w-full text-left p-3 hover:bg-gray-50 rounded-md transition-colors flex items-center justify-between cursor-pointer group"
                        style={{ textAlign: isRtl ? 'right' : 'left' }}
                      >
                        <div className="flex items-center space-x-3 gap-3">
                          <img
                            src={p.image}
                            alt=""
                            className="w-10 h-10 object-cover rounded-md"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-sans font-semibold text-sm text-gray-900 group-hover:text-amber-700 transition-colors">
                              {currentLang === 'en' ? p.titleEN : p.titleAR}
                            </p>
                            <p className="font-mono text-[10px] text-gray-400">
                              {currentLang === 'en' ? p.categoryEN : p.categoryAR} •{' '}
                              {currentLang === 'en' ? p.locationEN : p.locationAR}
                            </p>
                          </div>
                        </div>
                        <CornerDownLeft className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500 text-xs font-sans">
                    No matching specialized systems found for "{searchQuery}"
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-950/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            <motion.div
              initial={{ x: isRtl ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '100%' : '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute top-0 right-0 left-auto w-4/5 max-w-sm h-full bg-white shadow-2xl border-l border-gray-150 p-6 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                  <div className="flex items-center space-x-2 gap-2">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeYTKEmEgjxCOI4avUzqbo7nzIpjxLLbNp4wIGuCzQQuRrJp7mpFsVReC_HfbeHTJObjNB2QuRc2aiYL1ZouHV2gKCP7zQ6JaqXCYoeqTa9Tf957XZqyriAUVqmk0yJ7CxEvj1bhV-yJyXk7e-ZPCyeSaawiRBdxPADNCKqQ7IKqIQQb1tBUom2URpChFNODx6dzM-Pr8rxTwk49PqTjcsDhRkJ4cH7BHenMvK3WAGPb7xIPtxA5B5wZw7YTLtLPDDkYjG2p-A9kYgEF4"
                      alt=""
                      className="h-8 w-auto"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-sans font-bold text-gray-900 text-base subpixel-antialiased uppercase">
                      {t.brand}
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-gray-400 hover:text-gray-900 cursor-pointer"
                    id="m-drawer-close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col space-y-4 pt-6">
                  {navItems.map((item) => {
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setCurrentPage(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`text-left font-sans font-semibold text-sm tracking-wider uppercase py-2 border-b border-gray-50/50 cursor-pointer transition-colors duration-200 ${
                          isActive
                            ? 'text-amber-800 font-extrabold border-amber-600/30'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                        style={{ textAlign: isRtl ? 'right' : 'left' }}
                        id={`mnav-${item.id}`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col space-y-3">
                {onTriggerLoader && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onTriggerLoader();
                    }}
                    className="w-full py-2.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-600 font-mono text-[10px] uppercase font-semibold flex items-center justify-center gap-1.5 cursor-pointer rounded"
                    id="m-diag-recalibrate-btn"
                  >
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span>{isRtl ? 'محاكاة الأنظمة وصيانة الواجهة' : 'SYSTEM DIAGNOSTICS'}</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setCurrentPage('contact');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-gray-950 hover:bg-gray-900 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-sm text-center cursor-pointer transition-all duration-300"
                  id="m-cta-btn"
                >
                  {t.ctaQuote}
                </button>
                <p className="font-mono text-[9px] text-gray-400 text-center">
                  Al-Fahd Contracting Systems • Riyadh
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
