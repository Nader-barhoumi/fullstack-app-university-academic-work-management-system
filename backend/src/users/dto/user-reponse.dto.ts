import { IsString, IsEmail, IsEnum, Length, IsOptional, IsBoolean } from 'class-validator';
import { RoleType } from '../../enums/RoleType.enum';

export class UserResponseDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  first_name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  last_name?: string;

  @IsOptional()
  @IsString()
  @Length(8, 8)
  cin?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(8, 20)
  phone?: string;
  
  @IsOptional()
  @IsString()
  password?: string;
  
  @IsOptional()
  @IsString()
  profile_picture?: string;
  
  @IsOptional()
  address_id?: number;
  
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}