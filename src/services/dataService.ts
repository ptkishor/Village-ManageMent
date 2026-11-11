/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Announcement,
  CommitteeMember,
  Donation,
  Expense,
  FinancialSummary,
  GalleryItem,
  PujaScheduleItem,
} from '../types';

const STORAGE_KEY_PREFIX = 'hamare_gaon_chhath_';

export const AVAILABLE_YEARS = [2026, 2025, 2024];

// Authentic initial data reflecting a genuine village Chhath Puja organizing committee
const INITIAL_DONATIONS: Donation[] = [
  // 2026 (Current Active Festival)
  {
    id: 'don-2026-001',
    year: 2026,
    donorName: 'श्री रामेश्वर सिंह जी (मुखिया प्रतिनिधि)',
    villageWard: 'वार्ड संख्या ०४ (उत्तरी टोला)',
    amount: 11000,
    date: '2026-10-15',
    paymentMethod: 'UPI',
    receiptNo: 'CP-26-001',
    remarks: 'घाट के मुख्य प्रवेश द्वार के निर्माण एवं प्रकाश हेतु',
    phone: '9835xxxx12',
    verifiedBy: 'सुरेश प्रसाद (कोषाध्यक्ष)',
    createdAt: '2026-10-15T10:00:00Z',
  },
  {
    id: 'don-2026-002',
    year: 2026,
    donorName: 'डॉ. अरविन्द कुमार झा (पटना एम्स)',
    villageWard: 'वार्ड संख्या ०२ (ब्राह्मण टोला)',
    amount: 5100,
    date: '2026-10-18',
    paymentMethod: 'Bank Transfer',
    receiptNo: 'CP-26-002',
    remarks: 'छठ व्रतियों के लिए शुद्ध गंगाजल एवं दूध वितरण',
    phone: '9431xxxx89',
    verifiedBy: 'सुरेश प्रसाद (कोषाध्यक्ष)',
    createdAt: '2026-10-18T14:30:00Z',
  },
  {
    id: 'don-2026-003',
    year: 2026,
    donorName: 'श्री विनोद कुमार चौधरी (शिक्षक)',
    villageWard: 'वार्ड संख्या ०६ (पूरब टोला)',
    amount: 3100,
    date: '2026-10-22',
    paymentMethod: 'Cash',
    receiptNo: 'CP-26-003',
    remarks: 'सूर्य सरोवर घाट की रंगाई-पुताई हेतु',
    phone: '9934xxxx55',
    verifiedBy: 'सुरेश प्रसाद (कोषाध्यक्ष)',
    createdAt: '2026-10-22T09:15:00Z',
  },
  {
    id: 'don-2026-004',
    year: 2026,
    donorName: 'श्रीमती मंजू देवी (पंचायत समिति सदस्या)',
    villageWard: 'वार्ड संख्या ०३',
    amount: 5001,
    date: '2026-10-25',
    paymentMethod: 'UPI',
    receiptNo: 'CP-26-004',
    remarks: 'संध्या अर्घ्य के समय दीपदान व्यवस्था',
    phone: '8709xxxx44',
    verifiedBy: 'सुरेश प्रसाद (कोषाध्यक्ष)',
    createdAt: '2026-10-25T11:45:00Z',
  },
  {
    id: 'don-2026-005',
    year: 2026,
    donorName: 'श्री राजेश कुमार साह (राशन डीलर)',
    villageWard: 'वार्ड संख्या ०१ (बाजार टोला)',
    amount: 2501,
    date: '2026-10-28',
    paymentMethod: 'Cash',
    receiptNo: 'CP-26-005',
    remarks: 'भक्ति संगीत एवं लाउडस्पीकर सेवा',
    phone: '9122xxxx33',
    verifiedBy: 'सुरेश प्रसाद (कोषाध्यक्ष)',
    createdAt: '2026-10-28T16:20:00Z',
  },
  {
    id: 'don-2026-006',
    year: 2026,
    donorName: 'इंजीनियर आलोक रंजन (बेंगलुरु प्रवासी)',
    villageWard: 'वार्ड संख्या ०५ (दक्षिण टोला)',
    amount: 7500,
    date: '2026-11-02',
    paymentMethod: 'UPI',
    receiptNo: 'CP-26-006',
    remarks: 'घाट पर सीसीटीवी कैमरा व महिला चेंजिंग रूम',
    phone: '9741xxxx90',
    verifiedBy: 'सुरेश प्रसाद (कोषाध्यक्ष)',
    createdAt: '2026-11-02T13:10:00Z',
  },
  {
    id: 'don-2026-007',
    year: 2026,
    donorName: 'श्री हरेंद्र यादव (दुग्ध उत्पादक समिति)',
    villageWard: 'वार्ड संख्या ०७',
    amount: 2100,
    date: '2026-11-04',
    paymentMethod: 'Cash',
    receiptNo: 'CP-26-007',
    remarks: 'घाट की बैरिकेडिंग एवं लाल रिबन सुरक्षा व्यवस्था',
    phone: '9955xxxx21',
    verifiedBy: 'सुरेश प्रसाद (कोषाध्यक्ष)',
    createdAt: '2026-11-04T08:30:00Z',
  },

  // 2025 Records (Past Year Final Audit)
  {
    id: 'don-2025-001',
    year: 2025,
    donorName: 'श्री रामेश्वर सिंह जी',
    villageWard: 'वार्ड संख्या ०४',
    amount: 11000,
    date: '2025-10-10',
    paymentMethod: 'UPI',
    receiptNo: 'CP-25-001',
    remarks: 'मुख्य गेट एवं प्रकाश',
    phone: '9835xxxx12',
    verifiedBy: 'सुरेश प्रसाद',
    createdAt: '2025-10-10T10:00:00Z',
  },
  {
    id: 'don-2025-002',
    year: 2025,
    donorName: 'गाँव के समस्त प्रवासी बंधु (सामूहिक)',
    villageWard: 'प्रवासी ग्रामवासी संघ (दिल्ली-मुंबई)',
    amount: 51000,
    date: '2025-10-14',
    paymentMethod: 'Bank Transfer',
    receiptNo: 'CP-25-002',
    remarks: 'सूर्य सरोवर घाट की सीढ़ियों की मरम्मत व लाइट टावर',
    phone: '9811xxxx00',
    verifiedBy: 'सुरेश प्रसाद',
    createdAt: '2025-10-14T12:00:00Z',
  },
  {
    id: 'don-2025-003',
    year: 2025,
    donorName: 'श्री ब्रजमोहन तिवारी',
    villageWard: 'वार्ड संख्या ०२',
    amount: 5001,
    date: '2025-10-16',
    paymentMethod: 'Cash',
    receiptNo: 'CP-25-003',
    remarks: 'हवन, पूजन एवं सिंदूर प्रसाद',
    phone: '9430xxxx11',
    verifiedBy: 'सुरेश प्रसाद',
    createdAt: '2025-10-16T15:20:00Z',
  },
  {
    id: 'don-2025-004',
    year: 2025,
    donorName: 'श्रीमती उषा देवी',
    villageWard: 'वार्ड संख्या ०६',
    amount: 3500,
    date: '2025-10-20',
    paymentMethod: 'UPI',
    receiptNo: 'CP-25-004',
    remarks: 'फल एवं फूल माला सजावट',
    phone: '7903xxxx44',
    verifiedBy: 'सुरेश प्रसाद',
    createdAt: '2025-10-20T11:00:00Z',
  },
  {
    id: 'don-2025-005',
    year: 2025,
    donorName: 'श्री कृष्ण मुरारी गुप्ता',
    villageWard: 'वार्ड संख्या ०१ (बाजार)',
    amount: 15000,
    date: '2025-10-21',
    paymentMethod: 'Cash',
    receiptNo: 'CP-25-005',
    remarks: 'भव्य साउंड व भक्ति जागरण मंच',
    phone: '9471xxxx77',
    verifiedBy: 'सुरेश प्रसाद',
    createdAt: '2025-10-21T18:00:00Z',
  },
  {
    id: 'don-2025-006',
    year: 2025,
    donorName: 'ग्राम पंचायत निधि सहयोग (ग्राम प्रधान)',
    villageWard: 'पंचायत भवन',
    amount: 25000,
    date: '2025-10-22',
    paymentMethod: 'Cheque',
    receiptNo: 'CP-25-006',
    remarks: 'घाट स्वच्छता, ब्लीचिंग, चूना व सुरक्षा नाव',
    phone: '9431xxxx55',
    verifiedBy: 'सुरेश प्रसाद',
    createdAt: '2025-10-22T10:00:00Z',
  },
  {
    id: 'don-2025-007',
    year: 2025,
    donorName: 'श्री संजीत कुमार महतो',
    villageWard: 'वार्ड संख्या ०८',
    amount: 2100,
    date: '2025-10-24',
    paymentMethod: 'Cash',
    receiptNo: 'CP-25-007',
    remarks: 'सामान्य सहयोग',
    phone: '8292xxxx66',
    verifiedBy: 'सुरेश प्रसाद',
    createdAt: '2025-10-24T14:10:00Z',
  },

  // 2024 Records (Archived Year Audit)
  {
    id: 'don-2024-001',
    year: 2024,
    donorName: 'श्री रामेश्वर सिंह जी',
    villageWard: 'वार्ड संख्या ०४',
    amount: 10000,
    date: '2024-10-25',
    paymentMethod: 'Cash',
    receiptNo: 'CP-24-001',
    remarks: 'तोरण द्वार एवं स्वागत मंच',
    phone: '9835xxxx12',
    verifiedBy: 'सुरेश प्रसाद',
    createdAt: '2024-10-25T10:00:00Z',
  },
  {
    id: 'don-2024-002',
    year: 2024,
    donorName: 'श्री जयप्रकाश नारायण राय',
    villageWard: 'वार्ड संख्या ०५',
    amount: 7500,
    date: '2024-10-28',
    paymentMethod: 'Cash',
    receiptNo: 'CP-24-002',
    remarks: 'लाइटिंग व्यवस्था',
    phone: '9430xxxx22',
    verifiedBy: 'सुरेश प्रसाद',
    createdAt: '2024-10-28T16:00:00Z',
  },
  {
    id: 'don-2024-003',
    year: 2024,
    donorName: 'गाँव के समस्त युवा संगठन',
    villageWard: 'नवयुवक छठ पूजा संघ',
    amount: 21000,
    date: '2024-11-01',
    paymentMethod: 'Cash',
    receiptNo: 'CP-24-003',
    remarks: 'घाट सफाई एवं सुरक्षा बैरिकेड',
    phone: '9939xxxx88',
    verifiedBy: 'सुरेश प्रसाद',
    createdAt: '2024-11-01T12:00:00Z',
  },
  {
    id: 'don-2024-004',
    year: 2024,
    donorName: 'श्री सत्येन्द्र वर्मा (स्वर्णकार)',
    villageWard: 'वार्ड संख्या ०१',
    amount: 5000,
    date: '2024-11-02',
    paymentMethod: 'Cash',
    receiptNo: 'CP-24-004',
    remarks: 'भगवान भास्कर महाआरती व्यवस्था',
    phone: '9122xxxx99',
    verifiedBy: 'सुरेश प्रसाद',
    createdAt: '2024-11-02T14:40:00Z',
  },
  {
    id: 'don-2024-005',
    year: 2024,
    donorName: 'श्रीमती शारदा देवी',
    villageWard: 'वार्ड संख्या ०३',
    amount: 3100,
    date: '2024-11-03',
    paymentMethod: 'Cash',
    receiptNo: 'CP-24-005',
    remarks: 'प्रसाद व दीपदान',
    phone: '8877xxxx11',
    verifiedBy: 'सुरेश प्रसाद',
    createdAt: '2024-11-03T11:20:00Z',
  },
];

