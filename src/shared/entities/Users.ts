// src/entity/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne } from "typeorm";
import { Address } from "./Addresses";
import { Student } from "./Students";
import { Teacher } from "./Teachers";
import { IndustrialTutor } from "./IndustrialTutors";
import { Admin } from "./Admins";
import { RoleType } from "../enums/RoleType.enum"; // Assuming you have a types file for these enums
import { SexType } from "../enums/SexType.enum"; // Assuming you have a types file for these enums

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "uuid", unique: true, default: () => "uuid_generate_v4()" })
  external_id!: string;

  @Column({ length: 255, default: "no image" })
  profile_picture?: string;

  @Column({ length: 50 })
  first_name!: string;

  @Column({ length: 50 })
  last_name!: string;

  @Column({ type:'enum',enum: SexType })
  sex: SexType;

  @Column({ length: 8 })
  cin!: string;

  @Column({ length: 255, unique: true })
  email!: string;

  @Column({ length: 20 ,unique: true})
  phone!: string;

  @Column({ length: 255, default: () => "crypt('default', gen_salt('bf'))" })
  password_hash?: string;

  @Column({ type: "enum", enum: RoleType})
  role!: RoleType;//strict enum

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @OneToOne(() => Address, address => address.address_details)
  address!: Address;

  @Column({ length: 100, nullable: true })
  reset_token!: string;

  @Column({ type: "timestamp", nullable: true })
  reset_token_expiry?: Date;

  @Column({ type: "timestamp", nullable: true })
  last_login!: Date;

  @Column({ default: true })
  is_active!: boolean;

  @OneToOne(() => Student, student => student.user_id)
  student: Student;

  @OneToOne(() => Teacher, teacher => teacher.user_id)
  teacher: Teacher;

  @OneToOne(() => IndustrialTutor, industrialTutor => industrialTutor.user)
  industrialTutor: IndustrialTutor;

  @OneToOne(() => Admin, admin => admin.user)
  admin: Admin;
}