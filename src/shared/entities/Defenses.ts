// src/entity/Defense.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { AcademicWork } from "./AcademicWorks";
import { Prototype } from "./Prototypes";
import { RoomReservation } from "./RoomReservations";
import { DefenseDecision } from "../enums/DefenseDecision.enum";
import { JuryEvaluation } from "./JuryEvaluations";

@Entity("defenses")
export class Defense {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  academic_work_id!: number;

  @Column({ nullable: true })
  prototype_id?: number;

  @Column({ nullable: true })
  reservation_id?: number;

  @Column({ type: "enum", enum: DefenseDecision })
  decision!: DefenseDecision;

  @Column({ nullable: true })
  jury_evaluation_id?: number;

  @ManyToOne(() => AcademicWork, academicWork => academicWork.defenses)
  @JoinColumn({ name: "academic_work_id" })
  academicWork!: AcademicWork;

  @ManyToOne(() => Prototype, prototype => prototype.defenses)
  @JoinColumn({ name: "prototype_id" })
  prototype?: Prototype;

  @ManyToOne(() => RoomReservation, reservation => reservation.defenses)
  @JoinColumn({ name: "reservation_id" })
  reservation?: RoomReservation;

  @OneToOne(() => JuryEvaluation)
  juryEvaluation?: JuryEvaluation;
}