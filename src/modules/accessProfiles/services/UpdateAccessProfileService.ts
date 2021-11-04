import { validate } from 'class-validator';
import { getRepository } from 'typeorm';

import { AppError } from '@shared/errors/AppError';
import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';
import { Permission } from '@modules/permissions/infra/typeorm/entities/Permission';
import {
  EAccessProfileError,
  EPermissionError,
} from '@shared/utils/enums/e-errors';

interface Request {
  id: string;
  name?: string;
  status?: number;
  description?: string;
  permissionsId?: string;
  updatedById: string;
  updatedByName: string;
}

export class UpdateAccessProfileService {
  public async execute(accessProfileData: Request): Promise<AccessProfile> {
    const { id, permissionsId } = accessProfileData;

    const accessProfilesRepository = getRepository(AccessProfile);

    if (!id) throw new AppError(EAccessProfileError.IdIsRequired);
    const accessProfile = await accessProfilesRepository.findOne(id);

    if (!accessProfile) throw new AppError(EAccessProfileError.NotFound);
    if (!permissionsId) throw new AppError(EPermissionError.IsRequired);

    const permissionsRepository = getRepository(Permission);

    const permissionsArray = permissionsId.split(',');
    const permissions = await permissionsRepository.findByIds(permissionsArray);

    const updatedAccessProfile = {
      ...accessProfile,
      ...accessProfileData,
      ...permissions,
    };

    const [error] = await validate(updatedAccessProfile, {
      stopAtFirstError: true,
    });
    if (error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new AppError(message);
    }

    await accessProfilesRepository.save(updatedAccessProfile);

    return updatedAccessProfile;
  }
}
