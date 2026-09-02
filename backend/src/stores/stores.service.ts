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
}
