# Store Rating Platform - Backend

NestJS backend application providing the REST API for the Store Rating Platform.

---

## Technical Stack

- **Framework**: NestJS 10
- **Language**: TypeScript (Strict Mode enabled)
- **Database ORM**: Prisma ORM (PostgreSQL)
- **Testing**: Jest (Unit & E2E)
- **Code Quality**: ESLint, Prettier

---

## Directory Structure

```text
backend/
├── prisma/
│   └── schema.prisma        # Prisma datasource and schema definitions
├── src/
│   ├── common/              # Common utilities, decorators, guards, filters, interceptors
│   ├── config/              # Configuration services and validation schemas
│   ├── database/            # Database module and Prisma service
│   ├── app.controller.ts    # Base healthcheck controller
│   ├── app.module.ts        # Root application module
│   ├── app.service.ts       # Base application service
│   └── main.ts              # Application bootstrap entry point
├── test/
│   ├── app.e2e-spec.ts      # E2E test suite
│   └── jest-e2e.json        # E2E Jest configuration
├── Dockerfile               # Development container definition
├── .env.example             # Backend environment template
├── .eslintrc.js             # ESLint configuration
├── .prettierrc              # Prettier formatting rules
├── tsconfig.json            # Base TypeScript configuration (strict mode)
├── tsconfig.build.json      # Production build TypeScript configuration
├── package.json             # Dependencies and npm scripts
└── README.md                # Backend documentation
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

3. **Generate Prisma Client**:
   ```bash
   npm run prisma:generate
   ```

4. **Run Development Server**:
   ```bash
   npm run start:dev
   ```

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run start:dev` | Start the development server with live reload |
| `npm run build` | Compile the TypeScript application into `./dist` |
| `npm run lint` | Run ESLint across TypeScript source and test files |
| `npm run lint:fix` | Fix auto-fixable ESLint issues |
| `npm run format` | Format source code with Prettier |
| `npm run format:check` | Check code formatting compliance |
| `npm run test` | Run unit tests with Jest |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:cov` | Generate test coverage report |
