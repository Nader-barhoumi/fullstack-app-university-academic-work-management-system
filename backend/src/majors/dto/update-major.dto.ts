import { IsNumber, IsOptional, IsString , Length } from 'class-validator';

export class UpdateMajorDto {
    @IsString()
    @Length(1, 50)
    name: string;

    // @IsNumber()
    // department: number;

    @IsString()
    @IsOptional()
    @Length(255)
    description: string;
    
}
