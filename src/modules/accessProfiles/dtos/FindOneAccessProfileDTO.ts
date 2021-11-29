export interface FindOneAccessProfileDTO {
  id?: string;
  name?: string;
  description?: string;
  status?: number;
  createdAt?: Date;
  createdById?: string;
  updatedAt?: Date;
  updatedById?: string;
  deletionDate?: Date;
  isDeleted?: boolean;
}
