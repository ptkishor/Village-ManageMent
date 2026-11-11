/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  CheckCircle,
  Copy,
  Download,
  Eye,
  FileSpreadsheet,
  Image as ImageIcon,
  KeyRound,
  Lock,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Shield,
  Trash2,
  Upload,
  Users,
  Wallet,
} from 'lucide-react';
import {
  Announcement,
  CommitteeMember,
  Donation,
  Expense,
  ExpenseCategory,
  GalleryItem,
  Language,
  PaymentMethod,
} from '../types';
import { AVAILABLE_YEARS, DataService } from '../services/dataService';
import { formatINR, t } from '../utils/translations';

interface AdminPageProps {
  lang: Language;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  donations: Donation[];
  expenses: Expense[];
  announcements: Announcement[];
  committee: CommitteeMember[];
  galleryItems: GalleryItem[];
  onDataChange: () => void;
}

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Lighting',
  'Decoration',
  'Tent',
  'Sound System',
  'DJ',
  'Flowers',
  'Prasad',
  'Puja Materials',
  'Cleaning',
  'Transportation',
  'Other Expenses',
];

export const AdminPage: React.FC<AdminPageProps> = ({
  lang,
  isLoggedIn,
  onLogin,
  onLogout,
  donations,
  expenses,
  announcements,
  committee,
  galleryItems,
  onDataChange,
}) => {
  // Login state
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'donations' | 'expenses' | 'announcements' | 'committee' | 'gallery' | 'sheets' | 'backup'
  >('donations');

  // Year filter within admin
  const [adminYear, setAdminYear] = useState<number>(2026);

  // Modal / Form states for Donation
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [donationForm, setDonationForm] = useState({
    donorName: '',
    villageWard: '',
    amount: '',
    paymentMethod: 'Cash' as PaymentMethod,
    receiptNo: `CP-${String(new Date().getFullYear()).slice(2)}-${String(donations.length + 1).padStart(3, '0')}`,
    remarks: '',
    verifiedBy: 'सुरेश प्रसाद (कोषाध्यक्ष)',
    year: 2026,
    date: new Date().toISOString().split('T')[0],
  });

  // Modal / Form states for Expense
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    title: '',
    category: 'Lighting' as ExpenseCategory,
    amount: '',
    vendorName: '',
    description: '',
    voucherNo: `V-${String(new Date().getFullYear()).slice(2)}-${String(expenses.length + 1).padStart(2, '0')}`,
    paidBy: 'मनोज कुमार (सचिव)',
    year: 2026,
    date: new Date().toISOString().split('T')[0],
  });

  // Form states for Announcement
  const [showAnnForm, setShowAnnForm] = useState(false);
  const [annForm, setAnnForm] = useState({
    titleHindi: '',
    titleEnglish: '',
    descriptionHindi: '',
    descriptionEnglish: '',
    priority: 'important' as 'urgent' | 'important' | 'general',
    category: 'ghat' as 'meeting' | 'ghat' | 'cultural' | 'security' | 'prasad',
    isPinned: false,
    date: new Date().toISOString().split('T')[0],
  });

  // Form states for Committee Member
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [memberForm, setMemberForm] = useState({
    nameHindi: '',
    nameEnglish: '',
    roleHindi: '',
    roleEnglish: '',
    category: 'volunteer' as CommitteeMember['category'],
    ward: '',
    phone: '',
    tenure: '२०२६ - २०२८',
  });

  // Form states for Gallery Upload
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    titleHindi: '',
    titleEnglish: '',
    year: 2026,
    category: 'arghya' as GalleryItem['category'],
    imageUrl: '',
    captionHindi: '',
    captionEnglish: '',
  });

  // Google Sheets integration state
  const [sheetsUrl, setSheetsUrl] = useState(() => localStorage.getItem('chhath_sheets_url') || '');
  const [syncStatus, setSyncStatus] = useState<string>('');
  const [isPulling, setIsPulling] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(() => DataService.getLastSyncedTime());

  // Direct CSV Spreadsheet Import / Update Tool
  const [csvModule, setCsvModule] = useState<'donations' | 'expenses' | 'announcements' | 'committee'>('donations');
  const [csvInputText, setCsvInputText] = useState('');
  const [csvResult, setCsvResult] = useState<{ success: boolean; message: string } | null>(null);

  // In-App Delete Confirmation State (Works 100% reliably in iframes, no window.confirm)
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'donation' | 'expense' | 'announcement' | 'committee' | 'gallery' | 'reset';
    id?: string;
    title: string;
    details?: string;
  } | null>(null);

  // Floating Toast notification
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  // Authentication check
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default authorized passcode for village administrator
    if (passwordInput.trim() === 'chhath2026' || passwordInput.trim() === 'admin123') {
      onLogin();
      setLoginError('');
      setPasswordInput('');
    } else {
      setLoginError(lang === 'hi' ? 'अमान्य पासवर्ड! कृपया सही व्यवस्थापक कोड दर्ज करें।' : 'Invalid password! Please enter the correct admin key.');
    }
  };

  // Donation CRUD
  const handleSaveDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationForm.donorName || !donationForm.amount) return;

    const newDonation: Donation = {
      id: 'don-' + Date.now(),
      year: Number(donationForm.year),
      donorName: donationForm.donorName,
      villageWard: donationForm.villageWard || 'ग्राम अधलालपुर',
      amount: Number(donationForm.amount),
      date: donationForm.date,
      paymentMethod: donationForm.paymentMethod,
      receiptNo: donationForm.receiptNo,
      remarks: donationForm.remarks,
      verifiedBy: donationForm.verifiedBy,
      createdAt: new Date().toISOString(),
    };

    const current = DataService.getDonations();
    DataService.saveDonations([newDonation, ...current]);
    onDataChange();
    setShowDonationForm(false);
    showToast('✓ नया दान रिकॉर्ड सफलतापूर्वक जोड़ा गया!');
    if (sheetsUrl.trim()) DataService.pushToGoogleSheet(sheetsUrl).catch(() => {});
    setDonationForm({
      ...donationForm,
      donorName: '',
      amount: '',
      remarks: '',
      receiptNo: `CP-26-${String(current.length + 2).padStart(3, '0')}`,
    });
  };

  // Expense CRUD
  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseForm.title || !expenseForm.amount) return;

    const newExpense: Expense = {
      id: 'exp-' + Date.now(),
      year: Number(expenseForm.year),
      title: expenseForm.title,
      category: expenseForm.category,
      amount: Number(expenseForm.amount),
      date: expenseForm.date,
      vendorName: expenseForm.vendorName || 'स्थानीय वेंडर',
      description: expenseForm.description || '',
      voucherNo: expenseForm.voucherNo,
      paidBy: expenseForm.paidBy,
      createdAt: new Date().toISOString(),
    };

    const current = DataService.getExpenses();
    DataService.saveExpenses([newExpense, ...current]);
    onDataChange();
    setShowExpenseForm(false);
    showToast('✓ नया खर्च वाउचर सफलतापूर्वक जोड़ा गया!');
    if (sheetsUrl.trim()) DataService.pushToGoogleSheet(sheetsUrl).catch(() => {});
    setExpenseForm({
      ...expenseForm,
      title: '',
      amount: '',
      vendorName: '',
      description: '',
      voucherNo: `V-${String(new Date().getFullYear()).slice(2)}-${String(current.length + 2).padStart(2, '0')}`,
    });
  };

  // Announcement CRUD
  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annForm.titleHindi) return;

    const newAnn: Announcement = {
      id: 'ann-' + Date.now(),
      titleHindi: annForm.titleHindi,
      titleEnglish: annForm.titleEnglish || annForm.titleHindi,
      descriptionHindi: annForm.descriptionHindi || '',
      descriptionEnglish: annForm.descriptionEnglish || annForm.descriptionHindi,
      priority: annForm.priority,
      category: annForm.category,
      isPinned: annForm.isPinned,
      date: annForm.date,
    };

    const current = DataService.getAnnouncements();
    DataService.saveAnnouncements([newAnn, ...current]);
    onDataChange();
    setShowAnnForm(false);
    showToast('✓ नई सूचना सफलतापूर्वक जारी की गई!');
    if (sheetsUrl.trim()) DataService.pushToGoogleSheet(sheetsUrl).catch(() => {});
    setAnnForm({
      ...annForm,
      titleHindi: '',
      titleEnglish: '',
      descriptionHindi: '',
      descriptionEnglish: '',
      isPinned: false,
    });
  };

  // Committee CRUD
  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.nameHindi) return;

    const newMember: CommitteeMember = {
      id: 'mem-' + Date.now(),
      nameHindi: memberForm.nameHindi,
      nameEnglish: memberForm.nameEnglish || memberForm.nameHindi,
      roleHindi: memberForm.roleHindi || 'सदस्य',
      roleEnglish: memberForm.roleEnglish || 'Member',
      category: memberForm.category,
      ward: memberForm.ward || 'ग्राम अधलालपुर',
      phone: memberForm.phone || '',
      tenure: memberForm.tenure || '२०२६ - २०२८',
    };

    const current = DataService.getCommittee();
    DataService.saveCommittee([...current, newMember]);
    onDataChange();
    setShowMemberForm(false);
    showToast('✓ नया समिति सदस्य जोड़ा गया!');
    if (sheetsUrl.trim()) DataService.pushToGoogleSheet(sheetsUrl).catch(() => {});
    setMemberForm({
      ...memberForm,
      nameHindi: '',
      nameEnglish: '',
      roleHindi: '',
      roleEnglish: '',
      phone: '',
      ward: '',
    });
  };

  // Gallery CRUD
  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.imageUrl) return;

    const newItem: GalleryItem = {
      id: 'gal-' + Date.now(),
      titleHindi: galleryForm.titleHindi || 'छठ महापर्व',
      titleEnglish: galleryForm.titleEnglish || galleryForm.titleHindi || 'Chhath Mahaparv',
      year: Number(galleryForm.year),
      category: galleryForm.category,
      imageUrl: galleryForm.imageUrl,
      captionHindi: galleryForm.captionHindi || '',
      captionEnglish: galleryForm.captionEnglish || '',
    };

    const current = DataService.getGallery();
    DataService.saveGallery([newItem, ...current]);
    onDataChange();
    setShowGalleryForm(false);
    showToast('✓ नई तस्वीर गैलरी में जोड़ी गई!');
    setGalleryForm({
      ...galleryForm,
      imageUrl: '',
      titleHindi: '',
      titleEnglish: '',
      captionHindi: '',
      captionEnglish: '',
    });
  };

  // IN-APP DELETE HANDLERS (No window.confirm!)
  const confirmDeleteDonation = (id: string, name: string, amount: number) => {
    setDeleteTarget({
      type: 'donation',
      id,
      title: 'दान रिकॉर्ड हटाएं',
      details: `${name} — ${formatINR(amount)}`,
    });
  };

  const confirmDeleteExpense = (id: string, title: string, amount: number) => {
    setDeleteTarget({
      type: 'expense',
      id,
      title: 'खर्च वाउचर हटाएं',
      details: `${title} — ${formatINR(amount)}`,
    });
  };

  const confirmDeleteAnnouncement = (id: string, titleHindi: string) => {
    setDeleteTarget({
      type: 'announcement',
      id,
      title: 'सूचना हटाएं',
      details: titleHindi,
    });
  };

  const confirmDeleteMember = (id: string, nameHindi: string, roleHindi: string) => {
    setDeleteTarget({
      type: 'committee',
      id,
      title: 'समिति सदस्य हटाएं',
      details: `${nameHindi} (${roleHindi})`,
    });
  };

  const confirmDeleteGallery = (id: string, titleHindi: string) => {
    setDeleteTarget({
      type: 'gallery',
      id,
      title: 'तस्वीर हटाएं',
      details: titleHindi,
    });
  };

  const confirmResetAll = () => {
    setDeleteTarget({
      type: 'reset',
      title: 'संपूर्ण डेटा रीसेट करें',
      details: 'सभी स्थानीय बदलाव मिटाकर प्रारंभिक गाँव रिकॉर्ड्स पुनः स्थापित किए जाएंगे।',
    });
  };

  // Execute deletion when confirmed in in-app modal
  const handleExecuteDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'donation' && deleteTarget.id) {
      const current = DataService.getDonations();
      const updated = current.filter((d) => d.id !== deleteTarget.id);
      DataService.saveDonations(updated);
      onDataChange();
      showToast('✓ दान रिकॉर्ड सफलतापूर्वक हटा दिया गया!');
      if (sheetsUrl.trim()) DataService.pushToGoogleSheet(sheetsUrl).catch(() => {});
    } else if (deleteTarget.type === 'expense' && deleteTarget.id) {
      const current = DataService.getExpenses();
      const updated = current.filter((e) => e.id !== deleteTarget.id);
      DataService.saveExpenses(updated);
      onDataChange();
      showToast('✓ खर्च वाउचर सफलतापूर्वक हटा दिया गया!');
      if (sheetsUrl.trim()) DataService.pushToGoogleSheet(sheetsUrl).catch(() => {});
    } else if (deleteTarget.type === 'announcement' && deleteTarget.id) {
      const current = DataService.getAnnouncements();
      const updated = current.filter((a) => a.id !== deleteTarget.id);
      DataService.saveAnnouncements(updated);
      onDataChange();
      showToast('✓ सूचना सफलतापूर्वक हटा दी गई!');
      if (sheetsUrl.trim()) DataService.pushToGoogleSheet(sheetsUrl).catch(() => {});
    } else if (deleteTarget.type === 'committee' && deleteTarget.id) {
      const current = DataService.getCommittee();
      const updated = current.filter((m) => m.id !== deleteTarget.id);
      DataService.saveCommittee(updated);
      onDataChange();
      showToast('✓ समिति सदस्य सफलतापूर्वक हटा दिया गया!');
      if (sheetsUrl.trim()) DataService.pushToGoogleSheet(sheetsUrl).catch(() => {});
    } else if (deleteTarget.type === 'gallery' && deleteTarget.id) {
      const current = DataService.getGallery();
      const updated = current.filter((g) => g.id !== deleteTarget.id);
      DataService.saveGallery(updated);
      onDataChange();
      showToast('✓ तस्वीर हटा दी गई!');
    } else if (deleteTarget.type === 'reset') {
      DataService.resetAll();
      onDataChange();
      showToast('✓ संपूर्ण डेटा प्रारंभिक स्थिति पर रीसेट कर दिया गया!');
    }

    setDeleteTarget(null);
  };

  // Google Sheets sync
  const handleSaveSheetsUrl = () => {
    localStorage.setItem('chhath_sheets_url', sheetsUrl.trim());
    setSyncStatus(lang === 'hi' ? 'गूगल शीट्स वेब ऐप यूआरएल सुरक्षित किया गया।' : 'Google Sheets Web App URL saved successfully.');
  };

  // 1. PULL: Fetch latest updates from Google Sheets into Admin Panel & website
  const handlePullFromSheets = async () => {
    if (!sheetsUrl.trim()) {
      setSyncStatus(lang === 'hi' ? 'कृपया पहले गूगल वेब ऐप URL दर्ज करें।' : 'Please enter the deployed Web App URL first.');
      return;
    }

    setIsPulling(true);
    setSyncStatus(lang === 'hi' ? 'गूगल शीट से नया डेटा लोड किया जा रहा है...' : 'Pulling latest records from Google Sheets...');

    const res = await DataService.fetchFromGoogleSheet(sheetsUrl);
    setIsPulling(false);

    if (res.success) {
      onDataChange();
      const timeStr = new Date().toLocaleTimeString('hi-IN');
      setLastSyncTime(res.timestamp);
      setSyncStatus(
        lang === 'hi'
          ? `✓ सफलता (${timeStr})! गूगल शीट से ${res.donationsCount} चंदा, ${res.expensesCount} खर्च, ${res.announcementsCount} सूचनाएँ, और ${res.committeeCount} समिति सदस्य लोड हुए और एडमिन पैनल में अपडेट हो गए।`
          : `✓ Success! Loaded ${res.donationsCount} donations, ${res.expensesCount} expenses, ${res.announcementsCount} announcements, and ${res.committeeCount} committee members.`
      );
    } else {
      setSyncStatus(
        lang === 'hi'
          ? `❌ सिंक त्रुटि: ${res.error || 'कनेक्शन नहीं हो सका। कृपया जांचें कि Apps Script में "Who has access" = "Anyone" चुना है या नहीं।'}`
          : `❌ Sync error: ${res.error}`
      );
    }
  };

  // 2. PUSH: Push current local records into Google Sheets
  const handlePushToSheets = async () => {
    if (!sheetsUrl.trim()) {
      setSyncStatus(lang === 'hi' ? 'कृपया पहले गूगल वेब ऐप URL दर्ज करें।' : 'Please enter the deployed Web App URL first.');
      return;
    }

    setIsPushing(true);
    setSyncStatus(lang === 'hi' ? 'वर्तमान डेटा गूगल शीट में भेजा जा रहा है...' : 'Pushing current records to Google Sheets...');

    const res = await DataService.pushToGoogleSheet(sheetsUrl);
    setIsPushing(false);

    if (res.success) {
      const timeStr = new Date().toLocaleTimeString('hi-IN');
      setLastSyncTime(new Date().toISOString());
      setSyncStatus(
        lang === 'hi'
          ? `✓ सफलता (${timeStr})! पोर्टल का समस्त डेटा (चंदा, खर्च, सूचनाएँ, समिति) गूगल शीट में सुरक्षित हो गया!`
          : `✓ Successfully pushed all records to Google Sheets!`
      );
    } else {
      setSyncStatus(lang === 'hi' ? `❌ त्रुटि: ${res.error}` : `❌ Error: ${res.error}`);
    }
  };

  // 3. AUTO-SEED & SYNC: Checks if Google Sheet is empty; if so, seeds all active records into it
  const handleAutoSeedAndSync = async () => {
    if (!sheetsUrl.trim()) {
      setSyncStatus(lang === 'hi' ? 'कृपया पहले गूगल वेब ऐप URL दर्ज करें।' : 'Please enter the deployed Web App URL first.');
      return;
    }

    setIsSeeding(true);
    setSyncStatus(lang === 'hi' ? 'गूगल शीट की जाँच एवं स्वतः प्रारंभिक डेटा सीड किया जा रहा है...' : 'Checking sheet and auto-seeding records...');

    const res = await DataService.autoSeedAndSync(sheetsUrl);
    setIsSeeding(false);
    onDataChange();

    if (res.success) {
      setLastSyncTime(res.timestamp);
      setSyncStatus(res.message);
    } else {
      setSyncStatus(`❌ सिंक त्रुटि: ${res.message}`);
    }
  };

  // Download sample or live CSV for any of the 4 modules
  const handleDownloadModuleCSV = (module: 'donations' | 'expenses' | 'announcements' | 'committee') => {
    if (module === 'donations') {
      DataService.downloadCSV(DataService.exportDonationsCSV(), 'chanda_donations_adhalalpur.csv');
    } else if (module === 'expenses') {
      DataService.downloadCSV(DataService.exportExpensesCSV(), 'kharch_expenses_adhalalpur.csv');
    } else if (module === 'announcements') {
      DataService.downloadCSV(DataService.exportAnnouncementsCSV(), 'suchnaye_announcements_adhalalpur.csv');
    } else if (module === 'committee') {
      DataService.downloadCSV(DataService.exportCommitteeCSV(), 'samiti_members_adhalalpur.csv');
    }
  };

  // Handle direct CSV import / paste
  const handleCSVImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvInputText.trim()) return;

    const res = DataService.importFromCSV(csvInputText, csvModule);
    if (res.success) {
      onDataChange();
      setCsvResult({
        success: true,
        message:
          lang === 'hi'
            ? `✓ सफलता! ${res.count} रिकॉर्ड्स आयात हुए और एडमिन पैनल में दिखने लगे हैं।`
            : `✓ Success! ${res.count} records imported and now visible in Admin Panel.`,
      });
      setCsvInputText('');
    } else {
      setCsvResult({
        success: false,
        message: lang === 'hi' ? `❌ त्रुटि: ${res.error}` : `❌ Error: ${res.error}`,
      });
    }
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(DataService.getGoogleAppsScriptCode());
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  // Export JSON Backup
  const handleExportJSON = () => {
    const backup = {
      timestamp: new Date().toISOString(),
      donations: DataService.getDonations(),
      expenses: DataService.getExpenses(),
      announcements: DataService.getAnnouncements(),
      committee: DataService.getCommittee(),
      gallery: DataService.getGallery(),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Chhath_Samiti_Complete_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  // Render Login Screen if not logged in
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
        <div className="bg-white border-2 border-amber-300 rounded-3xl p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-orange-700">
              {lang === 'hi' ? 'सुरक्षित व्यवस्थापक पोर्टल' : 'Authorized Administrator Desk'}
            </span>
            <h1 className="text-2xl font-heading font-extrabold text-stone-900 mt-1">
              {lang === 'hi' ? 'छठ पूजा समिति प्रबंधन कक्ष' : 'Samiti Admin Login'}
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              {lang === 'hi'
                ? 'केवल अधिकृत कोषाध्यक्ष अथवा समिति व्यवस्थापक हेतु।'
                : 'Restricted for authorized committee treasurer and administrative leads.'}
            </p>
          </div>

          {/* Convenient Village Admin Notice */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 text-left space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-orange-600" />
              <span>डिफ़ॉल्ट व्यवस्थापक कोड (Default Passcode):</span>
            </div>
            <div className="font-mono font-bold text-stone-900 bg-white px-2 py-1 rounded border border-amber-300 inline-block">
              chhath2026
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder={lang === 'hi' ? 'पासवर्ड दर्ज करें...' : 'Enter admin password...'}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-center font-mono text-base focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              />
            </div>

            {loginError && (
              <div className="text-xs font-semibold text-rose-600 flex items-center justify-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{lang === 'hi' ? 'लॉगिन करें' : 'Login to Admin Panel'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Logged-in Admin Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Admin Header Bar */}
      <div className="bg-stone-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'hi' ? 'अधिकृत व्यवस्थापक सत्र सक्रिय' : 'Admin Session Active'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            {lang === 'hi' ? 'समिति केंद्रीय प्रबंधन कक्ष (Admin Dashboard)' : 'Samiti Central Management Console'}
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            {lang === 'hi'
              ? 'दान, खर्च, सूचनाएं, समिति सदस्य एवं गूगल शीट्स डेटाबेस का सीधा प्रबंधन।'
              : 'Add, edit, verify records, sync Google Sheets, and export audit reports.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Year selector for admin */}
          <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-xl text-xs font-mono">
            <span className="text-stone-400">वर्ष:</span>
            <select
              value={adminYear}
              onChange={(e) => setAdminYear(Number(e.target.value))}
              className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer"
            >
              {AVAILABLE_YEARS.map((y) => (
                <option key={y} value={y} className="bg-stone-900 text-white">
                  {y}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-rose-900/40 hover:bg-rose-900 text-rose-200 hover:text-white border border-rose-700/50 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'लॉगआउट' : 'Logout'}</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-b border-stone-200">
        <button
          onClick={() => setActiveTab('donations')}
          className={`px-4 py-2.5 rounded-t-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'donations'
              ? 'bg-orange-600 text-white shadow-xs'
              : 'text-stone-700 hover:bg-amber-100'
          }`}
        >
          <Wallet className="w-4 h-4" />
          <span>{lang === 'hi' ? 'दान प्रबंधन (Donations)' : 'Manage Donations'}</span>
          <span className="text-[10px] bg-black/20 px-1.5 py-0.2 rounded-full font-mono">
            {donations.filter((d) => d.year === adminYear).length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-4 py-2.5 rounded-t-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'expenses'
              ? 'bg-orange-600 text-white shadow-xs'
              : 'text-stone-700 hover:bg-amber-100'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>{lang === 'hi' ? 'खर्च प्रबंधन (Expenses)' : 'Manage Expenses'}</span>
          <span className="text-[10px] bg-black/20 px-1.5 py-0.2 rounded-full font-mono">
            {expenses.filter((e) => e.year === adminYear).length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`px-4 py-2.5 rounded-t-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'announcements'
              ? 'bg-orange-600 text-white shadow-xs'
              : 'text-stone-700 hover:bg-amber-100'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>{lang === 'hi' ? 'सूचनाएँ (Notices)' : 'Announcements'}</span>
          <span className="text-[10px] bg-black/20 px-1.5 py-0.2 rounded-full font-mono">
            {announcements.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('committee')}
          className={`px-4 py-2.5 rounded-t-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'committee'
              ? 'bg-orange-600 text-white shadow-xs'
              : 'text-stone-700 hover:bg-amber-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{lang === 'hi' ? 'समिति सदस्य' : 'Committee'}</span>
          <span className="text-[10px] bg-black/20 px-1.5 py-0.2 rounded-full font-mono">
            {committee.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2.5 rounded-t-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'gallery'
              ? 'bg-orange-600 text-white shadow-xs'
              : 'text-stone-700 hover:bg-amber-100'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>{lang === 'hi' ? 'फोटो वीथिका' : 'Gallery'}</span>
        </button>

        <button
          onClick={() => setActiveTab('sheets')}
          className={`px-4 py-2.5 rounded-t-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'sheets'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'text-emerald-800 hover:bg-emerald-50'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>{lang === 'hi' ? 'गूगल शीट्स सिंक' : 'Google Sheets'}</span>
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`px-4 py-2.5 rounded-t-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'backup'
              ? 'bg-stone-800 text-white shadow-xs'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>{lang === 'hi' ? 'डेटा बैकअप' : 'Backup'}</span>
        </button>
      </div>

      {/* TAB 1: MANAGE DONATIONS */}
      {activeTab === 'donations' && (
        <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900">
                {lang === 'hi' ? `वर्ष ${adminYear} का दान संग्रह` : `Donations Ledger (${adminYear})`}
              </h2>
              <p className="text-xs text-stone-500">
                {lang === 'hi' ? 'नया दान दर्ज करें अथवा पुराने रिकॉर्ड में संशोधन/हटाएं।' : 'Add new donor records or manage existing entries.'}
              </p>
            </div>
            <button
              onClick={() => setShowDonationForm(!showDonationForm)}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{showDonationForm ? (lang === 'hi' ? 'फॉर्म बंद करें' : 'Close Form') : (lang === 'hi' ? 'नया दान जोड़ें' : 'Add Donation')}</span>
            </button>
          </div>

          {/* Add Donation Form */}
          {showDonationForm && (
            <form onSubmit={handleSaveDonation} className="bg-amber-50/70 border border-amber-300 rounded-xl p-5 space-y-4 animate-in fade-in duration-200">
              <h3 className="font-bold text-stone-900 text-sm">
                {lang === 'hi' ? 'नया दान रिकॉर्ड दर्ज करें' : 'Enter New Donation Details'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">रसीद संख्या *</label>
                  <input
                    type="text"
                    required
                    value={donationForm.receiptNo}
                    onChange={(e) => setDonationForm({ ...donationForm, receiptNo: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">दानदाता का नाम *</label>
                  <input
                    type="text"
                    required
                    value={donationForm.donorName}
                    onChange={(e) => setDonationForm({ ...donationForm, donorName: e.target.value })}
                    placeholder="उदा. श्री सुनील सिंह"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">सहयोग राशि (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={donationForm.amount}
                    onChange={(e) => setDonationForm({ ...donationForm, amount: e.target.value })}
                    placeholder="उदा. 2100"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">गाँव / वार्ड</label>
                  <input
                    type="text"
                    value={donationForm.villageWard}
                    onChange={(e) => setDonationForm({ ...donationForm, villageWard: e.target.value })}
                    placeholder="वार्ड संख्या ०४"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">भुगतान माध्यम</label>
                  <select
                    value={donationForm.paymentMethod}
                    onChange={(e) => setDonationForm({ ...donationForm, paymentMethod: e.target.value as PaymentMethod })}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  >
                    <option value="Cash">Cash (नकद)</option>
                    <option value="UPI">UPI (क्यूआर कोड)</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">तिथि</label>
                  <input
                    type="date"
                    value={donationForm.date}
                    onChange={(e) => setDonationForm({ ...donationForm, date: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-stone-600 font-medium mb-1 text-xs">सहयोग उद्देश्य / टिप्पणी (Remarks)</label>
                <input
                  type="text"
                  value={donationForm.remarks}
                  onChange={(e) => setDonationForm({ ...donationForm, remarks: e.target.value })}
                  placeholder="उदा. घाट प्रकाश व्यवस्था हेतु"
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDonationForm(false)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>दान रिकॉर्ड सुरक्षित करें</span>
                </button>
              </div>
            </form>
          )}

          {/* Donations Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-700 uppercase font-semibold">
                  <th className="py-2.5 px-3 font-mono">रसीद सं.</th>
                  <th className="py-2.5 px-3">दानदाता का नाम</th>
                  <th className="py-2.5 px-3">वार्ड / स्थान</th>
                  <th className="py-2.5 px-3 text-right">राशि (₹)</th>
                  <th className="py-2.5 px-3 font-mono">तिथि</th>
                  <th className="py-2.5 px-3">माध्यम</th>
                  <th className="py-2.5 px-3 text-center">कार्रवाई</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {donations.filter((d) => d.year === adminYear).map((d) => (
                  <tr key={d.id} className="hover:bg-amber-50/30">
                    <td className="py-2.5 px-3 font-mono font-bold text-orange-800">{d.receiptNo}</td>
                    <td className="py-2.5 px-3 font-medium text-stone-900">{d.donorName}</td>
                    <td className="py-2.5 px-3 text-stone-500">{d.villageWard}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-stone-900">{formatINR(d.amount)}</td>
                    <td className="py-2.5 px-3 font-mono text-stone-500">{d.date}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 text-[11px] font-mono">
                        {d.paymentMethod}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => confirmDeleteDonation(d.id, d.donorName, d.amount)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition-colors cursor-pointer"
                        title="हटाएँ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE EXPENSES */}
      {activeTab === 'expenses' && (
        <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900">
                {lang === 'hi' ? `वर्ष ${adminYear} का व्यय रजिस्टर` : `Expenses Ledger (${adminYear})`}
              </h2>
              <p className="text-xs text-stone-500">
                {lang === 'hi' ? 'खर्च के वाउचर जोड़ें व बिल विवरण अद्यतन करें।' : 'Add itemized vouchers or manage expenditures.'}
              </p>
            </div>
            <button
              onClick={() => setShowExpenseForm(!showExpenseForm)}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{showExpenseForm ? (lang === 'hi' ? 'फॉर्म बंद करें' : 'Close Form') : (lang === 'hi' ? 'नया खर्च जोड़ें' : 'Add Expense')}</span>
            </button>
          </div>

          {/* Add Expense Form */}
          {showExpenseForm && (
            <form onSubmit={handleSaveExpense} className="bg-amber-50/70 border border-amber-300 rounded-xl p-5 space-y-4 animate-in fade-in duration-200">
              <h3 className="font-bold text-stone-900 text-sm">
                {lang === 'hi' ? 'नया व्यय वाउचर दर्ज करें' : 'Enter New Expense Voucher'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">वाउचर संख्या *</label>
                  <input
                    type="text"
                    required
                    value={expenseForm.voucherNo}
                    onChange={(e) => setExpenseForm({ ...expenseForm, voucherNo: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">खर्च का शीर्षक *</label>
                  <input
                    type="text"
                    required
                    value={expenseForm.title}
                    onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
                    placeholder="उदा. घाट पर एलईडी फ्लड लाइट"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">खर्च राशि (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                    placeholder="उदा. 4500"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">खर्च मद (Category)</label>
                  <select
                    value={expenseForm.category}
                    onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value as ExpenseCategory })}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  >
                    {EXPENSE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {t.categories[cat] ? t.categories[cat][lang] : cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">दुकानदार / वेंडर का नाम</label>
                  <input
                    type="text"
                    value={expenseForm.vendorName}
                    onChange={(e) => setExpenseForm({ ...expenseForm, vendorName: e.target.value })}
                    placeholder="उदा. माँ भवानी इलेक्ट्रिकल्स"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">भुगतान तिथि</label>
                  <input
                    type="date"
                    value={expenseForm.date}
                    onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-stone-600 font-medium mb-1 text-xs">विस्तृत व्यय विवरण (Description)</label>
                <input
                  type="text"
                  value={expenseForm.description}
                  onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                  placeholder="उदा. ५०० वाट फोकस लाइट एवं तार फिटिंग मजदूरी"
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowExpenseForm(false)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>व्यय वाउचर सुरक्षित करें</span>
                </button>
              </div>
            </form>
          )}

          {/* Expenses Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-700 uppercase font-semibold">
                  <th className="py-2.5 px-3 font-mono">वाउचर सं.</th>
                  <th className="py-2.5 px-3">खर्च शीर्षक</th>
                  <th className="py-2.5 px-3">मद (Category)</th>
                  <th className="py-2.5 px-3 text-right">राशि (₹)</th>
                  <th className="py-2.5 px-3 font-mono">तिथि</th>
                  <th className="py-2.5 px-3">वेंडर</th>
                  <th className="py-2.5 px-3 text-center">कार्रवाई</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {expenses.filter((e) => e.year === adminYear).map((e) => (
                  <tr key={e.id} className="hover:bg-amber-50/30">
                    <td className="py-2.5 px-3 font-mono font-bold text-stone-800">{e.voucherNo}</td>
                    <td className="py-2.5 px-3 font-medium text-stone-900">{e.title}</td>
                    <td className="py-2.5 px-3 text-amber-800">{t.categories[e.category] ? t.categories[e.category][lang] : e.category}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-stone-900">{formatINR(e.amount)}</td>
                    <td className="py-2.5 px-3 font-mono text-stone-500">{e.date}</td>
                    <td className="py-2.5 px-3 text-stone-600">{e.vendorName}</td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => confirmDeleteExpense(e.id, e.title, e.amount)}
                        className="p-1 rounded text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="हटाएँ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: MANAGE ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900">
                {lang === 'hi' ? 'सूचना पट्ट प्रबंधन' : 'Announcements Management'}
              </h2>
              <p className="text-xs text-stone-500">
                {lang === 'hi' ? 'ग्रामवासियों एवं व्रतियों हेतु आवश्यक सूचनाएं जारी करें।' : 'Issue notices, pin priority warnings, and publish alerts.'}
              </p>
            </div>
            <button
              onClick={() => setShowAnnForm(!showAnnForm)}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{showAnnForm ? (lang === 'hi' ? 'फॉर्म बंद करें' : 'Close Form') : (lang === 'hi' ? 'नई सूचना जारी करें' : 'Publish Notice')}</span>
            </button>
          </div>

          {showAnnForm && (
            <form onSubmit={handleSaveAnnouncement} className="bg-amber-50/70 border border-amber-300 rounded-xl p-5 space-y-4 animate-in fade-in duration-200">
              <h3 className="font-bold text-stone-900 text-sm">
                {lang === 'hi' ? 'नई आधिकारिक सूचना का प्रारूप' : 'New Circular Draft'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">शीर्षक (हिंदी में) *</label>
                  <input
                    type="text"
                    required
                    value={annForm.titleHindi}
                    onChange={(e) => setAnnForm({ ...annForm, titleHindi: e.target.value })}
                    placeholder="उदा. घाट पर वेदी आरक्षण संबंधी सूचना"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Title (English)</label>
                  <input
                    type="text"
                    value={annForm.titleEnglish}
                    onChange={(e) => setAnnForm({ ...annForm, titleEnglish: e.target.value })}
                    placeholder="e.g. Notice on Altar Allocation"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">प्राथमिकता (Priority)</label>
                  <select
                    value={annForm.priority}
                    onChange={(e) => setAnnForm({ ...annForm, priority: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  >
                    <option value="urgent">अति आवश्यक (Urgent)</option>
                    <option value="important">महत्वपूर्ण (Important)</option>
                    <option value="general">सामान्य (General)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">विषय श्रेणी</label>
                  <select
                    value={annForm.category}
                    onChange={(e) => setAnnForm({ ...annForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  >
                    <option value="ghat">घाट व्यवस्था</option>
                    <option value="security">सुरक्षा एवं गोताखोर</option>
                    <option value="cultural">सांस्कृतिक संध्या</option>
                    <option value="meeting">बैठक</option>
                  </select>
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-stone-800 font-medium">
                    <input
                      type="checkbox"
                      checked={annForm.isPinned}
                      onChange={(e) => setAnnForm({ ...annForm, isPinned: e.target.checked })}
                      className="w-4 h-4 text-orange-600 rounded"
                    />
                    <span>शीर्ष पर पिन करें (Pin to Top)</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-stone-600 font-medium mb-1 text-xs">विस्तृत विवरण (हिंदी में) *</label>
                <textarea
                  rows={3}
                  required
                  value={annForm.descriptionHindi}
                  onChange={(e) => setAnnForm({ ...annForm, descriptionHindi: e.target.value })}
                  placeholder="सभी ग्रामवासियों को सूचित किया जाता है कि..."
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAnnForm(false)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>सूचना प्रकाशित करें</span>
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {announcements.map((a) => (
              <div key={a.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[11px] mb-1 font-mono text-stone-500">
                    <span>{a.date}</span>
                    <span>•</span>
                    <span className="font-semibold text-orange-700">{a.priority.toUpperCase()}</span>
                    {a.isPinned && <span className="text-amber-600 font-bold">[PINNED]</span>}
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">{a.titleHindi}</h4>
                  <p className="text-xs text-stone-600 mt-1">{a.descriptionHindi}</p>
                </div>
                <button
                  onClick={() => confirmDeleteAnnouncement(a.id, a.titleHindi)}
                  className="p-1 rounded text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                  title="हटाएँ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MANAGE COMMITTEE MEMBERS */}
      {activeTab === 'committee' && (
        <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900">
                {lang === 'hi' ? 'समिति सदस्य एवं स्वयंसेवक प्रबंधन' : 'Committee Members Registry'}
              </h2>
              <p className="text-xs text-stone-500">
                {lang === 'hi' ? 'पदाधिकारियों की सूची, पदभार एवं संपर्क नंबर अद्यतन करें।' : 'Add or update executive roles and volunteer leads.'}
              </p>
            </div>
            <button
              onClick={() => setShowMemberForm(!showMemberForm)}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{showMemberForm ? 'फॉर्म बंद करें' : 'नया सदस्य जोड़ें'}</span>
            </button>
          </div>

          {showMemberForm && (
            <form onSubmit={handleSaveMember} className="bg-amber-50/70 border border-amber-300 rounded-xl p-5 space-y-4 animate-in fade-in duration-200">
              <h3 className="font-bold text-stone-900 text-sm">नए पदाधिकारी का विवरण</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">नाम (हिंदी में) *</label>
                  <input
                    type="text"
                    required
                    value={memberForm.nameHindi}
                    onChange={(e) => setMemberForm({ ...memberForm, nameHindi: e.target.value })}
                    placeholder="उदा. श्री अजय कुमार सिंह"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">पद / दायित्व (हिंदी में) *</label>
                  <input
                    type="text"
                    required
                    value={memberForm.roleHindi}
                    onChange={(e) => setMemberForm({ ...memberForm, roleHindi: e.target.value })}
                    placeholder="उदा. सह-संयोजक, प्रकाश व्यवस्था"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">श्रेणी (Category)</label>
                  <select
                    value={memberForm.category}
                    onChange={(e) => setMemberForm({ ...memberForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  >
                    <option value="core">कार्यकारिणी पदाधिकारी</option>
                    <option value="patron">संरक्षक मंडल</option>
                    <option value="finance">कोषाध्यक्ष व वित्त</option>
                    <option value="ghat_mgmt">घाट व्यवस्था व सुरक्षा</option>
                    <option value="youth">युवा दल स्वयंसेवक</option>
                    <option value="volunteer">सामान्य स्वयंसेवक</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">मोबाइल नंबर</label>
                  <input
                    type="tel"
                    value={memberForm.phone}
                    onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMemberForm(false)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>सदस्य सुरक्षित करें</span>
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {committee.map((m) => (
              <div key={m.id} className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-stone-900">{m.nameHindi}</h4>
                  <span className="text-[11px] text-amber-800 font-medium block">{m.roleHindi}</span>
                  <span className="text-[10px] text-stone-500 font-mono">{m.phone}</span>
                </div>
                <button
                  onClick={() => confirmDeleteMember(m.id, m.nameHindi, m.roleHindi)}
                  className="p-1 rounded text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="हटाएँ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: MANAGE GALLERY */}
      {activeTab === 'gallery' && (
        <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900">
                {lang === 'hi' ? 'फोटो वीथिका अपलोड व प्रबंधन' : 'Photo Gallery Management'}
              </h2>
              <p className="text-xs text-stone-500">
                {lang === 'hi' ? 'घाट, अर्घ्य व प्रकाश की नई तस्वीरें जोड़ें।' : 'Upload or link new photos to the community archive.'}
              </p>
            </div>
            <button
              onClick={() => setShowGalleryForm(!showGalleryForm)}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{showGalleryForm ? 'बंद करें' : 'नई फोटो जोड़ें'}</span>
            </button>
          </div>

          {showGalleryForm && (
            <form onSubmit={handleSaveGallery} className="bg-amber-50/70 border border-amber-300 rounded-xl p-5 space-y-4 animate-in fade-in duration-200">
              <h3 className="font-bold text-stone-900 text-sm">नई तस्वीर जोड़ें</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">तस्वीर यूआरएल (Image URL / Path) *</label>
                  <input
                    type="text"
                    required
                    value={galleryForm.imageUrl}
                    onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                    placeholder="/src/assets/images/... या वेब यूआरएल"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">शीर्षक (हिंदी में)</label>
                  <input
                    type="text"
                    value={galleryForm.titleHindi}
                    onChange={(e) => setGalleryForm({ ...galleryForm, titleHindi: e.target.value })}
                    placeholder="उदा. उषा अर्घ्य का अलौकिक दृश्य"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">वर्ष (Year)</label>
                  <select
                    value={galleryForm.year}
                    onChange={(e) => setGalleryForm({ ...galleryForm, year: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono"
                  >
                    {AVAILABLE_YEARS.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">श्रेणी (Category)</label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  >
                    <option value="arghya">सूर्य अर्घ्य अनुष्ठान</option>
                    <option value="ghat">घाट व वेदी</option>
                    <option value="lighting">प्रकाश व सजावट</option>
                    <option value="cultural">सांस्कृतिक संध्या</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGalleryForm(false)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>तस्वीर जोड़ें</span>
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {galleryItems.map((item) => (
              <div key={item.id} className="relative group rounded-xl overflow-hidden border border-stone-200 aspect-4/3 bg-stone-900">
                <img src={item.imageUrl} alt={item.titleEnglish} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-white text-[11px]">
                  <span>{item.titleHindi}</span>
                  <div className="flex justify-between items-center">
                    <span className="font-mono">{item.year}</span>
                    <button
                      onClick={() => confirmDeleteGallery(item.id, item.titleHindi)}
                      className="p-1 rounded bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                      title="हटाएँ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: GOOGLE SHEETS & SPREADSHEET 2-WAY MANAGEMENT */}
      {activeTab === 'sheets' && (
        <div className="bg-white border-2 border-emerald-300 rounded-3xl p-5 sm:p-8 shadow-xs space-y-8">
          
          {/* Header */}
          <div className="border-b border-emerald-100 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'गूगल स्प्रेडशीट दोतरफा डेटा प्रबंधन' : 'Google Spreadsheet 2-Way Data Management'}</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900">
              {lang === 'hi' ? 'स्प्रेडशीट से डेटा अपडेट एवं लाइव सिंक' : 'Spreadsheet Sync & Live Updates'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
              {lang === 'hi'
                ? 'आप अपनी गूगल स्प्रेडशीट में दान, खर्च, सूचनाएँ एवं समिति सदस्यों का विवरण आसानी से जोड़ या बदल सकते हैं। यहाँ से १-क्लिक में वह सारा डेटा सीधे एडमिन पैनल व वेबसाइट पर दिखने लगेगा।'
                : 'Update Donations, Expenses, Announcements, and Committee members directly from your Google Sheet or CSV.'}
            </p>
          </div>

          {/* 4 Modules Status Grid */}
          <div>
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
              {lang === 'hi' ? 'वर्तमान डेटा स्थिति (४ प्रमुख विभाग)' : 'Current 4 Modules Status'}
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {/* 1. Donations */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900">१. दान / चंदा</span>
                  <Wallet className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <span className="text-2xl font-bold font-mono text-orange-700">{donations.length}</span>
                  <span className="text-xs text-stone-500 block">कुल दानदाता रिकॉर्ड</span>
                </div>
                <button
                  onClick={() => handleDownloadModuleCSV('donations')}
                  className="mt-1 w-full py-1.5 px-2 bg-white hover:bg-amber-100/80 border border-amber-300 rounded-lg text-[11px] font-bold text-stone-700 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3 text-orange-600" />
                  <span>चंदा CSV डाउनलोड</span>
                </button>
              </div>

              {/* 2. Expenses */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-900">२. खर्च विवरण</span>
                  <FileSpreadsheet className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <span className="text-2xl font-bold font-mono text-rose-700">{expenses.length}</span>
                  <span className="text-xs text-stone-500 block">कुल खर्च वाउचर</span>
                </div>
                <button
                  onClick={() => handleDownloadModuleCSV('expenses')}
                  className="mt-1 w-full py-1.5 px-2 bg-white hover:bg-rose-100/80 border border-rose-300 rounded-lg text-[11px] font-bold text-stone-700 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3 text-rose-600" />
                  <span>खर्च CSV डाउनलोड</span>
                </button>
              </div>

              {/* 3. Announcements */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900">३. सूचनाएँ</span>
                  <Bell className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <span className="text-2xl font-bold font-mono text-blue-700">{announcements.length}</span>
                  <span className="text-xs text-stone-500 block">जारी सूचनाएँ</span>
                </div>
                <button
                  onClick={() => handleDownloadModuleCSV('announcements')}
                  className="mt-1 w-full py-1.5 px-2 bg-white hover:bg-blue-100/80 border border-blue-300 rounded-lg text-[11px] font-bold text-stone-700 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3 text-blue-600" />
                  <span>सूचनाएँ CSV डाउनलोड</span>
                </button>
              </div>

              {/* 4. Committee */}
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-900">४. छठ कमिटी</span>
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <span className="text-2xl font-bold font-mono text-purple-700">{committee.length}</span>
                  <span className="text-xs text-stone-500 block">समिति पदाधिकारी</span>
                </div>
                <button
                  onClick={() => handleDownloadModuleCSV('committee')}
                  className="mt-1 w-full py-1.5 px-2 bg-white hover:bg-purple-100/80 border border-purple-300 rounded-lg text-[11px] font-bold text-stone-700 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3 text-purple-600" />
                  <span>कमिटी CSV डाउनलोड</span>
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 1: GOOGLE SHEETS LIVE 2-WAY SYNC */}
          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border-2 border-emerald-300 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-emerald-700" />
                  <span>गूगल शीट्स लाइव दोतरफा सिंक (Live Two-Way Sync)</span>
                </h3>
                <p className="text-xs text-emerald-800 mt-0.5">
                  गूगल स्प्रेडशीट में डेटा बदलने के बाद यहाँ <strong>"शीट से नया डेटा लोड करें"</strong> दबाएं।
                </p>
              </div>
              {lastSyncTime && (
                <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-200/80 text-emerald-900 self-start sm:self-auto">
                  अंतिम सिंक: {new Date(lastSyncTime).toLocaleTimeString('hi-IN')}
                </span>
              )}
            </div>

            {/* Input URL Box & Real-Time Format Assistant */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="url"
                  value={sheetsUrl}
                  onChange={(e) => setSheetsUrl(e.target.value)}
                  placeholder="गूगल वेब ऐप URL: https://script.google.com/macros/s/AKfycb.../exec"
                  className="flex-1 px-3.5 py-2.5 bg-white border border-emerald-300 rounded-xl font-mono text-xs focus:outline-none focus:border-emerald-600 shadow-2xs"
                />
                <button
                  onClick={handleSaveSheetsUrl}
                  className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
                >
                  URL सुरक्षित करें
                </button>
              </div>

              {/* Instant Real-Time URL Validation Helpers */}
              {sheetsUrl.includes('docs.google.com/spreadsheets') && (
                <div className="p-3.5 rounded-xl bg-amber-50 border-2 border-amber-300 text-xs text-amber-950 space-y-2 animate-in fade-in duration-200">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <span>⚠️ ध्यान दें: यह आपकी गूगल स्प्रेडशीट का मुख्य ब्राउज़र लिंक है!</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-800">
                    गूगल सुरक्षा प्रतिबंधों (CORS) के कारण सीधे <code>docs.google.com</code> लिंक से ब्राउज़र में डेटा नहीं पढ़ा जा सकता। इसके लिए नीचे दिए गए ४ चरणों से <strong>Google Apps Script Web App</strong> बनाएं जिसका लिंक <code>script.google.com/macros/s/.../exec</code> जैसा होता है।
                  </p>
                  <p className="text-[11px] font-bold text-orange-900 bg-amber-100/70 p-2 rounded-lg">
                    💡 आसान विकल्प: यदि आप Apps Script नहीं बनाना चाहते, तो नीचे दिए गए <strong>"वैकल्पिक: सीधे कॉपी-पेस्ट करके अपडेट करें"</strong> टूल से अपनी शीट का डेटा कॉपी करके यहाँ सीधे पेस्ट कर सकते हैं — वह 1 सेकंड में काम करता है!
                  </p>
                </div>
              )}

              {sheetsUrl.includes('/dev') && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900">
                  ⚠️ आपने टेस्ट लिंक (<code>/dev</code>) डाला है। कृपया Google Apps Script में <strong>Deploy &gt; Manage deployments</strong> पर जाकर मुख्य लिंक (<code>/exec</code>) कॉपी करके डालें।
                </div>
              )}

              {sheetsUrl.includes('script.google.com') && sheetsUrl.includes('/exec') && (
                <div className="p-2.5 rounded-xl bg-emerald-100/80 border border-emerald-300 text-xs text-emerald-900 flex items-center gap-2 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>✓ मान्य Google Apps Script Web App URL प्रारूप। अब आप नीचे दिए गए बटनों से सिंक कर सकते हैं।</span>
                </div>
              )}
            </div>

            {/* Three Action Buttons: AUTO-SEED, PULL & PUSH */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* Button 1: Auto Seed & Sync */}
              <button
                onClick={handleAutoSeedAndSync}
                disabled={isSeeding}
                className="py-3 px-3.5 rounded-xl bg-linear-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white font-bold text-xs sm:text-xs shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
                title="यदि शीट नई है तो सारा डेटा अपने आप भर देगा"
              >
                <FileSpreadsheet className={`w-4 h-4 ${isSeeding ? 'animate-bounce' : ''}`} />
                <span>{isSeeding ? 'सीड हो रहा है...' : '🌱 प्रारंभिक डेटा भरें (Auto Seed)'}</span>
              </button>

              {/* Button 2: PULL (Fetch from Google Sheet to Admin Panel) */}
              <button
                onClick={handlePullFromSheets}
                disabled={isPulling}
                className="py-3 px-3.5 rounded-xl bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs sm:text-xs shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
                title="स्प्रेडशीट में किया गया नया बदलाव तुरंत यहाँ लाएं"
              >
                <RefreshCw className={`w-4 h-4 ${isPulling ? 'animate-spin' : ''}`} />
                <span>{isPulling ? 'शीट से लोड हो रहा है...' : '📥 शीट से डेटा लोड करें (Pull)'}</span>
              </button>

              {/* Button 3: PUSH (Send current portal data into Google Sheet) */}
              <button
                onClick={handlePushToSheets}
                disabled={isPushing}
                className="py-3 px-3.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs sm:text-xs shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
                title="वर्तमान डेटा गूगल शीट में भेजें"
              >
                <Upload className={`w-4 h-4 ${isPushing ? 'animate-bounce' : ''}`} />
                <span>{isPushing ? 'शीट में भेजा जा रहा है...' : '📤 डेटा शीट में भेजें (Push)'}</span>
              </button>
            </div>

            {/* Sync Status Banner */}
            {syncStatus && (
              <div className="p-3 rounded-xl bg-white border border-emerald-300 text-xs font-semibold text-stone-800 flex items-start gap-2 shadow-2xs">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{syncStatus}</span>
              </div>
            )}

            {/* Visual Guide to the 4 Spreadsheet Tabs */}
            <div className="p-4 rounded-xl bg-white border border-emerald-200 space-y-3">
              <span className="text-xs font-bold text-stone-800 block">
                📋 आपकी गूगल स्प्रेडशीट में ये ४ अलग-अलग शीट्स (Tabs) बनेंगी:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-orange-50/60 border border-orange-200">
                  <span className="font-bold text-orange-950 block">१. Donations (चंदा विवरण)</span>
                  <span className="text-stone-600 font-mono text-[10px]">ID, Year, Donor Name, Village Ward, Amount, Date, Payment Method, Receipt No, Remarks, Phone, Verified By</span>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200">
                  <span className="font-bold text-amber-950 block">२. Expenses (खर्च विवरण)</span>
                  <span className="text-stone-600 font-mono text-[10px]">ID, Year, Title, Category, Amount, Date, Vendor Name, Description, Voucher No, Paid By</span>
                </div>
                <div className="p-2.5 rounded-lg bg-yellow-50/60 border border-yellow-200">
                  <span className="font-bold text-yellow-950 block">३. Announcements (सूचनाएँ)</span>
                  <span className="text-stone-600 font-mono text-[10px]">ID, Title Hindi, Title English, Description Hindi, Date, Priority, Category, Is Pinned</span>
                </div>
                <div className="p-2.5 rounded-lg bg-purple-50/60 border border-purple-200">
                  <span className="font-bold text-purple-950 block">४. Committee (छठ कमिटी)</span>
                  <span className="text-stone-600 font-mono text-[10px]">ID, Name Hindi, Role Hindi, Category, Ward, Phone, Tenure</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: DIRECT CSV / SPREADSHEET PASTE & IMPORT TOOL */}
          <div className="p-5 sm:p-6 rounded-2xl bg-stone-50 border border-stone-300 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-700" />
                <span>वैकल्पिक: एक्सेल या गूगल शीट से सीधे कॉपी-पेस्ट करके अपडेट करें</span>
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                यदि आप गूगल ऐप्स स्क्रिप्ट नहीं लगाना चाहते, तो अपनी स्प्रेडशीट की पंक्तियाँ यहाँ सीधे पेस्ट करके या CSV फ़ाइल अपलोड करके भी एडमिन पैनल में डेटा अपडेट कर सकते हैं।
              </p>
            </div>

            {/* Module Picker */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-stone-700">विभाग चुनें:</span>
              {(['donations', 'expenses', 'announcements', 'committee'] as const).map((m) => {
                const labels = {
                  donations: '१. दान (Donations)',
                  expenses: '२. खर्च (Expenses)',
                  announcements: '३. सूचनाएँ (Announcements)',
                  committee: '४. समिति (Committee)',
                };
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setCsvModule(m);
                      setCsvResult(null);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      csvModule === m
                        ? 'bg-orange-600 text-white shadow-2xs'
                        : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {labels[m]}
                  </button>
                );
              })}
            </div>

            {/* Textarea for CSV */}
            <form onSubmit={handleCSVImportSubmit} className="space-y-3">
              <textarea
                rows={4}
                value={csvInputText}
                onChange={(e) => setCsvInputText(e.target.value)}
                placeholder={
                  csvModule === 'donations'
                    ? 'रसीद संख्या, वर्ष, दानदाता का नाम, वार्ड/टोला, राशि, दिनांक, भुगतान माध्यम, सत्यापितकर्ता, टिप्पणी...\nउदा: CP-26-050, 2026, श्री दिनेश कुमार, वार्ड ०३, 5000, 2026-11-05, Cash, कोषाध्यक्ष, घाट दीपदान'
                    : csvModule === 'expenses'
                    ? 'वाउचर संख्या, वर्ष, मद शीर्षक, श्रेणी, राशि, दिनांक, वेंडर का नाम, भुगतानकर्ता, विवरण...\nउदा: V-26-20, 2026, सजावट सामान, Decoration, 7500, 2026-11-06, माँ काली टेंट, सचिव, मंडप सजावट'
                    : csvModule === 'announcements'
                    ? 'ID, शीर्षक हिंदी, शीर्षक अंग्रेजी, विवरण, दिनांक, प्राथमिकता, श्रेणी, पिन...\nउदा: ann-101, घाट सफाई अभियान, Ghat Cleaning, कल शाम ५ बजे, 2026-11-05, urgent, ghat, TRUE'
                    : 'ID, नाम हिंदी, पद हिंदी, श्रेणी, वार्ड/पता, मोबाइल नंबर, कार्यकाल...\nउदा: mem-101, श्री रमेश सिंह, उप-सचिव, executive, वार्ड ०२, 9835xxxx11, २०२६ - २०२८'
                }
                className="w-full p-3 bg-white border border-stone-300 rounded-xl font-mono text-xs focus:outline-none focus:border-amber-600"
              />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadModuleCSV(csvModule)}
                  className="px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-amber-100"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>इस विभाग की टेम्पलेट फ़ाइल डाउनलोड करें</span>
                </button>

                <button
                  type="submit"
                  disabled={!csvInputText.trim()}
                  className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>डेटा आयात करें (Import to Admin Panel)</span>
                </button>
              </div>

              {csvResult && (
                <div
                  className={`p-3 rounded-xl text-xs font-semibold ${
                    csvResult.success
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                      : 'bg-rose-50 border border-rose-300 text-rose-900'
                  }`}
                >
                  {csvResult.message}
                </div>
              )}
            </form>
          </div>

          {/* SECTION 3: STEP-BY-STEP APPS SCRIPT SETUP GUIDE */}
          <div className="space-y-4 text-xs text-stone-700 pt-2 border-t border-stone-200">
            <h3 className="text-sm font-bold text-stone-900">
              {lang === 'hi' ? 'गूगल शीट्स ऐप्स स्क्रिप्ट सेटअप गाइड (४ सरल चरण)' : 'Simple 4-Step Google Apps Script Setup Guide'}
            </h3>
            <ol className="space-y-2.5 list-decimal list-inside leading-relaxed bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200">
              <li>
                ब्राउज़र में <strong>sheets.new</strong> खोलें और अपनी स्प्रेडशीट का नाम रखें <em>"छठ पूजा समिति अधलालपुर - २०२६"</em>।
              </li>
              <li>
                ऊपर मेन्यू में <strong>Extensions &gt; Apps Script</strong> पर क्लिक करें।
              </li>
              <li>
                नीचे दिए गए नीले बटन <strong>"ऐप्स स्क्रिप्ट कोड कॉपी करें"</strong> पर क्लिक करें और Apps Script के <code>Code.gs</code> में सारा पुराना कोड मिटाकर पेस्ट कर दें (Save बटन दबाएं)।
              </li>
              <li>
                ऊपर दाईं ओर नीली बटन <strong>Deploy &gt; New deployment</strong> पर क्लिक करें:
                <ul className="list-disc list-inside ml-5 mt-1 text-stone-600 space-y-0.5">
                  <li>प्रकार (Type): <strong>Web app</strong> चुनें</li>
                  <li>Execute as: <strong>Me (आपकी ईमेल आईडी)</strong></li>
                  <li>Who has access: <strong>Anyone (कोई भी)</strong></li>
                </ul>
              </li>
              <li>
                तैनाती के बाद मिले <strong>Web app URL</strong> को कॉपी करके ऊपर दिए गए इनपुट बॉक्स में पेस्ट कर <strong>"URL सुरक्षित करें"</strong> और फिर <strong>"गूगल शीट से नया डेटा लोड करें"</strong> दबाएं!
              </li>
            </ol>

            {/* Ready-to-use Code Copy Box */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xs font-bold text-stone-800">
                  Google Apps Script (Code.gs) - ४ विभागों (दान, खर्च, सूचनाएँ, समिति) का तैयार कोड
                </span>
                <button
                  onClick={handleCopyScript}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedScript ? '✓ कोड कॉपी हो गया!' : 'ऐप्स स्क्रिप्ट कोड कॉपी करें'}</span>
                </button>
              </div>
              <pre className="bg-stone-950 text-amber-200 p-4 rounded-xl text-[11px] font-mono overflow-x-auto max-h-64 leading-relaxed border border-stone-800">
                {DataService.getGoogleAppsScriptCode()}
              </pre>
            </div>
          </div>

        </div>
      )}

      {/* TAB 7: DATA BACKUP & RESET */}
      {activeTab === 'backup' && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-xl font-bold text-stone-900">
              {lang === 'hi' ? 'डेटा बैकअप एवं संपूर्ण संग्रह' : 'System Backup & Recovery'}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              {lang === 'hi' ? 'सुरक्षित ऑफलाइन बैकअप हेतु संपूर्ण डेटाबेस को एक क्लिक में डाउनलोड करें।' : 'Download complete audit ledgers in JSON or CSV format.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-stone-200 bg-stone-50/70 space-y-3">
              <h3 className="font-bold text-stone-900 text-sm">
                {lang === 'hi' ? 'संपूर्ण JSON बैकअप डाउनलोड करें' : 'Download Complete JSON Backup'}
              </h3>
              <p className="text-xs text-stone-600">
                {lang === 'hi'
                  ? 'इसमें सभी वर्षों के दान, खर्च, सदस्य, घोषणाएं एवं वीथिका शामिल हैं।'
                  : 'Includes full multi-year records, members, announcements, and configuration.'}
              </p>
              <button
                onClick={handleExportJSON}
                className="px-4 py-2 bg-stone-900 hover:bg-black text-white text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>JSON बैकअप फाइल डाउनलोड</span>
              </button>
            </div>

            <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-3">
              <h3 className="font-bold text-rose-900 text-sm">
                {lang === 'hi' ? 'डेटा रीसेट (सावधानी बरतें)' : 'Reset Sample Records'}
              </h3>
              <p className="text-xs text-rose-700">
                {lang === 'hi'
                  ? 'स्थानीय बदलावों को मिटाकर पुनः प्रारंभिक गाँव समिति के प्रमाणित रिकॉर्ड्स पर वापस ले जाएं।'
                  : 'Restores initial authentic records for 2024, 2025, and 2026.'}
              </p>
              <button
                onClick={confirmResetAll}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>प्रारंभिक स्थिति में रीसेट करें</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IN-APP DELETE CONFIRMATION MODAL (100% Reliable in all browsers & iframes) */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">{deleteTarget.title}</h3>
                <p className="text-xs text-stone-500">क्या आप निश्चित रूप से इसे हटाना चाहते हैं?</p>
              </div>
            </div>

            {deleteTarget.details && (
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800">
                {deleteTarget.details}
              </div>
            )}

            <p className="text-[11px] text-rose-600 font-medium leading-relaxed">
              ⚠️ यह कार्रवाई तुरंत लागू होगी और संबंधित रिकॉर्ड को पोर्टल से हटा देगी।
            </p>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold cursor-pointer transition-colors"
              >
                रद्द करें (Cancel)
              </button>
              <button
                type="button"
                onClick={handleExecuteDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>हाँ, हटाएं (Confirm Delete)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200 border border-stone-700">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