const INITIAL_EXPENSES: Expense[] = [
  // 2026 (Current Active Festival Expenses)
  {
    id: 'exp-2026-001',
    year: 2026,
    title: 'घाट पर एलईडी फ्लड लाइट एवं हाईमास्ट टावर वायरिंग',
    category: 'Lighting',
    amount: 8500,
    date: '2026-10-26',
    vendorName: 'माँ भवानी इलेक्ट्रिकल्स, बाजार',
    description: 'सूर्य सरोवर घाट के चारों ओर ५०० वाट एलईडी फ्लड लाइट, केबल तार व फिटिंग मजदूरी',
    voucherNo: 'V-26-01',
    paidBy: 'मनोज कुमार (सचिव)',
    createdAt: '2026-10-26T16:00:00Z',
  },
  {
    id: 'exp-2026-002',
    year: 2026,
    title: 'घाट की सीढ़ियों की सफाई, जलकुंभी निष्कासन व चूना छिड़काव',
    category: 'Cleaning',
    amount: 4200,
    date: '2026-10-29',
    vendorName: 'मुन्ना जमादार एवं श्रमिक दल',
    description: '३ दिन तक १० मजदूरों द्वारा घाट की सफाई, सिल्ट हटाना, ४ बोरी चूना व ब्लीचिंग पाउडर',
    voucherNo: 'V-26-02',
    paidBy: 'धर्मेन्द्र पासवान (घाट प्रभारी)',
    createdAt: '2026-10-29T18:00:00Z',
  },
  {
    id: 'exp-2026-003',
    year: 2026,
    title: 'महिला व्रतियों हेतु वाटरप्रूफ चेंजिंग रूम व बांस बैरिकेडिंग',
    category: 'Tent',
    amount: 6000,
    date: '2026-11-01',
    vendorName: 'श्री गणेश टेंट हाउस',
    description: '२ अदद महिला वस्त्र परिवर्तन कक्ष, मजबूत बांस, बल्ली एवं रेड-व्हाइट प्लास्टिक शीट',
    voucherNo: 'V-26-03',
    paidBy: 'मनोज कुमार (सचिव)',
    createdAt: '2026-11-01T12:00:00Z',
  },
  {
    id: 'exp-2026-004',
    year: 2026,
    title: 'गहरे पानी में सुरक्षा नाव, लाइफ जैकेट व गोताखोर अग्रिम',
    category: 'Other Expenses',
    amount: 3500,
    date: '2026-11-03',
    vendorName: 'बिहारी मल्लाह एवं नाविक दल',
    description: '२ देसी नौका, लाइफ जैकेट एवं सुरक्षा रस्सा घाट के दोनों छोर पर तैनात',
    voucherNo: 'V-26-04',
    paidBy: 'सुरेश प्रसाद (कोषाध्यक्ष)',
    createdAt: '2026-11-03T15:00:00Z',
  },

  // 2025 Expenses (Past Year Concluded)
  {
    id: 'exp-2025-001',
    year: 2025,
    title: 'संपूर्ण घाट प्रकाश एवं जनरेटर किराया (२ रात)',
    category: 'Lighting',
    amount: 32000,
    date: '2025-10-25',
    vendorName: 'माँ भवानी इलेक्ट्रिकल्स',
    description: '२५ केवीए मूक जनरेटर, ३०० लीटर डीजल, झालर लाइट एवं घाट पर फोकस लाइट',
    voucherNo: 'V-25-01',
    paidBy: 'मनोज कुमार',
    createdAt: '2025-10-25T17:00:00Z',
  },
  {
    id: 'exp-2025-002',
    year: 2025,
    title: 'भक्ति संगीत लाउडस्पीकर एवं हॉर्न सेट',
    category: 'Sound System',
    amount: 18000,
    date: '2025-10-26',
    vendorName: 'मधुर साउंड सर्विस',
    description: 'गाँव के मुख्य मार्ग से घाट तक १२ हॉर्न, भक्ति गीतों का लगातार प्रसारण एवं माइक सिस्टम',
    voucherNo: 'V-25-02',
    paidBy: 'मनोज कुमार',
    createdAt: '2025-10-26T14:00:00Z',
  },
  {
    id: 'exp-2025-003',
    year: 2025,
    title: 'भव्य तोरण द्वार एवं कालीन बिछावन',
    category: 'Decoration',
    amount: 22500,
    date: '2025-10-27',
    vendorName: 'शाही डेकोरेटर्स',
    description: 'सूर्य देव स्वागत गेट, थर्मोकोल कटआउट, २०० मीटर लाल जाजम कालीन',
    voucherNo: 'V-25-03',
    paidBy: 'मनोज कुमार',
    createdAt: '2025-10-27T10:00:00Z',
  },
  {
    id: 'exp-2025-004',
    year: 2025,
    title: 'गेंदा फूल मालाएं एवं सूर्य भगवान प्रतिमा सज्जा',
    category: 'Flowers',
    amount: 12000,
    date: '2025-10-27',
    vendorName: 'गंगा फूल भंडार, हाजीपुर',
    description: '५० किलो पीला व नारंगी गेंदा फूल, गुलाब पंखुड़ी एवं आम के पत्ते',
    voucherNo: 'V-25-04',
    paidBy: 'सुरेश प्रसाद',
    createdAt: '2025-10-27T12:00:00Z',
  },
  {
    id: 'exp-2025-005',
    year: 2025,
    title: 'सामूहिक खीर व प्रसाद वितरण (खरना एवं पारण)',
    category: 'Prasad',
    amount: 14200,
    date: '2025-10-28',
    vendorName: 'किराना भंडार व दुग्ध संघ',
    description: '१०० लीटर शुद्ध गाय का दूध, अरवा चावल, गुड़, पत्तल एवं दोना',
    voucherNo: 'V-25-05',
    paidBy: 'धर्मेन्द्र पासवान',
    createdAt: '2025-10-28T20:00:00Z',
  },
  {
    id: 'exp-2025-006',
    year: 2025,
    title: 'घाट स्वच्छता, मिट्टी भराई व ब्लीचिंग',
    category: 'Cleaning',
    amount: 8500,
    date: '2025-10-24',
    vendorName: 'ग्राम स्वच्छता टोली',
    description: 'घाट के गड्ढों में बालू भराई, सीढ़ियों की धुलाई व सैनिटाइजेशन',
    voucherNo: 'V-25-06',
    paidBy: 'मनोज कुमार',
    createdAt: '2025-10-24T18:00:00Z',
  },

  // 2024 Expenses (Past Year Concluded)
  {
    id: 'exp-2024-001',
    year: 2024,
    title: 'लाइटिंग एवं जनरेटर व्यवस्था',
    category: 'Lighting',
    amount: 21000,
    date: '2024-11-04',
    vendorName: 'माँ भवानी इलेक्ट्रिकल्स',
    description: 'घाट पर लाइट, जनरेटर व डीजल',
    voucherNo: 'V-24-01',
    paidBy: 'मनोज कुमार',
    createdAt: '2024-11-04T18:00:00Z',
  },
  {
    id: 'exp-2024-002',
    year: 2024,
    title: 'साउंड सिस्टम व भक्ति संगीत',
    category: 'Sound System',
    amount: 11500,
    date: '2024-11-05',
    vendorName: 'मधुर साउंड',
    description: 'लाउडस्पीकर व भक्ति कैसेट',
    voucherNo: 'V-24-02',
    paidBy: 'मनोज कुमार',
    createdAt: '2024-11-05T12:00:00Z',
  },
  {
    id: 'exp-2024-003',
    year: 2024,
    title: 'टेंट, शामियाना व महिला कक्ष',
    category: 'Tent',
    amount: 8000,
    date: '2024-11-05',
    vendorName: 'गणेश टेंट',
    description: 'बैरिकेडिंग व चेंजिंग रूम',
    voucherNo: 'V-24-03',
    paidBy: 'सुरेश प्रसाद',
    createdAt: '2024-11-05T15:00:00Z',
  },
  {
    id: 'exp-2024-004',
    year: 2024,
    title: 'घाट सफाई एवं सुरक्षा व्यवस्था',
    category: 'Cleaning',
    amount: 5000,
    date: '2024-11-03',
    vendorName: 'ग्राम मजदूर दल',
    description: 'सिल्ट सफाई व चूना छिड़काव',
    voucherNo: 'V-24-04',
    paidBy: 'मनोज कुमार',
    createdAt: '2024-11-03T17:00:00Z',
  },
];

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    titleHindi: 'घाट पर वेदी (सिरसोता) आरक्षण संबंधी आवश्यक सूचना',
    titleEnglish: 'Important Notice on Ghat Altar (Sirsota) Allocation',
    descriptionHindi: 'सभी ग्रामवासियों को सूचित किया जाता है कि छठ घाट पर सिरसोता (वेदी) बनाने का कार्य पूर्ण रूप से निःशुल्क है। किसी भी व्यक्ति द्वारा स्थान घेरने या विवाद करने की अनुमति नहीं होगी। वरिष्ठ नागरिकों व दूर से आए व्रतियों को प्राथमिकता दी जाएगी।',
    descriptionEnglish: 'Notice to all villagers: Making Sirsota/altars at the Chhath ghat is 100% free of charge. No individual is permitted to commercialize spots. Priority will be granted to elderly and distant devotees.',
    date: '2026-11-05',
    priority: 'urgent',
    category: 'ghat',
    isPinned: true,
  },
  {
    id: 'ann-2',
    titleHindi: 'महिला व्रतियों हेतु चेंजिंग रूम एवं पेयजल व्यवस्था',
    titleEnglish: 'Changing Rooms & Fresh Drinking Water Available',
    descriptionHindi: 'समिति द्वारा घाट के उत्तरी एवं दक्षिणी छोर पर दो सुसज्जित वाटरप्रूफ वस्त्र परिवर्तन कक्ष (Changing Rooms) बनाए गए हैं। साथ ही आरओ पेयजल व प्राथमिक चिकित्सा शिविर २४ घंटे उपलब्ध रहेगा।',
    descriptionEnglish: 'Two waterproof changing rooms have been built at the north and south edges of the ghat. Free RO drinking water and 24x7 first-aid camps will be active.',
    date: '2026-11-07',
    priority: 'important',
    category: 'ghat',
    isPinned: true,
  },
  {
    id: 'ann-3',
    titleHindi: 'सुरक्षा दिशा-निर्देश: गहरे पानी में जाने पर पूर्ण प्रतिबंध',
    titleEnglish: 'Safety Guidelines: Strict Prohibition on Deep Water Entry',
    descriptionHindi: 'सूर्य सरोवर में लाल झंडियों और रस्सों से सुरक्षित क्षेत्र चिन्हित किया गया है। बच्चों एवं गहरे पानी में तैरना न जानने वालों को रस्से के पार जाने से रोकें। स्वयंसेवक व नाविक दल निरंतर गश्त पर रहेंगे।',
    descriptionEnglish: 'A red flag and rope barrier marks the safe water zone. Please keep children within the shallow perimeter. Safety boats and divers will be actively patrolling.',
    date: '2026-11-08',
    priority: 'urgent',
    category: 'security',
    isPinned: false,
  },
  {
    id: 'ann-4',
    titleHindi: 'संध्या अर्घ्य के उपरांत सामूहिक भजन संध्या व सांस्कृतिक कार्यक्रम',
    titleEnglish: 'Bhakti Bhajan Sandhya After Evening Arghya',
    descriptionHindi: 'संध्या अर्घ्य (रविवार शाम) के बाद रात्रि ८:०० बजे से प्रसिद्ध स्थानीय कलाकारों द्वारा पारंपरिक छठ गीतों की प्रस्तुति होगी। समस्त ग्रामवासी सादर आमंत्रित हैं।',
    descriptionEnglish: 'Following evening Arghya, traditional Chhath folk music and bhajans will be performed at the community stage from 8:00 PM.',
    date: '2026-11-09',
    priority: 'general',
    category: 'cultural',
    isPinned: false,
  },
];

