import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { StoresService } from './stores.service';
import { Role } from '@prisma/client';
import { CreateStoreDto } from './dto/create-store.dto';
import { Roles } from '../auth/roles.decorator';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

@Controller('stores')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @Roles(Role.SYSTEM_ADMIN)
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getStores(@Req() request: AuthenticatedRequest, @Query('search') search?: string) {
    return this.storesService.getStores(request.user.id, search);
  }
}
