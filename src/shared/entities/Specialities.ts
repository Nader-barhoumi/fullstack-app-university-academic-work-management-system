// src/entity/Speciality.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { DegreeProgram } from "./DegreePrograms";
import { Student } from "./Students";

@Entity("specialities")
export class Speciality {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, unique: true })
  name!: string;

  @Column({ length: 20, nullable: true })
  degree_program_id?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @ManyToOne(() => DegreeProgram, degreeProgram => degreeProgram.specialities, { onDelete: "CASCADE" })
  @JoinColumn({ name: "degree_program_id" })
  degreeProgram?: DegreeProgram;

  @OneToMany(() => Student, student => student.speciality)
  students!: Student[];
}