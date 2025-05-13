import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
  ) {}

 async create(createDepartmentDto: CreateDepartmentDto): Promise<Department | null> {
    const department = this.departmentsRepository.create(createDepartmentDto);
    return this.departmentsRepository.save(department);
  }

  async findAll(): Promise<Department[]> {
    if (!this.departmentsRepository) {
      throw new Error('Department repository not found');
    }
    const departments = await this.departmentsRepository.find();
    return departments;
  }

  async findOne(id: number): Promise<Department | null> {
    if (!this.departmentsRepository) {
      throw new Error('Department repository not found');
    }
    if (isNaN(id)) {
      throw new Error('Invalid ID format');
    }
    return this.departmentsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department | null> {
    if (!this.departmentsRepository) {
      throw new Error('Department repository not found');
    }
    const department = await this.findOne(id);
    if (!department) {
      return null;
    }
    Object.assign(department, updateDepartmentDto);
    return this.departmentsRepository.save(department);
  }

  async remove(id: number): Promise<boolean> {
    const department = await this.findOne(id);
    if (!department) {
      return false;
    }
    await this.departmentsRepository.remove(department);
    return true
  }
}
