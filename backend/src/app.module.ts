import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { StatesModule } from './states/states.module';
import { AdressesModule } from './adresses/adresses.module';


config();


@Module({
  imports: [
    
    // Use ConfigService with TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false, // false in production
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      }),
    }),
    
    StatesModule,
    
    AdressesModule,
   
  ],
  
})
export class AppModule {}