import { IsString, IsEnum, Length, IsInt, IsPositive, IsNumber } from 'class-validator';
import { SexType } from '../../enums/SexType.enum';
import { LevelType } from '../../enums/LevelType.enum';

export class CreateStudentDto {
  @IsInt()
  @IsPositive()
  user_id: number;

  @IsEnum(SexType)
  sex: SexType;

  @IsString()
  @Length(1, 10)
  student_id: string;

  @IsNumber()
  degree: number;

  @IsEnum(LevelType)
  level: LevelType;
}