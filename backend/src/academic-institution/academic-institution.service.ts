import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAcademicInstitutionDto } from './dto/create-academic-institution.dto';
import { UpdateAcademicInstitutionDto } from './dto/update-academic-institution.dto';
import { AcademicInstitution } from './entities/academic-institution.entity';
import { Addresses } from '../addresses/entities/address.entity';
import { AddressesService } from '../addresses/addresses.service';
import { CreateAddressDto } from '../addresses/dto/create-address.dto';

@Injectable()
export class AcademicInstitutionService {
  private readonly HOST_INSTITUTION_ID = 1; // Constant ID for the single record

  constructor(
    @InjectRepository(AcademicInstitution)
    private readonly institutionRepository: Repository<AcademicInstitution>,
    private readonly addressService: AddressesService
  ) {}

  /**
   * Creates or returns the single host institution
   */
  async getHostInstitution(): Promise<AcademicInstitution> {
    let institution = await this.institutionRepository.findOne({ 
      where: { id: this.HOST_INSTITUTION_ID },
      relations: ['address'] // Only include the address relation for now
    });

    if (!institution) {
      // Create default institution if none exists
      institution = this.institutionRepository.create({
        id: this.HOST_INSTITUTION_ID,
        name: 'Institut Supérieur des Sciences Appliquées et de Technologie de Kasserine',
        university: 'Université de Kairouan',
        phone: 77418258,
        email: 'issatkas@issatkas.rnu.tn',
        director: 'Mansour Hajji'
      });
      institution = await this.institutionRepository.save(institution);
    }

    return institution;
  }

  /**
   * Updates the host institution
   */
  async updateHostInstitution(updateDto: UpdateAcademicInstitutionDto): Promise<AcademicInstitution> {
    const institution = await this.getHostInstitution();
    
    // Prevent ID change
    // if (updateDto.id && updateDto.id !== this.HOST_INSTITUTION_ID) {
    //   throw new BadRequestException('Cannot change institution ID');
    // }

    Object.assign(institution, updateDto);
    return this.institutionRepository.save(institution);
  }

  /**
   * Gets the institution address
   */
  async getInstitutionAddress(): Promise<Addresses> {
    const institution = await this.getHostInstitution();
    if (!institution.address) {
      throw new NotFoundException('Institution address not set');
    }
    return institution.address;
  }

  /**
   * Updates the institution address
   */
  async updateInstitutionAddress(addressDto: CreateAddressDto): Promise<AcademicInstitution> {
    const institution = await this.getHostInstitution();
    
    if (institution.address) {
      // Update existing address
      Object.assign(institution.address, addressDto);
    } else {
      // Create new address
      institution.address = await this.addressService.create(addressDto);
    }

    return this.institutionRepository.save(institution);
  }

  // Removed methods that don't make sense for single record:
  // - findAll()
  // - remove()
  // - create() (use updateHostInstitution instead)
}
