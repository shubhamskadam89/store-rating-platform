import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, storeId: string, createRatingDto: CreateRatingDto) {
    const store = await this.prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    const existingRating = await this.prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
    });

    if (existingRating) {
      throw new ConflictException('You have already rated this store');
    }

    try {
      return await this.prisma.rating.create({
        data: {
          value: createRatingDto.value,
          userId,
          storeId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('You have already rated this store');
      }
      throw error;
    }
  }

  async update(userId: string, storeId: string, updateRatingDto: UpdateRatingDto) {
    const store = await this.prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    const existingRating = await this.prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
    });

    if (!existingRating) {
      throw new NotFoundException('Rating not found');
    }

    return this.prisma.rating.update({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
      data: {
        value: updateRatingDto.value,
      },
    });
  }
}
