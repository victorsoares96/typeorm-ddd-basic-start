import { validate } from 'class-validator';
import { injectable, inject } from 'tsyringe';

import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';

import { EPermissionError } from '@modules/permissions/utils/enums/e-errors';
import { AppError } from '@shared/errors/AppError';
import { PermissionsRepositoryMethods } from '@modules/permissions/repositories/PermissionsRepositoryMethods';
import { AccessProfilesRepositoryMethods } from '../repositories/AccessProfilesRepositoryMethods';

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

@injectable()
export class CreateAccessProfileService {
  constructor(
    @inject('AccessProfilesRepository')
    private accessProfilesRepository: AccessProfilesRepositoryMethods,
    @inject('PermissionsRepository')
    private permissionsRepository: PermissionsRepositoryMethods,
  ) {}

  public async execute(accessProfileData: Request): Promise<AccessProfile> {
    const { permissionsId } = accessProfileData;

    if (!permissionsId) throw new AppError(EPermissionError.IdIsRequired);

    const ids = permissionsId.split(',');
    const permissions = await this.permissionsRepository.findByIds(ids);

    if (!permissions) throw new AppError(EPermissionError.NotFound);

    const accessProfile = await this.accessProfilesRepository.create({
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

    return accessProfile;
  }
}
