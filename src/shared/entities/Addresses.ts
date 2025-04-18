// src/entity/Addresses.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { State } from "./States";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  address_details!: string;

  @Column()
  zip_code!: number;

  @Column({ length: 20 })
  city?: string;

  @Column({ length: 30 })
  state_name!: string;

  @Column({ length: 255, nullable: true })
  additional_details?: string;

  @ManyToOne(() => State, state => state.name)
  state!: State;
}