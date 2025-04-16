
// src/entity/Students.ts
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToOne, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { User } from "./Users";
import { DegreeProgram } from "./DegreePrograms";
import { Department } from "./Departments"
import { Major } from "./Majors";
import { Speciality } from "./Specialities";
import { LevelType } from "../enums/LevelType.enum"; // Assuming you have a types file for these enums
import { AcademicInstitution } from "./AcademicInstitution"; // Assuming you have this entity
import { Internship } from "./Internships"; // Assuming you have this entity
import { join } from "path";
import { AcademicWork } from "./AcademicWorks";

@Entity()
export class Student {
  @PrimaryColumn()
  @OneToOne(() => User, user => user.id)
  @JoinColumn()
  user_id!: User;

  @Column({ length: 50, unique: true })
  student_id!: string; 

  @ManyToOne(() => AcademicInstitution, institution => institution.students)
  @JoinColumn({ name: "institution_id" }) // Correct relation
  institution!: AcademicInstitution;

  @ManyToOne(() => Department, department => department.students)
  @JoinColumn({ name: "department",referencedColumnName:"name" }) // Correct relation  
  department!: Department;

  @Column({ type: "enum", enum: LevelType })
  level!: LevelType;

  @ManyToMany(() => DegreeProgram, degreeProgram => degreeProgram.students)
  @JoinTable() // Only needed on one side (owning side)
  degreePrograms!: DegreeProgram[]; // Note plural name and array type

  @ManyToOne(() => Major, major => major.name)
  @JoinColumn({ name: "major" }) // Correct relation
  major!: Major;

  @ManyToOne(() => Speciality, speciality => speciality.students)
  @JoinColumn({ name: "speciality" }) // Correct relation
  speciality!: Speciality;

  @OneToMany(() => Internship, internship => internship.student)
  internships?: Internship[];

  @OneToMany(() => AcademicWork, academicWork => academicWork.student)
  academicworks?: AcademicWork[];

}