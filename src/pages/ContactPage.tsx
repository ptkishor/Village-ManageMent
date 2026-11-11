/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CheckCircle,
  Copy,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  QrCode,
  Send,
  Sparkles,
  Wallet,
} from 'lucide-react';
import { Language } from '../types';

interface ContactPageProps {
  lang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    ward: '',
    serviceInterest: 'volunteer',
    message: '',
  });

  const upiId = 'chhathsamitiadhalalpur@sbi';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-amber-950 to-orange-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Phone className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'समिति संपर्क एवं सहयोग' : 'Contact & Contribution Desk'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            {lang === 'hi' ? 'समिति कार्यालय, सहायता नंबर एवं दान खाता' : 'Samiti Office, Helplines & Donation Details'}
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
            {lang === 'hi'
              ? 'किसी भी सुझाव, स्वयंसेवक पंजीयन, वेदी संबंधी सहायता या ऑनलाइन दान हेतु समिति से सीधे संपर्क करें।'
              : 'Directly reach out for voluntary seva, ghat assistance, official receipt verification, or wire donations.'}
          </p>
        </div>
      </div>

      {/* 2-Column Split: UPI Donation Bank Info & Volunteer Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Left: Official UPI QR & Bank Account */}
        <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-orange-700 uppercase tracking-widest flex items-center gap-1.5">
                <Wallet className="w-4 h-4" />
                {lang === 'hi' ? 'ऑनलाइन सहयोग (दान)' : 'Digital Chhath Contribution'}
              </span>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                आधिकारिक खाता
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              {lang === 'hi' ? 'छठ महापर्व हेतु सहयोग राशि समर्पित करें' : 'Contribute Online for Sacred Festival'}
            </h2>

            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'hi'
                ? 'गाँव के बाहर या परदेश (दिल्ली, मुंबई, बेंगलुरु, विदेश) में रह रहे प्रवासी ग्रामवासी यूपीआई अथवा सीधे बैंक खाते में सहयोग भेजकर तुरंत डिजिटल रसीद प्राप्त कर सकते हैं।'
                : 'Devotees living across India or abroad can contribute securely via UPI or NEFT. Your contribution will be entered into the public ledger.'}
            </p>

            {/* QR Code Card */}
            <div className="p-6 rounded-2xl bg-linear-to-b from-amber-50 to-orange-50 border border-amber-200 text-center space-y-4">
              <div className="w-40 h-40 bg-white p-3 rounded-2xl mx-auto shadow-md border border-amber-300 flex flex-col items-center justify-center">
                {/* Visual QR representation */}
                <QrCode className="w-32 h-32 text-stone-900" />
              </div>

              <div>
                <span className="text-xs text-stone-500 block">{lang === 'hi' ? 'आधिकारिक यूपीआई आईडी' : 'Official UPI ID'}</span>
                <div className="inline-flex items-center gap-2 mt-1 bg-white px-3 py-1.5 rounded-lg border border-stone-200 font-mono text-sm font-bold text-stone-900 shadow-xs">
                  <span>{upiId}</span>
                  <button
                    onClick={handleCopyUpi}
                    className="p-1 hover:bg-stone-100 rounded text-amber-700 hover:text-amber-900 transition-colors cursor-pointer"
                    title="Copy UPI ID"
                  >
                    {copied ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copied && (
                  <span className="block text-[11px] text-emerald-600 font-semibold mt-1">
                    {lang === 'hi' ? '✓ यूपीआई आईडी कॉपी हो गई!' : '✓ UPI ID copied!'}
                  </span>
                )}
              </div>
            </div>

            {/* Bank Wire Details */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-2">
              <div className="font-bold text-stone-800 text-sm mb-1">
                {lang === 'hi' ? 'बैंक ट्रांसफर विवरण (NEFT / IMPS)' : 'Bank Wire Account'}
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1">
                <span className="text-stone-500">खाता धारक:</span>
                <strong className="text-stone-900">छठ पूजा समिति अधलालपुर</strong>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1">
                <span className="text-stone-500">बैंक का नाम:</span>
                <strong className="text-stone-900">भारतीय स्टेट बैंक (SBI), अधलालपुर शाखा</strong>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1">
                <span className="text-stone-500">खाता संख्या:</span>
                <strong className="font-mono text-stone-900">38490219482</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">IFSC कोड:</span>
                <strong className="font-mono text-stone-900">SBIN0001248</strong>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-stone-500 italic text-center pt-2 border-t border-stone-100">
            भुगतान के पश्चात स्क्रीनशॉट +91 91220 67890 (कोषाध्यक्ष) पर व्हाट्सएप करें ताकि रसीद निर्गत हो सके।
          </div>
        </div>

        {/* Right: Contact Information & Seva Volunteer Form */}
        <div className="bg-white border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-orange-700 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              {lang === 'hi' ? 'समिति सचिवालय' : 'Samiti Secretariat'}
            </span>

            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              {lang === 'hi' ? 'कार्यालय पता एवं स्वयंसेवक पंजीयन' : 'Office Location & Volunteer Seva'}
            </h2>

            {/* Office Coordinates */}
            <div className="space-y-3 text-xs sm:text-sm text-stone-700">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block font-semibold">
                    {lang === 'hi' ? 'समिति कार्यालय एवं नियंत्रण कक्ष:' : 'Samiti Office & Control Center:'}
                  </strong>
                  <span>सूर्य सरोवर छठ घाट परिसर, निकट प्राथमिक विद्यालय, ग्राम अधलालपुर, बिहार - 844101</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                <Phone className="w-5 h-5 text-orange-600 shrink-0" />
                <div>
                  <strong className="text-stone-900 block font-semibold">
                    {lang === 'hi' ? 'हेल्पलाइन एवं पूछताछ:' : 'Helpline & Inquiries:'}
                  </strong>
                  <span className="font-mono">+91 94310 98765 / +91 98350 12345</span>
                </div>
              </div>
            </div>

            {/* Interactive Volunteer Enrollment / Message Form */}
            <div className="pt-4 border-t border-stone-100">
              <h3 className="font-bold text-stone-900 text-sm mb-3">
                {lang === 'hi' ? 'छठ सेवा दल (स्वयंसेवक) हेतु संदेश भेजें' : 'Send Message / Join Volunteer Squad'}
              </h3>

              {formSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'hi' ? 'संदेश सफलतापूर्वक प्राप्त हुआ!' : 'Message Received Successfully!'}</span>
                  </div>
                  <p>
                    {lang === 'hi'
                      ? 'छठ पूजा समिति के पदाधिकारी आपसे शीघ्र संपर्क करेंगे। जय छठी मैया!'
                      : 'The committee coordinator will contact you shortly. Jai Chhathi Maiya!'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">
                      {lang === 'hi' ? 'आपका पूरा नाम *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === 'hi' ? 'उदा. राकेश कुमार' : 'e.g. Rakesh Kumar'}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">
                        {lang === 'hi' ? 'मोबाइल नंबर *' : 'Phone Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765..."
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">
                        {lang === 'hi' ? 'गाँव / वार्ड' : 'Ward / Village'}
                      </label>
                      <input
                        type="text"
                        value={formData.ward}
                        onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                        placeholder={lang === 'hi' ? 'वार्ड संख्या ०४' : 'Ward 4'}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-600 font-medium mb-1">
                      {lang === 'hi' ? 'संदेश / सेवा का क्षेत्र' : 'Message / Area of Service'}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={lang === 'hi' ? 'घाट स्वच्छता, जल सेवा या सुरक्षा में सहयोग देना चाहते हैं...' : 'Write your inquiry or seva interest...'}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'संदेश प्रेषित करें' : 'Submit Details'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
