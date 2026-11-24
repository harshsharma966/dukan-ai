# 🏪 Kirana Dukan AI (Smart POS & Multi-Tenant Store ERP)

A modern, cloud-ready, and lightweight **Point of Sale (POS), Inventory, and Udhaar Khata (Customer Credit Ledger)** management system tailored for Indian Kirana stores, grocery shops, and retail businesses.

Built with **React 18 (Vite) + Tailwind CSS** on the frontend, **FastAPI (Python)** on the backend, and **100% PostgreSQL** for database persistence with **Multi-Tenant Shop Isolation** and **Role-Based Access Control (Owner vs Cashier)**.

---

## ✨ Key Features

### 1. 🔐 Multi-Tenant Architecture & Role-Based Access (Dukan Malik vs Cashier)
- **Multi-Shop SaaS Isolation:** Multiple stores can register independently. Each shop's data (products, customers, bills, stock, earnings) remains strictly isolated and secure.
- **Owner (दुकान मालिक) vs Cashier (बिल बॉय):**
  - **Owner:** Full access — stock-in (Purchase), delete product, udhaar ledger, daily closing profit reports, cancel bills, and staff management.
  - **Cashier (Bill Boy):** Restricted access — can only access the **Billing Counter (Sell)** and view **Bill History** (reprint slip, share WhatsApp). Purchase, Khata, and Reports are hidden.
  - **Staff Management:** Store owners can add/remove cashiers and set a 4-digit login PIN with 1 click.

### 2. ⚡ Fast POS Billing Counter
- **Walk-in & Customer Billing:** Quick cash sales without mandatory customer details, or tag regular customers.
- **Weights & Loose Unit Conversions:** Real-time billing for packets, kg, grams, and liters with quick shortcut chips (e.g., 250g, 500g, 1kg).
- **Multi-Mode Payments:** Cash, UPI, Udhaar (Full Credit), and Partial Payment (half cash, half credit).
- **Change Calculator:** Auto-calculates cash change (छुट्टे पैसे) to return to the customer.
- **Instant WhatsApp & Print Receipts:** 1-click thermal/A4 print receipts and instant WhatsApp bill sharing.

### 3. 📱 100% Mobile Responsive & Auto-Scaling
- **Mobile-First Cards & Viewport:** Automatically scales to any screen size (mobile, tablet, desktop).
- **Swipeable Navigation Tabs:** Smooth touch-friendly horizontal tab navigation.
- **Card-Based Views on Mobile:** Converts wide desktop data tables in Khata and Bill History into compact mobile cards.
- **Touch-Friendly Controls:** Enlarged buttons (`+`, `-`, payment modes) designed for effortless mobile tapping.

### 4. 📦 Stock IN & Inventory Management
- **Stock In (Purchase):** Record wholesale inventory purchases with purchase cost and selling price.
- **Customizable Low-Stock Limits:** Set re-order thresholds per product to flag fast-moving items before they run out.
- **Safe Product Deletion:** Soft-delete products from inventory while safely preserving past sales/purchase history.
- **Blank Store on Registration:** Newly registered stores start clean with 0 items (no unwanted dummy products).

### 5. 📒 Udhaar Khata & Dedicated Payment Receipts (जमा पर्ची)
- **Customer Ledger:** Real-time tracking of pending balances and month-wise credit statements.
- **Udhaar Settle (Due Deposit):** Collect pending dues via Cash or UPI.
- **Dedicated Payment Receipt Slip:** Automatically generates a dedicated payment receipt on settlement (Shop details, Customer details, Amount Paid, Previous Due, Current Due: ₹0 Settled ✓) with Print and WhatsApp options.
- **Clear Status Badges in Bill History:** Bills display live status badges: `उधार (चुका दिया ✓ / Cleared)` or `उधार (बाकी / Pending: ₹XX)`.

### 6. 📊 Daily Closing & Profit Reports (शाम की क्लोजिंग)
- **Financial Day Closing:** Tracks Total Sales, Cash in Drawer (Sales Cash + Udhaar Recovered - Cash Refunds), UPI in Bank, New Credit Given, and Market Due.
- **Profit & Margin Tracking:** Net earnings (Profit = Selling Price - Cost Price) and profit margins.
- **Sales Returns (वापसी):** Handles item returns with Cash, UPI, or Due Adjustment refunds.

---

## 🛠️ Tech Stack

- **Backend:** Python 3.10+, FastAPI, Uvicorn, psycopg2-binary, PyJWT, Python-Dotenv
- **Database:** PostgreSQL (100% pure PostgreSQL, ACID transactions, relational multi-tenant schema)
- **Frontend:** React 18, Vite, Tailwind CSS, FontAwesome 6
- **Bilingual UI:** Instant 1-click toggle between **हिन्दी (Hindi)** and **English**

---

## 🚀 Getting Started (Setup Guide)

### 1. Clone the Repository
```bash
git clone https://github.com/harshsharma966/ai-dukhan.git
cd ai-dukhan
```

### 2. Backend Setup (Python Virtual Environment)
```bash
# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate   # On Windows
# source venv/bin/activate # On Linux/macOS

# Install dependencies
pip install -r requirements.txt
```

### 3. Database Configuration (.env)
Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5433/kirana_shop
JWT_SECRET=your_secret_jwt_key
```

### 4. Frontend Setup (React / Vite)
```bash
cd frontend
npm install
npm run build
cd ..
```

### 5. Run the Application
```bash
uvicorn app:app --reload --host 127.0.0.1 --port 8000
```
Open your browser and visit:
```
http://127.0.0.1:8000
```

---

## 📂 Project Structure

```
dukan-ai/
├── app.py                 # FastAPI API routes, auth, role middleware & business logic
├── database.py            # PostgreSQL connection pool, schema migrations & queries
├── schema_postgres.sql    # Relational schema (shops, staff, products, sales_bills, customer_payments)
├── requirements.txt       # Python dependencies
├── README.md              # Project documentation
├── modules/
│   ├── customers.py       # Customer khata & monthly ledger statements
│   ├── purchase.py        # Stock in & inventory procurement
│   ├── sales.py           # POS billing & cart calculation
│   ├── post_sale.py       # Udhaar recovery, return items & cancellation logic
│   └── reports.py         # Daily evening closing report & profit margins
└── frontend/              # React (Vite) Single Page Application
    ├── src/
    │   ├── components/    # BillingTab, PurchaseTab, KhataTab, HistoryTab, ReportTab, Header
    │   ├── components/modals/ # StaffModal, PaymentReceiptModal, SettleUdhaarModal, ReceiptModal
    │   ├── App.jsx        # Root component, routing & role state
    │   ├── i18n.js        # Hindi & English localization dictionary
    │   └── utils.js       # WhatsApp bill & payment receipt generator
    └── dist/              # Production static assets
```

---

## 📄 License
MIT License
