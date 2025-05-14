import { Expose } from 'class-transformer';

export class SpecialityDto {
  @Expose()
  name: string;

  @Expose()
  code: string;

}