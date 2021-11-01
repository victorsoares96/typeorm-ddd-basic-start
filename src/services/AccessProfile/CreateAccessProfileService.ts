import { validate } from 'class-validator';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../../errors/AppError';
import { AccessProfile } from '../../models/AccessProfile';
import { AccessProfileRepository } from '../../repositories/AccessProfileRepository';
import { PermissionRepository } from '../../repositories/PermissionRepository';
import {
  EAccessProfileError,
  EPermissionError,
} from '../../utils/enums/e-errors';

export interface Request {
  name: string;
  description?: string;
  status?: number;
  createdById?: string;
  createdByName?: string;
  updatedById?: string;
  updatedByName?: string;
  deletionDate?: string;
  permissionsId: string;
}

export class CreateAccessProfileService {
  public async execute(accessProfileData: Request): Promise<AccessProfile> {
    const { name, permissionsId } = accessProfileData;

    if (!permissionsId) throw new AppError(EPermissionError.IdIsRequired);

    const accessProfilesRepository = getCustomRepository(
      AccessProfileRepository,
    );

    const accessProfileWithSameName = await accessProfilesRepository.findByName(
      name,
    );
    if (accessProfileWithSameName)
      throw new AppError(EAccessProfileError.AccessProfileAlreadyExist);

    const ids = permissionsId.split(',');
    const permissionsRepository = getCustomRepository(PermissionRepository);
    const permissions = await permissionsRepository.findByIds(ids);

    if (!permissions) throw new AppError(EPermissionError.NotFound);

    const accessProfile = accessProfilesRepository.create({
      ...accessProfileData,
      permissions,
    });

    const [error] = await validate(accessProfile, {
      stopAtFirstError: true,
    });
    if (error && error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new AppError(message);
    }

    await accessProfilesRepository.save(accessProfile);

    return accessProfile;
  }
}
