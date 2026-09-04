import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { OwnerController } from './owner.controller';
import { StoresService } from './stores.service';

@Module({
  controllers: [StoresController, OwnerController],
  providers: [StoresService],
})
export class StoresModule {}
