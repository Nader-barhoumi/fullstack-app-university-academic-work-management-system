// src/entity/Prototype.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn } from "typeorm";
import { AcademicWork } from "./AcademicWorks";
import { DecisionStatus } from "../enums/DecisionStatus.enum";
import { Defense } from "./Defenses";

@Entity("prototypes")
export class Prototype {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  academic_work_id!: number;

  @CreateDateColumn()
  submitted_at!: Date;

  @Column({ length: 500 })
  file_url!: string;

  @Column({ type: "enum", enum: DecisionStatus, default: DecisionStatus.PENDING })
  status!: DecisionStatus;

  @Column({ type: "text", nullable: true })
  review_comments?: string;

  @ManyToOne(() => AcademicWork, academicWork => academicWork.prototypes)
  @JoinColumn({ name: "academic_work_id" })
  academicWork!: AcademicWork;

  @OneToMany(() => Defense, defense => defense.prototype)
  defenses!: Defense[];
}