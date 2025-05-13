import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Major } from './entities/major.entity';
import { MajorsService } from './majors.service';
import { MajorsController } from './majors.controller';
import { Department } from '../departments/entities/department.entity'; // Importing Department entity
@Module({
  imports: [TypeOrmModule.forFeature([Major, Department])], // Importing TypeOrmModule for Major and Department entities
  controllers: [MajorsController],
  providers: [MajorsService],
  exports: [MajorsService], // Exporting MajorsService to be used in other modules
})
export class MajorsModule {}
