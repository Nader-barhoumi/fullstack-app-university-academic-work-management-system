// src/entity/Document.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "./Users";

@Entity("documents")
export class Document {
  @PrimaryColumn({ length: 50 })
  id!: string;

  @Column({ length: 50 })
  type!: string;

  @Column({ length: 500 })
  file_url!: string;

  @Column()
  uploaded_by!: number;

  @CreateDateColumn()
  uploaded_at!: Date;

  @Column({ type: "bigint", nullable: true })
  file_size?: number;

  @Column({ length: 10, nullable: true })
  file_type?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "uploaded_by" })
  uploader!: User;
}