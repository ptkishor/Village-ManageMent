/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../types';

export const t = {
  // Navigation
  siteTitle: {
    hi: 'छठ पूजा समिति अधलालपुर',
    en: 'Chhath Puja Samiti Adhalalpur',
  },
  siteSubtitle: {
    hi: 'आस्था, शुचिता एवं लोकसंस्कृति का महापर्व • अधलालपुर',
    en: 'Chhath Puja Samiti Adhalalpur • Holy Festival of Sun God & Chhathi Maiya',
  },
  nav: {
    home: { hi: 'मुख्य पृष्ठ', en: 'Home' },
    about: { hi: 'छठ महापर्व', en: 'About Chhath' },
    schedule: { hi: 'पूजा अनुष्ठान', en: 'Puja Schedule' },
    donations: { hi: 'दान विवरण', en: 'Donations' },
    expenses: { hi: 'खर्च विवरण', en: 'Expenses' },
    financials: { hi: 'वित्तीय लेखा-जोखा', en: 'Financials' },
    announcements: { hi: 'सूचनाएँ', en: 'Announcements' },
    gallery: { hi: 'चित्र वीथिका', en: 'Gallery' },
    ghat: { hi: 'घाट व्यवस्था', en: 'Ghat Location' },
    committee: { hi: 'समिति सदस्य', en: 'Committee' },
    contact: { hi: 'संपर्क करें', en: 'Contact Us' },
    admin: { hi: 'प्रबंधक कक्ष', en: 'Admin Panel' },
  },
  // Year selector
  yearSelector: {
    label: { hi: 'वित्तीय वर्ष:', en: 'Fiscal Year:' },
    allYears: { hi: 'सभी वर्ष', en: 'All Years' },
  },
  // Hero section
  hero: {
    welcomeBadge: {
      hi: '॥ जय छठी मैया • ॐ सूर्याय नमः ॥',
      en: '|| Jai Chhathi Maiya • Om Suryaya Namah ||',
    },
    title: {
      hi: 'गाँव का पावन छठ घाट एवं उत्सव प्रबंधन',
      en: 'Village Sacred Chhath Ghat & Festival Management',
    },
    subtitle: {
      hi: 'संपूर्ण पारदर्शिता, सामाजिक सौहार्द और पवित्र निष्ठा के साथ गाँव के ऐतिहासिक सूर्य सरोवर तट पर आयोजित महापर्व का आधिकारिक पोर्टल।',
      en: 'Official community portal with 100% financial transparency, live accounts, and ritual schedules on the village holy river ghat.',
    },
    viewDonations: { hi: 'दानदाता सूची देखें', en: 'View Donors List' },
    viewGallery: { hi: 'फोटो वीथिका', en: 'View Gallery' },
    viewSchedule: { hi: 'चार दिवसीय अनुष्ठान', en: 'Puja Schedule' },
    countdownLabel: { hi: 'छठ महापर्व २०२६ (संध्या अर्घ्य) शेष समय:', en: 'Chhath Mahaparv 2026 (Sandhya Arghya) Countdown:' },
    days: { hi: 'दिन', en: 'Days' },
    hours: { hi: 'घंटे', en: 'Hours' },
    minutes: { hi: 'मिनट', en: 'Mins' },
    seconds: { hi: 'सेकंड', en: 'Secs' },
  },
  // Financial Summary Cards
  financeCards: {
    totalDonations: { hi: 'कुल प्राप्त सहयोग (दान)', en: 'Total Donations' },
    totalExpenses: { hi: 'कुल आयोजकीय खर्च', en: 'Total Expenses' },
    balance: { hi: 'समिति कोष अवशेष (बचत)', en: 'Remaining Balance' },
    totalDonors: { hi: 'कुल सम्मानित दानदाता', en: 'Total Donors' },
    surplus: { hi: 'सुरक्षित कोष में बचत', en: 'Surplus In Vault' },
    deficit: { hi: 'घाटा (अग्रिम राशि)', en: 'Deficit' },
    audited: { hi: 'गाँव की खुली सभा द्वारा सत्यापित', en: 'Verified in Village Sabha' },
  },
  // Actions & Buttons
  common: {
    search: { hi: 'खोजें (नाम, रसीद, वार्ड)...', en: 'Search (Name, Receipt, Ward)...' },
    filterCategory: { hi: 'श्रेणी चुनें', en: 'Select Category' },
    all: { hi: 'सभी', en: 'All' },
    exportCsv: { hi: 'CSV डाउनलोड करें', en: 'Download CSV' },
    print: { hi: 'प्रिंट / PDF रसीद', en: 'Print / PDF' },
    viewReceipt: { hi: 'रसीद देखें', en: 'View Receipt' },
    viewBill: { hi: 'बिल देखें', en: 'View Bill' },
    noData: { hi: 'इस वर्ष के लिए कोई रिकॉर्ड उपलब्ध नहीं है।', en: 'No records found for this year.' },
    close: { hi: 'बंद करें', en: 'Close' },
    save: { hi: 'सुरक्षित करें', en: 'Save' },
    cancel: { hi: 'रद्द करें', en: 'Cancel' },
    delete: { hi: 'हटाएँ', en: 'Delete' },
    edit: { hi: 'संशोधन करें', en: 'Edit' },
    add: { hi: 'नया जोड़ें', en: 'Add New' },
    currency: { hi: '₹', en: '₹' },
  },
  // Donation table headers
  donationTable: {
    receiptNo: { hi: 'रसीद सं.', en: 'Receipt No.' },
    donorName: { hi: 'दानदाता का नाम', en: 'Donor Name' },
    ward: { hi: 'गाँव / वार्ड', en: 'Village / Ward' },
    amount: { hi: 'सहयोग राशि', en: 'Amount' },
    date: { hi: 'तिथि', en: 'Date' },
    method: { hi: 'भुगतान माध्यम', en: 'Payment Method' },
    verifiedBy: { hi: 'सत्यापनकर्ता', en: 'Verified By' },
    actions: { hi: 'विवरण', en: 'Details' },
  },
  // Expense table headers
  expenseTable: {
    voucherNo: { hi: 'वाउचर सं.', en: 'Voucher No.' },
    title: { hi: 'खर्च का शीर्षक', en: 'Expense Title' },
    category: { hi: 'मद (श्रेणी)', en: 'Category' },
    amount: { hi: 'व्यय राशि', en: 'Amount' },
    date: { hi: 'भुगतान तिथि', en: 'Date' },
    vendor: { hi: 'दुकानदार / वेंडर', en: 'Vendor Name' },
    paidBy: { hi: 'भुगतानकर्ता', en: 'Paid By' },
    receipt: { hi: 'बिल/रसीद', en: 'Bill / Voucher' },
  },
  // Expense Categories translated
  categories: {
    Lighting: { hi: 'लाइटिंग व प्रकाश व्यवस्था', en: 'Lighting' },
    Decoration: { hi: 'सजावट एवं तोरण द्वार', en: 'Decoration' },
    Tent: { hi: 'टेंट, शामियाना व दरी', en: 'Tent & Canopy' },
    'Sound System': { hi: 'साउंड सिस्टम व लाउडस्पीकर', en: 'Sound System' },
    DJ: { hi: 'डीजे व भक्ति संगीत मंच', en: 'DJ & Bhakti Stage' },
    Flowers: { hi: 'गेंदा फूल व माला सजावट', en: 'Flowers & Garlands' },
    Prasad: { hi: 'सामूहिक प्रसाद एवं खीर वितरण', en: 'Prasad Distribution' },
    'Puja Materials': { hi: 'हवन, पूजन सामग्री, सिंदूर, कपूर', en: 'Puja Materials' },
    Cleaning: { hi: 'घाट की सफाई, चूना व ब्लीचिंग छिड़काव', en: 'Ghat Sanitation & Bleaching' },
    Transportation: { hi: 'सामग्री ढुलाई व जनरेटर ईंधन', en: 'Transportation & Fuel' },
    'Other Expenses': { hi: 'विविध एवं आकस्मिक व्यय', en: 'Other Expenses' },
  },
};

export function formatINR(val: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val || 0);
}
