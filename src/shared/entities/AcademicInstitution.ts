// src/entity/AcademicInstitution.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, Check } from "typeorm";
import { Address } from "./Addresses";
import { DegreeProgram } from "./DegreePrograms";
import { Teacher } from "./Teachers";
import { Department } from "./Departments";
import { Student } from "./Students";
@Entity()
// @Check("phone ~ '^[0-9]{10,15}$'")
// @Check("email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'")
export class AcademicInstitution {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100 })
  university!: string;

  @Column({ length: 20 })
  phone!: string;

  @Column({ length: 20, nullable: true })
  fax?: string;

  @Column({ length: 255 })
  email!: string;

  @Column({ length: 100 })
  director!: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: "Address" })
  address!: Address;

  @OneToMany(() => DegreeProgram, (degreeProgram) => degreeProgram.institution) // Correct relation
  degreePrograms!: DegreeProgram[];

  @OneToMany(() => Teacher, (teacher) => teacher.institution)
  teachers!: Teacher[];

  @OneToMany(() => Student, (student) => student.institution) // Correct relation
  students!: Student[]; // Correct relation

  @OneToMany(() => Department, (department) => department.institution)
  departments!: Department[];

}