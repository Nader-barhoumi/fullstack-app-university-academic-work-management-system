// src/states/entities/state.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('states') // Explicitly specify table name
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 2, unique: true, nullable: false })
  code: string;
}