export interface FindManyUserDTO {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  status?: number;
  username?: string;
  email?: string;
  createdAt?: Date;
  createdById?: string;
  updatedAt?: Date;
  updatedById?: string;
  deletionDate?: Date;
  lastAccess?: string;
  isDeleted?: boolean;
  offset?: number;
  isAscending?: boolean;
  limit?: number;
}
