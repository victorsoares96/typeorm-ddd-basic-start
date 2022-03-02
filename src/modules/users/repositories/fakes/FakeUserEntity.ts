import { hashSync } from 'bcryptjs';
import { IsEmpty } from 'class-validator';

import { EUserStatus } from '@modules/users/utils/enums/e-user';
import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';

export class User {
  id: string;

  @IsEmpty({ message: 'Password is required' })
  firstName: string;

  @Column({ name: 'last_name' })
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
  username: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  generateFullName?(): void {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }

  @BeforeInsert()
  hashPassword?(): void {
    this.password = hashSync(this.password, 8);
  }
}
