/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckCircle, Copy, Heart, Phone, QrCode, X } from 'lucide-react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewDonations?: () => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({
  isOpen,
  onClose,
  onViewDonations,
}) => {
  const [copied, setCopied] = useState(false);
  const upiId = 'chhathsamitiadhalalpur@sbi';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-md w-full border-2 border-amber-300 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-linear-to-r from-amber-700 via-orange-600 to-amber-700 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-white" />
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg leading-tight">
                ऑनलाइन दान / सहयोग करें
              </h3>
              <p className="text-[10px] sm:text-[11px] text-amber-200">
                छठ पूजा समिति अधलालपुर • Chhath Puja Samiti Adhalalpur
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 bg-[#FFFDF9]">
          
          <div className="text-center">
            <span className="text-xs font-semibold text-orange-800 bg-orange-50 border border-orange-200 px-3 py-1 rounded-full inline-block">
              ॥ जय छठी मैया • ॐ सूर्याय नमः ॥
            </span>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              महापर्व में आपका प्रत्येक रुपया घाट की शुचिता, प्रकाश, सुरक्षा एवं सामूहिक प्रसाद सेवा में समर्पित होगा।
            </p>
          </div>

          {/* QR Code Presentation */}
          <div className="bg-linear-to-b from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 text-center space-y-3">
            <div className="w-40 h-40 bg-white p-2.5 rounded-2xl mx-auto shadow-sm border border-amber-300 flex items-center justify-center">
              <QrCode className="w-32 h-32 text-stone-900" />
            </div>

            <div>
              <span className="text-[11px] text-stone-500 block">आधिकारिक समिति UPI ID</span>
              <div className="inline-flex items-center gap-2 mt-1 bg-white px-3 py-1.5 rounded-xl border border-stone-200 font-mono text-xs sm:text-sm font-bold text-stone-900 shadow-2xs">
                <span>{upiId}</span>
                <button
                  onClick={handleCopy}
                  className="p-1 hover:bg-amber-50 rounded text-orange-700 transition-colors"
                  title="Copy"
                >
                  {copied ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && (
                <span className="block text-[11px] text-emerald-600 font-semibold mt-1">
                  ✓ UPI ID कॉपी हो गई! किसी भी पेमेंट ऐप (GPay, PhonePe, Paytm) में पेस्ट करें।
                </span>
              )}
            </div>
          </div>

          {/* Bank Wire Details */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs space-y-1.5 font-mono">
            <div className="font-sans font-bold text-stone-800 text-xs">
              सीधे बैंक खाता (Bank Transfer):
            </div>
            <div className="flex justify-between text-stone-600">
              <span>खाता धारक:</span>
              <strong className="text-stone-900 font-sans">छठ पूजा समिति अधलालपुर</strong>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>बैंक:</span>
              <strong className="text-stone-900 font-sans">भारतीय स्टेट बैंक (SBI)</strong>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>खाता सं.:</span>
              <strong className="text-stone-900 font-bold">38490219482</strong>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>IFSC कोड:</span>
              <strong className="text-stone-900 font-bold">SBIN0001248</strong>
            </div>
          </div>

          {/* Screenshot WhatsApp instruction */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-xs flex items-center gap-2.5">
            <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="leading-snug">
              भुगतान के बाद स्क्रीनशॉट <strong>+91 91220 67890 (कोषाध्यक्ष)</strong> पर भेजें ताकि आपकी <strong>डिजिटल रसीद</strong> निर्गत की जा सके।
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            {onViewDonations && (
              <button
                onClick={() => {
                  onClose();
                  onViewDonations();
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs transition-colors text-center"
              >
                चंदा विवरण (सूची) देखें
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-colors text-center"
            >
              समझ गया / बंद करें
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
