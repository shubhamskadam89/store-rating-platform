import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.validation';
import { PrismaModule } from './database/prisma.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    PrismaModule,
    // Feature modules (auth, users, stores, ratings) are added per GitHub issue.
  ],
  controllers: [HealthController],
})
export class AppModule {}
