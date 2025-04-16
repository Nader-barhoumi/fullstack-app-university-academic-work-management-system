
// src/entity/Students.ts
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./Users";
import { DegreeProgram } from "./DegreePrograms";
import { Department } from "./Departments"
import { Major } from "./Majors";
import { Specialities } from "./Specialities";
import { LevelType } from "../enums/LevelType.enum"; // Assuming you have a types file for these enums


@Entity()
export class Student {
  @PrimaryColumn()
  @OneToOne(() => User, user => user.id)
  @JoinColumn()
  user_id!: User;

  @Column({ length: 50, unique: true })
  student_id!: string; 

  @ManyToOne(() => Department, department => department.name)  
  department!: Department;

  @Column({ type: "enum", enum: LevelType })
  level!: LevelType;

  @ManyToOne(() => DegreeProgram, degreeProgram => degreeProgram.name)
  degreeProgram!: DegreeProgram;

  @ManyToOne(() => Major, major => major.name)
  major!: Major;

  @ManyToOne(() => Specialities, speciality => speciality.name)
  speciality!: Specialities;
}