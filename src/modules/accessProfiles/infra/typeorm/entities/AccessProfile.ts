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
import { EAccessProfileStatus } from '@modules/accessProfiles/utils/enums/e-status';
import { Permission } from '@modules/permissions/infra/typeorm/entities/Permission';
import { User } from '@modules/users/infra/typeorm/entities/User';

@Entity('access_profile')
export class AccessProfile {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'name', unique: true })
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
