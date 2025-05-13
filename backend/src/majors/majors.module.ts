import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Major } from './entities/major.entity';
import { MajorsService } from './majors.service';
import { MajorsController } from './majors.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Major])], // Importing TypeOrmModule for Major entity
  controllers: [MajorsController],
  providers: [MajorsService],
  exports: [MajorsService], // Exporting MajorsService to be used in other modules
})
export class MajorsModule {}
