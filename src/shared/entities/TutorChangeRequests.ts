// src/entity/TutorChangeRequest.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne , CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Internship } from "./Internships";
import { Student } from "./Students";
import { IndustrialTutor } from "./IndustrialTutors";
import { Admin } from "./Admins";
import { Signature } from "./Signatures";
import { DecisionStatus } from "../enums/DecisionStatus.enum";

@Entity("tutor_change_requests")
export class TutorChangeRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  internship_id!: number;

  @Column()
  student_id!: number;

  @Column()
  current_tutor_id!: number;

  @Column()
  new_tutor_id!: number;

  @Column({ type: "text" })
  reason!: string;

  @Column({ type: "enum", enum: DecisionStatus, default: DecisionStatus.PENDING })
  status!: DecisionStatus;

  @Column({ default: false })
  admin_validation!: boolean;

  @Column({ nullable: true })
  validated_by?: number;

  @Column({ type: "timestamp", nullable: true })
  validated_at?: Date;

  @Column({ nullable: true })
  new_tutor_signature?: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToOne(() => Internship)
  @JoinColumn({ name: "internship_id" })
  internship!: Internship;

  @OneToOne(() => Student)
  @JoinColumn({ name: "student_id" })
  student!: Student;

  @OneToOne(() => IndustrialTutor)
  @JoinColumn({ name: "current_tutor_id" })
  currentTutor!: IndustrialTutor;

  @OneToOne(() => IndustrialTutor)
  @JoinColumn({ name: "new_tutor_id" })
  newTutor!: IndustrialTutor;

  @OneToOne(() => Admin)
  @JoinColumn({ name: "validated_by" })
  validator!: Admin;

  @OneToOne(() => Signature)
  @JoinColumn({ name: "new_tutor_signature" })
  newTutorSignature!: Signature;

  
}