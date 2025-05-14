import {Expose} from 'class-transformer';

export class DegreeProgramDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}