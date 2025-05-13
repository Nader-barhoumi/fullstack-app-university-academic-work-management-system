import { Expose , Type } from 'class-transformer';
import { DepartmentDto } from '../../departments/dto/department.dto';

export class MajorResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => DepartmentDto) // Use a lightweight DTO, not the full entity
  department: DepartmentDto;

  // @Expose()
  // specialityIds?: number[];

}