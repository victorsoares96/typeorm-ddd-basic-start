import { validate } from 'class-validator';
import { getRepository } from 'typeorm';

import { AppError } from '../../errors/AppError';
import { AccessProfile } from '../../models/AccessProfile';
import { Permission } from '../../models/Permission';
import {
  EAccessProfileError,
  EPermissionError,
} from '../../utils/enums/e-errors';

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
