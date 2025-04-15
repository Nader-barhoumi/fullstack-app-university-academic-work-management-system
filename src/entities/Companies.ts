import { Entity, PrimaryColumn, Column ,ManyToMany, ManyToOne , OneToMany , OneToOne} from "typeorm";
import { Address } from "./Addresses";
@Entity()
export class Company {
  @PrimaryColumn()
  id!: number;

  @Column({ length: 50, unique: true })
  name!: string; //legal_name?: string;

  @Column({ length: 50, nullable: true })
  field?: string;
  
  @OneToOne(() => Address, address => address.address_details)
  address!: Address;
  
  @Column({ length: 50, nullable: true })
  email?: string;

  @Column({ length: 20, nullable: true })
  phone_number?: string;

  @Column({ length: 50, nullable: true })
  website?: string;
}