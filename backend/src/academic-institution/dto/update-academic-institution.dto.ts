import { PartialType } from '@nestjs/mapped-types';
import { CreateAcademicInstitutionDto } from './create-academic-institution.dto';

export class UpdateAcademicInstitutionDto extends PartialType(CreateAcademicInstitutionDto) {}
