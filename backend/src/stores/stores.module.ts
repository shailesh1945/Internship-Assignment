import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { Store } from "./entities/store.entity";
import { Rating } from "../ratings/entities/rating.entity";
import { StoresController } from "./stores.controller";
import { StoresService } from "./stores.service";

@Module({
  imports: [TypeOrmModule.forFeature([Store, Rating])],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}