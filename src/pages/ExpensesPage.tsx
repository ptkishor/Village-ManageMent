/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  Download,
  Eye,
  FileSpreadsheet,
  Filter,
  Plus,
  Receipt,
  Search,
  Tag,
} from 'lucide-react';
import { Expense, ExpenseCategory, Language } from '../types';
import { formatINR, t } from '../utils/translations';
import { DataService } from '../services/dataService';

interface ExpensesPageProps {
  expenses: Expense[];
  year: number;
  lang: Language;
  onViewVoucher: (expense: Expense) => void;
  onOpenAddModal?: () => void;
}

const CATEGORIES: ExpenseCategory[] = [
  'Lighting',
  'Decoration',
  'Tent',
  'Sound System',
  'DJ',
  'Flowers',
  'Prasad',
  'Puja Materials',
  'Cleaning',
  'Transportation',
  'Other Expenses',
];

export const ExpensesPage: React.FC<ExpensesPageProps> = ({
  expenses,
  year,
  lang,
  onViewVoucher,
  onOpenAddModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      if (e.year !== year) return false;
      if (selectedCategory !== 'all' && e.category !== selectedCategory) return false;

      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchTitle = e.title.toLowerCase().includes(query);
        const matchVendor = e.vendorName.toLowerCase().includes(query);
        const matchVoucher = e.voucherNo.toLowerCase().includes(query);
        const matchDesc = (e.description || '').toLowerCase().includes(query);
        if (!matchTitle && !matchVendor && !matchVoucher && !matchDesc) return false;
      }
      return true;
    });
  }, [expenses, year, selectedCategory, searchTerm]);

  const totalExpense = useMemo(() => {
    return filteredExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  }, [filteredExpenses]);

  const handleExportCSV = () => {
    const csvContent = DataService.exportExpensesCSV(year);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Chhath_Puja_Expenses_${year}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-stone-900 to-amber-950 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-semibold mb-3">
              <Receipt className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? `वर्ष ${year} का व्यय रजिस्टर` : `Year ${year} Expense Register`}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              {lang === 'hi' ? 'आयोजकीय खर्च एवं वाउचर विवरण' : 'Expense Details & Voucher Ledger'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-2xl leading-relaxed">
              {lang === 'hi'
                ? 'लाइटिंग, टेंट, प्रसाद, साउंड एवं घाट स्वच्छता पर किए गए प्रत्येक खर्च का मदवार हिसाब। ग्राम सभा द्वारा अनुमोदित।'
                : 'Itemized expenditure for lighting, sound, flowers, tent, and cleaning with verified vouchers and vendor bills.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 backdrop-blur-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-orange-400" />
              <span>{t.common.exportCsv[lang]}</span>
            </button>
            {onOpenAddModal && (
              <button
                onClick={onOpenAddModal}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'hi' ? 'खर्च दर्ज करें' : 'Add Expense'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Filter Metric Strip */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-stone-400 block">{lang === 'hi' ? 'कुल व्यय (प्रदर्शित)' : 'Total Filtered Expense'}</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-orange-400 tabular-nums">
              {formatINR(totalExpense)}
            </span>
          </div>
          <div>
            <span className="text-stone-400 block">{lang === 'hi' ? 'स्वीकृत वाउचर' : 'Approved Vouchers'}</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-white tabular-nums">
              {filteredExpenses.length} {lang === 'hi' ? 'मदें' : 'items'}
            </span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-stone-400 block">{lang === 'hi' ? 'लेखा सत्यापन' : 'Audit Status'}</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1 mt-0.5">
              <span>●</span>
              <span>{lang === 'hi' ? 'कोषाध्यक्ष एवं सचिव द्वारा हस्ताक्षरित' : 'Signed by Committee'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills / Filter Tabs */}
      <div className="bg-white border border-amber-200 rounded-xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'hi' ? 'खर्च खोजें (शीर्षक, वेंडर, वाउचर)...' : 'Search expenses (Title, Vendor, Voucher)...'}
              className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 hidden md:inline">
              {filteredExpenses.length} {lang === 'hi' ? 'रिकॉर्ड' : 'records'}
            </span>
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-xs text-orange-700 hover:text-orange-900 font-medium underline px-2 py-1 cursor-pointer"
              >
                {lang === 'hi' ? 'रीसेट करें' : 'Reset'}
              </button>
            )}
          </div>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-orange-600 text-white font-semibold shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {lang === 'hi' ? 'सभी मदें (All)' : 'All Categories'}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white font-semibold shadow-xs'
                  : 'bg-amber-50 text-stone-700 hover:bg-amber-100 border border-amber-200/60'
              }`}
            >
              {t.categories[cat] ? t.categories[cat][lang] : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white border border-amber-200/90 rounded-2xl shadow-xs overflow-hidden">
        {filteredExpenses.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <FileSpreadsheet className="w-12 h-12 text-amber-300 mx-auto stroke-1" />
            <h3 className="font-bold text-stone-800 text-base">{t.common.noData[lang]}</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              {lang === 'hi'
                ? 'इस श्रेणी में अभी तक कोई खर्च रिकॉर्ड दर्ज नहीं किया गया है।'
                : 'No expense records found in this category for the selected year.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-700 text-xs uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-4 font-mono">{t.expenseTable.voucherNo[lang]}</th>
                  <th className="py-3.5 px-4">{t.expenseTable.title[lang]}</th>
                  <th className="py-3.5 px-4">{t.expenseTable.category[lang]}</th>
                  <th className="py-3.5 px-4 text-right">{t.expenseTable.amount[lang]}</th>
                  <th className="py-3.5 px-4 font-mono hidden sm:table-cell">{t.expenseTable.date[lang]}</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">{t.expenseTable.vendor[lang]}</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">{t.expenseTable.paidBy[lang]}</th>
                  <th className="py-3.5 px-4 text-center">{t.expenseTable.receipt[lang]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredExpenses.map((e) => (
                  <tr
                    key={e.id}
                    className="hover:bg-amber-50/30 transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-mono font-semibold text-stone-800 text-xs">
                      {e.voucherNo}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-stone-900">
                      <div>{e.title}</div>
                      {e.description && (
                        <div className="text-[11px] text-stone-500 line-clamp-1 italic">
                          {e.description}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-xs">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60 font-medium">
                        <Tag className="w-3 h-3 text-amber-600" />
                        {t.categories[e.category] ? t.categories[e.category][lang] : e.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-stone-900 tabular-nums">
                      {formatINR(e.amount)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-500 hidden sm:table-cell text-xs tabular-nums">
                      {e.date}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 hidden md:table-cell text-xs">
                      {e.vendorName}
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 hidden lg:table-cell text-xs">
                      {e.paidBy}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => onViewVoucher(e)}
                        className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors inline-flex items-center gap-1 cursor-pointer"
                        title={t.common.viewBill[lang]}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{t.common.viewBill[lang]}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
