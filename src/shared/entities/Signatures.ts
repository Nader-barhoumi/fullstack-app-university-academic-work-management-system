// src/entity/Signature.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Check, CreateDateColumn } from "typeorm";
import { SignatureObject } from "./SignatureObjects";
import { User } from "./Users";
import { Department } from "./Departments"; 

@Entity()
// @Check("signer_email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'")
export class Signature {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  signature_object_id!: number;

  @Column({ nullable: true })
  signer_user_id?: number;

  @Column({ length: 100, nullable: true })
  signer_email?: string;

  @CreateDateColumn()
  signed_at!: Date;

  @Column({ length: 45, nullable: true })
  ip_address?: string;

  @Column({ type: "text", nullable: true })
  user_agent?: string;

  @Column({ default: false })
  is_validated!: boolean;

  @Column({ nullable: true })
  validated_by?: number;

  @Column({ type: "timestamp", nullable: true })
  validated_at?: Date;

  @ManyToOne(() => Department, department => department.name)
  department!: Department;

  @ManyToOne(() => SignatureObject, signatureObject => signatureObject.signatures)
  @JoinColumn({ name: "signature_object_id" })
  signatureObject!: SignatureObject;

  @ManyToOne(() => User)
  @JoinColumn({ name: "signer_user_id" })
  signer?: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "validated_by" })
  validator?: User;
}