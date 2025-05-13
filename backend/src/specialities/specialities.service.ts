import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Speciality } from './entities/speciality.entity';
import { Major } from '../majors/entities/major.entity';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
@Injectable()
export class SpecialitiesService {
  constructor(
    @InjectRepository(Speciality)
    private specialityRepository: Repository<Speciality>,
    @InjectRepository(Major)
    private majorRepository: Repository<Major>,
  ) {}

  async create(createSpecialityDto: CreateSpecialityDto): Promise<Speciality> {
    // Check if the major exists
    const major = await this.majorRepository.findOneBy({ 
      id: createSpecialityDto.major });
    if (!major) {
      throw new BadRequestException(`Major with ID ${createSpecialityDto.major} not found`);
    }
    const speciality = new Speciality();
    speciality.name = createSpecialityDto.name;
    speciality.code = createSpecialityDto.code;
    speciality.description = createSpecialityDto.description;
    speciality.major = major; // Use the actual Major entity
    // Save and return the new speciality
    return await this.specialityRepository.save(speciality);
  }

  async findAll(): Promise<Speciality[]> {
    if (!this.specialityRepository) {
      throw new BadRequestException('Speciality repository not found');
    }
    const specialities = await this.specialityRepository.find({
      relations: ['major'], // Include the major relation
    });
    return specialities;
  }

  async findOne(id: number): Promise<Speciality | null> {
    if (!this.specialityRepository) {
      throw new BadRequestException('Speciality repository not found');
    }
    return await this.specialityRepository.findOne({
      where: { id },
      relations: ['major'], // Include the major relation
    });
  }

  async update(id: number, updateSpecialityDto: UpdateSpecialityDto): Promise<Speciality | null> {
    if (!this.specialityRepository) {
      throw new BadRequestException('Speciality repository not found');
    }
    const speciality = await this.specialityRepository.findOne({ where: { id } });
    if (!speciality) {
      throw new BadRequestException('Speciality not found');
    }
    // Update the speciality properties with the DTO values
    Object.assign(speciality, updateSpecialityDto);
    return await this.specialityRepository.save(speciality);
  }

  async remove(id: number): Promise<boolean> {
    const speciality = await this.findOne(id);
    if (!speciality) {
      return false;
    }
    await this.specialityRepository.remove(speciality);
    return true;
  }
}
