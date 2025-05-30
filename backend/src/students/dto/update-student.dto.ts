import { IsString, IsEnum, Length, IsOptional } from 'class-validator';
import { SexType } from '../../enums/SexType.enum';
import { LevelType } from '../../enums/LevelType.enum';

export class UpdateStudentDto {
  @IsOptional()
  @IsEnum(SexType)
  sex?: SexType;

  @IsOptional()
  @IsString()
  @Length(1, 10)
  student_id?: string;

  @IsOptional()
  degree?: number;

  @IsOptional()
  @IsEnum(LevelType)
  level?: LevelType;
}