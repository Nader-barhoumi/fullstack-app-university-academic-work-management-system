import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Major } from './entities/major.entity';
import { MajorsService } from './majors.service';
import { MajorsController } from './majors.controller';
import { Department } from '../departments/entities/department.entity'; // Importing Department entity
import { Speciality } from 'src/specialities/entities/speciality.entity';
import { DegreeProgram } from 'src/degree-programs/entities/degree-program.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Major, 
      Department,
      Speciality,
      DegreeProgram 
  ])], // Importing TypeOrmModule for Major and Department entities
  controllers: [MajorsController],
  providers: [MajorsService],
  exports: [MajorsService], // Exporting MajorsService to be used in other modules
})
export class MajorsModule {}
