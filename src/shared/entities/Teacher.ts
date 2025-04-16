// src/entity/Teacher.ts
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./Users";
import { AcademicInstitution } from "./AcademicInstitution";
import { DepartmentType } from "./enums/DepartmentType.enum";
import { PositionType } from "./enums/PositionType.enum";
import { Internship } from "./Internship";
import { ResearchMemoir } from "./ResearchMemoir";
import { JuryEvaluation } from "./JuryEvaluation";
import { Responsibility } from "./Responsibility";

@Entity("teacher")
export class Teacher {
  @PrimaryColumn()
  user_id!: number;

  @Column({ length: 50, nullable: true })
  title?: string;

  @Column({ type: "enum", enum: PositionType, nullable: true })
  position?: PositionType;

  @Column({ type: "enum", enum: DepartmentType })
  department!: DepartmentType;

  @Column({ length: 50, nullable: true })
  office_location?: string;

  @Column({ length: 20, nullable: true })
  institution_id?: string;

  @OneToOne(() => User, user => user.teacher, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => AcademicInstitution, institution => institution.teachers)
  @JoinColumn({ name: "institution_id" })
  institution?: AcademicInstitution;

  @OneToMany(() => Internship, internship => internship.academicTutor)
  internships!: Internship[];

  @OneToMany(() => ResearchMemoir, memoir => memoir.academicTutor)
  researchMemoirs!: ResearchMemoir[];

  @OneToMany(() => JuryEvaluation, evaluation => evaluation.supervisor)
  supervisorEvaluations!: JuryEvaluation[];

  @OneToMany(() => JuryEvaluation, evaluation => evaluation.president)
  presidentEvaluations!: JuryEvaluation[];

  @OneToMany(() => JuryEvaluation, evaluation => evaluation.reporter)
  reporterEvaluations!: JuryEvaluation[];

  @OneToMany(() => Responsibility, responsibility => responsibility.user)
  responsibilities!: Responsibility[];
}