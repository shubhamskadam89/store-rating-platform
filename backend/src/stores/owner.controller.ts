import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { StoresService } from './stores.service';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    role: string;
    email: string;
  };
}

@Controller('owner')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OwnerController {
  constructor(private readonly storesService: StoresService) {}

  @Get('dashboard')
  @Roles(Role.STORE_OWNER)
  async getOwnerDashboard(@Req() request: AuthenticatedRequest) {
    return this.storesService.getOwnerDashboard(request.user.id);
  }
}
