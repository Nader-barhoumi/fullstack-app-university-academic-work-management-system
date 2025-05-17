import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Addresses } from '../../addresses/entities/address.entity';
import { RoleType } from '../../enums/RoleType.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true, default: 'uuid_generate_v4()' })
  external_id: string;

  @Column({ default: 'assets/images/default-avatar.png' })
  profile_picture: string;

  @Column({ length: 50 })
  first_name: string;

  @Column({ length: 50 })
  last_name: string;

  @Column({ length: 8 })
  cin: string;

  @Column()
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ default: 'crypt(\'default\', gen_salt(\'bf\'))' })
  password_hash: string;

  @Column({ type: 'enum', enum: RoleType })
  role: RoleType;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Addresses, { nullable: true })
  @JoinColumn({ name: 'address_id' })
  address: Addresses;

  @Column({ nullable: true })
  reset_token: string;

  @Column({ nullable: true })
  reset_token_expiry: Date;

  @Column({ nullable: true })
  last_login: Date;

  @Column({ default: true })
  is_active: boolean;
}