// src/entity/Teacher.ts
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Users";
import { AcademicInstitution } from "./AcademicInstitution";
import { PositionType } from "../enums/PositionType.enum";
import { Internship } from "./Internships";
import { ResearchMemoir } from "./ResearchMemoirs";
import { JuryEvaluation } from "./JuryEvaluations";
import { Responsibility } from "./Responsibilities";
import { Department } from "./Departments";

@Entity("teacher")
export class Teacher {
  @OneToOne(() => User, user => user.teacher)
  @JoinColumn({ name: "user" })
  user_id!: User;

  @Column({length: 50, unique: true})
  id?: string;

  @Column({ length: 50, nullable: true })
  title?: string;

  @Column({ type: "enum", enum: PositionType, nullable: true })
  position?: PositionType;

  @ManyToOne(() => Department , Department => Department.teachers)
  @JoinColumn({ name: "department_id" })
  department?: Department;

  @Column({ length: 50, nullable: true })
  office_location?: string;

  @Column({ length: 20, nullable: true })
  institution_id?: string;

  @ManyToOne(() => AcademicInstitution, institution => institution.teachers)
  @JoinColumn({ name: "institution_id" })
  institution?: AcademicInstitution;

  @OneToMany(() => Internship, internship => internship.academicTutor)
  internships?: Internship[];

  @OneToMany(() => ResearchMemoir, memoir => memoir.academicTutor)
  researchMemoirs?: ResearchMemoir[];

  @OneToMany(() => JuryEvaluation, evaluation => evaluation.supervisor)
  supervisorEvaluations?: JuryEvaluation[];

  @OneToMany(() => JuryEvaluation, evaluation => evaluation.president)
  presidentEvaluations?: JuryEvaluation[];

  @OneToMany(() => JuryEvaluation, evaluation => evaluation.reporter)
  reporterEvaluations?: JuryEvaluation[];

  @OneToMany(() => Responsibility, responsibility => responsibility.teacher)
  responsibilities?: Responsibility[];
}