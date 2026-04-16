import { TypeOrmModuleOptions } from '@nestjs/typeorm';


export const dataSourceOptions: TypeOrmModuleOptions = {
  type: 'postgres', // ✅ now strongly typed
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'Stark@1945',
  database: process.env.DB_NAME || 'store_rating',
  autoLoadEntities: true,
  synchronize: true,
};