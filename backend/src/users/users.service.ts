import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // create entity only
  create(data: Partial<User>) {
    return this.userRepo.create(data);
  }

  // save entity
  save(user: User) {
    return this.userRepo.save(user);
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  findById(id: string) {
    return this.userRepo.findOne({
      where: { id },
    });
  }

  async findAll(filters: any) {
    const query: any = {};

    if (filters.name)
      query.name = Like(`%${filters.name}%`);

    if (filters.email)
      query.email = Like(`%${filters.email}%`);

    if (filters.address)
      query.address = Like(`%${filters.address}%`);

    if (filters.role)
      query.role = filters.role;

    return this.userRepo.find({
      where: query,
      order: {
        [filters.sortBy || 'name']:
          filters.sortOrder || 'ASC',
      },
    });
  }
}