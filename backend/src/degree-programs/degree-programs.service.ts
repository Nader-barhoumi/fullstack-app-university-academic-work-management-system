import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DegreeProgram } from './entities/degree-program.entity';
import { CreateDegreeProgramDto } from './dto/create-degree-program.dto';
import { UpdateDegreeProgramDto } from './dto/update-degree-program.dto';
import { Major } from '../majors/entities/major.entity';
import { Speciality } from '../specialities/entities/speciality.entity';
import { AcademicInstitution } from '../academic-institution/entities/academic-institution.entity';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class DegreeProgramsService {
  constructor(
    @InjectRepository(DegreeProgram)
    private readonly repository: Repository<DegreeProgram>,
    @InjectRepository(Major)
    private readonly majorRepository: Repository<Major>,
    @InjectRepository(Speciality)
    private readonly specialityRepository: Repository<Speciality>,
    @InjectRepository(AcademicInstitution)
    private readonly academicInstitutionRepository: Repository<AcademicInstitution>,
  ) {}
  async create(createDegreeProgramDto: CreateDegreeProgramDto): Promise<DegreeProgram> {
    // Check if the degree_program exists
    const major = await this.majorRepository.findOneBy({
      id: createDegreeProgramDto.major_id,
    });
    if (!major) {
      throw new BadRequestException(`Major with ID ${createDegreeProgramDto.major_id} not found`);
    }

    // Check if the speciality exists
    const speciality = await this.specialityRepository.findOneBy({
      id: createDegreeProgramDto.speciality_id,
    });
    if (!speciality) {
      throw new BadRequestException(`Speciality with ID ${createDegreeProgramDto.speciality_id} not found`);
    }

    // Check if the institution exists
    const institution = await this.academicInstitutionRepository.findOneBy({
      id: createDegreeProgramDto.institution_id,
    });
    if (!institution) {
      throw new BadRequestException(`Institution with ID ${createDegreeProgramDto.institution_id} not found`);
    }

    // Check for duplicate code
    const existingDegreeProgram = await this.repository.findOneBy({
      code: createDegreeProgramDto.code,
    });
    if (existingDegreeProgram) {
      throw new ConflictException(`Degree Program with code ${createDegreeProgramDto.code} already exists`);
    }

    const degreeProgram = new DegreeProgram();
    degreeProgram.name = createDegreeProgramDto.name;
    degreeProgram.code = createDegreeProgramDto.code;
    degreeProgram.level = createDegreeProgramDto.level;
    degreeProgram.duration_years = createDegreeProgramDto.duration;
    degreeProgram.description = createDegreeProgramDto.description;
    degreeProgram.major = major; // Use the actual Major entity
    degreeProgram.speciality = speciality; // Use the actual Speciality entity
    degreeProgram.institution = institution; // Use the actual AcademicInstitution entity

    // Save and return the new degree program
    return await this.repository.save(degreeProgram);
  }

  async findAll(): Promise<DegreeProgram[]> {
    if (!this.repository) {
      throw new BadRequestException('Degree Program repository not found');
    }
    const degreePrograms = await this.repository.find({
      relations: ['major', 'speciality', 'institution'], // Include the relations
    });
    return degreePrograms;
  }

  async findOne(id: number): Promise<DegreeProgram | null> {
    if (!this.repository) {
      throw new BadRequestException('Degree Program repository not found');
    }
    return await this.repository.findOne({
      where: { id },
      relations: ['major', 'speciality', 'institution'], // Include the relations
    });
  }

  async update(id: number, updateDegreeProgramDto: UpdateDegreeProgramDto): Promise<DegreeProgram | null> {
    if (!this.repository) {
      throw new BadRequestException('Degree Program repository not found');
    }
    const degreeProgram = await this.repository.findOne({ where: { id } });
    if (!degreeProgram) {
      throw new BadRequestException('Degree Program not found');
    }
    // Update the degree program properties with the DTO values
    Object.assign(degreeProgram, updateDegreeProgramDto);
    return await this.repository.save(degreeProgram);
  }

  async remove(id: number): Promise<boolean> {
    const degreeProgram = await this.findOne(id);
    if (!degreeProgram) {
      return false;
    }
    await this.repository.remove(degreeProgram);
    return true;
  }

}
