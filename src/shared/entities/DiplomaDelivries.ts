// src/entity/DiplomaDelivery.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from "typeorm";
import { Student } from "./Students";
import { AcademicWork } from "./AcademicWorks";
import { JuryEvaluation } from "./JuryEvaluations";
import { Admin } from "./Admins";
import { DecisionStatus } from "../enums/DecisionStatus.enum";
import { DegreeProgram } from "./DegreePrograms";
@Entity()
export class DiplomaDelivery {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Student)
  @JoinColumn({ name: "student_id" })
  student_id!: Student;

  @OneToOne(() => AcademicWork)
  @JoinColumn()
  academic_work_id!: AcademicWork;

  @OneToOne(() => JuryEvaluation)
  @JoinColumn()
  jury_evaluation_id!: JuryEvaluation;

  @Column({ default: true })
  submitted_work!: boolean;

  @Column({ default: true })
  returned_belongings!: boolean;

  @ManyToOne(() => DegreeProgram, (degreeProgram) => degreeProgram.diplomaDeliveries) // Correct relation
  @JoinColumn()
  degree!: DegreeProgram;

  @Column({ length: 25, nullable: true })
  diploma_id?: string;

  @Column({ nullable: true })
  delivered_at?: Date;

}