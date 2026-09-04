import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.SYSTEM_ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('stats')
  @Roles(Role.SYSTEM_ADMIN)
  async getStats() {
    return this.usersService.getStats();
  }

  @Get(':id')
  @Roles(Role.SYSTEM_ADMIN)
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Get()
  @Roles(Role.SYSTEM_ADMIN)
  async getUsers(@Query('search') search?: string, @Query('role') role?: Role) {
    return this.usersService.getUsers(search, role);
  }
}
