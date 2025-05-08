import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AcademicInstitutionService } from './academic-institution.service';
import { CreateAcademicInstitutionDto } from './dto/create-academic-institution.dto';
import { UpdateAcademicInstitutionDto } from './dto/update-academic-institution.dto';

@Controller('academic-institutions')
export class AcademicInstitutionController {
  constructor(private readonly academicInstitutionService: AcademicInstitutionService) {}

  @Post()
  async create(@Body() createDto: CreateAcademicInstitutionDto) {
    try {
      return await this.academicInstitutionService.create(createDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    return await this.academicInstitutionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const institution = await this.academicInstitutionService.findOne(+id);
    if (!institution) {
      throw new HttpException('Institution not found', HttpStatus.NOT_FOUND);
    }
    return institution;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateAcademicInstitutionDto) {
    try {
      const institution = await this.academicInstitutionService.update(+id, updateDto);
      if (!institution) {
        throw new HttpException('Institution not found', HttpStatus.NOT_FOUND);
      }
      return institution;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.academicInstitutionService.remove(+id);
    if (!result) {
      throw new HttpException('Institution not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Institution deleted successfully' };
  }
}