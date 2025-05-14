import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DegreeProgram } from './entities/degree-program.entity';
import { DegreeProgramsService } from './degree-programs.service';
import { DegreeProgramsController } from './degree-programs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DegreeProgram])],
  providers: [DegreeProgramsService],
  controllers: [DegreeProgramsController],
  exports: [DegreeProgramsService], // Exporting DegreeProgramsService to be used in other modules
})
export class DegreeProgramModule {}
