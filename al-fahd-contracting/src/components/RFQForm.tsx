/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Upload,
  CheckCircle,
  Building,
  User,
  Shield,
  Layers,
  ArrowRight,
  ArrowLeft,
  Calendar,
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import { Language, Inquiry } from '../types';
import { TRANSLATIONS } from '../data';

interface RFQFormProps {
  currentLang: Language;
  onInquiryCreated: () => void;
}

export const RFQForm: React.FC<RFQFormProps> = ({ currentLang, onInquiryCreated }) => {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';

  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Structural Glass');
  const [scope, setScope] = useState('');
  const [specs, setSpecs] = useState('');

  // Blueprint simulation
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission Status
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setAttachedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      });
    }
  };

  const validateStep = (s: number) => {
    setErrorMsg('');
    if (s === 1) {
      if (!fullName.trim() || !companyName.trim()) {
        setErrorMsg(isRtl ? 'يرجى إكمال الاسم والشركة للمتابعة.' : 'Please fill out your Name and Company to proceed.');
        return false;
      }
    } else if (s === 2) {
      if (!email.trim() || !phone.trim() || !scope.trim()) {
        setErrorMsg(isRtl ? 'يرجى إدخال البريد، الهواتف، ومواصفات المشروع.' : 'Please enter Email, Phone, and Project Scope.');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2)) return;

    setStatus('transmitting');

    setTimeout(() => {
      // Build dummy inquiry record
      const inq: Inquiry = {
        id: 'RFQ-' + Math.floor(100000 + Math.random() * 900000),
        fullName,
        companyName,
        email,
        phone,
        projectType,
        scope,
        blueprintsName: attachedFile?.name || 'Standard Specification Document',
        blueprintsSize: attachedFile?.size || '78 KB',
        date: new Date().toLocaleDateString(currentLang === 'en' ? 'en-US' : 'ar-EG', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        status: 'Received'
      };

      // Save to localStorage
      const existing = localStorage.getItem('alfahd_inquiries');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(inq);
      localStorage.setItem('alfahd_inquiries', JSON.stringify(list));

      setStatus('success');
      onInquiryCreated();
    }, 2000);
  };

  const handleReset = () => {
    setStep(1);
    setFullName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setProjectType('Structural Glass');
    setScope('');
    setSpecs('');
    setAttachedFile(null);
    setStatus('idle');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Wizard Header Slider */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-6">
        <h3 className="font-sans font-bold text-lg text-gray-900 flex items-center space-x-2 gap-2">
          <FileText className="w-5 h-5 text-amber-600" />
          <span>{t.rfqTitle}</span>
        </h3>
        <div className="flex items-center space-x-2 gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-semibold select-none transition-all duration-300 ${
                step === s
                  ? 'bg-gray-950 text-white'
                  : step > s
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-gray-50 text-gray-300'
              }`}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-medium rounded flex items-center space-x-2 gap-2 animate-pulse">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10 space-y-5"
        >
          <div className="inline-flex p-4 bg-emerald-50 rounded-full text-emerald-600 border border-emerald-100">
            <CheckCircle className="w-12 h-12" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h4 className="font-sans font-bold text-lg text-gray-950">{t.btnSecured}</h4>
            <p className="font-sans text-xs text-gray-500 leading-relaxed">
              Your structural proposal blueprint inquiry has been dispatched to Al-Fahd's Estimating and Engineering Board.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 max-w-sm mx-auto text-left" style={{ textAlign: isRtl ? 'right' : 'left' }}>
            <p className="font-mono text-[10px] text-gray-500 uppercase">Inquiry ID: #{Math.floor(100 + Math.random() * 900)}</p>
            <p className="font-sans text-xs font-bold text-gray-800 mt-1">{fullName}</p>
            <p className="font-sans text-xs text-gray-600">{companyName}</p>
            <p className="font-mono text-[11px] text-amber-700 font-bold mt-2">Status: Received (Awaiting Board Review)</p>
          </div>

          <div className="flex justify-center space-x-3 gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-sans text-xs font-semibold uppercase rounded transition-colors"
            >
              Create New
            </button>
          </div>
        </motion.div>
      ) : status === 'transmitting' ? (
        <div className="py-16 text-center space-y-4">
          <div className="relative w-12 h-12 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-[#C5A880]/20 animate-pulse" />
            <div className="absolute inset-0 rounded-full border-4 border-t-current text-amber-700 animate-spin" />
          </div>
          <div>
            <p className="font-mono text-xs font-bold text-amber-700 uppercase tracking-wider">{t.btnTransmitting}</p>
            <p className="font-sans text-[11px] text-gray-400 mt-1">Encrypting design payloads and routing to Riyadh estimating board...</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Step 1: Corporate Details */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
              id="rfq-step1-fields"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-700 text-xs font-bold uppercase tracking-wider flex items-center space-x-1 gap-1">
                    <User className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{t.formFullName}</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.formPlaceholderName}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 px-3 py-3 font-sans text-xs text-gray-800 rounded placeholder-hide placeholder-gray-400 focus:outline-none focus:border-amber-600 focus:bg-white transition-all duration-300"
                    id="rfq-fullname"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-700 text-xs font-bold uppercase tracking-wider flex items-center space-x-1 gap-1">
                    <Building className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{t.formCompany}</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.formPlaceholderCompany}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 px-3 py-3 font-sans text-xs text-gray-800 rounded placeholder-hide placeholder-gray-400 focus:outline-none focus:border-amber-600 focus:bg-white transition-all duration-300"
                    id="rfq-company"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-700 text-xs font-bold uppercase tracking-wider flex items-center space-x-1 gap-1">
                  <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{t.formProjectType}</span>
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {[
                    { en: 'Structural Glass', ar: 'هياكل زجاجية' },
                    { en: 'Curtain Walls', ar: 'جدران الستائر' },
                    { en: 'Aluminum Systems', ar: 'أنظمة ألمنيوم' },
                    { en: 'Steel Fabrication', ar: 'تشكيلات حديدية' }
                  ].map((pt) => {
                    const label = isRtl ? pt.ar : pt.en;
                    const isSelected = projectType === pt.en;
                    return (
                      <button
                        key={pt.en}
                        type="button"
                        onClick={() => setProjectType(pt.en)}
                        className={`p-3 text-center border font-sans text-xs font-semibold rounded cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'bg-gray-950 text-white border-gray-950 shadow-sm'
                            : 'bg-white text-gray-600 border-gray-100 hover:border-gray-200'
                        }`}
                        id={`rfq-pt-${pt.en.replace(/\s+/g, '')}`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-5 py-3 bg-gray-950 hover:bg-gray-900 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all rounded shadow-sm flex items-center space-x-2 gap-2 cursor-pointer"
                  id="rfq-step1-next"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Contact and Project Specs */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
              id="rfq-step2-fields"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-700 text-xs font-bold uppercase tracking-wider">
                    Official Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="architect@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 px-3 py-3 font-sans text-xs text-gray-800 rounded focus:outline-none focus:border-amber-600 focus:bg-white transition-all duration-300"
                    id="rfq-email"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-700 text-xs font-bold uppercase tracking-wider">
                    Contact Phone Number (KSA)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+966 50 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 px-3 py-3 font-sans text-xs text-gray-800 rounded focus:outline-none focus:border-amber-600 focus:bg-white transition-all duration-300"
                    id="rfq-phone"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-700 text-xs font-bold uppercase tracking-wider">
                  {t.formScope}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={t.formScopePlace}
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 px-3 py-3 font-sans text-xs text-gray-800 rounded focus:outline-none focus:border-amber-600 focus:bg-white transition-all duration-300 resize-none"
                  id="rfq-scope"
                />
              </div>

              {/* Blueprint Submitter Area */}
              <div className="space-y-1.5">
                <label className="text-gray-700 text-xs font-bold uppercase tracking-wider block">
                  {t.uploadZone}
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ${
                    isDragging
                      ? 'border-amber-655 bg-amber-50/50'
                      : attachedFile
                      ? 'border-emerald-500 bg-emerald-50/30'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  id="rfq-file-upload-zone"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept=".pdf,.dwg,.zip,image/*"
                    className="hidden"
                  />
                  {attachedFile ? (
                    <div className="flex flex-col items-center space-y-2">
                      <FileCheck className="w-8 h-8 text-emerald-600" />
                      <p className="font-sans text-xs text-gray-800 font-semibold">{t.uploadSuccess}</p>
                      <p className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                        {attachedFile.name} ({attachedFile.size})
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2 text-gray-400">
                      <Upload className="w-8 h-8 text-[#C5A880]" />
                      <p className="font-sans text-xs text-gray-600">
                        Drag blueprint specs file here or click to browse
                      </p>
                      <p className="font-mono text-[9px] text-gray-400">
                        Accepts CAD, PDF, DWG or image packages under 20MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-sans text-xs font-bold uppercase tracking-wider transition-all rounded flex items-center space-x-2 gap-2 cursor-pointer"
                  id="rfq-step2-back"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-5 py-3 bg-gray-950 hover:bg-gray-900 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all rounded shadow-sm flex items-center space-x-2 gap-2 cursor-pointer"
                  id="rfq-step2-next"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Global Engineering Board Review */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
              id="rfq-step3-fields"
            >
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-5 space-y-4">
                <div className="flex items-center space-x-2 gap-2 pb-3 border-b border-gray-200">
                  <Shield className="w-4 h-4 text-amber-700" />
                  <p className="font-sans font-bold text-xs text-gray-800 uppercase tracking-widest">
                    Pre-Submission Design Board Summary
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Manager/Lead</span>
                    <span className="text-gray-800 font-bold">{fullName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Organization</span>
                    <span className="text-gray-800 font-bold">{companyName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">System Category</span>
                    <span className="text-amber-850 font-bold">{projectType}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Contact Channel</span>
                    <span className="text-gray-800 font-medium">{email} • {phone}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 text-xs font-sans">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold mb-1">Detailed Technical Specifications</span>
                  <p className="text-gray-700 bg-white p-3 rounded border border-gray-150 leading-relaxed font-mono text-[11px]">
                    {scope}
                  </p>
                </div>

                {attachedFile && (
                  <div className="flex items-center space-x-2 gap-2 text-xs text-gray-600 bg-emerald-50/50 p-2 rounded">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    <span>Attached Blueprints: <strong className="font-mono">{attachedFile.name}</strong></span>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-sans text-xs font-bold uppercase tracking-wider transition-all rounded flex items-center space-x-2 gap-2 cursor-pointer"
                  id="rfq-step3-back"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all rounded shadow-sm cursor-pointer"
                  id="rfq-submit-btn"
                >
                  {t.btnLaunchInquiry}
                </button>
              </div>
            </motion.div>
          )}
        </form>
      )}
    </div>
  );
};
