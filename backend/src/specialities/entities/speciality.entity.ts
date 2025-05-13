import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Major } from '../../majors/entities/major.entity';
@Entity()
export class Speciality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @ManyToOne(() => Major, (major) => major.specialities)
  @JoinColumn({ name: 'major' })
  major: Major;

  @Column()
  description: string;
}