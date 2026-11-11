/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Download,
  PieChart as PieChartIcon,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { FinancialSummary, Language } from '../types';
import { AVAILABLE_YEARS, DataService } from '../services/dataService';
import { formatINR, t } from '../utils/translations';
import { FinancialCards } from '../components/FinancialCards';

interface FinancialDashboardPageProps {
  summary: FinancialSummary;
  year: number;
  onSelectYear: (year: number) => void;
  lang: Language;
}

export const FinancialDashboardPage: React.FC<FinancialDashboardPageProps> = ({
  summary,
  year,
  onSelectYear,
  lang,
}) => {
  const categoryBreakdown = DataService.getExpenseCategoryBreakdown(year);
  const yearComparisons = DataService.getYearComparison();

  // Find max amount across years for visual scaling
  const maxYearAmount = Math.max(
    ...yearComparisons.map((y) => Math.max(y.donations, y.expenses)),
    10000
  );

  const handleExportYearReport = () => {
    const donationsCsv = DataService.exportDonationsCSV(year);
    const expensesCsv = DataService.exportExpensesCSV(year);
    const combined = `=== DONATIONS (${year}) ===\n${donationsCsv}\n\n=== EXPENSES (${year}) ===\n${expensesCsv}`;
    const blob = new Blob([combined], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Chhath_Puja_Full_Financial_Report_${year}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-amber-950 via-stone-900 to-amber-950 text-white rounded-2xl p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
              <PieChartIcon className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'सार्वजनिक वित्तीय लेखा-जोखा व अंकेक्षण' : 'Public Financial Audit & Dashboard'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              {lang === 'hi' ? 'समिति वित्तीय संतुलन एवं तुलनात्मक विवरण' : 'Financial Transparency & Multi-Year Audit'}
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/80 mt-2 max-w-2xl leading-relaxed">
              {lang === 'hi'
                ? 'गाँव के प्रत्येक नागरिक और श्रद्धालु के लिए आय-व्यय का पूर्ण पारदर्शी विवरण। कोई भी गुप्त मद या अघोषित खर्च नहीं।'
                : 'Complete public ledger of all contributions and expenditures with zero hidden costs or unrecorded funds.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Year Switcher Pills */}
            <div className="flex items-center bg-white/10 p-1 rounded-xl border border-white/20 backdrop-blur-md">
              {AVAILABLE_YEARS.map((y) => (
                <button
                  key={y}
                  onClick={() => onSelectYear(y)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    year === y
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportYearReport}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold shadow-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'hi' ? 'वार्षिक रिपोर्ट डाउनलोड' : 'Download Annual Report'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Financial Cards for Selected Year */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
          <span className="font-semibold text-stone-700">
            {lang === 'hi' ? `वर्ष ${year} का तात्कालिक वित्तीय संतुलन` : `Live Financial Position for Year ${year}`}
          </span>
          <span className="font-mono text-stone-400">
            {summary.totalDonations > 0 ? ((summary.totalExpenses / summary.totalDonations) * 100).toFixed(1) : 0}% {lang === 'hi' ? 'व्यय दर' : 'utilization'}
          </span>
        </div>
        <FinancialCards summary={summary} year={year} lang={lang} />
      </div>

      {/* Two Column Layout: Category Breakdown & Multi-Year Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Category Expense Breakdown */}
        <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-orange-700">
                  {lang === 'hi' ? 'मदवार व्यय विवरण' : 'Category Breakdown'}
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                  {lang === 'hi' ? `वर्ष ${year} का खर्च वितरण` : `Expense Distribution (${year})`}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-stone-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                {formatINR(summary.totalExpenses)}
              </span>
            </div>

            {categoryBreakdown.length === 0 ? (
              <p className="text-xs text-stone-500 py-8 text-center">
                {lang === 'hi' ? 'इस वर्ष अभी तक कोई खर्च दर्ज नहीं हुआ है।' : 'No expenses recorded for this year yet.'}
              </p>
            ) : (
              <div className="space-y-4">
                {categoryBreakdown.map((item) => (
                  <div key={item.category} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-stone-800">
                        {t.categories[item.category as keyof typeof t.categories]
                          ? t.categories[item.category as keyof typeof t.categories][lang]
                          : item.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-stone-900 tabular-nums">
                          {formatINR(item.amount)}
                        </span>
                        <span className="text-[11px] font-mono text-stone-400 w-9 text-right tabular-nums">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(2, item.percentage))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'hi' ? 'समस्त वाउचर डिजिटली सत्यापित' : 'All vouchers digitally backed'}</span>
            </span>
            <span className="font-mono text-[11px]">कुल {categoryBreakdown.length} मदें</span>
          </div>
        </div>

        {/* Right: Year-Wise Multi-Year Comparison Chart */}
        <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-orange-700">
                  {lang === 'hi' ? 'वर्ष-वार तुलनात्मक ऑडिट' : 'Multi-Year Trend Analysis'}
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                  {lang === 'hi' ? 'गत वर्षों का वित्तीय लेखा तुलना' : 'Historical Balance Comparison'}
                </h3>
              </div>
              <BarChart3 className="w-5 h-5 text-amber-700" />
            </div>

            <div className="space-y-6 pt-2">
              {yearComparisons.map((comp) => {
                const donPercent = Math.round((comp.donations / maxYearAmount) * 100);
                const expPercent = Math.round((comp.expenses / maxYearAmount) * 100);
                const isCurrent = comp.year === year;

                return (
                  <div
                    key={comp.year}
                    onClick={() => onSelectYear(comp.year)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-orange-300 bg-orange-50/40 ring-1 ring-orange-400'
                        : 'border-stone-100 bg-stone-50/50 hover:bg-amber-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-stone-900">
                          {comp.year}
                        </span>
                        {comp.year === 2026 && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-100 text-amber-800 font-semibold">
                            {lang === 'hi' ? 'सक्रिय' : 'Active'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs font-mono">
                        <span className="text-emerald-700 flex items-center gap-0.5" title="Donations">
                          <ArrowDownRight className="w-3.5 h-3.5" />
                          {formatINR(comp.donations)}
                        </span>
                        <span className="text-stone-400">·</span>
                        <span className="text-rose-700 flex items-center gap-0.5" title="Expenses">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          {formatINR(comp.expenses)}
                        </span>
                        <span className="text-stone-400">·</span>
                        <span className={`font-bold ${comp.balance >= 0 ? 'text-emerald-800' : 'text-rose-700'}`}>
                          {lang === 'hi' ? 'बचत:' : 'Net:'} {formatINR(comp.balance)}
                        </span>
                      </div>
                    </div>

                    {/* Dual Horizontal Bars */}
                    <div className="space-y-1.5">
                      {/* Donation Bar */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-stone-400 w-12 font-medium">आय</span>
                        <div className="flex-1 h-2 rounded-full bg-stone-200 overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full"
                            style={{ width: `${Math.max(3, donPercent)}%` }}
                          />
                        </div>
                      </div>
                      {/* Expense Bar */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-stone-400 w-12 font-medium">व्यय</span>
                        <div className="flex-1 h-2 rounded-full bg-stone-200 overflow-hidden">
                          <div
                            className="h-full bg-amber-600 rounded-full"
                            style={{ width: `${Math.max(3, expPercent)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'hi' ? 'विभिन्न वर्षों का अलग-अलग खाता' : 'Independent yearly ledgers'}</span>
            </span>
            <span className="text-stone-400">क्लिक कर वर्ष बदलें</span>
          </div>
        </div>

      </div>

      {/* Audit Rules and Ethics Statement */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-stone-900 text-base">
              {lang === 'hi' ? 'समिति का वित्तीय नियम एवं लेखा-परीक्षण संविधान' : 'Financial Rules & Audit Guidelines'}
            </h4>
            <ul className="text-xs sm:text-sm text-stone-700 space-y-1.5 leading-relaxed list-disc list-inside">
              <li>
                {lang === 'hi'
                  ? 'प्रत्येक दान राशि की तुरंत डिजिटल एवं हस्तलिखित रसीद काटी जाती है।'
                  : 'Every single donation is immediately acknowledged with a digital and physical receipt.'}
              </li>
              <li>
                {lang === 'hi'
                  ? '₹५,००० से अधिक का कोई भी भुगतान बिना कम से कम दो समिति पदाधिकारियों के हस्ताक्षर के नहीं किया जाता।'
                  : 'Expenditures over ₹5,000 require approval signatures from at least two committee office bearers.'}
              </li>
              <li>
                {lang === 'hi'
                  ? 'बची हुई अवशेष राशि (Surplus) को अगले वर्ष के स्थायी घाट विकास हेतु बैंक खाते में सुरक्षित रखा जाता है।'
                  : 'Any surplus balance is safely carried forward in the samiti bank account for permanent ghat infrastructure.'}
              </li>
              <li>
                {lang === 'hi'
                  ? 'पारण के अगले दिन ग्राम सभा में समस्त खर्चों का सार्वजनिक वाचन व अनुमोदन किया जाता है।'
                  : 'The complete financial ledger is read out in the public village assembly on the day following Paran.'}
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};
