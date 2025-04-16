// src/entity/FinalProject.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { AcademicWork } from "./AcademicWorks";
import { Internship } from "./Internships";
import { ProjectType } from "../enums/ProjectType.enum";
import { DecisionStatus } from "../enums/DecisionStatus.enum";

@Entity("final_projects")
export class FinalProject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  title!: string;

  @Column()
  academic_work_id!: number;

  @Column({ nullable: true })
  internship_id?: number;

  @Column({ type: "enum", enum: ProjectType })
  type!: ProjectType;

  @Column({ type: "text", array: true, nullable: true })
  keywords?: string[];

  @Column({ type: "text", array: true, nullable: true })
  required_skills?: string[];

  @Column({ type: "enum", enum: DecisionStatus, default: DecisionStatus.PENDING })
  decision!: DecisionStatus;

  @CreateDateColumn()
  submission_date!: Date;

  @ManyToOne(() => AcademicWork, academicWork => academicWork.finalProjects)
  @JoinColumn({ name: "academic_work_id" })
  academicWork!: AcademicWork;

  @ManyToOne(() => Internship, internship => internship.finalProjects)
  @JoinColumn({ name: "internship_id" })
  internship?: Internship;
}