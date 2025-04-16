// src/entity/AcademicWork.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, Check, CreateDateColumn, Unique, OneToOne } from "typeorm";
import { Student } from "./Students";
import { WorkType } from "../enums/WorkType.enum";
import { WorkStatus } from "../enums/WorkStatus.enum";
import { Responsibility } from "./Responsibilities";
import { Internship } from "./Internships";
import { Prototype } from "./Prototypes";
import { Defense } from "./Defenses";
import { FinalProject } from "./FinalProjects";
import { ResearchMemoir } from "./ResearchMemoirs";
import { DiplomaDelivery } from "./DiplomaDelivries";

@Entity("academic_work")
@Check("max_collaborators BETWEEN 1 AND 2")
@Check("start_date < end_date OR (start_date IS NULL AND end_date IS NULL)")
@Unique("unique_student_work_type", ["student_id", "work_type"])
export class AcademicWork {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  student_id!: number;

  @Column()
  is_work_required!: boolean;

  @Column({ type: "enum", enum: WorkType })
  work_type!: WorkType;

  @Column()
  internship_required!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @Column({ default: 1 })
  max_collaborators!: number;

  @Column({ type: "enum", enum: WorkStatus, default: WorkStatus.ACTIVE })
  status!: WorkStatus;

  @Column({ type: "date", nullable: true })
  start_date?: Date;

  @Column({ type: "date", nullable: true })
  end_date?: Date;

  @ManyToOne(() => Student, student => student.academicworks)
  @JoinColumn({ name: "student_id" })
  student!: Student;

  @OneToMany(() => Responsibility, responsibility => responsibility.academicWork)
  responsibilities!: Responsibility[];

  @OneToMany(() => Internship, internship => internship.academicWork)
  internships!: Internship[];

  @OneToMany(() => Prototype, prototype => prototype.academicWork)
  prototypes!: Prototype[];

  @OneToMany(() => Defense, defense => defense.academicWork)
  defenses!: Defense[];

  @OneToMany(() => FinalProject, project => project.academicWork)
  finalProjects!: FinalProject[];

  @OneToMany(() => ResearchMemoir, memoir => memoir.academicWork)
  researchMemoirs!: ResearchMemoir[];
}