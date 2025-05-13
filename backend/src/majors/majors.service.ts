import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMajorDto } from './dto/create-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';
import { Major } from './entities/major.entity';
import { Department } from '../departments/entities/department.entity';

@Injectable()
export class MajorsService {
  constructor(
    @InjectRepository(Major)
    private readonly majorsRepository: Repository<Major>,
  ) {}

  async create(createMajorDto: CreateMajorDto): Promise<Major | null> {
    // First, create a new Major instance with basic properties
    const major = new Major();
    
    // Copy over simple properties from DTO to entity
    major.name = createMajorDto.name;
    major.description = createMajorDto.description;
    
    // If department ID is provided, set up the relationship
    if (createMajorDto.department) {
      // Create a reference Department object with just the ID
      major.department = { id: createMajorDto.department } as Department;
    }
    // If the department ID is not provided, throw an error
    if (!major.department) {
      throw new BadRequestException('Department ID is required');
    }
    // Save and return the new major
    return await this.majorsRepository.save(major);
  }

  async findAll(): Promise<Major[]> {
    if (!this.majorsRepository) {
      throw new BadRequestException('Major repository not found');
    }
    const majors = await this.majorsRepository.find({
      relations: ['department'], // Include the department relation
    });
    return majors;
  }

  async findOne(id: number): Promise<Major | null> {
    if (!this.majorsRepository) {
      throw new BadRequestException('Major repository not found');
    }
    return await this.majorsRepository.findOne({
      where: { id },
      relations: ['department'], // Include the department relation
    });
  }

  async update(id: number, updateMajorDto: UpdateMajorDto): Promise<Major | null> {
    if (!this.majorsRepository) {
      throw new BadRequestException('Major repository not found');
    }
    const major = await this.majorsRepository.findOne({ where: { id } });
    if (!major) {
      throw new BadRequestException('Major not found');
    }
    // Update the major properties with the DTO values
    Object.assign(major, updateMajorDto);
    return await this.majorsRepository.save(major);
  }

  async remove(id: number): Promise<boolean> {
    const major = await this.findOne(id);
    if (!major) {
      return false;
    } 
    await this.majorsRepository.remove(major);
    return true;
  }
}
