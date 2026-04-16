import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { Store } from './entities/store.entity';
import { Rating } from '../ratings/entities/rating.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store) private storeRepo: Repository<Store>,
    @InjectRepository(Rating) private ratingRepo: Repository<Rating>,
  ) {}

  async findAll(filters: any) {
    const qb = this.storeRepo.createQueryBuilder('store');

    if (filters.name) {
      qb.andWhere('store.name ILIKE :name', { name: `%${filters.name}%` });
    }

    if (filters.address) {
      qb.andWhere('store.address ILIKE :address', {
        address: `%${filters.address}%`,
      });
    }

    qb.leftJoinAndSelect('store.owner', 'owner');

    qb.leftJoin(Rating, 'rating', 'rating.storeId = store.id')
      .addSelect('AVG(rating.value)', 'averageRating')
      .groupBy('store.id')
      .addGroupBy('owner.id');

    // 🔽 Sorting
    qb.orderBy(`store.${filters.sortBy || 'name'}`, filters.sortOrder || 'ASC');

    return qb.getRawAndEntities();
  }

  async getOwnerDashboard(ownerId: string) {
  const stores = await this.storeRepo.find({
    where: { owner: { id: ownerId } },
  });

  const storeIds = stores.map((s) => s.id);

  // ✅ FIX: handle empty case
  if (storeIds.length === 0) {
    return {
      stores: [],
      ratings: [],
      averageRating: null,
    };
  }

  const ratings = await this.ratingRepo.find({
    where: { store: { id: In(storeIds) } },
    relations: ['user', 'store'],
  });

  const avg = await this.ratingRepo
    .createQueryBuilder('rating')
    .select('AVG(rating.value)', 'avg')
    .where('rating.storeId IN (:...ids)', { ids: storeIds })
    .getRawOne();

  return {
    stores,
    ratings,
    averageRating: avg.avg,
  };
}
}
