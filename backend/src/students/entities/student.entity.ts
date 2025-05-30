import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { SexType } from '../../enums/SexType.enum';
import { LevelType } from '../../enums/LevelType.enum';
import { DegreeProgram } from '../../degree-programs/entities/degree-program.entity';
@Entity('students')
export class Student {
  @PrimaryColumn()
  user_id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: SexType, nullable: true })
  sex: SexType;

  @Column({ length: 10 })
  student_id: string;

  @ManyToOne(() => DegreeProgram, (degree) => degree.students)
  @JoinColumn({ referencedColumnName: 'id' })
  degree: DegreeProgram;

  @Column({ type: 'enum', enum: LevelType })
  level: LevelType;
}