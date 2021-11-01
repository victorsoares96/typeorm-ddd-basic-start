import { MaxLength, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EAccessProfileStatus } from '../utils/enums/e-access-profile';
import { Permission } from './Permission';
import { User } from './User';

@Entity('access_profile')
export class AccessProfile {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'name', unique: true })
  @MinLength(3, { message: 'Name is too short.' })
  @MaxLength(35, { message: 'Name is too long.' })
  name: string;

  @Column({ name: 'description', nullable: true, default: null })
  description: string;

  @OneToMany(() => User, user => user.accessProfile, {
    cascade: true,
  })
  users: User[];

  @Column({ name: 'status', default: EAccessProfileStatus.Active })
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

  @ManyToMany(() => Permission, permission => permission.accessProfiles, {
    eager: true,
  })
  @JoinTable({ name: 'access_profiles_permissions' })
  permissions: Permission[];
}
