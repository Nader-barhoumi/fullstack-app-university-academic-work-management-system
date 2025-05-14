import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Speciality } from './entities/speciality.entity';
import { SpecialitiesService } from './specialities.service';
import { SpecialitiesController } from './specialities.controller';
import { DegreeProgram } from 'src/degree-programs/entities/degree-program.entity';
import { Major } from 'src/majors/entities/major.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Speciality,
      DegreeProgram,
      Major
    ])],
  controllers: [SpecialitiesController],
  providers: [SpecialitiesService],
  exports: [SpecialitiesService], // Exporting SpecialitiesService to be used in other modules
})
export class SpecialitiesModule {}
