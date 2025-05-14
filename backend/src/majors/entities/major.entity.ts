import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany , JoinColumn } from 'typeorm';
import { Department } from '../../departments/entities/department.entity';
import { Speciality } from '../../specialities/entities/speciality.entity';
import { DegreeProgram } from '../../degree-programs/entities/degree-program.entity';

@Entity()
export class Major {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 , unique: true })
  name: string;

  @ManyToOne(() => Department, (department) => department.majors)
  @JoinColumn({ name: 'department' })
  department: Department;

  @OneToMany(() => Speciality, (speciality) => speciality.major)
  specialities: Speciality[];

  @OneToMany(() => DegreeProgram,(degreeprogram) => degreeprogram.major)
  degreePrograms: DegreeProgram[]

  @Column()
  description: string;
}
