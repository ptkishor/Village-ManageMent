/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'hi' | 'en';

export type PageId =
  | 'home'
  | 'about'
  | 'committee'
  | 'donations'
  | 'expenses'
  | 'financials'
  | 'announcements'
  | 'gallery'
  | 'schedule'
  | 'ghat'
  | 'contact'
  | 'admin';

export type PaymentMethod = 'Cash' | 'UPI' | 'Bank Transfer' | 'Cheque';

export type ExpenseCategory =
  | 'Lighting'
  | 'Decoration'
  | 'Tent'
  | 'Sound System'
  | 'DJ'
  | 'Flowers'
  | 'Prasad'
  | 'Puja Materials'
  | 'Cleaning'
  | 'Transportation'
  | 'Other Expenses';

export interface Donation {
  id: string;
  year: number;
  donorName: string;
  villageWard: string;
  amount: number;
  date: string;
  paymentMethod: PaymentMethod;
  receiptNo: string;
  remarks?: string;
  phone?: string;
  verifiedBy: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  year: number;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  vendorName: string;
  description: string;
  billReceiptUrl?: string;
  voucherNo: string;
  paidBy: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  titleHindi: string;
  titleEnglish: string;
  descriptionHindi: string;
  descriptionEnglish: string;
  date: string;
  priority: 'urgent' | 'important' | 'general';
  category: 'meeting' | 'ghat' | 'cultural' | 'security' | 'prasad';
  isPinned: boolean;
}

export interface CommitteeMember {
  id: string;
  nameHindi: string;
  nameEnglish: string;
  roleHindi: string;
  roleEnglish: string;
  category: 'patron' | 'core' | 'finance' | 'ghat_mgmt' | 'volunteer' | 'youth';
  ward: string;
  phone: string;
  photoUrl?: string;
  tenure: string;
}

export interface GalleryItem {
  id: string;
  titleHindi: string;
  titleEnglish: string;
  year: number;
  category: 'arghya' | 'ghat' | 'lighting' | 'cultural' | 'prasad';
  imageUrl: string;
  captionHindi?: string;
  captionEnglish?: string;
}

export interface PujaScheduleItem {
  id: string;
  dayNumber: 1 | 2 | 3 | 4;
  nameHindi: string;
  nameEnglish: string;
  tithi: string;
  date: string;
  sunriseTime: string;
  sunsetTime: string;
  fastingRuleHindi: string;
  fastingRuleEnglish: string;
  ritualsHindi: string[];
  ritualsEnglish: string[];
  descriptionHindi: string;
  descriptionEnglish: string;
}

export interface FinancialSummary {
  totalDonations: number;
  totalExpenses: number;
  remainingBalance: number;
  totalDonors: number;
  countExpenses: number;
  avgDonation: number;
}
