import { MaxLength, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';

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

  @ManyToMany(() => AccessProfile, accessProfile => accessProfile.permissions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  accessProfiles: AccessProfile[];
}
