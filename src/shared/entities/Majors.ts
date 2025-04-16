import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { Department } from "./Departments";
import { Degree_Program } from "./DegreePrograms";

@Entity()
export class Major {
    @PrimaryGeneratedColumn()    
    id!: number;
    
    @Column({ length: 50, unique: true })
    name!: string; //legal_name?: string;

    @Column({ type:'text', nullable: true })
    description?: string;

    @ManyToOne(() => Department, department => department.name)
    department!: Department;

    @OneToOne(() => Degree_Program, degree_program => degree_program.name)
    degree_program!: Degree_Program;
}