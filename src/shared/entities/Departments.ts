import { Entity,PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Student } from "./Students";
import { AcademicInstitution } from "./AcademicInstitution";
import { Teacher } from "./Teachers";
@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, unique: true })
  name!: string;

  @Column({ length: 10, nullable: true })
  code?: string;

  @OneToMany(() => Student, (student) => student.department)
  students?: Student[];

  @ManyToOne(() => AcademicInstitution, (academicinstitutions) => academicinstitutions.departments) // Correct relation
  institution!: AcademicInstitution; // Not `institution_id`

  @OneToMany(() => Teacher, teacher => teacher.department)
  teachers?: Teacher[];


}