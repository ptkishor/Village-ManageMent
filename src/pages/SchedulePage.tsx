/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, Moon, Printer, Sparkles, Sun } from 'lucide-react';
import { Language, PujaScheduleItem } from '../types';
import { DataService } from '../services/dataService';

interface SchedulePageProps {
  lang: Language;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({ lang }) => {
  const schedule = DataService.getSchedule();
  const [activeDay, setActiveDay] = useState<number>(3); // Default to Day 3 (Sandhya Arghya)

  const selectedItem = schedule.find((s) => s.dayNumber === activeDay) || schedule[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-amber-900 to-orange-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'चार दिवसीय पावन अनुष्ठान सारिणी' : 'Official 4-Day Puja Schedule'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              {lang === 'hi' ? 'छठ महापर्व २०२६: तिथि, मुहूर्त एवं विधि-विधान' : 'Chhath Mahaparv 2026: Tithi & Ritual Schedule'}
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/80 mt-2 max-w-2xl leading-relaxed">
              {lang === 'hi'
                ? 'नहाय-खाय से लेकर उषा अर्घ्य पारण तक की संपूर्ण तिथियाँ, सूर्योदय एवं सूर्यास्त का सटीक समय, तथा उपवास के शास्त्रीय नियम।'
                : 'Accurate sunrise and sunset timings, sacred tithi calendar, and fasting rules for all 4 days.'}
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 backdrop-blur-md transition-colors flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>{lang === 'hi' ? 'समय सारिणी प्रिंट करें' : 'Print Schedule'}</span>
          </button>
        </div>
      </div>

      {/* Day Selector Buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {schedule.map((day) => {
          const isActive = day.dayNumber === activeDay;
          return (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.dayNumber)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-400/40'
                  : 'bg-white hover:bg-amber-50/60 border-amber-200 text-stone-800'
              }`}
            >
              <div>
                <span className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${
                  isActive ? 'text-amber-200' : 'text-orange-700'
                }`}>
                  दिवस ०{day.dayNumber}
                </span>
                <h3 className="font-bold text-sm sm:text-base mt-1 line-clamp-1">
                  {lang === 'hi' ? day.nameHindi.split(':')[1] : day.nameEnglish.split(':')[1]}
                </h3>
              </div>
              <div className={`mt-3 pt-2 border-t text-[11px] font-mono ${
                isActive ? 'border-amber-500 text-amber-100' : 'border-stone-100 text-stone-500'
              }`}>
                {day.tithi}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Active Day Showcase */}
      <div className="bg-white border border-amber-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        
        {/* Day Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <span className="text-xs font-mono font-semibold text-orange-700 uppercase tracking-widest">
              {selectedItem.tithi} • {selectedItem.date}
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-amber-950 mt-1">
              {lang === 'hi' ? selectedItem.nameHindi : selectedItem.nameEnglish}
            </h2>
          </div>

          {/* Sunrise and Sunset Timings */}
          <div className="flex items-center gap-4 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-600" />
              <div>
                <span className="text-[10px] text-stone-500 block uppercase">सूर्योदय (Sunrise)</span>
                <span className="text-xs font-mono font-bold text-stone-900">{selectedItem.sunriseTime}</span>
              </div>
            </div>
            <div className="w-px h-8 bg-amber-200" />
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-orange-600" />
              <div>
                <span className="text-[10px] text-stone-500 block uppercase">सूर्यास्त (Sunset)</span>
                <span className="text-xs font-mono font-bold text-stone-900">{selectedItem.sunsetTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fasting & Discipline Rule */}
        <div className="p-5 rounded-2xl bg-linear-to-r from-amber-50 to-orange-50 border border-amber-300/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-800 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span>{lang === 'hi' ? 'व्रत एवं उपवास के शास्त्रीय नियम' : 'Fasting & Purity Guidelines'}</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
            {lang === 'hi' ? selectedItem.fastingRuleHindi : selectedItem.fastingRuleEnglish}
          </p>
        </div>

        {/* Rituals & Vidhi Grid */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-700" />
            <span>{lang === 'hi' ? 'इस दिन के प्रमुख अनुष्ठान एवं परंपराएं' : 'Prescribed Rituals & Procedures'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(lang === 'hi' ? selectedItem.ritualsHindi : selectedItem.ritualsEnglish).map((ritual, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-stone-100 bg-stone-50/60 hover:bg-amber-50/40 transition-colors flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {ritual}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Description & Significance */}
        <div className="pt-6 border-t border-stone-100 text-xs sm:text-sm text-stone-600 leading-relaxed bg-amber-50/30 p-4 rounded-xl">
          <strong className="text-stone-800 block mb-1">
            {lang === 'hi' ? 'विशेष आध्यात्मिक महत्व:' : 'Spiritual Significance:'}
          </strong>
          {lang === 'hi' ? selectedItem.descriptionHindi : selectedItem.descriptionEnglish}
        </div>

      </div>

    </div>
  );
};
