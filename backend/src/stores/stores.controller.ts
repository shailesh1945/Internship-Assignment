import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('stores')
@UseGuards(AuthGuard('jwt'))
export class StoresController {
  constructor(private storesService: StoresService) {}

  @Get()
  getStores(
    @Query('name') name?: string,
    @Query('address') address?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
  ) {
    return this.storesService.findAll({
      name,
      address,
      sortBy,
      sortOrder,
    });
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('store_owner')
@Get('owner/dashboard')
getOwnerDashboard(@Request() req: any) {
  return this.storesService.getOwnerDashboard(req.user.userId);
}
}