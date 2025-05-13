import { Expose } from 'class-transformer';

export class DepartmentDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
