/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, ShieldCheck, UserCheck, Users } from 'lucide-react';
import { CommitteeMember, Language } from '../types';

interface CommitteePageProps {
  committee: CommitteeMember[];
  lang: Language;
}

export const CommitteePage: React.FC<CommitteePageProps> = ({ committee, lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: lang === 'hi' ? 'समस्त सदस्य' : 'All Members' },
    { id: 'patron', label: lang === 'hi' ? 'संरक्षक मंडल' : 'Patrons' },
    { id: 'core', label: lang === 'hi' ? 'कार्यकारिणी पदाधिकारी' : 'Core Executive' },
    { id: 'finance', label: lang === 'hi' ? 'कोषाध्यक्ष एवं लेखा' : 'Treasury & Audit' },
    { id: 'ghat_mgmt', label: lang === 'hi' ? 'घाट व्यवस्था एवं सुरक्षा' : 'Ghat & Safety' },
    { id: 'youth', label: lang === 'hi' ? 'युवा स्वयंसेवक' : 'Youth Volunteers' },
  ];

  const filteredMembers = committee.filter((m) => {
    if (selectedCategory === 'all') return true;
    return m.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'गाँव की सेवा में समर्पित' : 'Dedicated Village Servants'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            {lang === 'hi' ? 'हमारे गाँव का छठ पूजा समिति: कार्यकारिणी' : 'Executive Committee & Volunteer Force'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {lang === 'hi'
              ? 'आस्था के महापर्व को सुचारू, अनुशासित एवं भव्य बनाने हेतु दिन-रात निस्वार्थ सेवा में समर्पित गाँव के वरिष्ठ नागरिक, युवा एवं स्वयंसेवक।'
              : 'Our elders, office bearers, youth organizers, and community volunteers working tirelessly without compensation for the holy festival.'}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-2 rounded-xl font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-orange-600 text-white font-semibold shadow-xs'
                : 'bg-white border border-amber-200 text-stone-700 hover:bg-amber-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white border border-amber-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Avatar Icon */}
              <div className="w-14 h-14 rounded-full bg-linear-to-tr from-amber-200 to-orange-100 text-amber-900 flex items-center justify-center font-heading font-black text-xl mb-4 border border-amber-300 shadow-xs">
                {member.nameHindi.charAt(member.nameHindi.indexOf(' ') + 1) || 'छ'}
              </div>

              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-orange-700 block">
                {member.ward}
              </span>

              <h3 className="font-heading font-bold text-stone-900 text-lg mt-0.5">
                {lang === 'hi' ? member.nameHindi : member.nameEnglish}
              </h3>

              <div className="mt-2 text-xs font-semibold text-amber-900 bg-amber-50/80 border border-amber-200/80 px-2.5 py-1 rounded-lg inline-block">
                {lang === 'hi' ? member.roleHindi : member.roleEnglish}
              </div>

              <div className="mt-3 text-[11px] text-stone-500 font-mono">
                {lang === 'hi' ? 'कार्यकाल:' : 'Tenure:'} {member.tenure}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <a
                href={`tel:${member.phone.replace(/\s+/g, '')}`}
                className="text-stone-700 hover:text-orange-700 font-mono flex items-center gap-1.5 transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-orange-600" />
                <span>{member.phone}</span>
              </a>
              <span title="सत्यापित पदाधिकारी">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
