/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Calendar,
  ChevronDown,
  CreditCard,
  Heart,
  HelpCircle,
  Home,
  Image,
  Info,
  LayoutGrid,
  Lock,
  MapPin,
  Menu,
  Phone,
  PieChart,
  Receipt,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import { PageId } from '../types';
import { AVAILABLE_YEARS } from '../services/dataService';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  selectedYear: number;
  onSelectYear: (year: number) => void;
  isAdminLoggedIn: boolean;
  onOpenDonateModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  selectedYear,
  onSelectYear,
  isAdminLoggedIn,
  onOpenDonateModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

  // Nav items matching reference website
  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'डैशबोर्ड', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: 'donations', label: 'चंदा विवरण', icon: <Wallet className="w-3.5 h-3.5" /> },
    { id: 'expenses', label: 'खर्च', icon: <Receipt className="w-3.5 h-3.5" /> },
    { id: 'committee', label: 'छठ कमिटी', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'announcements', label: 'सूचनाएँ', icon: <Info className="w-3.5 h-3.5" /> },
    { id: 'gallery', label: 'गैलरी', icon: <Image className="w-3.5 h-3.5" /> },
    { id: 'ghat', label: 'स्थान', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'contact', label: 'संपर्क करें', icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { id: 'schedule', label: 'पूजा अनुष्ठान', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'financials', label: 'लेखा-जोखा', icon: <PieChart className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FDF8EE] border-b border-amber-200/90 shadow-2xs">
      {/* Decorative Marigold Garland Top Ribbon matching reference */}
      <div className="h-1.5 w-full bg-[repeating-linear-gradient(90deg,#ea580c_0_10px,#f59e0b_10px_20px,#dc2626_20px_30px,#fbbf24_30px_40px)]" />

      {/* Main Bar */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5">
        <div className="flex items-center justify-between h-13 sm:h-14 gap-2">
          
          {/* ============================================================ */}
          {/* MOBILE VIEW (Hidden on Desktop: lg:hidden)                   */}
          {/* Exactly matching user's phone screenshot with 3-line menu    */}
          {/* Zero horizontal side-scroll, clean lockup and hamburger      */}
          {/* ============================================================ */}
          <div className="flex lg:hidden items-center justify-between w-full py-1">
            {/* Left: Purple ॐ Badge + Title + Year */}
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#6366f1] text-white flex items-center justify-center font-bold text-lg shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                ॐ
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-heading text-xs sm:text-sm font-bold text-[#b43410] leading-tight tracking-tight">
                  छठ पूजा समिति अधलालपुर
                </span>
                <span className="text-[11px] font-mono text-stone-500 font-bold leading-tight mt-0.5">
                  २०२६
                </span>
              </div>
            </button>

            {/* Right: ONLY the 3-line Hamburger Menu Button (Matching screenshot) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 active:bg-amber-50 flex items-center justify-center text-stone-800 shadow-2xs transition-colors cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
              title="मेनू खोलें"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[2.2] text-orange-700" />
              ) : (
                <Menu className="w-5 h-5 stroke-[2.2] text-stone-800" />
              )}
            </button>
          </div>

          {/* ============================================================ */}
          {/* DESKTOP VIEW (Visible on Desktop: hidden lg:flex)            */}
          {/* Full left-aligned pill buttons strip matching desktop shot   */}
          {/* ============================================================ */}
          <div className="hidden lg:flex items-center justify-between w-full gap-2">
            
            {/* Left: All Pill Navigation Buttons */}
            <nav className="flex items-center gap-1 xl:gap-1.5 overflow-x-auto no-scrollbar py-1">
              {navItems.map((item) => {
                const active = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      active
                        ? 'bg-linear-to-r from-orange-600 to-amber-600 text-white shadow-xs scale-102'
                        : 'text-stone-700 hover:text-orange-800 hover:bg-amber-100/60'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right: Year Selector & Admin Button */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Year Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-stone-800 bg-white border border-amber-300 rounded-full hover:bg-amber-50 transition-colors cursor-pointer shadow-2xs"
                  title="वर्ष चुनें"
                >
                  <Calendar className="w-3 h-3 text-orange-600" />
                  <span className="font-mono tabular-nums">{selectedYear}</span>
                  <ChevronDown className="w-3 h-3 text-stone-500" />
                </button>

                {yearDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-amber-200 rounded-xl shadow-xl py-1 z-50 text-xs">
                    <div className="px-3 py-1 text-[10px] font-bold text-stone-400 uppercase">
                      वित्तीय वर्ष
                    </div>
                    {AVAILABLE_YEARS.map((y) => (
                      <button
                        key={y}
                        onClick={() => {
                          onSelectYear(y);
                          setYearDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 font-mono flex items-center justify-between cursor-pointer ${
                          selectedYear === y
                            ? 'bg-orange-50 text-orange-800 font-bold'
                            : 'text-stone-700 hover:bg-amber-50'
                        }`}
                      >
                        <span>{y}</span>
                        {selectedYear === y && <span className="text-orange-600">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Admin Button */}
              <button
                onClick={() => onNavigate('admin')}
                className={`p-1.5 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs ${
                  currentPage === 'admin'
                    ? 'bg-stone-900 text-white'
                    : isAdminLoggedIn
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
                title="व्यवस्थापक कक्ष (Admin)"
              >
                <Lock className="w-3 h-3" />
                <span>Admin</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE DRAWER (Opens on 3-Line Hamburger Click)              */}
      {/* ============================================================ */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF9] border-t border-amber-200 px-4 pt-3.5 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-150">
          {/* Quick Donate Banner */}
          {onOpenDonateModal && (
            <div className="mb-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDonateModal();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-linear-to-r from-orange-600 via-amber-600 to-yellow-600 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
              >
                <Heart className="w-4 h-4 fill-white text-white" />
                <span>दान करें (ऑनलाइन सहयोग)</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 mb-3">
            {navItems.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-3 rounded-xl text-xs font-bold text-left transition-colors min-h-[44px] cursor-pointer ${
                    active
                      ? 'bg-linear-to-r from-orange-600 to-amber-600 text-white shadow-xs'
                      : 'text-stone-700 bg-amber-50/70 hover:bg-amber-100'
                  }`}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <span className="text-stone-600 font-bold">वर्ष:</span>
              <div className="flex gap-1">
                {AVAILABLE_YEARS.map((y) => (
                  <button
                    key={y}
                    onClick={() => onSelectYear(y)}
                    className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold ${
                      selectedYear === y ? 'bg-orange-600 text-white' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="px-2.5 py-1 rounded bg-stone-900 text-white font-bold text-xs flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              <span>व्यवस्थापक</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
