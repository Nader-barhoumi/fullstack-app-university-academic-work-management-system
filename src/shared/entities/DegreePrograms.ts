import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne  } from "typeorm";
import { AcademicInstitution } from "./AcademicInstitution";

@Entity()
export class DegreeProgram {  
    @PrimaryGeneratedColumn()    
    id!: number;
    
    @Column({ length: 50, unique: true })
    name!: string; //legal_name?: string;

    @Column({ type:'text', nullable: true })
    description?: string;

    @Column({ length: 10, nullable: true })
    code?: string;

    @ManyToOne(() => AcademicInstitution, (institution) => institution.degreePrograms) // Correct relation
    institution!: AcademicInstitution; // Not `institution_id`
}