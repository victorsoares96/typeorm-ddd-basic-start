import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';

export interface UpdateUserDTO {
  firstName: string;
  lastName: string;
  accessProfile: AccessProfile;
  email: string;
  updatedById: string;
  updatedByName: string;
}
