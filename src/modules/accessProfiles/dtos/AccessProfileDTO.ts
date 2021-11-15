import { Permission } from '@modules/permissions/infra/typeorm/entities/Permission';
import { User } from '@modules/users/infra/typeorm/entities/User';

export interface AccessProfileDTO {
  id: string;
  name: string;
  description: string;
  status: number;
  createdAt: Date;
  createdById: string;
  createdByName: string;
  updatedAt: Date;
  updatedById: string;
  updatedByName: string;
  deletionDate: Date;
  users: User[];
  permissions: Permission[];
}
