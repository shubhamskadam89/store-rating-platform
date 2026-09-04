# Database Documentation

This directory documents the database design and schema for the **Store Rating Platform**.

---

## Schema Overview

The database is built using PostgreSQL 16 and managed via Prisma ORM.

### 1. User Model
Stores all platform users across the three distinct roles.
- **Fields**:
  - `id` (UUID, Primary Key)
  - `email` (String, Unique)
  - `password` (String, Hashed)
  - `name` (String, 20-60 characters)
  - `address` (String, max 400 characters)
  - `role` (Enum: `NORMAL_USER`, `STORE_OWNER`, `SYSTEM_ADMIN`)
- **Relationships**:
  - One-to-Many with `Store` (Owner)
  - One-to-Many with `Rating` (Customer)

### 2. Store Model
Represents the retail entities on the platform.
- **Fields**:
  - `id` (UUID, Primary Key)
  - `name` (String)
  - `email` (String, Unique)
  - `address` (String)
  - `rating` (Float, average rating, calculated dynamically or cached)
  - `ownerId` (UUID, nullable, Foreign Key to User)
- **Relationships**:
  - Belongs-to `User` (as Owner)
  - One-to-Many with `Rating`

### 3. Rating Model
Records customer feedback for stores.
- **Fields**:
  - `id` (UUID, Primary Key)
  - `userId` (UUID, Foreign Key to User)
  - `storeId` (UUID, Foreign Key to Store)
  - `rating` (Int, 1 to 5 constraint enforced at app level)
  - `createdAt` / `updatedAt` (DateTime)
- **Constraints**:
  - A user can only rate a specific store once (Unique constraint on `[userId, storeId]`).
- **Relationships**:
  - Belongs-to `User`
  - Belongs-to `Store`

---

## Migration Strategy
Database migrations are automatically generated using `npx prisma migrate dev` during local development. In the CI/CD pipeline and production environments, the schema is applied using `npx prisma db push` or `npx prisma migrate deploy` to ensure synchronization without manual intervention.
