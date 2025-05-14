import { IsString, Length, IsEnum, IsInt, IsPositive, IsNumber } from "class-validator";
import { DegreeProgramType } from "src/enums/DegreeProgramType.enum";


export class UpdateDegreeProgramDto {
    @IsString()
    @Length(1, 50)
    degreeName: string;

    @IsString()
    @Length(1, 10)
    degreeCode: string;

    @IsString()
    @Length(1, 255)
    description: string;

    @IsEnum(DegreeProgramType)
    level: DegreeProgramType;

    // @IsInt()
    // @IsPositive()
    // degreeDuration: number;

    // @IsNumber()
    // major_id: number;

    // @IsNumber()
    // @IsPositive()
    // speciality_id: number;

    // @IsNumber()
    // @IsPositive()
    // institution_id: number;

}
