/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FileText, Printer, Tag, X } from 'lucide-react';
import { Expense, Language } from '../types';
import { formatINR, t } from '../utils/translations';

interface VoucherModalProps {
  expense: Expense | null;
  onClose: () => void;
  lang: Language;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({ expense, onClose, lang }) => {
  if (!expense) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Control Bar */}
        <div className="no-print bg-stone-900 text-stone-200 px-6 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>{lang === 'hi' ? 'खर्च भुगतान वाउचर व बिल' : 'Expense Payment Voucher & Bill'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-100 font-semibold rounded-md flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'प्रिंट वाउचर' : 'Print Voucher'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-stone-800 rounded-md transition-colors text-stone-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Voucher Document */}
        <div className="p-8 bg-white m-3 rounded-xl print:m-0">
          <div className="flex justify-between items-start border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-orange-700 font-semibold">
                छठ पूजा समिति अधलालपुर • व्यय प्रमाणक
              </span>
              <h2 className="text-xl font-bold text-stone-900 mt-1">
                {expense.title}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-400 block font-mono">वाउचर संख्या</span>
              <span className="font-mono font-bold text-stone-800 text-sm bg-stone-100 px-2 py-0.5 rounded">
                {expense.voucherNo}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-5 text-xs border-b border-stone-100">
            <div>
              <span className="text-stone-400 block">खर्च श्रेणी (Category)</span>
              <span className="font-semibold text-stone-800 text-sm flex items-center gap-1.5 mt-0.5">
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                {t.categories[expense.category] ? t.categories[expense.category][lang] : expense.category}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block">भुगतान तिथि</span>
              <span className="font-mono text-stone-800 text-sm font-semibold mt-0.5 block">
                {expense.date}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block">वेंडर / दुकानदार / प्राप्तकर्ता</span>
              <span className="font-semibold text-stone-800 text-sm mt-0.5 block">
                {expense.vendorName}
              </span>
            </div>
            <div>
              <span className="text-stone-400 block">स्वीकृतिकर्ता (समिति पदाधिकारी)</span>
              <span className="font-semibold text-stone-800 text-sm mt-0.5 block">
                {expense.paidBy}
              </span>
            </div>
          </div>

          <div className="py-4">
            <span className="text-xs text-stone-400 block mb-1">विस्तृत व्यय विवरण</span>
            <p className="text-sm text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-100 leading-relaxed">
              {expense.description}
            </p>
          </div>

          {/* Amount Box */}
          <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200 flex justify-between items-center my-3">
            <span className="text-xs font-semibold uppercase text-amber-900 tracking-wider">
              {lang === 'hi' ? 'कुल स्वीकृत व्यय' : 'Approved Expense Amount'}
            </span>
            <span className="text-2xl font-mono font-extrabold text-stone-900">
              {formatINR(expense.amount)}
            </span>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-6 pt-6 mt-4 border-t border-stone-200 text-xs">
            <div className="text-center pt-8 border-t border-stone-300">
              <span className="font-semibold text-stone-700 block">{expense.paidBy}</span>
              <span className="text-stone-400 text-[11px]">भुगतानकर्ता / सत्यापनकर्ता</span>
            </div>
            <div className="text-center pt-8 border-t border-stone-300">
              <span className="font-semibold text-stone-700 block">देवेन्द्र नारायण राय</span>
              <span className="text-stone-400 text-[11px]">अध्यक्ष (छठ पूजा समिति)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
