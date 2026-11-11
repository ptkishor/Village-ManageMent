/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { AlertCircle, Bell, Calendar, CheckCircle2, Filter, Pin, Search } from 'lucide-react';
import { Announcement, Language } from '../types';

interface AnnouncementsPageProps {
  announcements: Announcement[];
  lang: Language;
}

export const AnnouncementsPage: React.FC<AnnouncementsPageProps> = ({ announcements, lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((a) => {
      if (priorityFilter !== 'all' && a.priority !== priorityFilter) return false;
      if (categoryFilter !== 'all' && a.category !== categoryFilter) return false;

      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const title = (lang === 'hi' ? a.titleHindi : a.titleEnglish).toLowerCase();
        const desc = (lang === 'hi' ? a.descriptionHindi : a.descriptionEnglish).toLowerCase();
        if (!title.includes(query) && !desc.includes(query)) return false;
      }
      return true;
    });
  }, [announcements, priorityFilter, categoryFilter, searchTerm, lang]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Bell className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'ग्राम सूचना पट्ट एवं आदेश' : 'Official Announcements Bulletin'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            {lang === 'hi' ? 'महत्वपूर्ण सूचनाएँ, दिशानिर्देश एवं आदेश' : 'Committee Announcements & Circulars'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {lang === 'hi'
              ? 'घाट प्रबंधन, वेदी आरक्षण, सुरक्षा नियम, भक्ति संगीत व सांस्कृतिक कार्यक्रमों से संबंधित सभी आधिकारिक घोषणाएं।'
              : 'Official circulars regarding ghat regulations, safety protocol, cultural programs, and meeting resolutions.'}
          </p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white border border-amber-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={lang === 'hi' ? 'सूचना खोजें...' : 'Search notices...'}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-700 font-medium focus:outline-none cursor-pointer"
          >
            <option value="all">{lang === 'hi' ? 'सभी प्राथमिकता' : 'All Priority'}</option>
            <option value="urgent">{lang === 'hi' ? 'अति आवश्यक (Urgent)' : 'Urgent'}</option>
            <option value="important">{lang === 'hi' ? 'महत्वपूर्ण (Important)' : 'Important'}</option>
            <option value="general">{lang === 'hi' ? 'सामान्य (General)' : 'General'}</option>
          </select>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-700 font-medium focus:outline-none cursor-pointer"
          >
            <option value="all">{lang === 'hi' ? 'सभी विषय' : 'All Categories'}</option>
            <option value="ghat">{lang === 'hi' ? 'घाट व्यवस्था' : 'Ghat Management'}</option>
            <option value="security">{lang === 'hi' ? 'सुरक्षा एवं गोताखोर' : 'Security'}</option>
            <option value="cultural">{lang === 'hi' ? 'सांस्कृतिक कार्यक्रम' : 'Cultural'}</option>
            <option value="meeting">{lang === 'hi' ? 'बैठक सूचना' : 'Meetings'}</option>
          </select>

          {(searchTerm || priorityFilter !== 'all' || categoryFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setPriorityFilter('all');
                setCategoryFilter('all');
              }}
              className="text-orange-700 hover:text-orange-900 font-semibold underline px-2 py-1 cursor-pointer"
            >
              {lang === 'hi' ? 'रीसेट' : 'Reset'}
            </button>
          )}
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white border border-amber-200 rounded-2xl p-12 text-center text-stone-500">
            {lang === 'hi' ? 'कोई सूचना उपलब्ध नहीं है।' : 'No announcements found matching the criteria.'}
          </div>
        ) : (
          filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className={`bg-white border rounded-2xl p-6 shadow-xs transition-all ${
                ann.isPinned
                  ? 'border-amber-400 bg-linear-to-r from-amber-50/40 via-white to-white'
                  : 'border-amber-200 hover:border-amber-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3 mb-3 text-xs">
                <div className="flex items-center gap-2">
                  {ann.isPinned && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500 text-stone-950 font-bold text-[10px]">
                      <Pin className="w-3 h-3 fill-stone-950" />
                      <span>{lang === 'hi' ? 'पिन किया गया' : 'Pinned'}</span>
                    </span>
                  )}
                  <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                    ann.priority === 'urgent'
                      ? 'bg-rose-100 text-rose-800'
                      : ann.priority === 'important'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-stone-100 text-stone-700'
                  }`}>
                    {ann.priority === 'urgent'
                      ? (lang === 'hi' ? 'अति आवश्यक' : 'Urgent')
                      : ann.priority === 'important'
                      ? (lang === 'hi' ? 'महत्वपूर्ण' : 'Important')
                      : (lang === 'hi' ? 'सामान्य' : 'General')}
                  </span>
                  <span className="text-stone-400 uppercase tracking-wider font-mono text-[11px]">
                    {ann.category}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-stone-500 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>{ann.date}</span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                {lang === 'hi' ? ann.titleHindi : ann.titleEnglish}
              </h3>

              <p className="text-xs sm:text-sm text-stone-700 mt-2.5 leading-relaxed">
                {lang === 'hi' ? ann.descriptionHindi : ann.descriptionEnglish}
              </p>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="font-medium text-amber-900">
                  {lang === 'hi' ? 'आदेशानुसार: छठ पूजा आयोजन समिति' : 'By Order: Chhath Puja Organizing Committee'}
                </span>
                <span className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'प्रमाणित' : 'Verified Notice'}</span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
