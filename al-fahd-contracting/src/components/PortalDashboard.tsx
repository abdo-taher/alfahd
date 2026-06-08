/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Briefcase,
  CheckCircle,
  FileCheck,
  AlertCircle,
  Search,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Inbox,
  Workflow
} from 'lucide-react';
import { Language, Inquiry } from '../types';
import { TRANSLATIONS } from '../data';

interface PortalDashboardProps {
  currentLang: Language;
  triggerRefresh: number;
}

export const PortalDashboard: React.FC<PortalDashboardProps> = ({
  currentLang,
  triggerRefresh
}) => {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInq, setSelectedInq] = useState<Inquiry | null>(null);

  useEffect(() => {
    // Get stored inquiries or load default elegant ones
    const getStored = () => {
      const stored = localStorage.getItem('alfahd_inquiries');
      if (stored) {
        return JSON.parse(stored);
      } else {
        const defaults: Inquiry[] = [
          {
            id: 'RFQ-874291',
            fullName: 'Eng. Khalid Al-Mutairi',
            companyName: 'Baha Commercial Hub Ltd',
            email: 'khalid@bahahub.com',
            phone: '+966 54 821 3491',
            projectType: 'Curtain Walls',
            scope: 'High-performance curtain wall system for a 12-story commercial tower including thermal break profiles and premium low-iron insulating glass units.',
            blueprintsName: 'Baha_Tower_Elevation_A.pdf',
            blueprintsSize: '14.2 MB',
            date: '10 May 2026',
            status: 'Proposal Issued'
          },
          {
            id: 'RFQ-392104',
            fullName: 'Sarah Jenkins',
            companyName: 'Atelier Architecture Riyadh',
            email: 's.jenkins@atelier-sa.com',
            phone: '+966 50 119 2831',
            projectType: 'Structural Glass',
            scope: 'Minimalist spider-glass canopy and frameless glass lobby partition designs with heavy wind resistance specifications.',
            blueprintsName: 'LobbyGlassSection_rev3.dwg',
            blueprintsSize: '5.8 MB',
            date: '02 May 2026',
            status: 'Technical Review'
          }
        ];
        localStorage.setItem('alfahd_inquiries', JSON.stringify(defaults));
        return defaults;
      }
    };

    setInquiries(getStored());
  }, [triggerRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Proposal Issued':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Technical Review':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'In Review':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'Proposal Issued': return 4;
      case 'Technical Review': return 3;
      case 'In Review': return 2;
      default: return 1;
    }
  };

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'} id="client-portal-section">
      {/* Overview Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-lg p-5 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-wider">Total Proposals Filed</p>
            <p className="text-2xl font-bold font-sans text-gray-900 mt-1">{inquiries.length}</p>
          </div>
          <div className="p-3 bg-gray-50 text-gray-500 rounded-lg border border-gray-100">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-lg p-5 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-wider">In Feasibility Analysis</p>
            <p className="text-2xl font-bold font-sans text-amber-750 mt-1">
              {inquiries.filter((i) => i.status !== 'Proposal Issued').length}
            </p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg border border-amber-100">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-lg p-5 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400 font-mono tracking-wider">Approved / Dispatched</p>
            <p className="text-2xl font-bold font-sans text-emerald-705 mt-1">
              {inquiries.filter((i) => i.status === 'Proposal Issued').length}
            </p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
            <FileCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inquiry List Box */}
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-lg shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h4 className="font-sans font-bold text-sm text-gray-950 uppercase tracking-wider flex items-center space-x-2 gap-2">
              <Workflow className="w-4 h-4 text-[#C5A880]" />
              <span>{isRtl ? 'طلبات عروض الأسعار المفعلة' : 'Active Engineering RFQ Log'}</span>
            </h4>
            <span className="font-mono text-[10px] bg-gray-50 text-gray-500 px-2 py-1 rounded">
              Secure Channel
            </span>
          </div>

          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {inquiries.length === 0 ? (
              <div className="text-center py-12 text-gray-400 space-y-2">
                <Inbox className="w-8 h-8 mx-auto stroke-1 text-[#C5A880]" />
                <p className="font-sans text-xs">No active technical proposals found on this system.</p>
              </div>
            ) : (
              inquiries.map((inq) => {
                const isSelected = selectedInq?.id === inq.id;
                return (
                  <button
                    key={inq.id}
                    onClick={() => setSelectedInq(isSelected ? null : inq)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 cursor-pointer flex justify-between items-center group ${
                      isSelected
                        ? 'border-gray-900 bg-gray-50/50 shadow-sm'
                        : 'border-gray-100 bg-white hover:border-gray-250'
                    }`}
                    style={{ textAlign: isRtl ? 'right' : 'left' }}
                    id={`portal-inq-${inq.id}`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center space-x-2 gap-2">
                        <span className="font-mono text-[10px] text-gray-400 font-bold group-hover:text-amber-800 transition-colors">
                          {inq.id}
                        </span>
                        <span className="font-mono text-[9px] text-[#C5A880]">• {inq.date}</span>
                      </div>
                      <p className="font-sans font-bold text-xs text-gray-950 group-hover:text-amber-900 transition-colors">
                        {inq.companyName}
                      </p>
                      <p className="font-sans text-[11px] text-gray-500">
                        {isRtl ? 'النظام المقترح:' : 'System Type:'} <strong className="text-gray-700">{inq.projectType}</strong>
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 gap-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getStatusColor(inq.status)}`}>
                        {inq.status}
                      </span>
                      <ChevronRight className={`w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors ${isRtl ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Tracking Flow Detail frame */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            {selectedInq ? (
              <motion.div
                key={selectedInq.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="bg-white border border-gray-150 rounded-lg p-5 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div>
                    <span className="font-mono text-[9px] text-[#C5A880] uppercase tracking-wider block">Currently Inspecting</span>
                    <span className="font-mono text-xs font-bold text-gray-900">{selectedInq.id}</span>
                  </div>
                  <button
                    onClick={() => setSelectedInq(null)}
                    className="p-1 px-2.5 text-[10px] text-gray-400 bg-gray-50 hover:bg-gray-100 rounded transition-colors font-sans"
                  >
                    Clear Focus
                  </button>
                </div>

                <div className="space-y-3 text-xs font-sans">
                  <div>
                    <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wide">Developer Lead</span>
                    <p className="font-bold text-gray-900">{selectedInq.fullName}</p>
                    <p className="text-[11px] text-gray-500">{selectedInq.companyName}</p>
                  </div>

                  <div>
                    <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wide block">Contact</span>
                    <span className="font-mono text-[11px] text-gray-700">{selectedInq.email} • {selectedInq.phone}</span>
                  </div>

                  {selectedInq.blueprintsName && (
                    <div>
                      <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wide block">Blueprints Package</span>
                      <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded inline-block mt-0.5">
                        {selectedInq.blueprintsName} ({selectedInq.blueprintsSize})
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wide block mb-1">Detailed Log Specifications</span>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded text-[11px] leading-relaxed font-mono overflow-y-auto max-h-24">
                      {selectedInq.scope}
                    </p>
                  </div>
                </div>

                {/* Milestone Stepper */}
                <div className="border-t border-gray-100 pt-4 space-y-4 font-sans">
                  <span className="text-gray-400 font-mono text-[9px] uppercase tracking-wide block">Milestone Tracking Status</span>
                  
                  <div className="relative space-y-4">
                    {/* Stepper center line helper */}
                    <div className="absolute top-2 bottom-2 left-3 w-0.5 bg-gray-150" style={{ left: isRtl ? 'auto' : '15px', right: isRtl ? '15px' : 'auto' }} />

                    {[
                      { stepNum: 1, title: 'Inquiry Logged', desc: 'Secure transmission received by Riyadh server nodes.' },
                      { stepNum: 2, title: 'Engineering Analysis', desc: 'Structural engineers analyzing blueprints and static wind calculations.' },
                      { stepNum: 3, title: 'Technical Review', desc: 'Determining exact lamination layers, thermal break profiles and extrusions.' },
                      { stepNum: 4, title: 'Proposal Dispatched', desc: 'Commercial quotation pack and project breakdown sent.' }
                    ].map((st) => {
                      const currentStep = getStatusStep(selectedInq.status);
                      const isDone = currentStep >= st.stepNum;
                      return (
                        <div key={st.stepNum} className="flex space-x-3 gap-3 relative z-10 text-xs">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold font-mono border text-[11px] ${
                              isDone
                                ? 'bg-amber-600 text-white border-amber-600'
                                : 'bg-white text-gray-300 border-gray-200'
                            }`}
                          >
                            {st.stepNum}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-sans font-bold ${isDone ? 'text-gray-900' : 'text-gray-400'}`}>
                              {st.title}
                            </p>
                            <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                              {st.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-[#FAF9F5] border border-dashed border-gray-200 rounded-lg p-8 text-center text-gray-400 space-y-3">
                <Workflow className="w-10 h-10 mx-auto stroke-1 text-[#C5A880]" />
                <h5 className="font-sans font-bold text-xs text-gray-700 uppercase tracking-widest">Tracking Terminal</h5>
                <p className="font-sans text-[11px] text-gray-505 max-w-xs mx-auto leading-relaxed">
                  Select any active technical inquiry on the left log rail to view detailed structural milestones, blueprints analysis metadata, and team status reports.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
