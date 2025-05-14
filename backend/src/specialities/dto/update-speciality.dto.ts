import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateSpecialityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  code: string;

//   @IsNumber()
//   major: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}