import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { SpecialitiesService } from './specialities.service';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { Speciality } from './entities/speciality.entity';
import { plainToClass } from 'class-transformer';
import { SpecialityResponseDto } from './dto/speciality-response.dto';

@Controller('specialities')
export class SpecialitiesController {
  constructor(private readonly specialitiesService: SpecialitiesService) {}

  @Post()
  async create(@Body() createSpecialityDto: CreateSpecialityDto): Promise<Speciality | null> {
    if (!createSpecialityDto) {
      throw new BadRequestException('Invalid speciality data');
    }
    if (!createSpecialityDto.name) {
      throw new BadRequestException('Name is required');
    }
    if (!createSpecialityDto.code) {
      throw new BadRequestException('Code is required');
    }
    if (!createSpecialityDto.major) {
      throw new BadRequestException('Major is required');
    }
    return await this.specialitiesService.create(createSpecialityDto);
  }

  @Get()
  async findAll(): Promise<SpecialityResponseDto[]> {
    const specialities = await this.specialitiesService.findAll();
    // Transform to DTO array to avoid circular references
    return specialities.map(speciality => 
      plainToClass(SpecialityResponseDto, speciality, {
        excludeExtraneousValues: true
      })
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SpecialityResponseDto | null> {
    const speciality = await this.specialitiesService.findOne(+id);
    // transform to DTO to avoid circular references
    return plainToClass(SpecialityResponseDto, speciality, {
      excludeExtraneousValues: true
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSpecialityDto: UpdateSpecialityDto): Promise<Speciality | null> {
    try {
      const Speciality = await this.specialitiesService.update(+id, updateSpecialityDto);
      if (!Speciality) {
        throw new BadRequestException(`Speciality with ID ${id} not found`);
      }
      return Speciality;
    } catch (error) {
      throw new BadRequestException(error.message || 'Invalid speciality data');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.specialitiesService.findOne(+id);
    if (!result) {
      throw new BadRequestException(`Speciality with ID ${id} not found`);
    }
    await this.specialitiesService.remove(+id);
  }
}
