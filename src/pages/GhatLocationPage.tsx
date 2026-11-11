/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  AlertTriangle,
  Compass,
  LifeBuoy,
  MapPin,
  Navigation,
  Phone,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';
import { Language } from '../types';

interface GhatLocationPageProps {
  lang: Language;
}

export const GhatLocationPage: React.FC<GhatLocationPageProps> = ({ lang }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-linear-to-r from-orange-950 via-amber-900 to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'सूर्य सरोवर छठ घाट व्यवस्था' : 'Surya Sarovar Holy Ghat Guidelines'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
            {lang === 'hi' ? 'घाट स्थान, रूट मैप एवं श्रद्धालु सुविधाएँ' : 'Ghat Location, Directions & Devotee Facilities'}
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
            {lang === 'hi'
              ? 'ग्राम अधलालपुर स्थित पवित्र सूर्य सरोवर तट। घाट पर महिला चेंजिंग रूम, सुरक्षा नौकाएं, शुद्ध पेयजल एवं प्राथमिक उपचार शिविर की संपूर्ण जानकारी।'
              : 'Detailed layout of the sacred river ghat at Adhalalpur with women changing booths, deep-water barriers, patrol boats, and first-aid.'}
          </p>
        </div>
      </div>

      {/* Interactive Ghat Schematic Diagram */}
      <div className="bg-white border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-orange-700">
              {lang === 'hi' ? 'घाट परिसर विन्यास' : 'Ghat Schematic Layout'}
            </span>
            <h2 className="text-xl font-bold text-stone-900 mt-0.5">
              {lang === 'hi' ? 'सूर्य सरोवर तट का आधिकारिक विन्यास मानचित्र' : 'Official Ground Map & Sector Distribution'}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>{lang === 'hi' ? 'सुरक्षित क्षेत्र' : 'Safe Bathing Zone'}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ml-2"></span>
            <span>{lang === 'hi' ? 'गहरा पानी (प्रतिबंधित)' : 'Deep Water (Prohibited)'}</span>
          </div>
        </div>

        {/* Visual Map Canvas Simulation */}
        <div className="relative rounded-2xl bg-linear-to-b from-sky-100 via-amber-50 to-amber-100 border-2 border-amber-300 p-6 sm:p-8 overflow-hidden min-h-[380px] flex flex-col justify-between">
          {/* River Water Graphic */}
          <div className="absolute top-0 left-0 right-0 h-44 bg-linear-to-b from-sky-400/80 via-sky-300/70 to-amber-100/40 border-b-2 border-dashed border-rose-500 flex items-center justify-center">
            <div className="text-center text-sky-950/80">
              <span className="font-heading font-black text-lg sm:text-2xl tracking-wide opacity-80 block">
                ~ पवित्र सूर्य सरोवर (Holy Lake Water) ~
              </span>
              <span className="text-xs font-mono font-bold text-rose-700 bg-white/90 px-3 py-1 rounded-full shadow-xs inline-block mt-2">
                ⚠ लाल रिबन बैरिकेडिंग • गहरे पानी में जाना सख्त मना है
              </span>
            </div>
          </div>

          {/* Boat Patrol on water */}
          <div className="relative z-10 flex justify-between items-center pt-8 px-4 text-xs">
            <div className="bg-white/90 border border-sky-400 px-3 py-1.5 rounded-lg shadow-xs flex items-center gap-1.5 text-sky-900 font-semibold">
              <LifeBuoy className="w-4 h-4 text-rose-600 animate-spin" />
              <span>सुरक्षा नाव ०१ (गोताखोर दल)</span>
            </div>
            <div className="bg-white/90 border border-sky-400 px-3 py-1.5 rounded-lg shadow-xs flex items-center gap-1.5 text-sky-900 font-semibold">
              <LifeBuoy className="w-4 h-4 text-rose-600 animate-spin" />
              <span>सुरक्षा नाव ०२ (जल पुलिस)</span>
            </div>
          </div>

          {/* Ghat Concrete Steps (Pauwa & Altars) */}
          <div className="relative z-10 pt-24 grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* North Edge Sector */}
            <div className="bg-white/95 border border-amber-300 p-4 rounded-xl shadow-xs space-y-1.5">
              <span className="text-xs font-bold font-mono text-orange-700 uppercase">
                {lang === 'hi' ? 'उत्तरी घाट सेक्टर (Sector A)' : 'North Ghat (Sector A)'}
              </span>
              <h4 className="font-bold text-stone-900 text-sm">
                {lang === 'hi' ? 'वेदी स्थल एवं दीपदान' : 'Sirsota & Diya Area'}
              </h4>
              <p className="text-[11px] text-stone-600">
                • महिला वस्त्र परिवर्तन कक्ष १<br />
                • शुद्ध गंगाजल आपूर्ति नल<br />
                • कचरा पेटी व स्वच्छता पाइंट
              </p>
            </div>

            {/* Central Main Entrance & Stage */}
            <div className="bg-amber-100/90 border-2 border-orange-500 p-4 rounded-xl shadow-md space-y-1.5">
              <span className="text-xs font-bold font-mono text-orange-800 uppercase">
                {lang === 'hi' ? 'मध्य मुख्य प्रवेश द्वार' : 'Main Center Stairs'}
              </span>
              <h4 className="font-bold text-amber-950 text-sm">
                {lang === 'hi' ? 'सूर्य देव महाआरती मंच' : 'Surya Dev Maha Aarti Stage'}
              </h4>
              <p className="text-[11px] text-amber-900">
                • समिति नियंत्रण कक्ष (Control Room)<br />
                • लाउडस्पीकर व सूचना केंद्र<br />
                • प्राथमिक चिकित्सा शिविर (First-Aid)
              </p>
            </div>

            {/* South Edge Sector */}
            <div className="bg-white/95 border border-amber-300 p-4 rounded-xl shadow-xs space-y-1.5">
              <span className="text-xs font-bold font-mono text-orange-700 uppercase">
                {lang === 'hi' ? 'दक्षिणी घाट सेक्टर (Sector B)' : 'South Ghat (Sector B)'}
              </span>
              <h4 className="font-bold text-stone-900 text-sm">
                {lang === 'hi' ? 'पारण एवं प्रसाद वितरण' : 'Paran & Prasad Zone'}
              </h4>
              <p className="text-[11px] text-stone-600">
                • महिला वस्त्र परिवर्तन कक्ष २<br />
                • आरओ शीतल पेयजल काउंटर<br />
                • दोपहिया व चारपहिया वाहन पार्किंग
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Facilities & Amenities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-amber-200 p-5 rounded-2xl shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm">
            {lang === 'hi' ? 'महिला चेंजिंग रूम' : 'Women Changing Rooms'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {lang === 'hi'
              ? 'घाट के दोनों छोरों पर पूर्णतः सुरक्षित, वाटरप्रूफ एवं स्वच्छ वस्त्र परिवर्तन कक्ष उपलब्ध हैं।'
              : 'Two clean, covered waterproof privacy booths located on north and south banks.'}
          </p>
        </div>

        <div className="bg-white border border-amber-200 p-5 rounded-2xl shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm">
            {lang === 'hi' ? 'गोताखोर व सुरक्षा नाव' : 'Safety Boats & Divers'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {lang === 'hi'
              ? 'गहरे पानी में सुरक्षा नाव और प्रशिक्षित नाविक २४ घंटे तैनात रहेंगे। लाल रस्से के पार न जाएं।'
              : 'Local divers and life-jacket-equipped boats stationed along the perimeter.'}
          </p>
        </div>

        <div className="bg-white border border-amber-200 p-5 rounded-2xl shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm">
            {lang === 'hi' ? 'शीतल आरओ पेयजल' : 'RO Drinking Water'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {lang === 'hi'
              ? 'श्रद्धालुओं और व्रतियों हेतु ३ स्थानों पर निःशुल्क स्वच्छ व शीतल पेय जल का काउंटर लगाया गया है।'
              : 'Three hygienic water dispensers providing purified drinking water to all devotees.'}
          </p>
        </div>

        <div className="bg-white border border-amber-200 p-5 rounded-2xl shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm">
            {lang === 'hi' ? 'प्राथमिक चिकित्सा शिविर' : '24x7 Medical Camp'}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            {lang === 'hi'
              ? 'गाँव के प्राथमिक स्वास्थ्य केंद्र के सहयोग से डॉक्टर, दवाएं एवं एम्बुलेंस निरंतर उपलब्ध रहेगी।'
              : 'Resident medical team, first-aid, ORS, and on-call ambulance service.'}
          </p>
        </div>
      </div>

      {/* How to Reach & Directions */}
      <div className="bg-white border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-2 text-orange-700 font-semibold text-xs uppercase mb-2">
            <Navigation className="w-4 h-4" />
            <span>{lang === 'hi' ? 'मुख्य राजमार्ग से' : 'From State Highway'}</span>
          </div>
          <h4 className="font-bold text-stone-900 text-sm">
            {lang === 'hi' ? 'अधलालपुर मोड़ चौराहा' : 'Adhalalpur Chowk'}
          </h4>
          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
            {lang === 'hi'
              ? 'राजमार्ग से अधलालपुर मोड़ होकर मात्र ५०० मीटर पूर्व की ओर। स्वागत गेट से सीधा पक्का मार्ग।'
              : 'Turn east from Adhalalpur intersection for 500 meters along the paved festival corridor.'}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-orange-700 font-semibold text-xs uppercase mb-2">
            <Compass className="w-4 h-4" />
            <span>{lang === 'hi' ? 'रेलवे स्टेशन से' : 'From Railway Station'}</span>
          </div>
          <h4 className="font-bold text-stone-900 text-sm">
            {lang === 'hi' ? 'निकटतम रेलवे जंक्शन' : 'Nearest Junction'}
          </h4>
          <p className="text-xs text-stone-600 mt-1 leading-relaxed">
            {lang === 'hi'
              ? 'स्टेशन से ऑटो व ई-रिक्शा द्वारा मात्र १५ मिनट में सीधा सूर्य सरोवर छठ घाट पहुंचा जा सकता है।'
              : '15-minute direct auto or e-rickshaw ride directly to the village ghat parking ground.'}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-orange-700 font-semibold text-xs uppercase mb-2">
            <Phone className="w-4 h-4" />
            <span>{lang === 'hi' ? 'आपातकालीन सहायता' : 'Emergency Helplines'}</span>
          </div>
          <h4 className="font-bold text-stone-900 text-sm">
            {lang === 'hi' ? 'समिति नियंत्रण कक्ष' : 'Samiti Control Room'}
          </h4>
          <div className="text-xs font-mono text-stone-800 mt-1 space-y-0.5">
            <div>• घाट नियंत्रण: <strong>+91 94310 98765</strong></div>
            <div>• एम्बुलेंस / स्वास्थ्य: <strong>+91 98350 12345</strong></div>
            <div>• सुरक्षा प्रभारी: <strong>+91 87090 23456</strong></div>
          </div>
        </div>
      </div>

    </div>
  );
};
