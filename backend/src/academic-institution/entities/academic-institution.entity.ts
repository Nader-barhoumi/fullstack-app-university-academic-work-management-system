// src/entity/AcademicInstitution.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, Check} from "typeorm";
import { Addresses } from "../../addresses/entities/address.entity";
// import { DegreeProgram } from "./DegreePrograms";
// import { Teacher } from "./Teachers";
// import { Department } from "./Departments";
// import { Student } from "./Students";
@Entity('academic_institution')
@Check("id = 1")
// @Check("phone ~ '^[0-9]{10,15}$'")
// @Check("email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'")
export class AcademicInstitution {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100 })
  university!: string;

  @Column()
  phone!: number;

  @Column({ nullable: true })
  fax?: number;

  @Column({ length: 255 })
  email!: string;

  @Column({ length: 100 })
  director!: string;

  @Column({ length: 255, nullable: true })
  logo_url?: string;

  @OneToOne(() => Addresses, { nullable: true })
  @JoinColumn({ name: "Address" })
  address!: Addresses | null;

  // @OneToMany(() => DegreeProgram, (degreeProgram) => degreeProgram.institution) // Correct relation
  // degreePrograms!: DegreeProgram[];

  // @OneToMany(() => Teacher, (teacher) => teacher.institution)
  // teachers!: Teacher[];

  // @OneToMany(() => Student, (student) => student.institution) // Correct relation
  // students!: Student[]; // Correct relation

  // @OneToMany(() => Department, (department) => department.institution)
  // departments!: Department[];

}