/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  Announcement,
  CommitteeMember,
  Donation,
  Expense,
  GalleryItem,
  Language,
  PageId,
} from './types';
import { DataService } from './services/dataService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ReceiptModal } from './components/ReceiptModal';
import { VoucherModal } from './components/VoucherModal';
import { DonateModal } from './components/DonateModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SchedulePage } from './pages/SchedulePage';
import { DonationsPage } from './pages/DonationsPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { FinancialDashboardPage } from './pages/FinancialDashboardPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { GalleryPage } from './pages/GalleryPage';
import { GhatLocationPage } from './pages/GhatLocationPage';
import { CommitteePage } from './pages/CommitteePage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  // Fixed to Hindi as requested by the user
  const lang: Language = 'hi';
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('chhath_admin_logged_in') === 'true';
  });

  // Reactive Data State
  const [donations, setDonations] = useState<Donation[]>(() => DataService.getDonations());
  const [expenses, setExpenses] = useState<Expense[]>(() => DataService.getExpenses());
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => DataService.getAnnouncements());
  const [committee, setCommittee] = useState<CommitteeMember[]>(() => DataService.getCommittee());
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => DataService.getGallery());

  // Modals
  const [activeReceiptDonation, setActiveReceiptDonation] = useState<Donation | null>(null);
  const [activeVoucherExpense, setActiveVoucherExpense] = useState<Expense | null>(null);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);

  // Sync data whenever admin makes changes
  const reloadData = () => {
    setDonations(DataService.getDonations());
    setExpenses(DataService.getExpenses());
    setAnnouncements(DataService.getAnnouncements());
    setCommittee(DataService.getCommittee());
    setGalleryItems(DataService.getGallery());
  };

  // Auto-pull updates from Google Sheets on mount and every 60 seconds
  useEffect(() => {
    const syncFromSheets = () => {
      const url = localStorage.getItem('chhath_sheets_url');
      if (url && url.trim().startsWith('http')) {
        DataService.fetchFromGoogleSheet(url)
          .then((res) => {
            if (res.success) {
              reloadData();
            }
          })
          .catch(() => {});
      }
    };

    syncFromSheets();
    const interval = setInterval(syncFromSheets, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAdminLogin = () => {
    sessionStorage.setItem('chhath_admin_logged_in', 'true');
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('chhath_admin_logged_in');
    setIsAdminLoggedIn(false);
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const summary = DataService.getFinancialSummary(selectedYear);

  return (
    <div className="min-h-screen bg-[#FAF5EB] flex flex-col font-sans text-stone-900 selection:bg-amber-500 selection:text-white">
      {/* Sticky Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        selectedYear={selectedYear}
        onSelectYear={(y) => setSelectedYear(y)}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenDonateModal={() => setIsDonateModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            summary={summary}
            year={selectedYear}
            lang={lang}
            onNavigate={handleNavigate}
            announcements={announcements}
            galleryItems={galleryItems}
            onOpenDonateModal={() => setIsDonateModalOpen(true)}
          />
        )}

        {currentPage === 'about' && <AboutPage lang={lang} />}

        {currentPage === 'schedule' && <SchedulePage lang={lang} />}

        {currentPage === 'donations' && (
          <DonationsPage
            donations={donations}
            year={selectedYear}
            lang={lang}
            onViewReceipt={(d) => setActiveReceiptDonation(d)}
            onOpenAddModal={() => handleNavigate('admin')}
          />
        )}

        {currentPage === 'expenses' && (
          <ExpensesPage
            expenses={expenses}
            year={selectedYear}
            lang={lang}
            onViewVoucher={(e) => setActiveVoucherExpense(e)}
            onOpenAddModal={() => handleNavigate('admin')}
          />
        )}

        {currentPage === 'financials' && (
          <FinancialDashboardPage
            summary={summary}
            year={selectedYear}
            onSelectYear={(y) => setSelectedYear(y)}
            lang={lang}
          />
        )}

        {currentPage === 'announcements' && (
          <AnnouncementsPage announcements={announcements} lang={lang} />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage galleryItems={galleryItems} lang={lang} />
        )}

        {currentPage === 'ghat' && <GhatLocationPage lang={lang} />}

        {currentPage === 'committee' && (
          <CommitteePage committee={committee} lang={lang} />
        )}

        {currentPage === 'contact' && <ContactPage lang={lang} />}

        {currentPage === 'admin' && (
          <AdminPage
            lang={lang}
            isLoggedIn={isAdminLoggedIn}
            onLogin={handleAdminLogin}
            onLogout={handleAdminLogout}
            donations={donations}
            expenses={expenses}
            announcements={announcements}
            committee={committee}
            galleryItems={galleryItems}
            onDataChange={reloadData}
          />
        )}
      </main>

      {/* Quick Donate Modal */}
      <DonateModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        onViewDonations={() => handleNavigate('donations')}
      />

      {/* Printable Receipt Modal */}
      <ReceiptModal
        donation={activeReceiptDonation}
        onClose={() => setActiveReceiptDonation(null)}
        lang={lang}
      />

      {/* Voucher Modal */}
      <VoucherModal
        expense={activeVoucherExpense}
        onClose={() => setActiveVoucherExpense(null)}
        lang={lang}
      />

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} lang={lang} />
    </div>
  );
}
