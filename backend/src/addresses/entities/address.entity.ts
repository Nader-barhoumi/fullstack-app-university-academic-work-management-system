// src/addresses/entities/Addresses.ts
import { States } from "../../enums/States.enums";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Addresses {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  address_details!: string;

  @Column()
  zip_code!: number;

  @Column({ length: 20, nullable: true })
  city?: string;

  @Column({type:'enum',enum: States})
  state!: States;

  @Column({ length: 255, nullable: true })
  additional_details?: string;

}