// src/entity/AcademicInstitution.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany, Check } from "typeorm";
import { Address } from "./Addresses";
import { DegreeProgram } from "./DegreePrograms";
import { Teacher } from "./Teacher";

@Entity("academic_institutions")
@Check("phone ~ '^[0-9]{10,15}$'")
@Check("email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'")
export class AcademicInstitution {
  @PrimaryColumn({ length: 20 })
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100 })
  university!: string;

  @Column({ length: 20 })
  phone!: string;

  @Column({ length: 20, nullable: true })
  fax?: string;

  @Column()
  address_id!: number;

  @Column({ length: 255 })
  email!: string;

  @Column({ length: 100 })
  director!: string;

  @ManyToOne(() => Address, address => address.address_details)
  @JoinColumn({ name: "address" })
  address!: Address;

  @OneToMany(() => DegreeProgram, degreeProgram => degreeProgram.name)
  degreePrograms!: DegreeProgram[];

  @OneToMany(() => Teacher, teacher => teacher.user_id)
  teachers!: Teacher[];
}