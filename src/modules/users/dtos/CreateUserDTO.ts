import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  accessProfile: AccessProfile;
  avatar: string;
  username: string;
  email: string;
  password: string;
  createdById: string;
  createdByName: string;
  updatedById: string;
  updatedByName: string;
  lastAccess: string;
}
