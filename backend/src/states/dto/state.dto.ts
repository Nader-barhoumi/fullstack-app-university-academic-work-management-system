// src/states/dto/state.dto.ts
import { Expose } from 'class-transformer';

export class StateDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  code: string;
}