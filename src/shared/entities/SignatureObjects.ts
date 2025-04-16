// src/entity/SignatureObject.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, Check, CreateDateColumn } from "typeorm";
import { User } from "./Users";
import { Signature } from "./Signatures";
import { Admin } from "./Admins";

@Entity("signature_objects")
// @Check("external_email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'")
// @Check("signature_type IN ('manual', 'digital')")
export class SignatureObject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  user_id?: number;

  @Column({ length: 100, nullable: true })
  signer_name?: string;

  @Column({ length: 100, nullable: true })
  external_email?: string;

  @Column({ length: 20 })
  signature_type!: string;

  @Column({ length: 500, nullable: true })
  image_url?: string;

  @CreateDateColumn()
  created_at!: Date;

  @Column({ default: false })
  is_verified!: boolean;

  @Column({ nullable: true })
  verified_by?: number;

  @Column({ type: "timestamp", nullable: true })
  verified_at?: Date;

  @Column({ default: false })
  is_revoked!: boolean;

  @Column({ type: "timestamp", nullable: true })
  revoked_at?: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user?: User;

  @ManyToOne(() => Admin)
  @JoinColumn({ name: "verified_by" })
  verifier?: User;

  @OneToMany(() => Signature, signature => signature.signatureObject)
  signatures!: Signature[];
}