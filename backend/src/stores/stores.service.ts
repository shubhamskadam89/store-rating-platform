import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStoreDto: CreateStoreDto) {
    const existingStore = await this.prisma.store.findUnique({
      where: {
        email: createStoreDto.email,
      },
    });

    if (existingStore) {
      throw new ConflictException('Store Email already Registered');
    }

    if (createStoreDto.ownerId) {
      const owner = await this.prisma.user.findUnique({
        where: { id: createStoreDto.ownerId },
      });

      if (!owner) {
        throw new NotFoundException('Selected store owner not found');
      }

      if (owner.role !== Role.STORE_OWNER) {
        throw new BadRequestException('Assigned user must have STORE_OWNER role');
      }

      const existingOwnerStore = await this.prisma.store.findUnique({
        where: { ownerId: createStoreDto.ownerId },
      });

      if (existingOwnerStore) {
        throw new ConflictException('This store owner is already assigned to a store');
      }
    }

    return this.prisma.store.create({
      data: createStoreDto,
    });
  }

  async getStores(userId: string, search?: string) {
    const stores = await this.prisma.store.findMany({
      where: search
        ? {
            OR: [
              {
                name: {
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
        : undefined,
      include: {
        ratings: {
          select: {
            value: true,
            userId: true,
            createdAt: true,
            user: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
    return stores.map((store) => {
      const totalRating = store.ratings.reduce((sum, rating) => sum + rating.value, 0);

      const overallRating =
        store.ratings.length > 0 ? Number((totalRating / store.ratings.length).toFixed(1)) : null;

      const myRating = store.ratings.find((rating) => rating.userId === userId)?.value ?? null;

      const recentRatings = store.ratings.slice(0, 3).map((rating) => ({
        userId: rating.userId,
        userName: rating.user.name,
        value: rating.value,
      }));

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        overallRating: overallRating,
        ratingCount: store.ratings.length,
        myRating: myRating,
        recentRatings,
      };
    });
  }

  async getAdminStores(search?: string) {
    const stores = await this.prisma.store.findMany({
      where: search
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
        : undefined,
      include: {
        ratings: {
          select: {
            value: true,
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return stores.map((store) => {
      const total = store.ratings.reduce((sum, rating) => sum + rating.value, 0);

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        owner: store.owner,
        rating: store.ratings.length > 0 ? Number((total / store.ratings.length).toFixed(1)) : null,
      };
    });
  }

  async getOwnerDashboard(userId: string) {
    const store = await this.prisma.store.findFirst({
      where: {
        ownerId: userId,
      },
      include: {
        ratings: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!store) {
      throw new NotFoundException('No store found assigned to this owner');
    }

    const total = store.ratings.reduce((sum, rating) => sum + rating.value, 0);

    const averageRating =
      store.ratings.length > 0 ? Number((total / store.ratings.length).toFixed(1)) : null;

    return {
      store: {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
      },
      averageRating,
      totalRatings: store.ratings.length,
      ratings: store.ratings.map((rating) => ({
        id: rating.id,
        value: rating.value,
        user: rating.user,
        createdAt: rating.createdAt,
      })),
    };
  }
}
