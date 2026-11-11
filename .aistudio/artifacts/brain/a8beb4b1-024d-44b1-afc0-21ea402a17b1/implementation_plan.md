# Implementation Plan - Google Sheet Structure & Live Two-Way Sync

Integrate a production-ready Google Sheet database architecture with 4 dedicated tabs (**Donations**, **Expenses**, **Announcements**, **Committee**), complete step-by-step instructions for the committee, and full two-way live synchronization in `DataService` that automatically seeds existing village records and updates all records in real time.

---

## User Decisions & Confirmed Requirements
- **Integration Mechanism**: Google Apps Script Web App for automated, zero-cost, two-way live synchronization without requiring complex Google Cloud credentials from village committee members.
- **Initial Connection Behavior**: Automatically seed existing authenticated village records into the newly created Google Sheet on first connection so the spreadsheet is pre-populated with active data immediately.
- **Tab Scope**: 4 distinct, organized tabs:
  1. `Donations` (चंदा / दान विवरण)
  2. `Expenses` (मदवार खर्च एवं वाउचर विवरण)
  3. `Announcements` (ग्राम सूचना पट्ट एवं आदेश)
  4. `Committee` (छठ कमिटी पदाधिकारी एवं स्वयंसेवक)

---

## Proposed Architecture & Changes

### 1. Google Spreadsheet Structure Specification
We specify the exact column structure, data validation, and visual header hierarchy for all 4 sheets:

| Tab Name | Required Columns | Data Types & Formats |
| :--- | :--- | :--- |
| **`Donations`** | `ID`, `Year`, `Donor Name`, `Village Ward`, `Amount`, `Date`, `Payment Method`, `Receipt No`, `Remarks`, `Phone`, `Verified By`, `Created At` | String, Numeric (`YYYY`), String, String, Currency (`INR`), Date (`YYYY-MM-DD`), Enum (`Cash`/`UPI`/`Bank Transfer`/`Cheque`), String, String, String, String, ISO Timestamp |
| **`Expenses`** | `ID`, `Year`, `Title`, `Category`, `Amount`, `Date`, `Vendor Name`, `Description`, `Voucher No`, `Paid By`, `Created At` | String, Numeric (`YYYY`), String, Enum (11 Festival Categories), Currency (`INR`), Date (`YYYY-MM-DD`), String, String, String, String, ISO Timestamp |
| **`Announcements`**| `ID`, `Title Hindi`, `Title English`, `Description Hindi`, `Date`, `Priority`, `Category`, `Is Pinned` | String, String, String, String, Date (`YYYY-MM-DD`), Enum (`urgent`/`important`/`general`), Enum (`ghat`/`meeting`/`cultural`/`security`/`prasad`), Boolean (`TRUE`/`FALSE`) |
| **`Committee`** | `ID`, `Name Hindi`, `Role Hindi`, `Category`, `Ward`, `Phone`, `Tenure` | String, String, String, Enum (`core`/`executive`/`volunteer`), String, String, String (`२०२६ - २०२८`) |

---

### 2. Google Apps Script Engine (`Code.gs`)
Enhance `getGoogleAppsScriptCode()` in `src/services/dataService.ts`:
- **Auto-Initialization (`setupSpreadsheet()`)**: Checks if tabs exist; if not, automatically generates the 4 sheets, formats headers with brand colors (`#EA580C`, `#D97706`, `#78350F`, `#B45309`), freezes the top row, and enables auto-wrap.
- **`doGet(e)`**: Returns clean JSON of all 4 modules (`donations`, `expenses`, `announcements`, `committee`) with HTTP 200/CORS headers, filtering empty trailing rows.
- **`doPost(e)`**: Supports action `syncAll` and `seedInitial` to write back whole batches or individual records without corrupting formula rows.

---

### 3. DataService Upgrades (`src/services/dataService.ts`)
- **`autoSeedIfEmpty(webAppUrl)`**: When connecting a new Google Sheet for the first time, checks if the sheet has records; if empty, automatically pushes the active local village records to populate the sheet.
- **`syncFromGoogleSheet(webAppUrl)`**: Replaces cached records with authoritative Google Sheet rows, maintaining local offline fallback in `localStorage` in case the device loses internet access at the river ghat.
- **Automatic Background Fetch**: Polling every 60 seconds (and on initial portal load) in `src/App.tsx` when a valid Web App URL is present.

---

### 4. Admin Panel & User Experience (`src/pages/AdminPage.tsx`)
- **Prominent Step-by-Step Instructions Card**: Visual walkthrough in Hindi & English explaining:
  1. Creating a free sheet on `sheets.new`.
  2. Pasting the Apps Script into `Extensions > Apps Script`.
  3. Deploying as a Web App with access set to "Anyone".
  4. Entering the URL and clicking "प्रारंभिक डेटा शीट में भरें (Seed)" and "लाइव सिंक चालू करें".
- **Real-Time Health Status Indicator**: Shows connection status, last synced timestamp, and record counts across all 4 tabs.
- **1-Click Download of Template CSV Files**: Pre-formatted template downloads for all 4 sheets.

---

## Verification Plan

### Automated Build & Lint Verification
1. Run `compile_applet` to confirm zero TypeScript compilation errors.
2. Run `lint_applet` to ensure zero linter or syntax errors.

### Manual Functional Testing
1. **Spreadsheet Initialization**: Test `setupSpreadsheet()` logic and sample payload generation.
2. **Seeding Logic**: Trigger `pushToGoogleSheet` to verify all 4 sheets are mapped with complete properties.
3. **Pull Synchronization**: Test `fetchFromGoogleSheet` with mocked response data to verify state reactivity across Donations, Expenses, Announcements, and Committee tabs.
4. **Mobile Responsiveness**: Confirm the Admin Panel spreadsheet tab renders cleanly on mobile without horizontal clipping.
