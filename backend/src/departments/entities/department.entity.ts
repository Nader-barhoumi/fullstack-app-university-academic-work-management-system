import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Major } from '../../majors/entities/major.entity';
@Entity('department')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 10, unique: true })
  code: string;

  @OneToMany(() => Major, (major) => major.department)
  majors: Major[];
}
