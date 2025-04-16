// src/entity/RoomReservation.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, Check, CreateDateColumn } from "typeorm";
import { Room } from "./Room";
import { User } from "./Users";
import { ProgressStatus } from "../enums/ProgressStatus.enum";
import { Defense } from "./Defenses";

@Entity("room_reservations")
@Check("reservation_date >= CURRENT_DATE")
@Check("end_time > start_time")
export class RoomReservation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  room_id!: number;

  @Column()
  user_id!: number;

  @Column({ type: "date" })
  reservation_date!: Date;

  @Column({ type: "time" })
  start_time!: string;

  @Column({ type: "time" })
  end_time!: string;

  @Column({ type: "enum", enum: "Progress_status", default: ProgressStatus.ON_GOING })
  status!: ProgressStatus;

  @Column({ length: 255, nullable: true })
  purpose?: string;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => Room, room => room.reservations)
  @JoinColumn({ name: "room",referencedColumnName:"name" }) // Correct relation
  room!: Room;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(() => Defense, defense => defense.reservation)
  defenses!: Defense[];
}