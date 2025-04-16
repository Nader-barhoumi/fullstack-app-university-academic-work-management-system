// src/entity/Invitation.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Check } from "typeorm";
import { Admin } from "./Admins";
import { Company } from "./Companies";
import { Signature } from "./Signatures";

@Entity("invitations")
// @Check("receiver_email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'")
// @Check("phone ~ '^[0-9]{8,13}$'")
export class Invitation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sender_id!: number;

  @Column({ length: 50 })
  receiver_firstname!: string;

  @Column({ length: 50 })
  receiver_lastname!: string;

  @Column({ length: 255 })
  receiver_email!: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ nullable: true })
  company_name?: number;

  @Column()
  receiver_id!: number;

  @Column({ type: "text", nullable: true })
  message?: string;

  @Column({ nullable: true })
  signature_id?: number;

  @ManyToOne(() => Admin, admin => admin.invitations)
  @JoinColumn()
  sender!: Admin;

  @ManyToOne(() => Company)
  @JoinColumn({ name: "company_name" })
  company?: Company;

  @ManyToOne(() => Signature)
  @JoinColumn({ name: "signature_id" })
  signature?: Signature;
}