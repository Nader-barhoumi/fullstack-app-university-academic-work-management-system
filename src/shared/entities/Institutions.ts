import {Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm";
import { Address } from "./Addresses";

@Entity()
export class Institution {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, unique: true })
  name!: string; //legal_name?: string;

  @Column({ length: 100, nullable: true })
  university_name?: string; 

  @OneToOne(() => Address, address => address.address_details)
  address!: Address;
  
  @Column({ length: 50, nullable: true })
  email?: string;

  @Column({ length: 20, nullable: true })
  phone_number?: string;

  @Column({ length: 50, nullable: true })
  website?: string;
}    