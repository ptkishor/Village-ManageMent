/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Heart, Leaf, Sparkles, Sun, Users } from 'lucide-react';
import { Language } from '../types';

interface AboutPageProps {
  lang: Language;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Hero Banner */}
      <div className="bg-linear-to-r from-orange-900 via-amber-900 to-amber-950 text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>॥ प्रकृति एवं सूर्य उपासना का महापर्व ॥</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight leading-tight">
            {lang === 'hi' ? 'छठ महापर्व का पावन स्वरूप एवं महत्व' : 'The Sacred Glory & Science of Chhath Puja'}
          </h1>
          <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed font-sans">
            {lang === 'hi'
              ? 'छठ महापर्व केवल एक धार्मिक अनुष्ठान नहीं, अपितु प्रकृति, पर्यावरण, शुचिता और सामाजिक समरसता की अद्वितीय साधना है। यह संसार का एकमात्र ऐसा पर्व है जिसमें अस्ताचलगामी (डूबते) सूर्य को भी श्रद्धा से अर्घ्य दिया जाता है।'
              : 'Chhath Mahaparv is a timeless Vedic celebration of the cosmic life-giver Surya Dev and Chhathi Maiya, embodying pure ecological reverence, discipline, and absolute social unity.'}
          </p>
        </div>
      </div>

      {/* 2-Column Split: Spiritual Significance & Scientific Perspective */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Spiritual & Vedic Essence */}
        <div className="bg-white border border-amber-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
              <Sun className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-stone-900">
              {lang === 'hi' ? 'पौराणिक एवं सांस्कृतिक पृष्ठभूमि' : 'Vedic Roots & Mythological Essence'}
            </h2>
            <div className="text-xs sm:text-sm text-stone-700 space-y-3 leading-relaxed">
              <p>
                {lang === 'hi'
                  ? 'ऋग्वेद में भगवान सूर्य को प्रत्यक्ष देवता और जगत की आत्मा माना गया है। छठ पूजा का संबंध महाभारत काल से भी है, जहाँ सूर्यपुत्र दानवीर कर्ण ने अंग देश (वर्तमान बिहार का भाग) में कमर तक गंगाजल में खड़े होकर सूर्य देव की उपासना की थी।'
                  : 'In the Rigveda, Lord Surya is venerated as the visible deity and the cosmic soul. Legends also connect Chhath to Surya-putra Karna of Mahabharata in ancient Anga (modern Bihar), who offered Arghya waist-deep in the river.'}
              </p>
              <p>
                {lang === 'hi'
                  ? 'छठी मैया को ब्रह्मा जी की मानस पुत्री और भगवान सूर्य की बहन ‘देवसेना’ (षष्ठी देवी) माना जाता है, जो संतानों की रक्षा, दीर्घायु और कुल की सुख-समृद्धि का वरदान देती हैं।'
                  : 'Chhathi Maiya (Shasthi Devi) is revered as the divine sister of Surya Dev and protector of children, bestowing health, longevity, and prosperity upon sincere devotees.'}
              </p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-amber-800 font-semibold">
            {lang === 'hi' ? 'ऋग्वैदिक सूर्य सूक्त परंपरा' : 'Ancient Rigvedic Tradition'}
          </div>
        </div>

        {/* Scientific & Ecological Wonder */}
        <div className="bg-white border border-amber-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-stone-900">
              {lang === 'hi' ? 'प्राकृतिक शुचिता एवं वैज्ञानिक दृष्टिकोण' : 'Ecological & Scientific Marvel'}
            </h2>
            <div className="text-xs sm:text-sm text-stone-700 space-y-3 leading-relaxed">
              <p>
                {lang === 'hi'
                  ? 'छठ महापर्व में प्रयुक्त होने वाली प्रत्येक वस्तु प्रकृति से सीधे जुड़ी है—बांस का सूप, मिट्टी का चूल्हा, गन्ने के तने, अदरक, हल्दी, सिंघाड़ा, डाभ नीम्बू और शुद्ध गाय का घी। इसमें किसी भी प्रकार के प्लास्टिक या रासायनिक उत्पाद का प्रयोग वर्जित है।'
                  : 'Every puja artifact is bio-degradable and seasonal: woven bamboo soops, earthen clay stoves, sugarcane stalks, water caltrops, turmeric roots, and pure cow ghee—strictly zero synthetic plastics.'}
              </p>
              <p>
                {lang === 'hi'
                  ? 'उगते और डूबते सूर्य की पराबैंगनी किरणें न्यूनतम होती हैं, जिससे जल में खड़े होकर सूर्य की ओर देखने से नेत्र ज्योति, त्वचा और शरीर में विटामिन-डी का सर्वोत्तम संतुलन बनता है।'
                  : 'Standing in gentle flowing water during sunrise and sunset allows safe solar gazing without harmful UV rays, revitalizing the optic nerve and harmonizing solar energy.'}
              </p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-emerald-800 font-semibold">
            {lang === 'hi' ? '१००% पर्यावरण अनुकूल एवं सात्विक' : '100% Eco-Friendly & Sustainable'}
          </div>
        </div>

      </div>

      {/* 4 Pillars of Chhath Puja */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-orange-700">
            {lang === 'hi' ? 'महापर्व की चार प्रमुख विशेषताएं' : 'The Four Unique Pillars'}
          </span>
          <h3 className="text-2xl font-heading font-bold text-stone-900 mt-1">
            {lang === 'hi' ? 'छठ पूजा की अद्वितीय सामाजिक गरिमा' : 'What Makes Chhath So Incomparable'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-amber-200/80 shadow-xs space-y-2">
            <Users className="w-6 h-6 text-orange-600" />
            <h4 className="font-bold text-stone-900 text-sm">
              {lang === 'hi' ? 'जाति-भेद रहित समरसता' : 'Zero Caste Discrimination'}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'hi'
                ? 'घाट पर कोई अगड़ा या पिछड़ा नहीं होता। सभी एक साथ एक ही जल में खड़े होकर अर्घ्य देते हैं।'
                : 'All classes stand united in the same river waters, sharing identical altars and prayers.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-amber-200/80 shadow-xs space-y-2">
            <Sun className="w-6 h-6 text-amber-600" />
            <h4 className="font-bold text-stone-900 text-sm">
              {lang === 'hi' ? 'अस्त सूर्य की वंदना' : 'Worship of the Setting Sun'}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'hi'
                ? 'संसार चढ़ते सूरज को पूजता है, परन्तु भारतीय संस्कृति जीवन के उतार और बुजुर्गों के प्रति आभार व्यक्त करती है।'
                : 'While the world courts rising power, Chhath honours the departing sun in deep gratitude.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-amber-200/80 shadow-xs space-y-2">
            <Award className="w-6 h-6 text-rose-600" />
            <h4 className="font-bold text-stone-900 text-sm">
              {lang === 'hi' ? 'कठोर तप एवं निष्ठा' : 'Rigorous 36h Waterless Fast'}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'hi'
                ? 'बिना अन्न-जल के ३६ घंटे का निर्जला व्रत आत्मसंयम, मनोबल और आत्मशुद्धि का सर्वोत्तम उदाहरण है।'
                : 'Devotees undergo a continuous 36-hour fast without even a drop of water, mastering the senses.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-amber-200/80 shadow-xs space-y-2">
            <Heart className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-stone-900 text-sm">
              {lang === 'hi' ? 'लोकगीतों की मधुर मिठास' : 'Soulful Folk Melodies'}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {lang === 'hi'
                ? '‘काँच ही बाँस के बहँगिया’ और ‘केलवा के पात पर’ जैसे पारंपरिक छठ गीतों से गाँव गूंज उठता है।'
                : 'Traditional melodies passed down generations create an ethereal atmosphere of devotion.'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
