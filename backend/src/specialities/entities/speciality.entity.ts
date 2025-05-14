import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Major } from '../../majors/entities/major.entity';
import { DegreeProgram } from '../../degree-programs/entities/degree-program.entity';
@Entity()
export class Speciality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  code: string;

  @ManyToOne(() => Major, (major) => major.specialities)
  @JoinColumn({ name: 'major' })
  major: Major;

  @OneToMany(() => DegreeProgram, (degreeProgram) => degreeProgram.speciality)
  degreePrograms: DegreeProgram[];

  @Column()
  description: string;


}