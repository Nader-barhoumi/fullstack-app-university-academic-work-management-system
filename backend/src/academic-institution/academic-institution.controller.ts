import { Controller, Get, Put, Body, BadRequestException } from '@nestjs/common';
import { AcademicInstitutionService } from './academic-institution.service';
import { AcademicInstitution } from './entities/academic-institution.entity';
import { UpdateAcademicInstitutionDto } from './dto/update-academic-institution.dto';

@Controller('academic-institution')
export class AcademicInstitutionController {
  constructor(private readonly academicInstitutionService: AcademicInstitutionService) {}

  @Get()
  async findOne(): Promise<AcademicInstitution> {
    const institution = await this.academicInstitutionService.getHostInstitution();
    if (!institution) {
      throw new BadRequestException('Academic institution not found');
    }
    return institution;
  }

  @Put()
  async update(@Body() updateDto: UpdateAcademicInstitutionDto): Promise<AcademicInstitution> {
    try {
      return await this.academicInstitutionService.updateHostInstitution(updateDto);
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to update academic institution');
    }
  }
}