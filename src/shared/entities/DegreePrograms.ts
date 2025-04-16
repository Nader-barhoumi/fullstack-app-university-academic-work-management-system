import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne  } from "typeorm";
import { AcademicInstitution } from "./AcademicInstitution";
import { Speciality } from "./Specialities";
import { Student } from "./Students"; // Assuming you have a Student entity
import { DiplomaDelivery } from "./DiplomaDelivries";

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

    @ManyToMany(() => Student, student => student.degreePrograms)
    students!: Student[];

    @ManyToOne(() => AcademicInstitution, (academicInstitution) => academicInstitution.degreePrograms) // Correct relation
    institution!: AcademicInstitution; // Not `institution_id`

    @OneToMany(()=> Speciality, (speciality) => speciality.degreeProgram)
    specialities!: Speciality[]; // Correct relation

    @OneToMany(() => DiplomaDelivery, (diplomaDelivery) => diplomaDelivery.degree)
    diplomaDeliveries!: DiplomaDelivery[]; // Correct relation

}