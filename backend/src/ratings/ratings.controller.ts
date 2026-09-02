import { Body, Controller, Param, ParseUUIDPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingsService } from './ratings.service';

@Controller('stores/:storeId/ratings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  @Roles(Role.NORMAL_USER)
  create(
    @Param('storeId', ParseUUIDPipe) storeId: string,
    @Body() createRatingDto: CreateRatingDto,
    @Req() req: { user: { id: string } },
  ) {
    return this.ratingsService.create(req.user.id, storeId, createRatingDto);
  }

  @Put()
  @Roles(Role.NORMAL_USER)
  update(
    @Param('storeId', ParseUUIDPipe) storeId: string,
    @Body() updateRatingDto: UpdateRatingDto,
    @Req() req: { user: { id: string } },
  ) {
    return this.ratingsService.update(req.user.id, storeId, updateRatingDto);
  }
}
