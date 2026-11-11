/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { Eye, Image as ImageIcon, Sparkles, X } from 'lucide-react';
import { GalleryItem, Language } from '../types';
import { AVAILABLE_YEARS } from '../services/dataService';

interface GalleryPageProps {
  galleryItems: GalleryItem[];
  lang: Language;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ galleryItems, lang }) => {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: lang === 'hi' ? 'सभी तस्वीरें' : 'All Photos' },
    { id: 'arghya', label: lang === 'hi' ? 'सूर्य अर्घ्य अनुष्ठान' : 'Arghya Rituals' },
    { id: 'ghat', label: lang === 'hi' ? 'घाट व वेदी' : 'Ghat & Altars' },
    { id: 'lighting', label: lang === 'hi' ? 'प्रकाश व सजावट' : 'Lighting & Decor' },
    { id: 'cultural', label: lang === 'hi' ? 'सांस्कृतिक संध्या' : 'Cultural Evening' },
  ];

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {
      if (selectedYear !== 'all' && item.year !== selectedYear) return false;
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      return true;
    });
  }, [galleryItems, selectedYear, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-amber-950 via-orange-950 to-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'पावन उत्सव चित्र वीथिका' : 'Chhath Mahaparv Photo Archive'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            {lang === 'hi' ? 'गाँव के सूर्य सरोवर छठ घाट की दिव्य झलकियाँ' : 'Divine Visual Moments of Village Ghat'}
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
            {lang === 'hi'
              ? 'भक्ति, समर्पण और आस्था के अनुपम क्षण। उषा अर्घ्य, संध्या अर्घ्य और घाट की नयनाभिराम प्रकाश व्यवस्था का संग्रह।'
              : 'Ghat decorations, solemn prayers, waist-deep holy dips, and golden hour ceremonies preserved across years.'}
          </p>
        </div>
      </div>

      {/* Filter Bars (Year + Category) */}
      <div className="bg-white border border-amber-200 rounded-2xl p-4 shadow-xs space-y-4">
        {/* Year Filter */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-stone-500 mr-1">
            {lang === 'hi' ? 'वर्ष चुनें:' : 'Select Year:'}
          </span>
          <button
            onClick={() => setSelectedYear('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              selectedYear === 'all'
                ? 'bg-orange-600 text-white font-semibold shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {lang === 'hi' ? 'सभी वर्ष' : 'All Years'}
          </button>
          {AVAILABLE_YEARS.map((y) => (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              className={`px-3 py-1.5 rounded-lg font-mono font-medium transition-colors cursor-pointer ${
                selectedYear === y
                  ? 'bg-orange-600 text-white font-semibold shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {y}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-t border-stone-100 pt-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white font-semibold shadow-xs'
                  : 'bg-amber-50 text-stone-700 hover:bg-amber-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveLightbox(item)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-amber-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div className="aspect-4/3 relative overflow-hidden bg-stone-900">
              <img
                src={item.imageUrl}
                alt={item.titleEnglish}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 text-xs font-mono">
                {item.year}
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="p-3 rounded-full bg-orange-600/90 text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <Eye className="w-5 h-5" />
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-stone-900 text-sm group-hover:text-orange-700 transition-colors">
                {lang === 'hi' ? item.titleHindi : item.titleEnglish}
              </h3>
              <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                {lang === 'hi' ? item.captionHindi : item.captionEnglish}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-stone-950 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-16/10 sm:aspect-16/9 bg-black flex items-center justify-center">
              <img
                src={activeLightbox.imageUrl}
                alt={activeLightbox.titleEnglish}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>

            <div className="p-5 bg-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-amber-400 font-mono block">
                  वर्ष {activeLightbox.year} • {activeLightbox.category.toUpperCase()}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {lang === 'hi' ? activeLightbox.titleHindi : activeLightbox.titleEnglish}
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  {lang === 'hi' ? activeLightbox.captionHindi : activeLightbox.captionEnglish}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-[11px] text-stone-400 block">
                  हमारे गाँव का छठ पूजा समिति
                </span>
                <span className="text-xs text-amber-300 font-semibold font-hindi">
                  जय छठी मैया
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
