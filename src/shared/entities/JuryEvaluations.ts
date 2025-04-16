// src/entity/JuryEvaluation.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, Check, CreateDateColumn, Unique } from "typeorm";
import { Defense } from "./Defenses";
import { Teacher } from "./Teachers";
import { JurySpec } from "../enums/JurySpec.enum";
import { DiplomaDelivery } from "./DiplomaDelivries";

@Entity("jury_evaluations")
@Check("score BETWEEN 0 AND 20")
@Unique("unique_defense_jury", ["defense_id"])
export class JuryEvaluation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  defense_id!: number;

  @Column()
  supervisor_id!: number;

  @Column()
  president_id!: number;

  @Column()
  reporter_id!: number;

  @Column()
  score!: number;

  @Column({ type: "text", nullable: true })
  evaluation_comments?: string;

  @CreateDateColumn()
  evaluation_date!: Date;

  @Column({ type: "enum", enum: JurySpec })
  jury_role!: JurySpec;

  @ManyToOne(() => Teacher, teacher => teacher.supervisorEvaluations)
  @JoinColumn({ name: "supervisor_id" })
  supervisor!: Teacher;

  @ManyToOne(() => Teacher, teacher => teacher.presidentEvaluations)
  @JoinColumn({ name: "president_id" })
  president!: Teacher;

  @ManyToOne(() => Teacher, teacher => teacher.reporterEvaluations)
  @JoinColumn({ name: "reporter_id" })
  reporter!: Teacher;


}