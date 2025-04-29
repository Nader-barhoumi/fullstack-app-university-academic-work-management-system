// src/states/states.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatesService } from './states.service';
import { StatesController } from './states.controller';
import { State } from './entities/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  providers: [StatesService],
  controllers: [StatesController],
  exports: [StatesService],
})
export class StatesModule {}