# Store Rating Platform - Frontend

React + TypeScript frontend application built with Vite for the Store Rating Platform.

---

## Technical Stack

- **Framework**: React 18
- **Build Tool**: Vite 6
- **Language**: TypeScript (Strict Mode enabled)
- **Testing**: Vitest & React Testing Library
- **Code Quality**: ESLint, Prettier

---

## Directory Structure

```text
frontend/
├── public/                  # Static assets
├── src/
│   ├── api/                 # API client services and HTTP handlers
│   ├── components/          # Reusable component library
│   │   ├── common/          # Primitive components (buttons, badges, modals, etc.)
│   │   ├── forms/           # Form inputs, validations, and field controls
│   │   ├── layout/          # Page layouts, headers, sidebars, footers
│   │   └── tables/          # Data tables and grid components
│   ├── features/            # Feature-specific components and state
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page-level route views
│   ├── routes/              # Routing definitions and route protection
│   ├── types/               # TypeScript declarations and domain types
│   ├── utils/               # Helper functions and formatters
│   ├── test/                # Test setup and mocks
│   ├── App.tsx              # Application shell component
│   ├── App.test.tsx         # Starter test suite
│   ├── App.css              # Starter shell styles
│   ├── index.css            # Base global typography and reset styles
│   └── main.tsx             # Application entry point
├── Dockerfile               # Development container definition
├── .env.example             # Frontend environment template
├── .eslintrc.cjs            # ESLint configuration
├── .prettierrc              # Prettier formatting rules
├── tsconfig.json            # Solution tsconfig
├── tsconfig.app.json        # Application TypeScript configuration (strict mode)
├── tsconfig.node.json       # Vite config TypeScript configuration
├── vite.config.ts           # Vite bundler and test configuration
├── package.json             # Dependencies and scripts
└── README.md                # Frontend documentation
```

---

## Setup & Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   ```bash
   cp .env.example .env
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and compile production bundle |
| `npm run preview` | Locally preview production build |
| `npm run lint` | Run ESLint check |
| `npm run lint:fix` | Fix auto-fixable ESLint issues |
| `npm run format` | Format source code with Prettier |
| `npm run format:check` | Check code formatting compliance |
| `npm run test` | Run tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |
