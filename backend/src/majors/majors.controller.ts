import { Controller, Get, Post, Body, Patch, Param, Delete , BadRequestException } from '@nestjs/common';
import { MajorsService } from './majors.service';
import { CreateMajorDto } from './dto/create-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';
import { Major } from './entities/major.entity';
import { plainToClass } from 'class-transformer';
import { MajorResponseDto } from './dto/major-response.dto';

@Controller('majors')
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}

  @Post()
  async create(@Body() createMajorDto: CreateMajorDto): Promise<Major | null> {
    if (!createMajorDto) {
      throw new BadRequestException('Invalid major data');
    }
    if (!createMajorDto.name ) {
      throw new BadRequestException('Name is required');
    }

    return await this.majorsService.create(createMajorDto);
  }

  @Get()
  async findAll(): Promise<MajorResponseDto[]> {
    const majors = await this.majorsService.findAll();
    // Transform to DTO array to avoid circular references
    return majors.map(major =>
      plainToClass(MajorResponseDto, major, {
        excludeExtraneousValues: true
      })
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MajorResponseDto | null> {
    const major = await this.majorsService.findOne(+id);
    // Transform to DTO to avoid circular references
    return plainToClass(MajorResponseDto, major, { 
      excludeExtraneousValues: true 
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMajorDto: UpdateMajorDto): Promise<Major> {
    try {
      const Major = await this.majorsService.update(+id, updateMajorDto);
      if (!Major) {
        throw new BadRequestException(`Major with ID ${id} not found`);
      }
      return Major;
    } catch (error) {
      throw new BadRequestException(error.message || 'Invalid major data');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.majorsService.findOne(+id);
    if (!result) {
      throw new BadRequestException(`Major with ID ${id} not found`);
    }
    await this.majorsService.remove(+id);
  }
}
