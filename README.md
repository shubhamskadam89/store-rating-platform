# What They Say - Store Rating Platform

A full-stack web platform enabling System Administrators to manage users and stores, Normal Users to browse and submit/modify store ratings, and Store Owners to view ratings and analytics for their stores.

---

## Current Status

> **Status**: Completed  
> **Phase**: Deployment & Maintenance

The repository is fully implemented. It features a complete authentication system, a unified dashboard experience with role-based access control, store management, and a modernized UI with stock photography and cohesive branding.

---

## Technology Stack

### Backend
- **Runtime & Language**: Node.js (v22), TypeScript (Strict Mode)
- **Framework**: NestJS
- **ORM & Migrations**: Prisma
- **Database**: PostgreSQL 16
- **Testing**: Jest

### Frontend
- **Runtime & Tooling**: React, TypeScript, Vite
- **Routing**: React Router
- **Testing**: Vitest / React Testing Library
- **Styling**: Modern Vanilla CSS

---

## Seed Data & Test Accounts

The database can be repopulated with authentic sample data by running `npm run seed` in the `backend` directory. This creates **4 authentic users** and **4 distinct stores**, allowing reviewers to easily log in and test all roles.

### User Credentials & Passwords

| Role | Full Name | Email Address | Password |
| :--- | :--- | :--- | :--- |
| **System Admin** | Alexander William Hayes | `admin@whattheysay.com` | `Admin@2026!` |
| **Store Owner** | Marcus Aurelius Bennett | `owner@apexfresh.com` | `Owner@2026!` |
| **Normal User 1** | Sophia Elena Rodriguez | `sophia.rodriguez@example.com` | `User1@2026!` |
| **Normal User 2** | Jonathan David Fletcher | `jonathan.fletcher@example.com` | `User2@2026!` |

### Seeded Stores

| Category | Store Name | Assigned Owner | Initial Ratings |
| :--- | :--- | :--- | :--- |
| **Supermarket / Grocery** | Apex Fresh Supermarket | Marcus Aurelius Bennett (`owner@apexfresh.com`) | 4.5 ★ (2 ratings) |
| **Cafe & Bakery** | The Artisan Bakery & Cafe | *Unassigned* (ready to assign in Admin) | 4.5 ★ (2 ratings) |
| **Boutique & Fashion** | Luxe Horizon Boutique | *Unassigned* (ready to assign in Admin) | 4.0 ★ (1 rating) |
| **Electronics & Tech** | NovaTech Electronics & Gadgets | *Unassigned* (ready to assign in Admin) | 5.0 ★ (1 rating) |

---

## Repository Structure

```text
store-rating-platform/
│
├── backend/                  # NestJS API, Prisma Schema, Seeds
├── frontend/                 # Vite + React App, UI Components
├── docs/                     # Technical specifications & ADRs
├── .github/                  # CI workflows
├── docker-compose.yml        # Development multi-container orchestration
└── README.md                 # Project root documentation
```

---

## Getting Started (Local Development)

**Prerequisites**: Node.js 22.x, npm >= 10, Docker & Docker Compose.

1. **Start the Database**:
   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   docker compose up -d postgres
   ```

2. **Run the Backend (API)**:
   ```bash
   cd backend
   npm install
   npx prisma db push
   npm run seed
   npm run start:dev
   ```
   *The API will be available at http://localhost:3000/api*

3. **Run the Frontend (UI)**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The Frontend will be available at http://localhost:5173*

---

## Deployment

The application is configured for a split deployment architecture:
- **Frontend**: Optimized for Vercel (includes `vercel.json` for React Router).
- **Backend**: Optimized for Render or Railway using Docker and Postgres.

Please refer to the setup steps in the repository for connecting the Vercel frontend `VITE_API_BASE_URL` to the deployed backend URL.

---

## Contribution Guidelines

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch naming conventions, Conventional Commits standard, Pull Request checklists, and the Definition of Done.
