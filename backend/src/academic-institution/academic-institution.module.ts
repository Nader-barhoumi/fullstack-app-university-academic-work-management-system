import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicInstitutionService } from './academic-institution.service';
import { AcademicInstitutionController } from './academic-institution.controller';
import { AcademicInstitution } from './entities/academic-institution.entity';
import { AddressesModule } from '../addresses/addresses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AcademicInstitution]),
    AddressesModule,
  ],
  controllers: [AcademicInstitutionController],
  providers: [AcademicInstitutionService],
  exports: [AcademicInstitutionService],
})
export class AcademicInstitutionModule {}
