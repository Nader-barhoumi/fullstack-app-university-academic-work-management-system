import { Expose } from 'class-transformer';

export class MajorDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

}
