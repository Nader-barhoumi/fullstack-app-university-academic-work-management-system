// src/entity/ResearchMemoir.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { AcademicWork } from "./AcademicWorks";
import { Teacher } from "./Teachers";
import { Signature } from "./Signatures";
import { ProgressStatus } from "../enums/ProgressStatus.enum";
import { DecisionStatus } from "../enums/DecisionStatus.enum";

@Entity("research_memoirs")
export class ResearchMemoir {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  academic_work_id!: number;

  @Column()
  academic_tutor_id!: number;

  @Column({ type: "enum", enum: "ProgressStatus", default: ProgressStatus.ON_GOING })
  status!: ProgressStatus;

  @Column({ length: 100 })
  laboratory!: string;

  @Column()
  tutor_signature_id!: number;

  @Column({ length: 100 })
  lab_director!: string;

  @Column({ type: "text" })
  summary!: string;

  @Column({ type: "text", array: true, nullable: true })
  keywords?: string[];

  @Column({ type: "enum", enum: DecisionStatus, default: DecisionStatus.PENDING })
  decision!: DecisionStatus;

  @CreateDateColumn()
  submission_date!: Date;

  @ManyToOne(() => AcademicWork, academicWork => academicWork.researchMemoirs)
  @JoinColumn({ name: "academic_work_id" })
  academicWork!: AcademicWork;

  @ManyToOne(() => Teacher, teacher => teacher.researchMemoirs)
  @JoinColumn({ name: "academic_tutor_id" })
  academicTutor!: Teacher;

  @ManyToOne(() => Signature)
  @JoinColumn({ name: "tutor_signature_id" })
  tutorSignature!: Signature;
}