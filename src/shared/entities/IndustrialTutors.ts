// src/entity/Teacher.ts
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./Users";
import { Company } from "./Companies";
import { Internship } from "./Internships";


@Entity()
export class IndustrialTutor {
  @PrimaryColumn()
  user_id!: number;

  @ManyToOne(() => Company, (company) => company.industrialTutor)
  company!: Company;    

  @Column({ length: 50, nullable: true })
  jobtitle?: string;

  @OneToOne(() => User, user => user.industrialTutor)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(() => Internship, internship => internship.industrialTutor)
  internships!: Internship[];

}