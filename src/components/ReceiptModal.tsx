/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle, Printer, X } from 'lucide-react';
import { Donation, Language } from '../types';
import { formatINR } from '../utils/translations';

interface ReceiptModalProps {
  donation: Donation | null;
  onClose: () => void;
  lang: Language;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ donation, onClose, lang }) => {
  if (!donation) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-xl w-full border border-amber-300 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print bg-stone-900 text-stone-200 px-6 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{lang === 'hi' ? 'डिजिटल दान पावती (रसीद)' : 'Official Digital Donation Receipt'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold rounded-md flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'प्रिंट रसीद' : 'Print Receipt'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-stone-800 rounded-md transition-colors text-stone-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Official Receipt Body */}
        <div className="p-8 bg-[#FFFDF9] border-8 border-amber-100 m-3 rounded-xl print:m-0 print:border-4">
          
          {/* Header Seal & Title */}
          <div className="text-center pb-4 border-b-2 border-amber-300">
            <div className="text-xs font-serif font-bold text-orange-700 tracking-widest uppercase mb-1">
              ॥ जय छठी मैया • ॐ सूर्याय नमः ॥
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-amber-950 tracking-tight">
              छठ पूजा समिति अधलालपुर
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              सूर्य सरोवर छठ घाट • ग्राम अधलालपुर • बिहार
            </p>
            <div className="mt-2 inline-block px-3 py-0.5 bg-amber-100 border border-amber-300 text-amber-900 rounded-full text-xs font-semibold">
              आधिकारिक दान सहयोग रसीद (वर्ष {donation.year})
            </div>
          </div>

          {/* Receipt Meta (No. and Date) */}
          <div className="flex justify-between items-center py-4 text-xs border-b border-dashed border-amber-200">
            <div>
              <span className="text-stone-500">{lang === 'hi' ? 'रसीद संख्या:' : 'Receipt No:'} </span>
              <strong className="font-mono text-sm text-orange-800">{donation.receiptNo}</strong>
            </div>
            <div>
              <span className="text-stone-500">{lang === 'hi' ? 'दिनांक:' : 'Date:'} </span>
              <strong className="font-mono text-stone-800">{donation.date}</strong>
            </div>
          </div>

          {/* Donor & Contribution Details */}
          <div className="space-y-3.5 py-5 text-sm">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-stone-100 pb-2">
              <span className="text-xs text-stone-500">{lang === 'hi' ? 'दानदाता का नाम:' : 'Donor Name:'}</span>
              <span className="font-bold text-stone-900 text-base">{donation.donorName}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-stone-100 pb-2">
              <span className="text-xs text-stone-500">{lang === 'hi' ? 'गाँव / वार्ड:' : 'Village / Ward:'}</span>
              <span className="font-medium text-stone-800">{donation.villageWard}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-stone-100 pb-2">
              <span className="text-xs text-stone-500">{lang === 'hi' ? 'सहयोग का उद्देश्य:' : 'Purpose / Remarks:'}</span>
              <span className="text-stone-700 italic">{donation.remarks || (lang === 'hi' ? 'छठ महापर्व आयोजन सहयोग' : 'General Chhath Festival Contribution')}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-stone-100 pb-2">
              <span className="text-xs text-stone-500">{lang === 'hi' ? 'भुगतान माध्यम:' : 'Payment Method:'}</span>
              <span className="font-mono font-semibold text-stone-800">{donation.paymentMethod}</span>
            </div>

            {/* Prominent Amount Box */}
            <div className="mt-4 p-4 rounded-xl bg-linear-to-r from-amber-50 to-orange-50 border border-amber-300 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-900 font-semibold block">
                  {lang === 'hi' ? 'प्राप्त सहयोग राशि' : 'Contribution Amount'}
                </span>
                <span className="text-xs text-amber-800/80">
                  {lang === 'hi' ? 'समिति खाते में जमा' : 'Credited to Samiti Account'}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-orange-900">
                {formatINR(donation.amount)}
              </div>
            </div>
          </div>

          {/* Footer Seals & Verification */}
          <div className="pt-6 mt-4 border-t-2 border-amber-200 flex items-end justify-between">
            <div className="text-left">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-400 flex items-center justify-center text-[10px] text-amber-800 font-bold text-center leading-tight p-1 bg-amber-50/50">
                छठ पूजा<br />समिति<br />मुहर
              </div>
              <p className="text-[10px] text-stone-500 mt-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                <span>सत्यापित: {donation.verifiedBy}</span>
              </p>
            </div>

            <div className="text-right">
              <div className="font-serif italic text-sm text-stone-800 font-bold pb-1">
                सुरेश प्रसाद
              </div>
              <div className="text-xs font-semibold text-stone-700 pt-1 border-t border-stone-300">
                {lang === 'hi' ? 'हस्ताक्षर (कोषाध्यक्ष)' : 'Treasurer Signature'}
              </div>
              <div className="text-[10px] text-stone-500">
                छठ पूजा समिति अधलालपुर
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-stone-200 text-center text-[10px] text-stone-400">
            यह रसीद कंप्यूटर जनित एवं डिजिटल रूप से अधिकृत है। छठी मैया आपका और आपके परिवार का सदैव कल्याण करें।
          </div>
        </div>

      </div>
    </div>
  );
};