const INITIAL_COMMITTEE: CommitteeMember[] = [
  {
    id: 'mem-1',
    nameHindi: 'श्री रामेश्वर सिंह',
    nameEnglish: 'Rameshwar Singh',
    roleHindi: 'मुख्य संरक्षक (वरिष्ठ समाजसेवी)',
    roleEnglish: 'Chief Patron (Senior Social Worker)',
    category: 'patron',
    ward: 'वार्ड संख्या ०४',
    phone: '+91 98350 12345',
    tenure: '२०१५ - वर्तमान',
  },
  {
    id: 'mem-2',
    nameHindi: 'श्री देवेन्द्र नारायण राय',
    nameEnglish: 'Devendra Narayan Rai',
    roleHindi: 'अध्यक्ष (छठ पूजा समिति)',
    roleEnglish: 'President (Chhath Puja Samiti)',
    category: 'core',
    ward: 'वार्ड संख्या ०२',
    phone: '+91 94310 98765',
    tenure: '२०२२ - २०२६',
  },
  {
    id: 'mem-3',
    nameHindi: 'श्री मनोज कुमार वर्मा',
    nameEnglish: 'Manoj Kumar Verma',
    roleHindi: 'सचिव (कार्यकारी व्यवस्था)',
    roleEnglish: 'Secretary (Operations Lead)',
    category: 'core',
    ward: 'वार्ड संख्या ०५',
    phone: '+91 99341 54321',
    tenure: '२०२२ - २०२६',
  },
  {
    id: 'mem-4',
    nameHindi: 'श्री सुरेश प्रसाद गुप्ता',
    nameEnglish: 'Suresh Prasad Gupta',
    roleHindi: 'कोषाध्यक्ष (वित्तीय लेखा-जोखा)',
    roleEnglish: 'Treasurer (Finance & Audit)',
    category: 'finance',
    ward: 'वार्ड संख्या ०१ (बाजार)',
    phone: '+91 91220 67890',
    tenure: '२०२१ - वर्तमान',
  },
  {
    id: 'mem-5',
    nameHindi: 'श्री धर्मेन्द्र कुमार पासवान',
    nameEnglish: 'Dharmendra Paswan',
    roleHindi: 'घाट प्रभारी एवं सुरक्षा प्रमुख',
    roleEnglish: 'Ghat In-charge & Safety Lead',
    category: 'ghat_mgmt',
    ward: 'वार्ड संख्या ०७',
    phone: '+91 87090 23456',
    tenure: '२०२३ - २०२६',
  },
  {
    id: 'mem-6',
    nameHindi: 'श्री कन्हैया कुमार झा',
    nameEnglish: 'Kanhaiya Kumar Jha',
    roleHindi: 'संयोजक, प्रकाश एवं साउंड व्यवस्था',
    roleEnglish: 'Coordinator, Sound & Lighting',
    category: 'ghat_mgmt',
    ward: 'वार्ड संख्या ०३',
    phone: '+91 94711 34567',
    tenure: '२०२४ - २०२६',
  },
  {
    id: 'mem-7',
    nameHindi: 'श्री विकास कुमार सिंह (विक्की)',
    nameEnglish: 'Vikas Kumar Singh',
    roleHindi: 'युवा दल प्रमुख (स्वयंसेवक प्रभारी)',
    roleEnglish: 'Youth Wing Head (Volunteer Lead)',
    category: 'youth',
    ward: 'वार्ड संख्या ०६',
    phone: '+91 82920 89012',
    tenure: '२०२४ - २०२६',
  },
  {
    id: 'mem-8',
    nameHindi: 'श्रीमती प्रभावती देवी',
    nameEnglish: 'Prabhavati Devi',
    roleHindi: 'महिला स्वयंसेवक समन्वयक',
    roleEnglish: 'Women Volunteer Coordinator',
    category: 'volunteer',
    ward: 'वार्ड संख्या ०४',
    phone: '+91 79030 45678',
    tenure: '२०२३ - २०२६',
  },
];

