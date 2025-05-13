import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department | null> {
    if (!createDepartmentDto) {
      throw new Error('Invalid department data');
    }
    if (!createDepartmentDto.name || !createDepartmentDto.code) {
      throw new Error('Name and code are required');
    }
    try {
      return await this.departmentsService.create(createDepartmentDto);
    } catch (error) {
      throw new Error(`Failed to create department: ${error.message}`);
    }
  }

  @Get()
  async findAll(): Promise<Department[]> {
    return await this.departmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Department> {
    const department = await this.departmentsService.findOne(+id);
    if (!department) { 
      throw new Error(`Department with ID ${id} not found`);
    }
    return department;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto): Promise<Department | null> {
    try {
      const department = await this.departmentsService.update(+id, updateDepartmentDto);
      if (!department) {
        throw new BadRequestException(`Department with ID ${id} not found`);
      }
      return await this.departmentsService.update(+id, updateDepartmentDto);
    } catch (error) {
      throw new BadRequestException(`Failed to update department: ${error.message}`);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const result =await this.departmentsService.remove(+id);
    if (!result) {
      throw new BadRequestException(`Department with ID ${id} not found`);
    }
  }
}
