import { Body, Controller, Param, ParseUUIDPipe, Post, Req, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateRatingDto } from './dto/create-rating.dto';
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
}
