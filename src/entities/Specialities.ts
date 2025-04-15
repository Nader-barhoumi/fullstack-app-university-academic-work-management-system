import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import {Degree_Program} from "./DegreePrograms";

@Entity()
export class Specialities {
    @PrimaryGeneratedColumn()    
    id!: number;
    
    @Column({ length: 50, unique: true })
    name!: string; //legal_name?: string;

    @Column({ type:'text', nullable: true })
    description?: string;

    @OneToOne(() => Degree_Program, degree_program => degree_program.name)
    degree_program!: Degree_Program;
}