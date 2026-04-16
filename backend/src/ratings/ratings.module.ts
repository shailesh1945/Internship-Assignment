import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { Rating } from "./entities/rating.entity";
import { Store } from "../stores/entities/store.entity";
import { User } from "..//users/entities/user.entity";
import { RatingsController } from "./ratings.controller";
import { RatingsService } from "./ratings.service";

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Store, User])],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}