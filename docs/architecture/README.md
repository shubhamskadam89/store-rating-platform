# Architecture Documentation

This directory documents the high-level system architecture, deployment strategy, and technical stack of the **Store Rating Platform**.

---

## 1. System Overview

The platform uses a standard decoupled client-server architecture.
- **Frontend**: A Single Page Application (SPA) built with React and Vite. It consumes RESTful APIs.
- **Backend**: A Node.js API built with NestJS, providing structured, type-safe endpoints.
- **Database**: PostgreSQL database accessed via Prisma ORM.

---

## 2. Technical Stack

| Layer | Technology | Justification |
| :--- | :--- | :--- |
| **Frontend Framework** | React + Vite | Fast HMR, component-driven UI, modern ecosystem. |
| **Styling** | Vanilla CSS | Custom, design-system-driven aesthetic without the overhead of heavy frameworks. |
| **Backend Framework** | NestJS | Enforces a scalable architecture, dependency injection, and modular design. |
| **ORM** | Prisma | Type-safe database access, automated migrations, and a clean schema definition. |
| **Database** | PostgreSQL 16 | Robust relational data integrity and complex querying capabilities. |
| **Authentication** | JWT (JSON Web Tokens) | Stateless, scalable authentication ideal for decoupled SPA/API architectures. |

---

## 3. Deployment Strategy

The application is configured for a **split deployment model**:

### Frontend (Vercel)
- Vercel provides a global CDN, edge caching, and seamless CI/CD for Vite/React applications.
- React Router client-side routing is handled via `vercel.json` rewrites.

### Backend & Database (Render / Railway)
- The NestJS API is containerized using Docker and deployed as a Web Service.
- Render/Railway provides persistent PostgreSQL instances that handle the relational data securely.
- Cross-Origin Resource Sharing (CORS) is configured dynamically via the `CORS_ORIGIN` environment variable to securely connect the frontend and backend.

---

## 4. Security Architecture

- **Passwords**: Hashed using bcrypt with an appropriate salt round prior to database storage.
- **Access Control**: Role-Based Access Control (RBAC) is enforced using NestJS Guards (`@Roles()`).
- **Data Validation**: Enforced at the boundary using NestJS `ValidationPipe` and `class-validator` to prevent injection attacks and ensure data integrity.
