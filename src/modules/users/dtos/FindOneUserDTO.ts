export interface FindOneUserDTO {
  id?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  status?: number;
  createdAt?: Date;
  createdById?: string;
  updatedAt?: Date;
  updatedById?: string;
  deletionDate?: Date;
  isDeleted?: boolean;
  lastAccess?: string;
  username?: string;
  email?: string;
}
