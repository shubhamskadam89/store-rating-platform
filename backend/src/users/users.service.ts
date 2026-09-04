import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        address: createUserDto.address,
        role: createUserDto.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async getUsers(search?: string, role?: Role) {
    return this.prisma.user.findMany({
      where: {
        ...(search
          ? {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  email: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  address: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {}),
        ...(role ? { role } : {}),
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async getStats() {
    const [users, stores, ratings] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.store.count(),
      this.prisma.rating.count(),
    ]);

    return {
      users,
      stores,
      ratings,
    };
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        ownedStore: {
          select: {
            id: true,
            name: true,
            email: true,
            address: true,
            ratings: {
              select: {
                value: true,
              },
            },
          },
        },
        ratings: {
          select: {
            id: true,
            value: true,
            createdAt: true,
            updatedAt: true,
            store: {
              select: {
                id: true,
                name: true,
                email: true,
                address: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let storeData = null;
    if (user.ownedStore) {
      const ratings = user.ownedStore.ratings;
      const total = ratings.reduce((sum, r) => sum + r.value, 0);
      const avg = ratings.length > 0 ? Number((total / ratings.length).toFixed(1)) : null;

      storeData = {
        id: user.ownedStore.id,
        name: user.ownedStore.name,
        email: user.ownedStore.email,
        address: user.ownedStore.address,
        rating: avg,
        ratingsCount: ratings.length,
      };
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      ownedStore: storeData,
      ratings: user.ratings,
    };
  }
}
