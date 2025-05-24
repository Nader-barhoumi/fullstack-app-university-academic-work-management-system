import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Addresses } from '../addresses/entities/address.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectRepository(Addresses)
    private readonly addressRepository: Repository<Addresses>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user with this email exists
    const existingUser = await this.repository.findOneBy({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new ConflictException(`User with email ${createUserDto.email} already exists`);
    }

    // Check if user with this CIN exists
    const existingCin = await this.repository.findOneBy({
      cin: createUserDto.cin,
    });

    if (existingCin) {
      throw new ConflictException(`User with CIN ${createUserDto.cin} already exists`);
    }

    // Check if address exists if provided
    if (createUserDto.address_id) {
      const address = await this.addressRepository.findOneBy({
        id: createUserDto.address_id,
      });
      
      if (!address) {
        throw new BadRequestException(`Address with ID ${createUserDto.address_id} not found`);
      }
    }

    const user = new User();
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.cin = createUserDto.cin;
    user.email = createUserDto.email;
    user.phone = createUserDto.phone;
    user.role = createUserDto.role;
    
    // Hash the password
    const salt = await bcrypt.genSalt();
    user.password_hash = await bcrypt.hash(createUserDto.password, salt);
    
    if (createUserDto.profile_picture) {
      user.profile_picture = createUserDto.profile_picture;
    }
    
    if (createUserDto.address_id) {
      const address = await this.addressRepository.findOneBy({ id: createUserDto.address_id });
        if (address) {
          user.address = address;
        } else {
          throw new NotFoundException(`Address with ID ${createUserDto.address_id} not found`);
        }
    }
    
    if (createUserDto.is_active !== undefined) {
      user.is_active = createUserDto.is_active;
    }

    return await this.repository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find({
      relations: ['address'],
    });
  }

  async findOne(id: number): Promise<User | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['address'],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { email },
      relations: ['address'],
    });
  }

  async findByCin(cin: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { cin },
      relations: ['address'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    // Check for duplicate email
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingEmail = await this.repository.findOneBy({ email: updateUserDto.email });
      if (existingEmail) {
        throw new ConflictException(`User with email ${updateUserDto.email} already exists`);
      }
    }
    
    // Check for duplicate CIN
    if (updateUserDto.cin && updateUserDto.cin !== user.cin) {
      const existingCin = await this.repository.findOneBy({ cin: updateUserDto.cin });
      if (existingCin) {
        throw new ConflictException(`User with CIN ${updateUserDto.cin} already exists`);
      }
    }
    
    // Update address if provided
    if (updateUserDto.address_id) {
      const address = await this.addressRepository.findOneBy({ id: updateUserDto.address_id });
      if (!address) {
        throw new BadRequestException(`Address with ID ${updateUserDto.address_id} not found`);
      }
      user.address = address;
    }
    
    // Update password if provided
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      user.password_hash = await bcrypt.hash(updateUserDto.password, salt);
    }
    
    // Update other fields
    if (updateUserDto.first_name) user.first_name = updateUserDto.first_name;
    if (updateUserDto.last_name) user.last_name = updateUserDto.last_name;
    if (updateUserDto.cin) user.cin = updateUserDto.cin;
    if (updateUserDto.email) user.email = updateUserDto.email;
    if (updateUserDto.phone) user.phone = updateUserDto.phone;
    if (updateUserDto.profile_picture) user.profile_picture = updateUserDto.profile_picture;
    if (updateUserDto.is_active !== undefined) user.is_active = updateUserDto.is_active;
    
    return await this.repository.save(user);
  }

  async remove(id: number): Promise<boolean> {
    const user = await this.findOne(id);
    if (!user) {
      return false;
    }
    await this.repository.remove(user);
    return true;
  }
  
  async validateUserCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return null;
    }
    
    return user;
  }
  
  async updateLastLogin(id: number): Promise<void> {
    await this.repository.update(id, { last_login: new Date() });
  }
  
  async generateResetToken(email: string): Promise<string | null> {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }
    
    // Generate random token
    const token = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    
    // Set token expiry to 24 hours from now
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 24);
    
    // Update user with token and expiry
    await this.repository.update(user.id, {
      reset_token: token,
      reset_token_expiry: expiry
    });
    
    return token;
  }
  
  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const user = await this.repository.findOne({
      where: { reset_token: token }
    });
    
    if (!user) {
      return false;
    }
    
    // Check if token is expired
    const now = new Date();
    if (!user.reset_token_expiry || user.reset_token_expiry < now) {
      return false;
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);
    
    // Update user with new password and clear token
    await this.repository.update(user.id, {
      password_hash: passwordHash,
      reset_token: undefined,
      reset_token_expiry: undefined
    });
    
    return true;
  }
}