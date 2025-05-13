import { IsString, Length } from 'class-validator';

export class CreateDegreeProgramDto {
  @IsString()
  @Length(1, 255)
  degreeName: string;

  @IsString()
  @Length(1, 10)
  degreeCode: string;
}