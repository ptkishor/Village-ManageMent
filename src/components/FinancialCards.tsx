/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowDownRight, ArrowUpRight, CheckCircle2, TrendingUp, Users, Wallet } from 'lucide-react';
import { FinancialSummary, Language } from '../types';
import { formatINR, t } from '../utils/translations';

interface FinancialCardsProps {
  summary: FinancialSummary;
  year: number;
  lang: Language;
  onViewDonations?: () => void;
  onViewExpenses?: () => void;
}

export const FinancialCards: React.FC<FinancialCardsProps> = ({
  summary,
  year,
  lang,
  onViewDonations,
  onViewExpenses,
}) => {
  const isSurplus = summary.remainingBalance >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
      {/* 1. Total Donations */}
      <div className="bg-white border border-amber-200/90 rounded-xl p-5 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-900/70">
              {t.financeCards.totalDonations[lang]}
            </span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <ArrowDownRight className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-bold font-mono tabular-nums text-stone-900 tracking-tight">
            {formatINR(summary.totalDonations)}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">
            {summary.totalDonors} {lang === 'hi' ? 'रसीदें निर्गत' : 'receipts issued'}
          </span>
          {onViewDonations && (
            <button
              onClick={onViewDonations}
              className="text-orange-700 hover:text-orange-900 font-semibold flex items-center gap-1 group"
            >
              <span>{lang === 'hi' ? 'सूची देखें' : 'View list'}</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Total Expenses */}
      <div className="bg-white border border-amber-200/90 rounded-xl p-5 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-900/70">
              {t.financeCards.totalExpenses[lang]}
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-rose-600" />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-bold font-mono tabular-nums text-stone-900 tracking-tight">
            {formatINR(summary.totalExpenses)}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">
            {summary.countExpenses} {lang === 'hi' ? 'खर्च मद वाउचर' : 'expense vouchers'}
          </span>
          {onViewExpenses && (
            <button
              onClick={onViewExpenses}
              className="text-orange-700 hover:text-orange-900 font-semibold flex items-center gap-1 group"
            >
              <span>{lang === 'hi' ? 'व्यय देखें' : 'View bills'}</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Remaining Balance (Net Surplus / In-Vault) */}
      <div className={`border rounded-xl p-5 shadow-xs transition-all flex flex-col justify-between ${
        isSurplus
          ? 'bg-linear-to-br from-emerald-50/70 to-teal-50/40 border-emerald-300/80 text-emerald-950'
          : 'bg-rose-50/70 border-rose-300/80 text-rose-950'
      }`}>
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
              {t.financeCards.balance[lang]}
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isSurplus ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
            }`}>
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl lg:text-3xl font-bold font-mono tabular-nums tracking-tight ${
            isSurplus ? 'text-emerald-800' : 'text-rose-700'
          }`}>
            {formatINR(summary.remainingBalance)}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-emerald-200/50 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-emerald-800 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isSurplus ? t.financeCards.surplus[lang] : t.financeCards.deficit[lang]}</span>
          </span>
          <span className="text-stone-500 font-mono text-[11px]">वर्ष {year}</span>
        </div>
      </div>

      {/* 4. Total Donors & Participation */}
      <div className="bg-white border border-amber-200/90 rounded-xl p-5 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 text-stone-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-900/70">
              {t.financeCards.totalDonors[lang]}
            </span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-bold font-mono tabular-nums text-stone-900 tracking-tight">
            {summary.totalDonors}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">
            {lang === 'hi' ? 'औसत सहयोग:' : 'Avg Donation:'}{' '}
            <strong className="font-mono text-stone-800">{formatINR(summary.avgDonation)}</strong>
          </span>
          <span className="text-amber-700 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'पारदर्शी' : 'Transparent'}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
