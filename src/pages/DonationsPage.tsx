/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  Download,
  Eye,
  Filter,
  Plus,
  Receipt,
  Search,
  Wallet,
} from 'lucide-react';
import { Donation, Language, PaymentMethod } from '../types';
import { formatINR, t } from '../utils/translations';
import { DataService } from '../services/dataService';

interface DonationsPageProps {
  donations: Donation[];
  year: number;
  lang: Language;
  onViewReceipt: (donation: Donation) => void;
  onOpenAddModal?: () => void;
}

export const DonationsPage: React.FC<DonationsPageProps> = ({
  donations,
  year,
  lang,
  onViewReceipt,
  onOpenAddModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [minAmount, setMinAmount] = useState<string>('');

  // Filter donations strictly by the selected year and user queries
  const filteredDonations = useMemo(() => {
    return donations.filter((d) => {
      // Year match
      if (d.year !== year) return false;

      // Method match
      if (selectedMethod !== 'all' && d.paymentMethod !== selectedMethod) return false;

      // Min amount match
      if (minAmount && d.amount < Number(minAmount)) return false;

      // Search match
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = d.donorName.toLowerCase().includes(query);
        const matchWard = d.villageWard.toLowerCase().includes(query);
        const matchReceipt = d.receiptNo.toLowerCase().includes(query);
        const matchRemarks = (d.remarks || '').toLowerCase().includes(query);
        if (!matchName && !matchWard && !matchReceipt && !matchRemarks) return false;
      }

      return true;
    });
  }, [donations, year, selectedMethod, minAmount, searchTerm]);

  // Aggregate calculations for filtered view
  const totalAmount = useMemo(() => {
    return filteredDonations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  }, [filteredDonations]);

  const handleExportCSV = () => {
    const csvContent = DataService.exportDonationsCSV(year);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Chhath_Puja_Donations_${year}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-amber-900 to-orange-950 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
              <Wallet className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? `वर्ष ${year} का दान रजिस्टर` : `Year ${year} Donor Ledger`}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              {lang === 'hi' ? 'सम्मानित दानदाता सूची एवं सहयोग विवरण' : 'Donation Details & Donor Ledger'}
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/80 mt-2 max-w-2xl leading-relaxed">
              {lang === 'hi'
                ? 'महापर्व में गाँव व बाहर से आए समस्त श्रद्धालु भक्तों द्वारा दिया गया एक-एक रुपया सार्वजनिक रूप से दर्ज है। पारदर्शी ऑडिट हेतु किसी भी रसीद का विवरण तुरंत देखें।'
                : 'Every rupee contributed by devotees is recorded publicly with official receipt numbers and purpose.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 backdrop-blur-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>{t.common.exportCsv[lang]}</span>
            </button>
            {onOpenAddModal && (
              <button
                onClick={onOpenAddModal}
                className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'hi' ? 'दान दर्ज करें' : 'Add Donation'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Filter Metric Strip */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-stone-400 block">{lang === 'hi' ? 'कुल प्रदर्शित दान' : 'Total Filtered Donations'}</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-amber-300 tabular-nums">
              {formatINR(totalAmount)}
            </span>
          </div>
          <div>
            <span className="text-stone-400 block">{lang === 'hi' ? 'दानदाताओं की संख्या' : 'Devotees Count'}</span>
            <span className="text-lg sm:text-xl font-bold font-mono text-white tabular-nums">
              {filteredDonations.length} {lang === 'hi' ? 'श्रद्धालु' : 'donors'}
            </span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-stone-400 block">{lang === 'hi' ? 'ऑडिट स्थिति' : 'Audit Status'}</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
              <span>●</span>
              <span>{lang === 'hi' ? 'सत्यापित एवं प्रमाणित' : 'Verified & Locked'}</span>
            </span>
          </div>
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
            placeholder={t.common.search[lang]}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Payment Method Filter */}
          <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-amber-700" />
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="bg-transparent text-stone-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">{lang === 'hi' ? 'सभी भुगतान माध्यम' : 'All Payment Methods'}</option>
              <option value="Cash">Cash (नकद)</option>
              <option value="UPI">UPI (क्यूआर / ऑनलाइन)</option>
              <option value="Bank Transfer">Bank Transfer (बैंक ट्रांसफर)</option>
              <option value="Cheque">Cheque (चेक)</option>
            </select>
          </div>

          {/* Quick Clear */}
          {(searchTerm || selectedMethod !== 'all' || minAmount) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedMethod('all');
                setMinAmount('');
              }}
              className="px-2.5 py-1.5 text-xs text-orange-700 hover:text-orange-900 font-medium underline cursor-pointer"
            >
              {lang === 'hi' ? 'फ़िल्टर हटाएं' : 'Reset Filters'}
            </button>
          )}
        </div>
      </div>

      {/* Donation Table */}
      <div className="bg-white border border-amber-200/90 rounded-2xl shadow-xs overflow-hidden">
        {filteredDonations.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Receipt className="w-12 h-12 text-amber-300 mx-auto stroke-1" />
            <h3 className="font-bold text-stone-800 text-base">{t.common.noData[lang]}</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              {lang === 'hi'
                ? 'आपके द्वारा चुने गए फिल्टर या सर्च में कोई दान रिकॉर्ड नहीं मिला। कृपया फिल्टर बदलें या नया दान जोड़ें।'
                : 'No donation records matched your search filters. Try clearing filters or selecting another year.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-amber-50/80 border-b border-amber-200 text-amber-950 text-xs uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-4 font-mono">{t.donationTable.receiptNo[lang]}</th>
                  <th className="py-3.5 px-4">{t.donationTable.donorName[lang]}</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">{t.donationTable.ward[lang]}</th>
                  <th className="py-3.5 px-4 text-right">{t.donationTable.amount[lang]}</th>
                  <th className="py-3.5 px-4 font-mono hidden sm:table-cell">{t.donationTable.date[lang]}</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">{t.donationTable.method[lang]}</th>
                  <th className="py-3.5 px-4 hidden xl:table-cell">{t.donationTable.verifiedBy[lang]}</th>
                  <th className="py-3.5 px-4 text-center">{t.donationTable.actions[lang]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredDonations.map((d) => (
                  <tr
                    key={d.id}
                    className="hover:bg-amber-50/40 transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-mono font-semibold text-orange-800 text-xs">
                      {d.receiptNo}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-stone-900">
                      <div>{d.donorName}</div>
                      {d.remarks && (
                        <div className="text-[11px] text-stone-500 line-clamp-1 italic">
                          {d.remarks}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 hidden md:table-cell text-xs">
                      {d.villageWard}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-stone-900 tabular-nums">
                      {formatINR(d.amount)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-500 hidden sm:table-cell text-xs tabular-nums">
                      {d.date}
                    </td>
                    <td className="py-3.5 px-4 hidden lg:table-cell">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-stone-100 text-stone-700">
                        {d.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 hidden xl:table-cell text-xs">
                      {d.verifiedBy}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => onViewReceipt(d)}
                        className="px-2.5 py-1 rounded bg-amber-100/70 hover:bg-amber-200 text-amber-900 text-xs font-semibold transition-colors inline-flex items-center gap-1 cursor-pointer"
                        title={t.common.viewReceipt[lang]}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{t.common.viewReceipt[lang]}</span>
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
