// src/entity/Responsibility.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Check, CreateDateColumn, Unique, OneToOne } from "typeorm";
import { Teacher } from "./Teachers";
import { Admin } from "./Admins";
import { AcademicWork } from "./AcademicWorks";

@Entity("responsibilities")
@Check("role IN ('academic_tutor', 'jury_member')")
@Unique("unique_user_work_role", ["user_id", "academic_work_id", "role"])
export class Responsibility {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Teacher, Teacher => Teacher.responsibilities)
  @JoinColumn()
  teacher!: number;

  @Column()
  academic_work_id!: number;

  @Column({ type: "enum", enum: ["academic_tutor", "jury_member"] })
  role!: "academic_tutor" | "jury_member";

  @OneToOne(() => Admin)
  @JoinColumn()
  assigned_by?: Admin;

  @CreateDateColumn()
  assigned_at!: Date;

  @ManyToOne(() => AcademicWork, academicWork => academicWork.responsibilities)
  @JoinColumn({ name: "academic_work_id" })
  academicWork!: AcademicWork;

}