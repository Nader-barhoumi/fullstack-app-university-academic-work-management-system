import { IsNumber, IsString, Length, Matches } from "class-validator";

export class CreateAdressDto {
    @IsNumber()
    @Length(1, 255)
    id!: number;

    @Length(1, 255)
    @IsString()
    address_details!: string;

    @Length(4, 4)
    @IsNumber()
    zip_code!: number;

    @Length(3, 20)
    @IsString()
    city?: string;

    @Length(1, 30)
    @IsString()
    state_name!: string;

}
