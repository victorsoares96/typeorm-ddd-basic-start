import { injectable, inject } from 'tsyringe';
import { validate } from 'class-validator';

import { AppError } from '@shared/errors/AppError';
import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';
import { EPermissionError } from '@modules/permissions/utils/enums/e-errors';
import { PermissionsRepositoryMethods } from '@modules/permissions/repositories/PermissionsRepositoryMethods';
import { AccessProfilesRepositoryMethods } from '../repositories/AccessProfilesRepositoryMethods';
import { EAccessProfileError } from '../utils/enums/e-errors';

/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

/**
 * Dependency Inversion (SOLID)
 */

interface Request {
  id: string;
  name?: string;
  description?: string;
  permissionsId?: string;
  updatedById: string;
  updatedByName: string;
}

@injectable()
export class UpdateAccessProfileService {
  constructor(
    @inject('AccessProfilesRepository')
    private accessProfilesRepository: AccessProfilesRepositoryMethods,
    @inject('PermissionsRepository')
    private permissionsRepository: PermissionsRepositoryMethods,
  ) {}

  public async execute(accessProfileData: Request): Promise<AccessProfile> {
    const { id, permissionsId } = accessProfileData;

    if (accessProfileData.name && accessProfileData.name.length < 3)
      throw new AppError(EAccessProfileError.NameTooShort);
    if (accessProfileData.name && accessProfileData.name.length > 35)
      throw new AppError(EAccessProfileError.NameTooLong);

    if (!id) throw new AppError(EAccessProfileError.IdIsRequired);
    if (!permissionsId) throw new AppError(EPermissionError.IsRequired);

    const accessProfile = await this.accessProfilesRepository.findOne({
      id,
    });

    if (!accessProfile) throw new AppError(EAccessProfileError.NotFound);

    const permissionsArray = permissionsId.split(',');
    const permissions = await this.permissionsRepository.findByIds(
      permissionsArray,
    );

    if (!permissions) throw new AppError(EPermissionError.NotFound);

    delete accessProfileData.permissionsId;

    const [error] = await validate(
      {
        ...accessProfile,
        ...accessProfileData,
        permissions,
      },
      {
        stopAtFirstError: true,
      },
    );
    if (error && error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new AppError(message);
    }

    const [updatedAccessProfile] = await this.accessProfilesRepository.update([
      {
        ...accessProfile,
        ...accessProfileData,
        permissions,
      },
    ]);

    return updatedAccessProfile;
  }
}
