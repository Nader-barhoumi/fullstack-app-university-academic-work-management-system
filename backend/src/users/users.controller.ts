import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-reponse.dto';
import { plainToClass } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return plainToClass(UserResponseDto, user, { excludeExtraneousValues: true });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(error.message || 'Invalid user data');
    }
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map(user => 
      plainToClass(UserResponseDto, user, { excludeExtraneousValues: true })
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return plainToClass(UserResponseDto, user, { excludeExtraneousValues: true });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(+id, updateUserDto);
      return plainToClass(UserResponseDto, user, { excludeExtraneousValues: true });
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(error.message || 'Invalid user data');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(+id);
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { success: true, message: `User with ID ${id} deleted successfully` };
  }
}