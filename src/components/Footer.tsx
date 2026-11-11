/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lock, RefreshCw, ShieldCheck } from 'lucide-react';
import { Language, PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('अभी');

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastRefreshed(new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }));
    }, 600);
  };

  return (
    <footer className="relative bg-[#3a130c] text-white">
      {/* Decorative Marigold Garland Top Ribbon matching reference */}
      <div className="h-1.5 w-full bg-[repeating-linear-gradient(90deg,#ea580c_0_10px,#f59e0b_10px_20px,#dc2626_20px_30px,#fbbf24_30px_40px)]" />

      {/* Main Center Content matching screenshot */}
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14 text-center space-y-4">
        
        {/* Centered Purple Sacred ॐ Badge matching reference */}
        <div className="w-12 h-12 rounded-2xl bg-[#6366f1]/90 hover:bg-[#6366f1] text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-lg ring-2 ring-indigo-300/30 transition-transform hover:scale-105">
          ॐ
        </div>

        {/* Sacred Motto */}
        <div className="font-heading font-extrabold text-amber-300 text-lg sm:text-xl tracking-wider">
          धर्मो रक्षति रक्षितः
        </div>

        {/* Devotional Subline */}
        <div className="text-xs text-amber-200/90 font-hindi">
          ॥ जय छठी मैया • ॐ सूर्याय नमः ॥
        </div>

        {/* Copyright */}
        <div className="text-xs text-stone-300 pt-1">
          © {new Date().getFullYear()} छठ पूजा समिति अधलालपुर (Chhath Puja Samiti Adhalalpur)
        </div>

        {/* Google Sheets Live Sync Notice matching reference text */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-amber-200/80 font-mono">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            title="क्लिक कर तुरंत अपडेट करें"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-orange-400' : ''}`} />
            <span>
              {lang === 'hi'
                ? `डेटा हर 60 सेकंड में Google Sheets से अपने आप अपडेट (${lastRefreshed})`
                : `Data auto-refreshed from Google Sheets every 60s (${lastRefreshed})`}
            </span>
          </button>
        </div>

        {/* Subtle Bottom Admin & Transparency Links */}
        <div className="pt-6 border-t border-amber-900/60 flex flex-wrap items-center justify-center gap-4 text-[11px] text-stone-400">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            मुख्य पृष्ठ
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('donations')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            चंदा विवरण
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('expenses')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            खर्च
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('committee')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            छठ कमिटी
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigate('admin')}
            className="hover:text-amber-300 transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <Lock className="w-3 h-3 text-amber-400" />
            <span>व्यवस्थापक लॉगिन</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
