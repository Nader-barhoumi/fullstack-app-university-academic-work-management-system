import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Set false in prod
  logging: true,
  entities: ['src/entities/*.ts'],  // Adjust the path to your entities
  migrations: ['src/migrations/*.ts'], // Adjust the path to your migrations 
  subscribers: [],
});
