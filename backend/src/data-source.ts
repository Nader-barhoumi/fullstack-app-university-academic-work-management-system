// src/data-source.ts
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config(); // Load .env file

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres', // or your database type
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: String(configService.get('DB_PASS')),
  database: configService.get('DB_NAME'),
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
});