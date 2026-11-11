/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowRight,
  Bell,
  Calendar,
  CreditCard,
  Flame,
  Heart,
  HelpCircle,
  Image as ImageIcon,
  MapPin,
  Phone,
  Receipt,
  TrendingDown,
  Users,
  Wallet,
} from 'lucide-react';
import { Announcement, FinancialSummary, GalleryItem, Language, PageId } from '../types';
import { formatINR } from '../utils/translations';

interface HomePageProps {
  summary: FinancialSummary;
  year: number;
  lang?: Language;
  onNavigate: (page: PageId) => void;
  announcements: Announcement[];
  galleryItems: GalleryItem[];
  onOpenDonateModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  summary,
  year,
  onNavigate,
  announcements,
  onOpenDonateModal,
}) => {
  // Department items matching the reference "सभी विभाग" section
  const departments = [
    {
      id: 'donations' as PageId,
      title: 'चंदा विवरण',
      subtitle: 'समस्त दानदाताओं की सूची व रसीद',
      icon: <Wallet className="w-5 h-5 text-orange-600" />,
    },
    {
      id: 'expenses' as PageId,
      title: 'खर्च',
      subtitle: 'मदवार खर्च एवं बिल वाउचर',
      icon: <Receipt className="w-5 h-5 text-orange-600" />,
    },
    {
      id: 'committee' as PageId,
      title: 'छठ कमिटी',
      subtitle: 'पदाधिकारी एवं स्वयंसेवक संपर्क',
      icon: <Users className="w-5 h-5 text-orange-600" />,
    },
    {
      id: 'announcements' as PageId,
      title: 'सूचनाएँ',
      subtitle: 'ग्राम सूचना पट्ट एवं आदेश',
      icon: <Bell className="w-5 h-5 text-orange-600" />,
    },
    {
      id: 'gallery' as PageId,
      title: 'गैलरी',
      subtitle: 'घाट व अनुष्ठान चित्र वीथिका',
      icon: <ImageIcon className="w-5 h-5 text-orange-600" />,
    },
    {
      id: 'ghat' as PageId,
      title: 'स्थान',
      subtitle: 'सूर्य सरोवर घाट रूट व सुविधाएँ',
      icon: <MapPin className="w-5 h-5 text-orange-600" />,
    },
    {
      id: 'schedule' as PageId,
      title: 'पूजा अनुष्ठान',
      subtitle: '४ दिवसीय तिथि व सूर्योदय समय',
      icon: <Calendar className="w-5 h-5 text-orange-600" />,
    },
    {
      id: 'contact' as PageId,
      title: 'संपर्क करें',
      subtitle: 'यूपीआई क्यूआर व सहायता नंबर',
      icon: <HelpCircle className="w-5 h-5 text-orange-600" />,
    },
  ];

  return (
    <div className="bg-[#FAF5EB] min-h-screen pb-14 sm:pb-20 space-y-6 sm:space-y-10">
      
      {/* 1. Grand Hero Section matching user reference screenshot */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#2e0f07] via-[#521b0e] to-[#762712] text-white pt-12 pb-20 sm:pt-16 sm:pb-28 px-4 sm:px-6">
        
        {/* Festive Temple/Ghat Archway & Marigold Pillars Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Main festive lighting image */}
          <img
            src="/src/assets/images/chhath_ghat_lighting_1794273567839.jpg"
            alt="Chhath Ghat festive arches and marigolds"
            className="w-full h-full object-cover object-center opacity-35 mix-blend-luminosity scale-105"
          />
          {/* Central Warm Fire Glow */}
          <div className="absolute inset-0 bg-radial from-amber-500/35 via-orange-950/75 to-[#2e0f07]/95" />
          
          {/* Top Vignette and Bottom Soft Misty Gradient Blend */}
          <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-black/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-[#FAF5EB] via-[#FAF5EB]/60 to-transparent" />
        </div>

        {/* Center Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 sm:space-y-5">
          
          {/* Centered Purple Sacred ॐ Badge (Exact match to reference) */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#6366f1] text-white flex items-center justify-center text-2xl sm:text-3xl font-bold mx-auto shadow-lg shadow-indigo-950/60 ring-2 ring-indigo-300/40 transition-transform hover:scale-105">
            ॐ
          </div>

          {/* Title - Chhath Puja Samiti Adhalalpur (Exact typography style) */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-amber-200 tracking-tight drop-shadow-md leading-tight">
              छठ पूजा समिति अधलालपुर
            </h1>
            <div className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold text-amber-300 tracking-wider drop-shadow-xs font-mono">
              {year === 2026 ? '२०२६' : String(year)}
            </div>
          </div>

          {/* Subtitle matching exact reference copy */}
          <p className="text-xs sm:text-sm text-amber-100/90 font-sans max-w-2xl mx-auto leading-relaxed px-2">
            आप सभी का हार्दिक स्वागत है। महापर्व से जुड़ी हर जानकारी — चंदा, समिति, खर्च, सूचनाएँ — एक स्थान पर।
          </p>

          {/* Two Hero Action Buttons matching user request: "चंदा विवरण देखें" AND "दान करें" */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            {/* Button 1: चंदा विवरण देखें (Golden yellow pill button matching screenshot) */}
            <button
              onClick={() => onNavigate('donations')}
              className="px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#E5A024] hover:bg-[#d6931d] text-stone-950 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              चंदा विवरण देखें
            </button>

            {/* Button 2: दान करें (Crisp white pill button matching screenshot) */}
            <button
              onClick={onOpenDonateModal}
              className="px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white hover:bg-stone-50 text-stone-900 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg border border-stone-200 transition-all cursor-pointer transform hover:-translate-y-0.5 whitespace-nowrap flex items-center justify-center gap-1.5"
            >
              <Heart className="w-4 h-4 text-orange-600 fill-orange-600" />
              <span>दान करें</span>
            </button>
          </div>

        </div>
      </section>

      {/* 2. Four Floating Stats Cards (Matching exact screenshot with top-right circular watermark) */}
      <section className="max-w-6xl mx-auto px-3 sm:px-6 -mt-10 sm:-mt-16 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          
          {/* Card 1: कुल चंदा */}
          <div
            onClick={() => onNavigate('donations')}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group min-h-[96px] sm:min-h-[115px] flex flex-col justify-between"
          >
            {/* Soft Circular Watermark in Top-Right Corner */}
            <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#fceddb] pointer-events-none group-hover:scale-105 transition-transform" />

            <div className="relative z-10 flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#e03a14] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Flame className="w-5 h-5 fill-white" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-stone-700 truncate">
                कुल चंदा
              </span>
            </div>

            <div className="relative z-10 mt-2 sm:mt-3">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-[#e03a14] tabular-nums block">
                {formatINR(summary.totalDonations)}
              </span>
            </div>
          </div>

          {/* Card 2: कुल दानदाता */}
          <div
            onClick={() => onNavigate('donations')}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group min-h-[96px] sm:min-h-[115px] flex flex-col justify-between"
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#fceddb] pointer-events-none group-hover:scale-105 transition-transform" />

            <div className="relative z-10 flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#c27b00] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-stone-700 truncate">
                कुल दानदाता
              </span>
            </div>

            <div className="relative z-10 mt-2 sm:mt-3">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-[#c27b00] tabular-nums block">
                {summary.totalDonors}
              </span>
            </div>
          </div>

          {/* Card 3: कुल खर्च */}
          <div
            onClick={() => onNavigate('expenses')}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group min-h-[96px] sm:min-h-[115px] flex flex-col justify-between"
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#fceddb] pointer-events-none group-hover:scale-105 transition-transform" />

            <div className="relative z-10 flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#6b1414] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <TrendingDown className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-stone-700 truncate">
                कुल खर्च
              </span>
            </div>

            <div className="relative z-10 mt-2 sm:mt-3">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-[#e03a14] tabular-nums block">
                {formatINR(summary.totalExpenses)}
              </span>
            </div>
          </div>

          {/* Card 4: शेष राशि */}
          <div
            onClick={() => onNavigate('financials')}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group min-h-[96px] sm:min-h-[115px] flex flex-col justify-between"
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#fceddb] pointer-events-none group-hover:scale-105 transition-transform" />

            <div className="relative z-10 flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f26522] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-stone-700 truncate">
                शेष राशि
              </span>
            </div>

            <div className="relative z-10 mt-2 sm:mt-3">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-[#e03a14] tabular-nums block">
                {formatINR(summary.remainingBalance)}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. "सभी विभाग" (All Departments) Section matching reference screenshot layout */}
      <section className="max-w-6xl mx-auto px-3 sm:px-6 pt-3">
        <div className="text-center mb-5 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#3a130c] tracking-tight">
            सभी विभाग
          </h2>
        </div>

        {/* 2-col on mobile, 4-col on desktop - clean white rounded cards with right arrow */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => onNavigate(dept.id)}
              className="bg-white hover:bg-amber-50/70 border border-amber-200/90 hover:border-orange-400 rounded-2xl p-3.5 sm:p-4.5 shadow-xs hover:shadow-md transition-all text-left flex items-center justify-between group cursor-pointer min-h-[60px] sm:min-h-[72px]"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="p-1.5 sm:p-2 rounded-xl bg-amber-50 group-hover:bg-amber-100 transition-colors shrink-0">
                  {dept.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-stone-900 text-xs sm:text-base group-hover:text-orange-700 transition-colors truncate">
                    {dept.title}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] text-stone-500 hidden sm:block truncate">
                    {dept.subtitle}
                  </span>
                </div>
              </div>

              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-stone-50 group-hover:bg-orange-600 group-hover:text-white text-orange-600 flex items-center justify-center transition-all shrink-0 ml-1.5">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Live Notice Board Highlights Strip */}
      <section className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="bg-white border border-amber-200/90 rounded-2xl p-4 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-pulse" />
              <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                नवीनतम सूचनाएँ एवं आदेश
              </h3>
            </div>
            <button
              onClick={() => onNavigate('announcements')}
              className="text-xs font-semibold text-orange-700 hover:text-orange-900 cursor-pointer"
            >
              सभी सूचनाएँ →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {announcements.slice(0, 2).map((a) => (
              <div
                key={a.id}
                onClick={() => onNavigate('announcements')}
                className="p-3 sm:p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60 hover:bg-amber-100/60 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-center text-[10px] sm:text-[11px] text-stone-500 mb-1">
                  <span className="font-mono">{a.date}</span>
                  <span className="px-1.5 py-0.2 rounded bg-orange-100 text-orange-800 font-semibold text-[10px]">
                    {a.priority.toUpperCase()}
                  </span>
                </div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1">
                  {a.titleHindi}
                </h4>
                <p className="text-[11px] sm:text-xs text-stone-600 mt-1 line-clamp-2">
                  {a.descriptionHindi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Glimpse of the Holy River Ghat */}
      <section className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="bg-white border border-amber-200/90 rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[11px] sm:text-xs font-bold text-orange-700 uppercase tracking-wider block">
              सूर्य सरोवर छठ घाट • अधलालपुर
            </span>
            <h3 className="text-lg sm:text-2xl font-heading font-extrabold text-stone-900">
              अधलालपुर के पावन सूर्य सरोवर तट की व्यवस्था
            </h3>
            <p className="text-xs text-stone-600 max-w-xl">
              हजारों ग्रामवासियों की सहभागिता, सुरक्षित जल क्षेत्र, महिला चेंजिंग रूम व २४x७ स्वयंसेवक सहायता।
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigate('gallery')}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs transition-colors cursor-pointer text-center"
            >
              फोटो वीथिका
            </button>
            <button
              onClick={() => onNavigate('ghat')}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer text-center"
            >
              घाट मैप व दिशाएँ
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
