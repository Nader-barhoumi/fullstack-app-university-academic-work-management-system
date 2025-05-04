// src/academic-institution/dto/create-academic-institution.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsNumber, Length, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAcademicInstitutionDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  university!: string;

  @IsNumber()
  @IsPositive()
  phone!: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  fax?: number;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  director!: string;

  @IsInt()
  addressId!: number; // Assuming you're linking by address ID

  @IsString()
  @IsOptional()
  @Length(0, 255)
  logo_url?: string;

}
