import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rating } from './entities/rating.entity';
import { Store } from '../stores/entities/store.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating) private ratingRepo: Repository<Rating>,
    @InjectRepository(Store) private storeRepo: Repository<Store>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async submit(data: any, userId: string) {
    if (data.value < 1 || data.value > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    const existing = await this.ratingRepo.findOne({
      where: {
        user: { id: userId },
        store: { id: data.storeId },
      },
    });

    if (existing) {
      throw new BadRequestException('Already rated. Use update.');
    }

    return this.ratingRepo.save({
      value: data.value,
      user: { id: userId },
      store: { id: data.storeId },
    });
  }

  async update(id: string, value: number) {
    if (value < 1 || value > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    await this.ratingRepo.update(id, { value });

    return { message: 'Rating updated' };
  }
}