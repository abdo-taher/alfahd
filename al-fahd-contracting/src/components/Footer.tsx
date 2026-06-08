/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { Language, Page } from '../types';
import { TRANSLATIONS } from '../data';

interface FooterProps {
  currentLang: Language;
  setCurrentPage: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <footer
      className="bg-gray-950 text-gray-300 font-sans border-t-2 border-amber-900/10 pt-16 pb-8"
      dir={isRtl ? 'rtl' : 'ltr'}
      id="main-app-footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Desc */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 gap-3">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeYTKEmEgjxCOI4avUzqbo7nzIpjxLLbNp4wIGuCzQQuRrJp7mpFsVReC_HfbeHTJObjNB2QuRc2aiYL1ZouHV2gKCP7zQ6JaqXCYoeqTa9Tf957XZqyriAUVqmk0yJ7CxEvj1bhV-yJyXk7e-ZPCyeSaawiRBdxPADNCKqQ7IKqIQQb1tBUom2URpChFNODx6dzM-Pr8rxTwk49PqTjcsDhRkJ4cH7BHenMvK3WAGPb7xIPtxA5B5wZw7YTLtLPDDkYjG2p-A9kYgEF4"
                alt=""
                className="h-10 w-auto brightness-200"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-sans font-extrabold text-white text-base uppercase tracking-tight block">
                  {t.brand}
                </span>
                <span className="font-mono text-[9px] text-amber-500 tracking-wider">
                  ESTD. 1984
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-sm">
              {t.footerDesc}
            </p>
            <div className="pt-2 text-xs text-gray-500 font-mono">
              <span className="inline-block px-2 py-1 bg-gray-900 border border-gray-800 rounded">ISO 9001:2015</span>
              <span className="inline-block px-2 py-1 bg-gray-900 border border-gray-800 rounded mx-1 gap-1">Class T1 Certified</span>
            </div>
          </div>

          {/* Specialities Links */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              {t.specialties}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('projects')} className="hover:text-amber-450 transition-colors text-left cursor-pointer">
                  {t.aluminum}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('projects')} className="hover:text-amber-450 transition-colors text-left cursor-pointer">
                  {t.curtainWall}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('projects')} className="hover:text-amber-450 transition-colors text-left cursor-pointer">
                  {t.glass}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('projects')} className="hover:text-amber-450 transition-colors text-left cursor-pointer">
                  {t.steel}
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              {t.companyLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-amber-450 transition-colors text-left cursor-pointer">
                  {t.ourHistory}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-amber-450 transition-colors text-left cursor-pointer">
                  {t.leadership}
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-amber-500 transition-colors text-left cursor-pointer">
                  {t.careers}
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Newsletter */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              {t.newsletterTitle}
            </h4>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              {t.newsletterSub}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex rounded overflow-hidden border border-gray-800 focus-within:border-amber-600 transition-colors">
                <input
                  type="email"
                  placeholder="name@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'success'}
                  className="w-full bg-gray-905 px-3 py-2 text-xs text-white placeholder-hide placeholder-gray-500 focus:outline-none focus:ring-0"
                  required
                  id="newsletter-email-input"
                />
                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  className="bg-amber-650 hover:bg-amber-600 text-white px-3 transition-colors flex items-center justify-center cursor-pointer disabled:bg-opacity-50"
                  id="newsletter-submit-btn"
                >
                  {status === 'loading' ? (
                    <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
                  ) : status === 'success' ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              {status === 'success' && (
                <p className="text-[10px] text-amber-500 font-sans font-medium" id="newsletter-success-msg">
                  {t.subscribed}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Global Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 pb-8 border-t border-gray-800/80 mt-12 text-xs text-gray-400">
          <div className="flex items-center space-x-3 gap-3">
            <div className="p-2 bg-gray-900 border border-gray-820 rounded text-amber-500">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-white">Riyadh Hub (HQ)</p>
              <p className="text-[11px] text-gray-500">Olaya Towers, Block B, Floor 14</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 gap-3">
            <div className="p-2 bg-gray-900 border border-gray-820 rounded text-amber-500">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-white">Central Operations</p>
              <p className="text-[11px] text-gray-500">+966 11 445 9222</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 gap-3">
            <div className="p-2 bg-gray-900 border border-gray-820 rounded text-amber-500">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-white">Engineering Inquiries</p>
              <p className="text-[11px] text-gray-500">engineering@al-fahd.com.sa</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-500 space-y-4 md:space-y-0">
          <p className="font-mono text-center md:text-left">{t.copyright}</p>
          <div className="flex space-x-4 gap-4">
            <a href="#privacy" className="hover:text-white transition-colors">
              {t.privacyPolicy}
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-white transition-colors">
              {t.termsOfService}
            </a>
            <span>•</span>
            <a href="#standards" className="hover:text-white transition-colors">
              {t.compliance}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