const INITIAL_SCHEDULE: PujaScheduleItem[] = [
  {
    id: 'sch-1',
    dayNumber: 1,
    nameHindi: 'प्रथम दिवस: नहाय-खाय',
    nameEnglish: 'Day 1: Nahay Khay',
    tithi: 'कार्तिक शुक्ल चतुर्थी',
    date: '२०२६ (कार्तिक मास)',
    sunriseTime: 'प्रातः ०६:१२ बजे',
    sunsetTime: 'सायं ०५:२८ बजे',
    fastingRuleHindi: 'स्नान के पश्चात पूर्ण सात्विक भोजन (चना दाल, कद्दू/लौकी की सब्जी, अरवा चावल) शुद्ध घी व सेंधा नमक में पकाया जाता है।',
    fastingRuleEnglish: 'Strict sattvic preparation: pumpkin/gourd curry, Bengal gram dal, and raw rice cooked in pure ghee and rock salt after a holy bath.',
    ritualsHindi: [
      'पवित्र नदी/सरोवर में स्नान एवं सूर्य देव को जल अर्पण',
      'घर एवं रसोई की संपूर्ण गंगाजल से शुद्धि',
      'सेंधा नमक और मिट्टी के चूल्हे पर भोजन पकाना',
      'व्रती द्वारा सर्वप्रथम भोजन ग्रहण, तत्पश्चात पूरे परिवार में वितरण',
    ],
    ritualsEnglish: [
      'Holy dip in the river/pond followed by Surya Arghya',
      'Deep purification of the entire home and kitchen with Gangajal',
      'Cooking with rock salt in brass or earthen utensils with pure ghee',
      'The devotee partakes first, followed by family and neighbours',
    ],
    descriptionHindi: 'महापर्व की शुरुआत आंतरिक व बाह्य शुचिता के संकल्प के साथ होती है। इस दिन व्रती पूर्ण श्रद्धा और स्वच्छता का प्रण लेते हैं।',
    descriptionEnglish: 'The sacred 4-day festival begins with Nahay Khay, instilling absolute purity of mind, body, and surroundings.',
  },
  {
    id: 'sch-2',
    dayNumber: 2,
    nameHindi: 'द्वितीय दिवस: खरना (लोहंडा)',
    nameEnglish: 'Day 2: Kharna (Lohanda)',
    tithi: 'कार्तिक शुक्ल पंचमी',
    date: '२०२६ (कार्तिक मास)',
    sunriseTime: 'प्रातः ०६:१३ बजे',
    sunsetTime: 'सायं ०५:२७ बजे',
    fastingRuleHindi: 'दिन भर निर्जला व्रत। सायंकाल सूर्य अस्त होने के बाद गुड़ और गाय के दूध से बनी खीर व घी लगी रोटी का भोग लगाकर मौन होकर प्रसाद ग्रहण।',
    fastingRuleEnglish: 'Strict waterless fast throughout the day. At dusk, jaggery and cow milk kheer along with ghee rotis are offered to Sun God before silent consumption.',
    ritualsHindi: [
      'दिन भर निर्जल उपवास का संकल्प',
      'सायंकाल मिट्टी के नए चूल्हे पर आम की लकड़ी से गुड़-दूध की खीर बनाना',
      'सूर्य देव और कुलदेवी को भोग अर्पण',
      'प्रसाद ग्रहण के साथ ही ३६ घंटे के कठिन निर्जला व्रत का प्रारंभ',
    ],
    ritualsEnglish: [
      'Observance of full-day waterless fast',
      'Cooking jaggery kheer on new earthen clay stove using dried mango firewood',
      'Offering naivedya to Surya Dev and Kuldevi',
      'Commencement of the rigorous 36-hour continuous nirjala fast',
    ],
    descriptionHindi: 'खरना के प्रसाद को अत्यंत पवित्र माना जाता है। इस प्रसाद को ग्रहण करने के लिए दूर-दूर से श्रद्धालु आते हैं।',
    descriptionEnglish: 'Kharna prasad is considered deeply sanctified and spiritually potent; friends and neighbors gather to receive it.',
  },
  {
    id: 'sch-3',
    dayNumber: 3,
    nameHindi: 'तृतीय दिवस: संध्या अर्घ्य (पहला अर्घ्य)',
    nameEnglish: 'Day 3: Sandhya Arghya (First Arghya)',
    tithi: 'कार्तिक शुक्ल षष्ठी',
    date: '२०२६ (कार्तिक मास)',
    sunriseTime: 'प्रातः ०६:१४ बजे',
    sunsetTime: 'सायं ०५:२६ बजे',
    fastingRuleHindi: 'पूर्ण निर्जला उपवास जारी। पूरे परिवार के साथ दौरा और सूप लेकर नदी/सरोवर घाट पर प्रस्थान।',
    fastingRuleEnglish: 'Continuous waterless fast. Procession to the river ghat carrying bamboo dauras and painted soops filled with fresh harvest.',
    ritualsHindi: [
      'दिन में शुद्ध घी में ठेकुआ, भुसवा व कसार प्रसाद की पावन तैयारी',
      'बांस के सूप व दौरा में ऋतु फल (गन्ना, नारियल, शरीफा, डाभ नीम्बू) सजाना',
      'गाँव से गाजे-बाजे व छठ गीतों के साथ सूर्य सरोवर घाट की ओर प्रस्थान',
      'कमर भर जल में खड़े होकर अस्ताचलगामी (डूबते) भगवान सूर्य को पहला अर्घ्य अर्पण',
      'घाट पर रात्रि जागरण एवं कोसी भराई का अनुष्ठान',
    ],
    ritualsEnglish: [
      'Sacred preparation of Thekua, Bhuswa, and Kasar prasad in pure ghee',
      'Arranging seasonal harvest fruits (sugarcane, coconuts, pomelos) in bamboo soops',
      'Vibrant procession to the village ghat singing traditional folk melodies',
      'Standing waist-deep in sanctified water to offer Arghya to the setting Sun God',
      'Night vigil and soulful Kosi Bharai ritual with lit earthen diyas',
    ],
    descriptionHindi: 'भारतीय संस्कृति की अनूठी विशेषता जहाँ अस्त होते हुए सूर्य को भी कृतज्ञता पूर्वक अर्घ्य दिया जाता है।',
    descriptionEnglish: 'Unique ancient philosophy that worships the setting sun first, paying profound gratitude to universal energy.',
  },
  {
    id: 'sch-4',
    dayNumber: 4,
    nameHindi: 'चतुर्थ दिवस: उषा अर्घ्य व पारण',
    nameEnglish: 'Day 4: Usha Arghya & Paran',
    tithi: 'कार्तिक शुक्ल सप्तमी',
    date: '२०२६ (कार्तिक मास)',
    sunriseTime: 'प्रातः ०६:१५ बजे',
    sunsetTime: 'सायं ०५:२५ बजे',
    fastingRuleHindi: 'उदयगामी सूर्य को अर्घ्य देने के पश्चात घाट पर ही कच्चा दूध, अदरक और प्रसाद ग्रहण कर ३६ घंटे के निर्जला व्रत का पारण।',
    fastingRuleEnglish: 'After offering Arghya to the rising Sun, the 36-hour waterless fast is broken with raw cow milk, fresh ginger, and prasad.',
    ritualsHindi: [
      'भोर (सुबह ०४:०० बजे) घाट पर पुनः एकत्रित होना',
      'कमर तक जल में खड़े होकर भगवान भास्कर की प्रथम लालिमा की प्रतीक्षा',
      'उदित होते सूर्य देव को गाय के कच्चे दूध और गंगाजल से अंतिम अर्घ्य अर्पण',
      'छठी मैया से परिवार, गाँव व संपूर्ण जगत के कल्याण की प्रार्थना',
      'चरण स्पर्श, बुजुर्गों से आशीर्वाद एवं घर-घर ठेकुआ प्रसाद वितरण',
    ],
    ritualsEnglish: [
      'Early pre-dawn assembly at the ghat by 4:00 AM',
      'Waist-deep holy water meditation awaiting the first crimson rays of Lord Surya',
      'Offering the final Arghya with raw cow milk and sanctified water',
      'Prayers to Chhathi Maiya for village prosperity, offspring health, and universal peace',
      'Touching elders feet for blessings and distributing sacred Thekua prasad far and wide',
    ],
    descriptionHindi: 'उषा अर्घ्य के साथ ही लोक आस्था का यह चार दिवसीय पावन महापर्व श्रद्धा और उल्हास के साथ संपन्न होता है।',
    descriptionEnglish: 'With Usha Arghya, the monumental 4-day devotion culminates with boundless joy, gratitude, and communal harmony.',
  },
];

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    titleHindi: 'सूर्य सरोवर घाट पर सूर्योदय उषा अर्घ्य का अलौकिक दृश्य',
    titleEnglish: 'Divine Sunrise Usha Arghya on Village River Ghat',
    year: 2026,
    category: 'arghya',
    imageUrl: '/src/assets/images/hero_chhath_ghat_1794273567026.jpg',
    captionHindi: 'हजारों ग्रामवासियों की उपस्थिति में भगवान भास्कर को जल अर्पण',
    captionEnglish: 'Thousands of village devotees offering Arghya in misty morning sunlight',
  },
  {
    id: 'gal-2',
    titleHindi: 'संध्या अर्घ्य: सूप में ऋतु फल व जल में खड़ी व्रती माताएं',
    titleEnglish: 'Sandhya Arghya: Devotees Offering Decorated Bamboo Soop',
    year: 2026,
    category: 'arghya',
    imageUrl: '/src/assets/images/chhath_arghya_ritual_1794273566938.jpg',
    captionHindi: 'अस्त होते सूर्य देव की आराधना एवं दीपदान',
    captionEnglish: 'Offering evening prasad and glowing clay lamps to the setting sun',
  },
  {
    id: 'gal-3',
    titleHindi: 'भव्य प्रकाश व्यवस्था एवं फूलों से सुसज्जित घाट परिसर',
    titleEnglish: 'Magnificent Ghat Illumination & Floral Decoration',
    year: 2025,
    category: 'lighting',
    imageUrl: '/src/assets/images/chhath_ghat_lighting_1794273567839.jpg',
    captionHindi: 'रात्रि के समय जगमगाता हुआ गाँव का मुख्य छठ घाट',
    captionEnglish: 'Illuminated evening view of the village river steps with festive lanterns',
  },
];

