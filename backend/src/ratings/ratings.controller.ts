import {
  Controller,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('ratings')
@UseGuards(AuthGuard('jwt'))
export class RatingsController {
  constructor(private ratingsService: RatingsService) {}

  @Post()
  submitRating(@Body() body: any, @Request() req: any) {
    return this.ratingsService.submit(body, req.user.userId);
  }

  @Patch(':id')
  updateRating(@Param('id') id: string, @Body() body: any) {
    return this.ratingsService.update(id, body.value);
  }
}