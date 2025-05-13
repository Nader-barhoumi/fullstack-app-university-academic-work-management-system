import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException, Patch } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto} from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Addresses } from './entities/address.entity';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressService: AddressesService) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<Addresses | null> {
    if (!createAddressDto) {
      throw new BadRequestException('Invalid address data');
    }
    if (!createAddressDto.address_details || !createAddressDto.zip_code) {
      throw new BadRequestException('Address details and zip code are required');
    }
    if (isNaN(createAddressDto.zip_code)) {
      throw new BadRequestException('Invalid zip code format');
    }
    if (createAddressDto.zip_code.toString().length !== 4) {
      throw new BadRequestException('Zip code must be 4 digits long');
    }
    try {
      return await this.addressService.create(createAddressDto);
    } catch (error) {
      throw new BadRequestException(error.message || 'Invalid address data');
    }
  }

  @Get()
  async findAll(): Promise<Addresses[]> {
    return await this.addressService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Addresses> {
    const address = await this.addressService.findOne(+id);
    if (!address) {
      throw new BadRequestException(`Address with ID ${id} not found`);
    }
    return address;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto): Promise<Addresses> {
    try {
      const address = await this.addressService.update(+id, updateAddressDto);
      if (!address) {
        throw new BadRequestException(`Address with ID ${id} not found`);
      }
      return address;
    } catch (error) {
      throw new BadRequestException(error.message || 'Invalid address data');
    }
  }

  @Patch(':id')
  async partialUpdate(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto): Promise<Addresses> {
    const address = await this.addressService.findOne(+id);
    if (!address) {
      throw new BadRequestException(`Address with ID ${id} not found`);
    }
    Object.assign(address, updateAddressDto);
    return await this.addressService.update(+id, address);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const result = await this.addressService.remove(+id);
    if (!result) {
      throw new BadRequestException(`Address with ID ${id} not found`);
    }
  }
}