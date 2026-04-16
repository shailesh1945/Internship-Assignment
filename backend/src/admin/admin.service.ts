import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { Store } from '../stores/entities/store.entity';
import { Rating } from '../ratings/entities/rating.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Store) private storeRepo: Repository<Store>,
    @InjectRepository(Rating) private ratingRepo: Repository<Rating>,
  ) {}

  // 📊 Dashboard
  async getDashboardStats() {
    const users = await this.userRepo.count();
    const stores = await this.storeRepo.count();
    const ratings = await this.ratingRepo.count();

    return { users, stores, ratings };
  }

  // 👥 Create User (Admin)
  async createUser(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.userRepo.save({
      ...data,
      password_hash: hashedPassword,
    });
  }

  // 🏪 Create Store
  async createStore(data: any) {
    return this.storeRepo.save(data);
  }
}