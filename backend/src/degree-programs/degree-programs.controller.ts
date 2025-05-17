import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { DegreeProgramsService } from './degree-programs.service';
import { CreateDegreeProgramDto } from './dto/create-degree-program.dto';
import { UpdateDegreeProgramDto } from './dto/update-degree-program.dto';
import { DegreeProgram } from './entities/degree-program.entity';
import { DegreeProgramResponseDto } from './dto/degree-program-response.dto';
import { plainToClass } from 'class-transformer';
@Controller('degree-programs')
export class DegreeProgramsController {
  constructor(private readonly degreeProgramsService: DegreeProgramsService) {}

  @Post()
  async create(@Body() createDegreeProgramDto: CreateDegreeProgramDto) : Promise<DegreeProgram | null> {
    if (!createDegreeProgramDto) {
      throw new BadRequestException('Invalid degree program data');
    }
    if (!createDegreeProgramDto.name) {
      throw new BadRequestException('Name is required');
    }
    if (!createDegreeProgramDto.code) {
      throw new BadRequestException('Code is required');
    }
    if (!createDegreeProgramDto.degree_type) {
      throw new BadRequestException('Degree type is required');
    }
    if (!createDegreeProgramDto.level) {
      throw new BadRequestException('Level is required');
    }
    if (!createDegreeProgramDto.major_id) {
      throw new BadRequestException('Major ID is required');
    }
    if (!createDegreeProgramDto.speciality_id) {
      throw new BadRequestException('Speciality ID is required');
    }
    if (!createDegreeProgramDto.institution_id) {
      throw new BadRequestException('Institution ID is required');
    }

    return await this.degreeProgramsService.create(createDegreeProgramDto);
  }

  @Get()
  async findAll() :Promise<DegreeProgramResponseDto[]> {
    // Fetch all degree programs
    const degreePrograms = await this.degreeProgramsService.findAll();
    // Transform to DTO array to avoid circular references
    return degreePrograms.map(degreeProgram => 
      plainToClass(DegreeProgramResponseDto, degreeProgram, {
        excludeExtraneousValues: true
      })
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) :Promise<DegreeProgramResponseDto | null> {
    const degreeProgram = await this.degreeProgramsService.findOne(+id);
    if (!degreeProgram) {
      return null;
    }
    return plainToClass(DegreeProgramResponseDto, degreeProgram, {
      excludeExtraneousValues: true
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDegreeProgramDto: UpdateDegreeProgramDto) :Promise<DegreeProgram | null> {
    try{
      const degreeProgram = await this.degreeProgramsService.update(+id, updateDegreeProgramDto);
      if (!degreeProgram) {
        throw new BadRequestException(`Degree program with ID ${id} not found`);
      }
      return degreeProgram;
    }catch (error) {
      throw new BadRequestException('Invalid degree program data');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.degreeProgramsService.remove(+id);
  }
}
