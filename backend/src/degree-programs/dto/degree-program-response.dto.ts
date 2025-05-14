import { Expose , Type } from 'class-transformer';
import { MajorDto } from '../../majors/dto/major.dto';
import { DegreeProgramDto } from './degree-program.dto';
import { SpecialityDto } from '../../specialities/dto/speciality.dto';

export class DegreeProgramResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => MajorDto)
  major: MajorDto;

  @Expose()
  @Type(() => SpecialityDto)
  speciality: SpecialityDto;

  @Expose()
  @Type(() => DegreeProgramDto)
  degreePrograms: DegreeProgramDto[];

}  