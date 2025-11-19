
# 🚜 KrishiNetra – Blockchain-Based Agricultural Traceability System
A complete supply-chain transparency platform for **Farmers**, **Distributors**, **Retailers**, and **Administrators**.

---

## 🌱 Overview

KrishiNetra is a **secure, blockchain-supported agricultural traceability system** designed to ensure transparency, quality assurance, fair pricing, and fraud prevention throughout the food supply chain.

It provides **end-to-end traceability**:

**Farmer → Distributor → Retailer → Consumer**

---

# 📦 Core Features

---

## 👨‍🌾 Farmer Features
- Create new batches with crop details, quantity, images & documents.
- List batches or open bidding for distributors.
- Receive & manage bids.
- Accept or reject bids → auto-ownership transfer.
- View pricing history, analytics & batch insights.
- Register disputes with file evidence.
- Track dispute resolution timeline.
- Generate public QR codes for transparency.

---

## 🚚 Distributor Features
- Browse listed farmer batches.
- Bid on preferred batches.
- Buy batches with automated sale entry & invoice creation.
- Manage warehouse inventory (ownedBatches).
- List purchased batches for retailers.
- Track shipments with logistics module.
- Raise disputes with supporting files.
- View analytics & pricing trends.

---

## 🏪 Retailer Features
- Browse distributor batch listings.
- Purchase batches with GST calculations.
- Download invoices anytime.
- Maintain inventory & batch history.
- Register disputes for quality issues.
- Access local analytics & pricing insights.

---

## 🛡 Admin Features
- Manage entire dispute system.
- Assign disputes to staff.
- Approve/Reject GST, PAN, Aadhaar, Trade Licence.
- Monitor system-wide analytics.
- Block/unblock users.
- Override batch ownership during escalations.

---

# 🪪 User & KYC Verification
- Aadhaar number input & validation flow.
- PAN / GST / Trade Licence document uploads.
- Admin review panel for verification.
- VerificationStatus stored for every user.
- Notifications sent for verification success/failure.

---

# 🌾 Batch Tracking System

Batch lifecycle:  
**Created → Listed → Bidding → SoldToDistributor → ListedForRetailers → SoldToRetailer → Completed**

Each batch contains:
- Images, documents, farmer & owner info.
- Bidding module (open/closed).
- Trade history log (owner, price, timestamp).
- Additional QC (moisture, purity, grade).
- Expiry tracking (freshnessScore + warnings).
- Ratings after sale.

---

# 💸 Sales & Invoicing
- Multi-item sale structure (sale.items).
- Auto GST calculation.
- Payment methods: UPI / Bank / Cash / Card / Wallet.
- PaymentStatus updated in real time.
- Automatic invoice generation with downloadable PDF.
- Linked to OwnershipHistory → ensures traceability.

---

# 🧾 Dispute Management
- Raised by any role (Farmer/Distributor/Retailer).
- Contains title, description, role, files, status.
- Admin assigns dispute handler.
- Status flow:  
  **Pending → In-Review → Assigned → Resolved → Rejected**
- Resolution details & timestamps stored.

---

# 🛒 Marketplace Features
- Farmer → Distributor marketplace.
- Distributor → Retailer marketplace.
- Smart filters: price, location, crop, freshness.
- Live bidding with real-time notifications.
- Updated stock & availability indicators.

---

# 📨 Notification System

Triggered when:
- New bid placed
- Bid accepted/rejected
- Sale initiated/completed
- KYC verified/rejected
- Dispute updated
- Logistic status changes
- Batch nearing expiry

Includes:
- Title
- Message
- Data payload (deep-link)
- isRead & readAt

---

# 🚚 Logistics Tracking
- Shipment status updates:  
  **Pending → Packed → Dispatched → In-Transit → Out-for-Delivery → Delivered**
- GPS route tracking with timestamps.
- Proof of delivery (photo/signature upload).
- ETA calculation for buyers.
- Linked to Sales & Batches.

---

# 🍃 Expiry Tracking Module
- Calculates expiry using harvestDate + shelfLifeDays.
- FreshnessScore reduces daily.
- Status transitions: Fresh → Warning → Expired.
- History logs maintained.
- Alerts sent to batch owners.

---

# 🔗 Ownership History Tracking
Tracks every ownership transfer:
- Farmer → Distributor
- Distributor → Retailer
- Admin override (special cases)

Stored with:
- oldOwner
- newOwner
- sale reference
- date & notes

---

# 🔄 Complete Workflow (End-to-End)

---

## **1. Farmer Workflow**
1. Sign up → Upload KYC → Admin approves.
2. Create batch with crop details.
3. List batch or open bidding.
4. Distributor places bid → farmer accepts.
5. Sale recorded → invoice generated → ownership updated.
6. Farmer can file disputes or rate distributor.

---

## **2. Distributor Workflow**
1. Sign up → Upload GST/PAN/License → Admin approval.
2. Browse batches & place bids.
3. Purchase accepted batches.
4. Batch moves to distributor inventory.
5. List batch for retailers.
6. Retailer buys → sale completed → invoice generated.
7. Distributor manages logistics & disputes.

---

## **3. Retailer Workflow**
1. Sign up → Upload KYC → Admin approval.
2. Browse distributor listings.
3. Purchase batch → invoice generated.
4. Batch moves to retailer inventory.
5. Retailer may raise disputes or download invoices.

---

## **4. Admin Workflow**
1. Reviews PAN/GST/Aadhaar/License documents.
2. Approves or rejects verification.
3. Manages all disputes (assign & resolve).
4. Monitors system analytics.
5. Controls account activation/blocking.

---

## **5. Batch Lifecycle Workflow**
1. Farmer creates batch.
2. Batch is listed or opened for bidding.
3. Distributor buys → sale recorded → ownership updated.
4. Distributor lists for retailers.
5. Retailer buys → final ownership.
6. Batch marked Completed.

---

## **6. Dispute Workflow**
1. User raises dispute.
2. Evidence uploaded.
3. Admin assigns handler.
4. Handler reviews batch, sale, files.
5. Admin resolves dispute.
6. Notifications sent to all participants.

---

# 📁 Key Models Used
- User
- Farmer
- Distributor
- Retailer
- Batch
- Sale
- Dispute
- OwnershipHistory
- ExpiryTracking
- Logistics
- Notification
- DocumentUpload

Each model is tightly integrated to maintain **complete traceability & auditability**.

---

# 📘 Conclusion
This README provides a complete breakdown of the **features**, **modules**, and **workflows** of the KrishiNetra Traceability System.  
It is written to help **developers, SIH judges, contributors, and stakeholders** understand the architecture clearly.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

