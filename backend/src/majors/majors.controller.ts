import { Controller, Get, Post, Body, Patch, Param, Delete , BadRequestException } from '@nestjs/common';
import { MajorsService } from './majors.service';
import { CreateMajorDto } from './dto/create-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';
import { Major } from './entities/major.entity';
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

    return this.majorsService.create(createMajorDto);
  }

  @Get()
  async findAll(): Promise<Major[]> {
    return await this.majorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Major | null> {
    const Major = await this.majorsService.findOne(+id);
    if (!Major) {
      throw new BadRequestException(' Major  not found');
    }
    return Major;
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
  }
}
