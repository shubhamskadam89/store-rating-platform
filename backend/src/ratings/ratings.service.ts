import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';

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

    return this.prisma.rating.create({
      data: {
        value: createRatingDto.value,
        userId,
        storeId,
      },
    });
  }
}
