import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Addresses } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Addresses)
    private readonly addressRepository: Repository<Addresses>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Addresses | null> {
    const address = this.addressRepository.create(createAddressDto);
    if (Array.isArray(address)) {
      throw new BadRequestException('Expected a single address, but received an array');
    }
    return this.addressRepository.save(address);
  }

  async findAll(): Promise<Addresses[]> {
    if (!this.addressRepository) {
      throw new BadRequestException('Address repository not found'); 
    }
    
    const addresses = await this.addressRepository.find();
    // Return empty array instead of null if no addresses found
    // This is more consistent with TypeORM's behavior
    return addresses;
  }

  findOne(id: number): Promise<Addresses| null> {
    if (!this.addressRepository) {
      throw new BadRequestException('Address repository not found'); 
    }
    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID format'); 
    }

    return this.addressRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<Addresses> {
    const address = await this.findOne(id);
    if (!address) {
      throw new BadRequestException(`Address with ID ${id} not found`);
    }
    Object.assign(address, updateAddressDto);
    return this.addressRepository.save(address);
  }

  async remove(id: number): Promise<boolean> {
    const address = await this.findOne(id);
    if (!address) {
      return false;
    }
    await this.addressRepository.remove(address);
    return true;
  }
}