import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { Major } from '../majors/entities/major.entity';
import { AcademicInstitution } from '../academic-institution/entities/academic-institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Major, AcademicInstitution])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports: [DepartmentsService], // Exporting DepartmentsService to be used in other modules
})
export class DepartmentsModule {}
