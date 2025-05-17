import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DegreeProgram } from './entities/degree-program.entity';
import { DegreeProgramsService } from './degree-programs.service';
import { DegreeProgramsController } from './degree-programs.controller';
import { Major } from 'src/majors/entities/major.entity';
import { Speciality } from 'src/specialities/entities/speciality.entity';
import { AcademicInstitution } from 'src/academic-institution/entities/academic-institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DegreeProgram, Major, Speciality, AcademicInstitution])],
  providers: [DegreeProgramsService],
  controllers: [DegreeProgramsController],
  exports: [DegreeProgramsService], // Exporting DegreeProgramsService to be used in other modules
})
export class DegreeProgramModule {}
