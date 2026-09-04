import { ConflictException, Injectable } from '@nestjs/common';
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

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        overallRating: overallRating,
        myRating: myRating,
      };
    });
  }
}
