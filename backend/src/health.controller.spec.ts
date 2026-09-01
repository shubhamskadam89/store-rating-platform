import { Test } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { PrismaService } from './database/prisma.service';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: PrismaService,
          useValue: { $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]) },
        },
      ],
    }).compile();

    controller = moduleRef.get(HealthController);
  });

  it('reports ok when the database answers', async () => {
    await expect(controller.check()).resolves.toEqual({ status: 'ok', database: 'up' });
  });
});
