# Store Rating Platform

A full-stack web platform enabling System Administrators to manage users and stores, Normal Users to browse and submit/modify store ratings, and Store Owners to view ratings and analytics for their stores.

---

## Current Status

> **Phase**: Repository Initialization & Technical Design  
> **Status**: In Progress (Foundational Setup)

The repository is in the **foundation and technical design phase**. Infrastructure is in place: TypeScript strict mode, linting and formatting, Docker Compose, CI, global error handling, response conventions, environment validation, and a health endpoint.\n\nNo domain models, business logic, or database schema exist yet. Those are derived from the specifications in [`docs/`](./docs/README.md) once each is approved, and delivered through dedicated GitHub issues.

---

## Planned Technology Stack

### Backend

- **Runtime & Language**: Node.js (Pinned via `.nvmrc` to v22), TypeScript (Strict Mode)
- **Framework**: NestJS
- **ORM & Migrations**: Prisma
- **Testing**: Jest (Unit & E2E)

### Frontend

- **Runtime & Tooling**: React, TypeScript (Strict Mode), Vite
- **Testing**: Vitest / React Testing Library
- **Styling**: Modern Vanilla CSS (no premature CSS frameworks)

### Database & Infrastructure

- **Database**: PostgreSQL 16
- **Containerization**: Docker & Docker Compose (Development setup)
- **CI/CD**: GitHub Actions

---

## Repository Structure

```text
store-rating-platform/
│
├── backend/                  # NestJS backend application
│   ├── prisma/               # Database schema & migrations
│   ├── src/
│   │   ├── common/           # Cross-cutting utilities, decorators, guards, filters
│   │   ├── config/           # Environment and runtime configurations
│   │   └── database/         # Database module and Prisma service
│   ├── test/                 # Integration and E2E test suites
│   ├── Dockerfile            # Development Dockerfile for backend
│   ├── .env.example          # Environment variable template for backend
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/                 # Vite + React + TypeScript frontend application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── api/              # API clients and HTTP services
│   │   ├── components/       # Reusable UI component library
│   │   │   ├── common/       # Buttons, badges, modals, typography
│   │   │   ├── forms/        # Input fields, validation wrappers
│   │   │   ├── layout/       # Headers, footers, containers, sidebars
│   │   │   └── tables/       # Data table components
│   │   ├── features/         # Feature-specific modules
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page-level view components
│   │   ├── routes/           # Routing configuration and protected route wrappers
│   │   ├── types/            # Global TypeScript types and domain interfaces
│   │   ├── utils/            # Helper functions and formatters
│   │   ├── App.tsx           # Minimal root component shell
│   │   └── main.tsx          # Frontend entry point
│   ├── Dockerfile            # Development Dockerfile for frontend
│   ├── .env.example          # Environment variable template for frontend
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── docs/                     # Documentation-first design & specifications
│   ├── requirements/         # Product, functional, and non-functional requirements
│   ├── architecture/         # System, backend, frontend, and security architecture
│   ├── database/             # ER diagrams, schemas, constraints, and migration strategies
│   ├── api/                  # API contracts, conventions, errors, and auth rules
│   ├── decisions/            # Architecture Decision Records (ADRs)
│   ├── development/          # Workflow, branching, PR standards, Definition of Done
│   └── README.md             # Documentation structure guide
│
├── .github/                  # GitHub workflows and issue/PR templates
│   ├── ISSUE_TEMPLATE/       # Feature, bug, and technical task templates
│   ├── workflows/            # GitHub Actions CI pipelines
│   └── pull_request_template.md
│
├── .editorconfig             # Consistent editor indentation and newline rules
├── .env.example              # Root environment template (database configuration)
├── .gitignore                # Git ignore rules with explicit exception for .env.example
├── .nvmrc                    # Node.js version pin (22)
├── docker-compose.yml        # Development multi-container orchestration
├── CONTRIBUTING.md           # Engineering guidelines, branching strategy, commit rules
└── README.md                 # Project root documentation (this file)
```

---

## Documentation

This project follows a **documentation-first engineering process**:

```text
Requirements
     ↓
Architecture
     ↓
Database Design
     ↓
API Contracts
     ↓
Architecture Decision Records (ADRs)
     ↓
GitHub Issues
     ↓
Implementation
     ↓
Testing
```

All design documents reside in the [`docs/`](./docs/README.md) directory:

- [docs/requirements/](./docs/requirements/README.md)
- [docs/architecture/](./docs/architecture/README.md)
- [docs/database/](./docs/database/README.md)
- [docs/api/](./docs/api/README.md)
- [docs/decisions/](./docs/decisions/README.md)
- [docs/development/](./docs/development/README.md)

---

## Getting Started

**Prerequisites**: Node.js 22.x (`nvm use`), npm >= 10, Docker & Docker Compose.

### Run the stack

```bash
cp .env.example .env
docker compose up --build
```

| Service      | URL                              |
| :----------- | :------------------------------- |
| Frontend     | http://localhost:5173            |
| API          | http://localhost:3000/api        |
| Health check | http://localhost:3000/api/health |

The database schema is empty by design. The first migration is created only
after the schema specification in `docs/database/` is approved.

### Running on the host instead

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

docker compose up -d postgres

cd backend && npm install && npm run start:dev
cd ../frontend && npm install && npm run dev
```

---

## Contribution Guidelines

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch naming conventions, Conventional Commits standard, Pull Request checklists, and the Definition of Done.
