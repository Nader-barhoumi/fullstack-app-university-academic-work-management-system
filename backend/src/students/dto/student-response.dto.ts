import { IsString, IsEnum, Length, IsInt, IsPositive, IsNumber } from 'class-validator';
import { SexType } from '../../enums/SexType.enum';
import { LevelType } from '../../enums/LevelType.enum';

export class CreateStudentDto {
  @IsInt()
  @IsPositive()
  user_id: number;

  @IsNumber()
  degree: number;

  @IsEnum(LevelType)
  level: LevelType;
}