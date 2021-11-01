import { MaxLength, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccessProfile } from './AccessProfile';

@Entity('permission')
export class Permission {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'name', unique: true })
  @MinLength(3, { message: 'Name is too short.' })
  @MaxLength(35, { message: 'Name is too long.' })
  name: string;

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

  @ManyToMany(() => AccessProfile, accessProfile => accessProfile.permissions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  accessProfiles: AccessProfile[];
}
