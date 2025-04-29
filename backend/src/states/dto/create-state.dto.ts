// src/states/dto/create-state.dto.ts
import { IsString, Length, Matches } from 'class-validator';

export class CreateStateDto {
  @IsString()
  @Length(1, 30)
  name: string;

  @IsString()
  @Length(2, 2)
  @Matches(/^[A-Z]{2}$/, { message: 'Code must be exactly two uppercase letters' })
  code: string;
}