// Service Layer
export const DataService = {
  // Get all donations
  getDonations(): Donation[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PREFIX + 'donations');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    localStorage.setItem(STORAGE_KEY_PREFIX + 'donations', JSON.stringify(INITIAL_DONATIONS));
    return INITIAL_DONATIONS;
  },

  // Save donations
  saveDonations(data: Donation[]): void {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'donations', JSON.stringify(data));
  },

  // Get all expenses
  getExpenses(): Expense[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PREFIX + 'expenses');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    localStorage.setItem(STORAGE_KEY_PREFIX + 'expenses', JSON.stringify(INITIAL_EXPENSES));
    return INITIAL_EXPENSES;
  },

  // Save expenses
  saveExpenses(data: Expense[]): void {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'expenses', JSON.stringify(data));
  },

  // Get announcements
  getAnnouncements(): Announcement[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PREFIX + 'announcements');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    localStorage.setItem(STORAGE_KEY_PREFIX + 'announcements', JSON.stringify(INITIAL_ANNOUNCEMENTS));
    return INITIAL_ANNOUNCEMENTS;
  },

  saveAnnouncements(data: Announcement[]): void {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'announcements', JSON.stringify(data));
  },

  // Get Committee Members
  getCommittee(): CommitteeMember[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PREFIX + 'committee');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    localStorage.setItem(STORAGE_KEY_PREFIX + 'committee', JSON.stringify(INITIAL_COMMITTEE));
    return INITIAL_COMMITTEE;
  },

  saveCommittee(data: CommitteeMember[]): void {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'committee', JSON.stringify(data));
  },

  // Get Gallery
  getGallery(): GalleryItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PREFIX + 'gallery');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    localStorage.setItem(STORAGE_KEY_PREFIX + 'gallery', JSON.stringify(INITIAL_GALLERY));
    return INITIAL_GALLERY;
  },

  saveGallery(data: GalleryItem[]): void {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'gallery', JSON.stringify(data));
  },

  // Get Schedule
  getSchedule(): PujaScheduleItem[] {
    return INITIAL_SCHEDULE;
  },

  // Calculate financial summary for a given year (or all years)
  getFinancialSummary(year?: number): FinancialSummary {
    const donations = this.getDonations();
    const expenses = this.getExpenses();

    const filteredDonations = year ? donations.filter((d) => d.year === year) : donations;
    const filteredExpenses = year ? expenses.filter((e) => e.year === year) : expenses;

    const totalDonations = filteredDonations.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const totalExpenses = filteredExpenses.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const remainingBalance = totalDonations - totalExpenses;
    const totalDonors = filteredDonations.length;
    const countExpenses = filteredExpenses.length;
    const avgDonation = totalDonors > 0 ? Math.round(totalDonations / totalDonors) : 0;

    return {
      totalDonations,
      totalExpenses,
      remainingBalance,
      totalDonors,
      countExpenses,
      avgDonation,
    };
  },

  // Category breakdown for expenses
  getExpenseCategoryBreakdown(year?: number): { category: string; amount: number; percentage: number }[] {
    const expenses = this.getExpenses();
    const filtered = year ? expenses.filter((e) => e.year === year) : expenses;
    const total = filtered.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

    const map: Record<string, number> = {};
    filtered.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + (Number(e.amount) || 0);
    });

    return Object.entries(map)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  },

  // Year comparison data
  getYearComparison(): { year: number; donations: number; expenses: number; balance: number }[] {
    return AVAILABLE_YEARS.map((y) => {
      const summary = this.getFinancialSummary(y);
      return {
        year: y,
        donations: summary.totalDonations,
        expenses: summary.totalExpenses,
        balance: summary.remainingBalance,
      };
    }).sort((a, b) => a.year - b.year);
  },

  // Export donations as CSV
  exportDonationsCSV(year?: number): string {
    const donations = this.getDonations().filter((d) => (!year ? true : d.year === year));
    const headers = ['Receipt No', 'Year', 'Donor Name', 'Village Ward', 'Amount (INR)', 'Date', 'Payment Method', 'Verified By', 'Remarks'];
    const rows = donations.map((d) => [
      `"${d.receiptNo}"`,
      d.year,
      `"${d.donorName}"`,
      `"${d.villageWard}"`,
      d.amount,
      d.date,
      `"${d.paymentMethod}"`,
      `"${d.verifiedBy}"`,
      `"${d.remarks || ''}"`,
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },

  // Export expenses as CSV
  exportExpensesCSV(year?: number): string {
    const expenses = this.getExpenses().filter((e) => (!year ? true : e.year === year));
    const headers = ['Voucher No', 'Year', 'Expense Title', 'Category', 'Amount (INR)', 'Date', 'Vendor Name', 'Paid By', 'Description'];
    const rows = expenses.map((e) => [
      `"${e.voucherNo}"`,
      e.year,
      `"${e.title}"`,
      `"${e.category}"`,
      e.amount,
      e.date,
      `"${e.vendorName}"`,
      `"${e.paidBy}"`,
      `"${e.description || ''}"`,
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },

  // Export announcements as CSV
  exportAnnouncementsCSV(): string {
    const items = this.getAnnouncements();
    const headers = ['ID', 'Title Hindi', 'Title English', 'Description Hindi', 'Date', 'Priority', 'Category', 'Is Pinned'];
    const rows = items.map((a) => [
      `"${a.id}"`,
      `"${a.titleHindi.replace(/"/g, '""')}"`,
      `"${(a.titleEnglish || '').replace(/"/g, '""')}"`,
      `"${(a.descriptionHindi || '').replace(/"/g, '""')}"`,
      a.date,
      a.priority,
      a.category,
      a.isPinned ? 'TRUE' : 'FALSE',
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },

  // Export committee as CSV
  exportCommitteeCSV(): string {
    const items = this.getCommittee();
    const headers = ['ID', 'Name Hindi', 'Role Hindi', 'Category', 'Ward', 'Phone', 'Tenure'];
    const rows = items.map((m) => [
      `"${m.id}"`,
      `"${m.nameHindi.replace(/"/g, '""')}"`,
      `"${m.roleHindi.replace(/"/g, '""')}"`,
      m.category,
      `"${m.ward.replace(/"/g, '""')}"`,
      `"${m.phone}"`,
      `"${m.tenure}"`,
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },

  // Helper to trigger direct browser download of CSV
  downloadCSV(content: string, filename: string): void {
    const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  // Import CSV text into local storage for any of the 4 modules
  importFromCSV(csvText: string, type: 'donations' | 'expenses' | 'announcements' | 'committee'): { success: boolean; count: number; error?: string } {
    try {
      const lines = csvText.trim().split(/\r?\n/).filter((line) => line.trim().length > 0);
      if (lines.length < 2) {
        return { success: false, count: 0, error: 'CSV फ़ाइल खाली है या उसमें कोई डेटा पंक्तियाँ नहीं हैं।' };
      }

      // Simple CSV line parser handling quotes
      const parseCSVLine = (text: string): string[] => {
        const result: string[] = [];
        let cur = '';
        let inQuotes = false;
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          if (char === '"') {
            if (inQuotes && text[i + 1] === '"') {
              cur += '"';
              i++;
            } else {
              inQuotes = !inQuotes;
            }
          } else if (char === ',' && !inQuotes) {
            result.push(cur.trim());
            cur = '';
          } else {
            cur += char;
          }
        }
        result.push(cur.trim());
        return result;
      };

      const dataLines = lines.slice(1);

      if (type === 'donations') {
        const newDonations: Donation[] = [];
        dataLines.forEach((line, idx) => {
          const cols = parseCSVLine(line);
          if (cols.length >= 4) {
            // ReceiptNo, Year, DonorName, VillageWard, Amount, Date, PaymentMethod, VerifiedBy, Remarks
            const receiptNo = cols[0] || `CP-26-${String(idx + 1).padStart(3, '0')}`;
            const year = Number(cols[1]) || 2026;
            const donorName = cols[2] || cols[0];
            const villageWard = cols[3] || 'ग्राम अधलालपुर';
            const amount = Number(cols[4]?.replace(/[^0-9.]/g, '')) || 501;
            const date = cols[5] || new Date().toISOString().split('T')[0];
            const paymentMethod = (cols[6] as any) || 'Cash';
            const verifiedBy = cols[7] || 'सुरेश प्रसाद (कोषाध्यक्ष)';
            const remarks = cols[8] || '';

            newDonations.push({
              id: 'don-' + Date.now() + '-' + idx,
              year,
              donorName,
              villageWard,
              amount,
              date,
              paymentMethod,
              receiptNo,
              remarks,
              verifiedBy,
              createdAt: new Date().toISOString(),
            });
          }
        });

        if (newDonations.length > 0) {
          const existing = this.getDonations();
          // Filter out existing by receiptNo or merge
          const existingMap = new Set(existing.map((e) => e.receiptNo));
          const toAdd = newDonations.filter((n) => !existingMap.has(n.receiptNo));
          this.saveDonations([...toAdd, ...existing]);
          return { success: true, count: newDonations.length };
        }
      } else if (type === 'expenses') {
        const newExpenses: Expense[] = [];
        dataLines.forEach((line, idx) => {
          const cols = parseCSVLine(line);
          if (cols.length >= 4) {
            // VoucherNo, Year, Title, Category, Amount, Date, VendorName, PaidBy, Description
            const voucherNo = cols[0] || `V-26-${String(idx + 1).padStart(2, '0')}`;
            const year = Number(cols[1]) || 2026;
            const title = cols[2] || 'विविध खर्च';
            const category = (cols[3] as any) || 'Other Expenses';
            const amount = Number(cols[4]?.replace(/[^0-9.]/g, '')) || 1000;
            const date = cols[5] || new Date().toISOString().split('T')[0];
            const vendorName = cols[6] || 'स्थानीय वेंडर';
            const paidBy = cols[7] || 'मनोज कुमार (सचिव)';
            const description = cols[8] || '';

            newExpenses.push({
              id: 'exp-' + Date.now() + '-' + idx,
              year,
              title,
              category,
              amount,
              date,
              vendorName,
              description,
              voucherNo,
              paidBy,
              createdAt: new Date().toISOString(),
            });
          }
        });

        if (newExpenses.length > 0) {
          const existing = this.getExpenses();
          const existingMap = new Set(existing.map((e) => e.voucherNo));
          const toAdd = newExpenses.filter((n) => !existingMap.has(n.voucherNo));
          this.saveExpenses([...toAdd, ...existing]);
          return { success: true, count: newExpenses.length };
        }
      } else if (type === 'announcements') {
        const newAnn: Announcement[] = [];
        dataLines.forEach((line, idx) => {
          const cols = parseCSVLine(line);
          if (cols.length >= 3) {
            // ID, Title Hindi, Title English, Description Hindi, Date, Priority, Category, Is Pinned
            const titleHindi = cols[1] || cols[0];
            const titleEnglish = cols[2] || titleHindi;
            const descriptionHindi = cols[3] || titleHindi;
            const date = cols[4] || new Date().toISOString().split('T')[0];
            const priority = (cols[5] as any) || 'important';
            const category = (cols[6] as any) || 'ghat';
            const isPinned = cols[7]?.toUpperCase() === 'TRUE';

            newAnn.push({
              id: 'ann-' + Date.now() + '-' + idx,
              titleHindi,
              titleEnglish,
              descriptionHindi,
              descriptionEnglish: titleEnglish,
              date,
              priority,
              category,
              isPinned,
            });
          }
        });

        if (newAnn.length > 0) {
          this.saveAnnouncements(newAnn);
          return { success: true, count: newAnn.length };
        }
      } else if (type === 'committee') {
        const newCom: CommitteeMember[] = [];
        dataLines.forEach((line, idx) => {
          const cols = parseCSVLine(line);
          if (cols.length >= 2) {
            // ID, Name Hindi, Role Hindi, Category, Ward, Phone, Tenure
            const nameHindi = cols[1] || cols[0];
            const roleHindi = cols[2] || 'सदस्य';
            const category = (cols[3] as any) || 'volunteer';
            const ward = cols[4] || 'ग्राम अधलालपुर';
            const phone = cols[5] || '+91 90000 00000';
            const tenure = cols[6] || '२०२६ - २०२८';

            newCom.push({
              id: 'mem-' + Date.now() + '-' + idx,
              nameHindi,
              nameEnglish: nameHindi,
              roleHindi,
              roleEnglish: roleHindi,
              category,
              ward,
              phone,
              tenure,
            });
          }
        });

        if (newCom.length > 0) {
          this.saveCommittee(newCom);
          return { success: true, count: newCom.length };
        }
      }

      return { success: false, count: 0, error: 'डेटा प्रारूप पहचाना नहीं जा सका।' };
    } catch (err: any) {
      return { success: false, count: 0, error: err.message || 'त्रुटि हुई' };
    }
  },

  // Pull latest updates from Google Sheets Web App URL
  async fetchFromGoogleSheet(url: string): Promise<{
    success: boolean;
    donationsCount: number;
    expensesCount: number;
    announcementsCount: number;
    committeeCount: number;
    timestamp: string;
    error?: string;
  }> {
    try {
      const cleanUrl = url.trim();
      if (!cleanUrl) {
        return {
          success: false,
          donationsCount: 0,
          expensesCount: 0,
          announcementsCount: 0,
          committeeCount: 0,
          timestamp: new Date().toISOString(),
          error: 'कृपया गूगल वेब ऐप URL दर्ज करें',
        };
      }

      // Check if user pasted a regular spreadsheet edit URL
      if (cleanUrl.includes('docs.google.com/spreadsheets')) {
        return {
          success: false,
          donationsCount: 0,
          expensesCount: 0,
          announcementsCount: 0,
          committeeCount: 0,
          timestamp: new Date().toISOString(),
          error: 'आपने गूगल स्प्रेडशीट का सामान्य लिंक (docs.google.com) डाला है। सिंक करने के लिए Google Apps Script का Web App URL (script.google.com/macros/s/.../exec) चाहिए होता है। कृपया नीचे दिए गए 3-चरणों से Apps Script लिंक प्राप्त करें या सीधे नीचे दिए गए "कॉपी-पेस्ट" विकल्प का उपयोग करें।',
        };
      }

      if (cleanUrl.includes('/dev')) {
        return {
          success: false,
          donationsCount: 0,
          expensesCount: 0,
          announcementsCount: 0,
          committeeCount: 0,
          timestamp: new Date().toISOString(),
          error: 'आपने टेस्ट लिंक (/dev) डाला है। कृपया Apps Script में Deploy > Manage deployments से मुख्य लिंक (/exec) कॉपी करके डालें।',
        };
      }

      const fetchUrl = cleanUrl.includes('?')
        ? `${cleanUrl}&action=readAll&_t=${Date.now()}`
        : `${cleanUrl}?action=readAll&_t=${Date.now()}`;

      const res = await fetch(fetchUrl);
      if (!res.ok) {
        throw new Error(`Google Sheets HTTP Error: ${res.status}`);
      }

      const json = await res.json();
      if (!json || typeof json !== 'object') {
        throw new Error('अमान्य JSON डेटा प्राप्त हुआ');
      }

      let donCount = 0;
      let expCount = 0;
      let annCount = 0;
      let comCount = 0;

      // 1. Update Donations
      if (Array.isArray(json.donations) && json.donations.length > 0) {
        this.saveDonations(json.donations);
        donCount = json.donations.length;
      }

      // 2. Update Expenses
      if (Array.isArray(json.expenses) && json.expenses.length > 0) {
        this.saveExpenses(json.expenses);
        expCount = json.expenses.length;
      }

      // 3. Update Announcements
      if (Array.isArray(json.announcements) && json.announcements.length > 0) {
        this.saveAnnouncements(json.announcements);
        annCount = json.announcements.length;
      }

      // 4. Update Committee
      if (Array.isArray(json.committee) && json.committee.length > 0) {
        this.saveCommittee(json.committee);
        comCount = json.committee.length;
      }

      const timestamp = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY_PREFIX + 'last_synced', timestamp);

      return {
        success: true,
        donationsCount: donCount,
        expensesCount: expCount,
        announcementsCount: annCount,
        committeeCount: comCount,
        timestamp,
      };
    } catch (err: any) {
      let friendlyError = err.message || 'गूगल शीट्स से कनेक्ट नहीं हो सका';
      if (err.name === 'TypeError' || err.message?.includes('fetch') || err.message?.includes('NetworkError')) {
        friendlyError = 'गूगल ने कनेक्शन ब्लॉक किया (Google CORS Block)। समाधान: अपनी Google Sheet में Extensions > Apps Script > Deploy > Manage deployments में पेंसिल (Edit) पर क्लिक करें, "Who has access" को "Anyone" (कोई भी) पर सेट करें और फिर से Deploy दबाएं। (वैकल्पिक: नीचे दिए गए "कॉपी-पेस्ट" विकल्प से बिना किसी रुकावट के तुरंत डेटा अपडेट करें)';
      }
      return {
        success: false,
        donationsCount: 0,
        expensesCount: 0,
        announcementsCount: 0,
        committeeCount: 0,
        timestamp: new Date().toISOString(),
        error: friendlyError,
      };
    }
  },

  // Push local records into Google Sheets Web App
  async pushToGoogleSheet(url: string): Promise<{ success: boolean; error?: string }> {
    try {
      const cleanUrl = url.trim();
      if (!cleanUrl) {
        return { success: false, error: 'कृपया गूगल वेब ऐप URL दर्ज करें' };
      }

      if (cleanUrl.includes('docs.google.com/spreadsheets')) {
        return {
          success: false,
          error: 'आपने गूगल स्प्रेडशीट का मुख्य लिंक (docs.google.com) डाला है। डेटा भेजने के लिए Google Apps Script Web App URL (script.google.com/macros/s/.../exec) आवश्यक है।',
        };
      }

      if (cleanUrl.includes('/dev')) {
        return {
          success: false,
          error: 'आपने टेस्ट लिंक (/dev) डाला है। कृपया Apps Script में Deploy > Manage deployments से मुख्य लिंक (/exec) कॉपी करके डालें।',
        };
      }

      const payload = {
        action: 'syncAll',
        donations: this.getDonations(),
        expenses: this.getExpenses(),
        announcements: this.getAnnouncements(),
        committee: this.getCommittee(),
      };

      await fetch(cleanUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      const timestamp = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY_PREFIX + 'last_synced', timestamp);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'डेटा भेजने में असमर्थ' };
    }
  },

  // Get Last Synced Time
  getLastSyncedTime(): string | null {
    return localStorage.getItem(STORAGE_KEY_PREFIX + 'last_synced');
  },

  // Reset to default
  resetAll(): void {
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'donations');
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'expenses');
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'announcements');
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'committee');
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'gallery');
    localStorage.removeItem(STORAGE_KEY_PREFIX + 'last_synced');
  },

  // Auto Seed & Sync: Seeds Google Sheet if empty, otherwise replaces local data with Google Sheet rows
  async autoSeedAndSync(url: string): Promise<{
    success: boolean;
    seeded: boolean;
    donationsCount: number;
    expensesCount: number;
    announcementsCount: number;
    committeeCount: number;
    timestamp: string;
    message: string;
  }> {
    try {
      const cleanUrl = url.trim();
      const pullResult = await this.fetchFromGoogleSheet(cleanUrl);

      if (!pullResult.success) {
        return {
          success: false,
          seeded: false,
          donationsCount: 0,
          expensesCount: 0,
          announcementsCount: 0,
          committeeCount: 0,
          timestamp: new Date().toISOString(),
          message: pullResult.error || 'गूगल शीट्स से संपर्क नहीं हो सका',
        };
      }

      // If the sheet has 0 records, automatically seed it with existing village records
      if (pullResult.donationsCount === 0 && pullResult.expensesCount === 0) {
        await this.pushToGoogleSheet(cleanUrl);
        const don = this.getDonations();
        const exp = this.getExpenses();
        const ann = this.getAnnouncements();
        const com = this.getCommittee();
        const timestamp = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY_PREFIX + 'last_synced', timestamp);
        localStorage.setItem('chhath_sheets_url', cleanUrl);

        return {
          success: true,
          seeded: true,
          donationsCount: don.length,
          expensesCount: exp.length,
          announcementsCount: ann.length,
          committeeCount: com.length,
          timestamp,
          message: `✓ नई गूगल शीट में प्रारंभिक डेटा सफलतापूर्वक सीड (Seed) हो गया! (${don.length} चंदा, ${exp.length} खर्च, ${ann.length} सूचनाएँ, ${com.length} सदस्य)`,
        };
      }

      // If sheet already has data, local data is replaced by authoritative Google Sheet records
      localStorage.setItem('chhath_sheets_url', cleanUrl);
      return {
        success: true,
        seeded: false,
        donationsCount: pullResult.donationsCount,
        expensesCount: pullResult.expensesCount,
        announcementsCount: pullResult.announcementsCount,
        committeeCount: pullResult.committeeCount,
        timestamp: pullResult.timestamp,
        message: `✓ गूगल शीट से संपूर्ण डेटा लोड हुआ और लोकल डेटा रिप्लेस हो गया! (${pullResult.donationsCount} चंदा, ${pullResult.expensesCount} खर्च, ${pullResult.announcementsCount} सूचनाएँ, ${pullResult.committeeCount} सदस्य)`,
      };
    } catch (err: any) {
      return {
        success: false,
        seeded: false,
        donationsCount: 0,
        expensesCount: 0,
        announcementsCount: 0,
        committeeCount: 0,
        timestamp: new Date().toISOString(),
        message: err.message || 'त्रुटि हुई',
      };
    }
  },

  // Google Sheets Apps Script Code Template managing all 4 modules (दान, खर्च, सूचनाएँ, समिति)
  getGoogleAppsScriptCode(): string {
    return `/**
 * ====================================================================
 * छठ पूजा समिति अधलालपुर - GOOGLE SPREADSHEET 2-WAY SYNC APPS SCRIPT
 * ====================================================================
 * यह स्क्रिप्ट 4 प्रमुख शीट्स को स्वतः तैयार व सिंक करती है:
 * 1. Donations (चंदा / दान)
 * 2. Expenses (खर्च)
 * 3. Announcements (सूचनाएँ)
 * 4. Committee (छठ कमिटी सदस्य)
 *
 * सेटअप के ४ सरल कदम:
 * 1. नई गूगल स्प्रेडशीट खोलें (https://sheets.new)
 * 2. ऊपर Extensions > Apps Script पर क्लिक करें
 * 3. सारा कोड मिटाकर यह कोड पेस्ट करें और Save (डिस्क आइकन) दबाएं
 * 4. ऊपर दाईं ओर Deploy > New deployment पर क्लिक करें
 *    - Type: 'Web app'
 *    - Execute as: 'Me' (अपनी ईमेल आईडी)
 *    - Who has access: 'Anyone' (कोई भी)
 *    - मिले हुए Web App URL को कॉपी कर समिति पोर्टल के एडमिन पैनल में पेस्ट करें!
 */

function setupSpreadsheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Sheet 1: Donations (चंदा विवरण)
  var donSheet = ss.getSheetByName("Donations") || ss.insertSheet("Donations");
  if (donSheet.getLastRow() === 0) {
    donSheet.appendRow(["ID", "Year", "Donor Name", "Village Ward", "Amount", "Date", "Payment Method", "Receipt No", "Remarks", "Phone", "Verified By", "Created At"]);
    donSheet.getRange(1, 1, 1, 12).setFontWeight("bold").setBackground("#EA580C").setFontColor("#FFFFFF");
    donSheet.setFrozenRows(1);
  }

  // Sheet 2: Expenses (खर्च विवरण)
  var expSheet = ss.getSheetByName("Expenses") || ss.insertSheet("Expenses");
  if (expSheet.getLastRow() === 0) {
    expSheet.appendRow(["ID", "Year", "Title", "Category", "Amount", "Date", "Vendor Name", "Description", "Voucher No", "Paid By", "Created At"]);
    expSheet.getRange(1, 1, 1, 11).setFontWeight("bold").setBackground("#D97706").setFontColor("#FFFFFF");
    expSheet.setFrozenRows(1);
  }

  // Sheet 3: Announcements (सूचनाएँ)
  var annSheet = ss.getSheetByName("Announcements") || ss.insertSheet("Announcements");
  if (annSheet.getLastRow() === 0) {
    annSheet.appendRow(["ID", "Title Hindi", "Title English", "Description Hindi", "Date", "Priority", "Category", "Is Pinned"]);
    annSheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#78350F").setFontColor("#FFFFFF");
    annSheet.setFrozenRows(1);
  }

  // Sheet 4: Committee (छठ कमिटी)
  var comSheet = ss.getSheetByName("Committee") || ss.insertSheet("Committee");
  if (comSheet.getLastRow() === 0) {
    comSheet.appendRow(["ID", "Name Hindi", "Role Hindi", "Category", "Ward", "Phone", "Tenure"]);
    comSheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#B45309").setFontColor("#FFFFFF");
    comSheet.setFrozenRows(1);
  }
}

function doGet(e) {
  setupSpreadsheet();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var action = (e && e.parameter && e.parameter.action) || 'readAll';

  if (action === 'ping') {
    return ContentService.createTextOutput(JSON.stringify({ status: 'ok', time: new Date().toISOString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // 1. Read Donations
  var donSheet = ss.getSheetByName("Donations");
  var donations = [];
  if (donSheet && donSheet.getLastRow() > 1) {
    var dData = donSheet.getDataRange().getValues();
    for (var i = 1; i < dData.length; i++) {
      if (dData[i][2]) { // If donor name is present
        donations.push({
          id: String(dData[i][0] || 'don-' + i),
          year: Number(dData[i][1]) || 2026,
          donorName: String(dData[i][2]),
          villageWard: String(dData[i][3] || ''),
          amount: Number(dData[i][4]) || 0,
          date: String(dData[i][5] || ''),
          paymentMethod: String(dData[i][6] || 'Cash'),
          receiptNo: String(dData[i][7] || 'CP-' + i),
          remarks: String(dData[i][8] || ''),
          phone: String(dData[i][9] || ''),
          verifiedBy: String(dData[i][10] || 'सुरेश प्रसाद (कोषाध्यक्ष)'),
          createdAt: String(dData[i][11] || new Date().toISOString())
        });
      }
    }
  }

  // 2. Read Expenses
  var expSheet = ss.getSheetByName("Expenses");
  var expenses = [];
  if (expSheet && expSheet.getLastRow() > 1) {
    var xData = expSheet.getDataRange().getValues();
    for (var j = 1; j < xData.length; j++) {
      if (xData[j][2]) { // If title is present
        expenses.push({
          id: String(xData[j][0] || 'exp-' + j),
          year: Number(xData[j][1]) || 2026,
          title: String(xData[j][2]),
          category: String(xData[j][3] || 'Other Expenses'),
          amount: Number(xData[j][4]) || 0,
          date: String(xData[j][5] || ''),
          vendorName: String(xData[j][6] || 'स्थानीय वेंडर'),
          description: String(xData[j][7] || ''),
          voucherNo: String(xData[j][8] || 'V-' + j),
          paidBy: String(xData[j][9] || 'मनोज कुमार (सचिव)'),
          createdAt: String(xData[j][10] || new Date().toISOString())
        });
      }
    }
  }

  // 3. Read Announcements
  var annSheet = ss.getSheetByName("Announcements");
  var announcements = [];
  if (annSheet && annSheet.getLastRow() > 1) {
    var aData = annSheet.getDataRange().getValues();
    for (var k = 1; k < aData.length; k++) {
      if (aData[k][1]) {
        announcements.push({
          id: String(aData[k][0] || 'ann-' + k),
          titleHindi: String(aData[k][1]),
          titleEnglish: String(aData[k][2] || aData[k][1]),
          descriptionHindi: String(aData[k][3] || ''),
          descriptionEnglish: String(aData[k][2] || aData[k][1]),
          date: String(aData[k][4] || ''),
          priority: String(aData[k][5] || 'important'),
          category: String(aData[k][6] || 'ghat'),
          isPinned: String(aData[k][7]).toUpperCase() === 'TRUE'
        });
      }
    }
  }

  // 4. Read Committee
  var comSheet = ss.getSheetByName("Committee");
  var committee = [];
  if (comSheet && comSheet.getLastRow() > 1) {
    var cData = comSheet.getDataRange().getValues();
    for (var m = 1; m < cData.length; m++) {
      if (cData[m][1]) {
        committee.push({
          id: String(cData[m][0] || 'mem-' + m),
          nameHindi: String(cData[m][1]),
          nameEnglish: String(cData[m][1]),
          roleHindi: String(cData[m][2] || 'सदस्य'),
          roleEnglish: String(cData[m][2] || 'Member'),
          category: String(cData[m][3] || 'volunteer'),
          ward: String(cData[m][4] || 'ग्राम अधलालपुर'),
          phone: String(cData[m][5] || ''),
          tenure: String(cData[m][6] || '२०२६ - २०२८')
        });
      }
    }
  }

  var response = {
    success: true,
    donations: donations,
    expenses: expenses,
    announcements: announcements,
    committee: committee,
    lastUpdated: new Date().toISOString()
  };

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    setupSpreadsheet();
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var contents = JSON.parse(e.postData.contents);
    var action = contents.action;

    if (action === 'syncAll' || action === 'seedInitial') {
      var donSheet = ss.getSheetByName("Donations");
      var expSheet = ss.getSheetByName("Expenses");
      var annSheet = ss.getSheetByName("Announcements");
      var comSheet = ss.getSheetByName("Committee");

      // 1. Sync Donations
      if (contents.donations && Array.isArray(contents.donations)) {
        if (donSheet.getLastRow() > 1) {
          donSheet.getRange(2, 1, donSheet.getLastRow() - 1, 12).clearContent();
        }
        var donRows = contents.donations.map(function(d) {
          return [d.id, d.year, d.donorName, d.villageWard, d.amount, d.date, d.paymentMethod, d.receiptNo, d.remarks || '', d.phone || '', d.verifiedBy || '', d.createdAt || ''];
        });
        if (donRows.length > 0) {
          donSheet.getRange(2, 1, donRows.length, 12).setValues(donRows);
        }
      }

      // 2. Sync Expenses
      if (contents.expenses && Array.isArray(contents.expenses)) {
        if (expSheet.getLastRow() > 1) {
          expSheet.getRange(2, 1, expSheet.getLastRow() - 1, 11).clearContent();
        }
        var expRows = contents.expenses.map(function(ex) {
          return [ex.id, ex.year, ex.title, ex.category, ex.amount, ex.date, ex.vendorName, ex.description || '', ex.voucherNo, ex.paidBy, ex.createdAt || ''];
        });
        if (expRows.length > 0) {
          expSheet.getRange(2, 1, expRows.length, 11).setValues(expRows);
        }
      }

      // 3. Sync Announcements
      if (contents.announcements && Array.isArray(contents.announcements)) {
        if (annSheet.getLastRow() > 1) {
          annSheet.getRange(2, 1, annSheet.getLastRow() - 1, 8).clearContent();
        }
        var annRows = contents.announcements.map(function(a) {
          return [a.id, a.titleHindi, a.titleEnglish || a.titleHindi, a.descriptionHindi || '', a.date, a.priority, a.category, a.isPinned ? 'TRUE' : 'FALSE'];
        });
        if (annRows.length > 0) {
          annSheet.getRange(2, 1, annRows.length, 8).setValues(annRows);
        }
      }

      // 4. Sync Committee
      if (contents.committee && Array.isArray(contents.committee)) {
        if (comSheet.getLastRow() > 1) {
          comSheet.getRange(2, 1, comSheet.getLastRow() - 1, 7).clearContent();
        }
        var comRows = contents.committee.map(function(m) {
          return [m.id, m.nameHindi, m.roleHindi, m.category, m.ward, m.phone, m.tenure];
        });
        if (comRows.length > 0) {
          comSheet.getRange(2, 1, comRows.length, 7).setValues(comRows);
        }
      }

      return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Google Sheets sync completed successfully!' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Unknown action' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
`;
  },
};
