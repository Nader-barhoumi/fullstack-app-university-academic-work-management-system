import { Entity,PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, unique: true })
  name!: string;

  @Column({ length: 10, nullable: true })
  code?: string;
}