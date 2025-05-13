import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AcademicInstitution } from '../../academic-institution/entities/academic-institution.entity';
import { DegreeProgramType } from '../../enums/DegreeProgramType.enum';

@Entity('degree_program')
export class DegreeProgram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({unique: true })
  name: string;

  @Column({ type: 'enum', enum: DegreeProgramType }) 
  level: DegreeProgramType;

  // @ManyToOne(() => DegreeProgram, (degreeProgram) => degreeProgram.majors)


  @Column()
  duration_years: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => AcademicInstitution, (academicInstitution) => academicInstitution.degreePrograms)
  @JoinColumn({ referencedColumnName: 'name' })
  institution: AcademicInstitution;

}