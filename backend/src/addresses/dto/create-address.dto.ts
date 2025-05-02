import { IsString, IsInt, IsOptional, Length, IsNumber, IsPositive, IsEnum } from 'class-validator';
import { States } from 'src/enums/States.enums';

export class CreateAddressDto {
  @IsString()
  @Length(1, 255)
  address_details: string;

  @IsInt()
  @IsPositive()
  zip_code: number;

  @IsString()
  @IsOptional()
  @Length(0, 20)
  city?: string;

  @IsEnum(States)
  state: States;

  @IsString()
  @IsOptional()
  @Length(0, 255)
  additional_details?: string;
}


