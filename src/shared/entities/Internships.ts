// src/entity/Internship.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, Check, OneToOne } from "typeorm";
import { Student } from "./Students";
import { AcademicWork } from "./AcademicWorks";
import { Company } from "./Companies";
import { IndustrialTutor } from "./IndustrialTutors";
import { Teacher } from "./Teachers";
import { Signature } from "./Signatures";
import { Specification } from "./Specifications";
import { CategoryType } from "../enums/CategoryType.enum";
import { ProgressStatus } from "../enums/ProgressStatus.enum";
import { FinalProject } from "./FinalProjects";
import { TutorChangeRequest } from "./TutorChangeRequests";
@Entity()
@Check("end_date > start_date")
@Check("internship_type = 'optional' OR (academic_tutor_id IS NOT NULL AND academic_tutor_signature IS NOT NULL)")
export class Internship {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  student_id!: number;

  @Column({ nullable: true })
  academic_work_id?: number;

  @Column()
  company_id!: number;

  @Column()
  industrial_tutor_id!: number;

  @Column({ nullable: true })
  academic_tutor_id?: number;

  @Column({ type: "enum", enum: CategoryType, default: CategoryType.REQUIRED })
  internship_type!: CategoryType;

  @Column({ type: "date" })
  start_date!: Date;

  @Column({ type: "date" })
  end_date!: Date;

  @OneToOne(() => Signature)
  @JoinColumn()
  academic_tutor_signature!: Signature;

  @OneToOne(() => Signature)
  @JoinColumn()
  industrial_tutor_signature!: Signature;

  @OneToOne(() => Signature)
  @JoinColumn()
  company_signature!: Signature;

  @Column({ type: "enum", enum: ProgressStatus, default: ProgressStatus.ON_GOING })
  status!: ProgressStatus;

  @OneToOne(() => Specification)
  @JoinColumn()
  specifications_id?: number;

  @ManyToOne(() => Student, student => student.internships)
  @JoinColumn({ name: "student_id" })
  student!: Student;

  @OneToOne(() => AcademicWork)
  @JoinColumn()
  academicWork?: AcademicWork;

  @OneToOne(() => Company)
  @JoinColumn({ name: "company", referencedColumnName: "name" })
  company!: Company;

  @ManyToOne(() => IndustrialTutor, tutor => tutor.internships)
  @JoinColumn({ name: "industrial_tutor_id" })
  industrialTutor!: IndustrialTutor;

  @ManyToOne(() => Teacher, teacher => teacher.internships)
  @JoinColumn({ name: "academic_tutor_id" })
  academicTutor?: Teacher;

  @ManyToOne(() => Signature)
  @JoinColumn({ name: "academic_tutor_signature" })
  academicSignature?: Signature;

  @ManyToOne(() => Signature)
  @JoinColumn({ name: "industrial_tutor_signature" })
  industrialSignature!: Signature;

  @ManyToOne(() => Signature)
  @JoinColumn({ name: "company_signature" })
  companySignature!: Signature;

  @ManyToOne(() => Specification, specification => specification.internships)
  @JoinColumn({ name: "specifications_id" })
  specification?: Specification;

  @OneToMany(() => FinalProject, project => project.internship)
  finalProjects!: FinalProject[];

  @OneToMany(() => TutorChangeRequest, request => request.internship)
  tutorChangeRequests!: TutorChangeRequest[];
}