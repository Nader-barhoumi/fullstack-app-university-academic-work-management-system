// src/entity/States.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 30 })
  name?: string;

  @Column({ length: 2, unique: true })
  code?: string;
}