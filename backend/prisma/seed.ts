import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Cleaning database ---');
  await prisma.rating.deleteMany();
  await prisma.store.deleteMany();
  await prisma.user.deleteMany();
  console.log('Database emptied successfully.');

  console.log('\n--- Creating Users ---');
  const adminPasswordHash = await bcrypt.hash('Admin@2026!', 10);
  const ownerPasswordHash = await bcrypt.hash('Owner@2026!', 10);
  const user1PasswordHash = await bcrypt.hash('User1@2026!', 10);
  const user2PasswordHash = await bcrypt.hash('User2@2026!', 10);

  // 1. System Admin
  const admin = await prisma.user.create({
    data: {
      name: 'Alexander William Hayes', // 23 chars (20-60 chars)
      email: 'admin@whattheysay.com',
      password: adminPasswordHash,
      address: '100 Enterprise Boulevard, Suite 500, Austin, TX 78701',
      role: Role.SYSTEM_ADMIN,
    },
  });

  // 2. Store Owner
  const owner = await prisma.user.create({
    data: {
      name: 'Marcus Aurelius Bennett', // 23 chars (20-60 chars)
      email: 'owner@apexfresh.com',
      password: ownerPasswordHash,
      address: '742 Evergreen Terrace, Unit 4B, Springfield, OR 97477',
      role: Role.STORE_OWNER,
    },
  });

  // 3. Normal User 1
  const user1 = await prisma.user.create({
    data: {
      name: 'Sophia Elena Rodriguez', // 22 chars (20-60 chars)
      email: 'sophia.rodriguez@example.com',
      password: user1PasswordHash,
      address: '350 Pine Street, Apartment 12A, Seattle, WA 98101',
      role: Role.NORMAL_USER,
    },
  });

  // 4. Normal User 2
  const user2 = await prisma.user.create({
    data: {
      name: 'Jonathan David Fletcher', // 23 chars (20-60 chars)
      email: 'jonathan.fletcher@example.com',
      password: user2PasswordHash,
      address: '1842 Commonwealth Avenue, Boston, MA 02135',
      role: Role.NORMAL_USER,
    },
  });

  console.log(`Created 4 users:`);
  console.log(`  1. [SYSTEM_ADMIN] ${admin.name} (${admin.email})`);
  console.log(`  2. [STORE_OWNER]  ${owner.name} (${owner.email})`);
  console.log(`  3. [NORMAL_USER]  ${user1.name} (${user1.email})`);
  console.log(`  4. [NORMAL_USER]  ${user2.name} (${user2.email})`);

  console.log('\n--- Creating 4 Distinct Category Stores ---');
  // 1. Supermarket / Grocery
  const store1 = await prisma.store.create({
    data: {
      name: 'Apex Fresh Supermarket',
      email: 'contact@apexfresh.com',
      address: '742 Evergreen Terrace, Suite 100, Springfield, OR 97477',
      ownerId: owner.id,
    },
  });

  // 2. Cafe / Bakery
  const store2 = await prisma.store.create({
    data: {
      name: 'The Artisan Bakery & Cafe',
      email: 'orders@artisanbakerycafe.com',
      address: '452 Grand Avenue, Downtown Arts District, Seattle, WA 98101',
      ownerId: null,
    },
  });

  // 3. Fashion / Boutique
  const store3 = await prisma.store.create({
    data: {
      name: 'Luxe Horizon Boutique',
      email: 'concierge@luxehorizon.com',
      address: '880 Fifth Avenue, Fashion District, New York, NY 10021',
      ownerId: null,
    },
  });

  // 4. Tech / Electronics
  const store4 = await prisma.store.create({
    data: {
      name: 'NovaTech Electronics & Gadgets',
      email: 'support@novatechelectronics.com',
      address: '1200 Innovation Way, Tech Park, San Jose, CA 95134',
      ownerId: null,
    },
  });

  console.log(`Created 4 stores:`);
  console.log(`  1. Supermarket : ${store1.name} (Owner: Marcus Bennett)`);
  console.log(`  2. Cafe/Bakery : ${store2.name} (Unassigned)`);
  console.log(`  3. Boutique    : ${store3.name} (Unassigned)`);
  console.log(`  4. Tech/Retail : ${store4.name} (Unassigned)`);

  console.log('\n--- Creating Sample Verified Ratings ---');
  // Sophia ratings
  await prisma.rating.create({
    data: {
      userId: user1.id,
      storeId: store1.id,
      value: 5,
    },
  });
  await prisma.rating.create({
    data: {
      userId: user1.id,
      storeId: store2.id,
      value: 5,
    },
  });
  await prisma.rating.create({
    data: {
      userId: user1.id,
      storeId: store3.id,
      value: 4,
    },
  });

  // Jonathan ratings
  await prisma.rating.create({
    data: {
      userId: user2.id,
      storeId: store1.id,
      value: 4,
    },
  });
  await prisma.rating.create({
    data: {
      userId: user2.id,
      storeId: store2.id,
      value: 4,
    },
  });
  await prisma.rating.create({
    data: {
      userId: user2.id,
      storeId: store4.id,
      value: 5,
    },
  });

  console.log('Ratings submitted across stores.');
  console.log('\n=== Database Seeding Complete ===\n');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
