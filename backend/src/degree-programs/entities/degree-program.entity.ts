import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AcademicInstitution } from '../../academic-institution/entities/academic-institution.entity';
import { DegreeProgramType } from '../../enums/DegreeProgramType.enum';
import { Major } from '../../majors/entities/major.entity';
import { Speciality } from 'src/specialities/entities/speciality.entity';
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

  @ManyToOne(() => Major, (major) => major.degreePrograms)
  @JoinColumn({ name: 'major_id' })
  major: Major;

  @ManyToOne(() => Speciality, (speciality) => speciality.degreePrograms)
  @JoinColumn({ name: 'speciality_id' })
  speciality: Speciality;

  @Column()
  duration_years: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => AcademicInstitution, (academicInstitution) => academicInstitution.degreePrograms)
  @JoinColumn({ referencedColumnName: 'id' , name: 'institution_id' })
  institution: AcademicInstitution;

}