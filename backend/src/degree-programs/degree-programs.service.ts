import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DegreeProgram } from './entities/degree-program.entity';
import { CreateDegreeProgramDto } from './dto/create-degree-program.dto';
import { UpdateDegreeProgramDto } from './dto/update-degree-program.dto';

@Injectable()
export class DegreeProgramService {
  constructor(@InjectRepository(DegreeProgram) private readonly repository: Repository<DegreeProgram>) {}

  async findAll(): Promise<DegreeProgram[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<DegreeProgram> {
    const degree = await this.repository.findOne({ where: { id } });
    if (!degree) throw new ConflictException('Degree program not found');
    return degree;
  }

  async create(dto: CreateDegreeProgramDto): Promise<DegreeProgram> {
    const existing = await this.repository.findOne({ where: { degreeCode: dto.degreeCode } });
    if (existing) throw new ConflictException('Degree code already exists');
    const degree = this.repository.create(dto);
    return this.repository.save(degree);
  }

  async update(id: number, updateDegreeProgramDto: UpdateDegreeProgramDto): Promise<DegreeProgram> {
    const degree = await this.findOne(id);
    if (updateDegreeProgramDto.degreeCode !== degree.degreeCode) {
      const existing = await this.repository.findOne({ where: { degreeCode: updateDegreeProgramDto.degreeCode } });
      if (existing) throw new ConflictException('Degree code already exists');
    }
    Object.assign(degree, updateDegreeProgramDto);
    return this.repository.save(degree);
  }

  async remove(id: number): Promise<boolean> {
    const degree = await this.findOne(id);
    if (!degree){
       return false;
    }
    
    await this.repository.remove(degree);
    return true;
  }

}