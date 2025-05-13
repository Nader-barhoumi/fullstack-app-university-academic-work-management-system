import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DegreeProgram } from './entities/degree-program.entity';
import { DegreeProgramService } from './degree-programs.service';
import { DegreeProgramsController } from './degree-programs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DegreeProgram])],
  providers: [DegreeProgramService],
  controllers: [DegreeProgramsController],
})
export class DegreeProgramModule {}
