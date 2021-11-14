import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';

export interface RecoverUserDTO {
  firstName: string;
  lastName: string;
  accessProfile: AccessProfile;
  avatar: string;
  username: string;
  email: string;
  password: string;
  lastAccess: string;
}
