// src/entity/Specification.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, Check, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Signature } from "./Signatures";
import { Internship } from "./Internships";

@Entity()
@Check("LENGTH(objectives) > 10")
@Check("LENGTH(main_tasks) > 10")
export class Specification {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  title!: string;

  @Column({ type: "text" })
  objectives!: string;

  @Column({ type: "text" })
  main_tasks!: string;

  @Column({ type: "text" })
  student_profile!: string;

  @Column({ nullable: true })
  academic_tutor_signature?: number;

  @Column({ nullable: true })
  industrial_tutor_signature?: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Signature)
  @JoinColumn({ name: "academic_tutor_signature" })
  academicSignature?: Signature;

  @ManyToOne(() => Signature)
  @JoinColumn({ name: "industrial_tutor_signature" })
  industrialSignature?: Signature;

  @OneToMany(() => Internship, internship => internship.specification)
  internships!: Internship[];

//   @OneToMany(() => SpecificationSignature, specSig => specSig.specification)
//   specificationSignatures!: SpecificationSignature[];
}