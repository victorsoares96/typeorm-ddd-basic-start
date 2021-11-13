import { Permission } from '@modules/permissions/infra/typeorm/entities/Permission';
import { EAccessProfileStatus } from '@shared/utils/enums/e-access-profile';

export interface UpdateAccessProfileDTO {
  name: string;
  description: string;
  status: EAccessProfileStatus;
  permissions: Permission[];
}
