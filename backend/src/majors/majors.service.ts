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
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>
  ) {}

  async create(createMajorDto: CreateMajorDto): Promise<Major | null> {
    // First, check if the department exists
    const department = await this.departmentRepository.findOneBy({ 
      id: createMajorDto.department 
    });
    
    if (!department) {
      throw new BadRequestException(`Department with ID ${createMajorDto.department} not found`);
    }
    
    // Create a new Major instance
    const major = new Major();
    major.name = createMajorDto.name;
    major.description = createMajorDto.description;
    major.department = department; // Use the actual department entity
    
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
