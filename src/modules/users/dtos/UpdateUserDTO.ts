import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';

export interface UpdateUserDTO {
  firstName: string;
  lastName: string;
  accessProfile: AccessProfile;
  username: string;
  email: string;
  updatedById: string;
  updatedByName: string;
}
