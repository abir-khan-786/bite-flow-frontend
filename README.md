# 🍽️ BiteFlow SaaS Engine

[![Next.js](https://shields.io)](https://nextjs.org)
[![Tailwind CSS](https://shields.io)](https://tailwindcss.com)
[![Prisma ORM](https://shields.io)](https://prisma.io)
[![Framer Motion](https://shields.io)](https://framer.com)

A premium, hyper-scalable, multi-tenant **Restaurant Management SaaS Platform** engineered with Next.js 16 (Turbopack) Layered Architecture. It features an advanced **Database-per-Tenant Isolated Cluster Model**, touchless digital QR table ordering, smart kitchen pipeline routing, and a real-time analytics dashboard suite.

---

## 🚀 Core Features Matrix

### 🏢 Multi-Tenant Infrastructure Node
* **Isolated Database Engine:** Complete data isolation utilizing `DB-per-Tenant` multi-pool database registry to prevent data leaks and maximize analytical performance.
* **Smart Domain Routing:** High-speed Next.js `proxy` middleware interceptor system managing dynamic runtime subdomains seamlessly (`://biteflow.com`).
* **Super Operator Control Panel:** A secure platform registry interface console for metrics analytics monitoring and dynamic workspace database node provisioning.

### 🛒 Client & Operational Layer
* **Touchless Table QR Flow:** Reactive customer interface mapping with manual validation checks (Table & Name configuration validation tracking input nodes) for instant table checkout orders routing.
* **Live Kitchen Tracker Pipeline:** Production-ready reactive kitchen dashboard table managing sequential order mutation streams (`PENDING` ──> `PREPARING` ──> `SERVED`).
* **Micro-Animations Frame:** Reusable animation wrappers tracking interaction frameworks with beautiful UI notifications engine (`react-hot-toast` + `framer-motion`).

---

## 📂 System Folder Structure & Layered Architecture

The application is structured into a highly maintainable, layered engineering schema isolating backend computational services from structural frontend presentation logic layers:

```text
bite-flow/
├── app/                        # 🚀 FRONTEND ROUTING & PRESENTATION LAYERS
│   ├── (marketing)/            # SaaS Global Main Marketing Group Layouts
│   │   ├── page.tsx            # High-Conversion Platform Landing Interface
│   │   └── register/page.tsx   # Workspace Registration Node Forms Panel
│   ├── (super-admin)/          # Platform Management Core Framework
│   │   └── super-dashboard/    # System Telemetry & Connections Metrics Control
│   ├── app.restaurant/         # Tenant Dynamic Workspace Flow Control
│   │   └── [slug]/             
│   │       ├── dashboard/      # Restaurant Owner Active Analytics Center
│   │       ├── menu/page.tsx   # Responsive Client Touchless QR Menu Terminal
│   │       └── orders/page.tsx # Live Reactive Kitchen Data Tables Workspace
│   ├── layout.tsx              # Root Layout Injection Hub
│   └── globals.css             # Unified Core Tailwind Typography Style Variables
│
├── components/                 # 🎨 REUSABLE UI INTERACTIVE COMPONENTS
│   ├── AnimatedCard.tsx        # Framer Motion entrance & micro-hover transitions wrapper
│   └── ToastProvider.tsx       # Global react-hot-toast orchestration console config
│
├── src/backend/                # 🧠 PURE MODULAR NODE-COMPATIBLE SERVICE LAYER
│   ├── config/                 # Dynamic DB connection drivers database initialization
│   │   ├── centralDb.ts        # Central Registry Master Data Pool Catalog Client
│   │   └── tenantDb.ts         # Multi-client dynamic tenant caching pool builder
│   ├── repositories/           # 📂 DATA ACCESS LAYER (Raw Persistent Infrastructure Queries)
│   │   ├── central.repo.ts     # System database lookup mappings handler scripts
│   │   └── order.repo.ts       # Tenant isolated order transaction schema operations
│   ├── services/               # 🧠 BUSINESS LOGIC LAYER (Modular Execution Orchestrators)
│   │   └── order.service.ts    # Checkout computational data validations payload manager
│   └── utils/                  
│       └── cipher.ts           # AES-256-CBC Cryptographic decryption pipeline for URI strings
│
├── proxy.ts                    # 🔥 Next.js 16 breaking change subdomain interceptor routing engine
├── package.json
└── tailwind.config.js
```

---

## 🛠️ Technology Stack Specifications

* **Core Framework:** Next.js 16.3+ (Turbopack compiler active context)
* **Styling Architecture:** Tailwind CSS + custom component layout variables
* **State Operations:** Local UI data-retention tracking pipelines
* **Database Interface:** Prisma ORM connecting to multiple isolated multi-tenant target server configurations
* **Security Layer:** Crypto Cipher Service with automated `AES-256-CBC` encryption protection loops for connection variables

---

## ⚡ Deployment & Running Development Pipeline

### 1. Configuration Variable Layer (`.env`)
Create a root environment parameters allocation text matrix configuration block inside your project environment runtime variables scope:

```env
# Master SaaS Database Profile Registry
CENTRAL_DATABASE_URL="postgresql://postgres:pass@central-host:5432/main?sslmode=require"

# Secure Decryption String Variables Secret Key Hash Allocation
DATABASE_ENCRYPTION_SECRET="biteflow-32-character-secret-key-pass"
```

### 2. Execution Setup Scripts Command Loops
Execute nicher console instructions to spin up the Turbopack engine or package parameters compilation pipelines setup:

```bash
# 📦 Download dynamic packages framework dependencies configurations
npm install

# ⚡ Run high-performance Next.js 16 runtime dev configuration proxy nodes server
npm run dev
```

---

## 🛡️ Structural Data Integrity & Security Standards
BiteFlow is engineered strictly on standard software quality framework workflows. Database schemas utilize an independent template layout matching format generated dynamically at runtime context dynamically caching connections to suppress performance bottlenecks across isolated tenant workspaces.

Developed with 🤍 to streamline operations for restaurant enterprises worldwide.
