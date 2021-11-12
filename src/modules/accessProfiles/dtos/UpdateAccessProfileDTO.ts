import { EAccessProfileStatus } from '@shared/utils/enums/e-access-profile';

export interface UpdateAccessProfileDTO {
  name: string;
  description: string;
  status: EAccessProfileStatus;
}
