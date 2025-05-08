import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicInstitution } from './entities/academic-institution.entity';
import { CreateAcademicInstitutionDto } from './dto/create-academic-institution.dto';
import { UpdateAcademicInstitutionDto } from './dto/update-academic-institution.dto';

@Injectable()
export class AcademicInstitutionService {
  constructor(
    @InjectRepository(AcademicInstitution)
    private readonly institutionRepository: Repository<AcademicInstitution>,
  ) {}

  async create(createDto: CreateAcademicInstitutionDto): Promise<AcademicInstitution> {
    const institution = this.institutionRepository.create(createDto);
    return await this.institutionRepository.save(institution);
  }

  async findAll(): Promise<AcademicInstitution[]> {
    return await this.institutionRepository.find({ relations: ['address'] });
  }

  async findOne(id: number): Promise<AcademicInstitution | null> {
    return await this.institutionRepository.findOne({ where: { id }, relations: ['address'] });
  }

  async update(id: number, updateDto: UpdateAcademicInstitutionDto): Promise<AcademicInstitution | null> {
    const institution = await this.findOne(id);
    if (!institution) return null;
    Object.assign(institution, updateDto);
    return await this.institutionRepository.save(institution);
  }

  async remove(id: number): Promise<boolean> {
    const institution = await this.findOne(id);
    if (!institution) return false;
    await this.institutionRepository.remove(institution);
    return true;
  }
}