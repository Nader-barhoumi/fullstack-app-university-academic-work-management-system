import { Expose , Type } from 'class-transformer';
import { MajorDto } from 'src/majors/dto/major.dto';
export class SpecialityResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => MajorDto) // Use a lightweight DTO, not the full entity
  Major: MajorDto;

}