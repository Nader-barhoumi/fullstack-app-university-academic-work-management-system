// src/entity/Audit.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Check, CreateDateColumn } from "typeorm";
import { User } from "./Users";

@Entity("audits")
@Check("action_type IN ('create', 'update', 'delete')")
export class Audit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  table_name!: string;

  @Column()
  record_id!: number;

  @Column({ length: 20 })
  action_type!: string;

  @Column({ type: "jsonb", nullable: true })
  old_data?: any;

  @Column({ type: "jsonb", nullable: true })
  new_data?: any;

  @Column({ nullable: true })
  performed_by?: number;

  @CreateDateColumn()
  performed_at!: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "performed_by" })
  performer?: User;
}