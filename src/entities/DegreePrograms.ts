import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne,  } from "typeorm";
import { Institution } from "./Institutions";

@Entity()
export class Degree_Program {  
    @PrimaryGeneratedColumn()    
    id!: number;
    
    @Column({ length: 50, unique: true })
    name!: string; //legal_name?: string;

    @Column({ type:'text', nullable: true })
    description?: string;

    @Column({ length: 10, nullable: true })
    code?: string;

    @OneToOne(() => Institution, institution => institution.id)
    institution_id?: Institution;
}