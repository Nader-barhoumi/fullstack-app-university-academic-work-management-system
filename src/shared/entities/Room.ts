// src/entity/Room.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Check } from "typeorm";
import { RoomReservation } from "./RoomReservations";

@Entity("rooms")
@Check("capacity > 0")
export class Room {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  name!: string;

  @Column({ length: 100 })
  location!: string;

  @Column({ nullable: true })
  capacity?: number;

  @Column({ default: true })
  is_active!: boolean;

  @OneToMany(() => RoomReservation, reservation => reservation.room)
  reservations!: RoomReservation[];
}