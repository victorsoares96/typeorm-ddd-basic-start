import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { EUserStatus } from '../utils/enums/e-user';
import { AccessProfile } from './AccessProfile';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'first_name' })
  @IsNotEmpty({ message: 'First name is required.' })
  firstName: string;

  @Column({ name: 'last_name' })
  @IsNotEmpty({ message: 'Last name is required.' })
  lastName: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'status', default: EUserStatus.Active })
  status: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({
    name: 'created_by_id',
    nullable: true,
    default: null,
  })
  createdById: string;

  @Column({
    name: 'created_by_name',
    nullable: true,
    default: null,
  })
  createdByName: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({
    name: 'updated_by_id',
    nullable: true,
    default: null,
  })
  updatedById: string;

  @Column({
    name: 'updated_by_name',
    nullable: true,
    default: null,
  })
  updatedByName: string;

  @DeleteDateColumn({ name: 'deletion_date' })
  deletionDate: Date;

  @Column({
    name: 'last_access',
    nullable: true,
    default: null,
  })
  lastAccess: string;

  @ManyToOne(() => AccessProfile, accessProfile => accessProfile.users, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  accessProfile: AccessProfile;

  @Column({ name: 'avatar', nullable: true, default: null })
  avatar: string;

  @Column({ name: 'username', unique: true })
  @MinLength(5, { message: 'Username is too short.' })
  @MaxLength(15, { message: 'Username is too long.' })
  username: string;

  @Column({ name: 'email', unique: true })
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Email is invalid.' })
  email: string;

  @Column({ name: 'password' })
  @IsNotEmpty({ message: 'Password is required.' })
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){10,}$/,
    {
      message:
        'Password must be at least 10 characters, 1 upper case, 1 lower case and 1 special character.',
    },
  )
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  generateFullName?(): void {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}
