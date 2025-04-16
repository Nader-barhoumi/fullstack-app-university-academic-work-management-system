// src/entity/Admin.ts
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./Users";
import { Invitation } from "./Invitations";
import { TutorChangeRequest } from "./TutorChangeRequests";
import { DiplomaDelivery } from "./DiplomaDelivries";
import { Responsibility } from "./Responsibilities"; // Assuming you have a Responsibility entity 

@Entity("admins")
export class Admin {
  @PrimaryColumn()
  user_id!: number;

  @Column({ length: 50 })
  position!: string;

  @Column({ default: 1 })
  access_level!: number;

  @Column({ default: true })
  can_manage_users!: boolean;

  @OneToOne(() => User, user => user.admin, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(() => Invitation, invitation => invitation.sender)
  invitations!: Invitation[];

}