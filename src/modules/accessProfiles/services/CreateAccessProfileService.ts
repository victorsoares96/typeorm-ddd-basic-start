import { injectable, inject } from 'tsyringe';

import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';

import { EPermissionError } from '@modules/permissions/utils/enums/e-errors';
import { AppError } from '@shared/errors/AppError';
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

export interface Request {
  name: string;
  description?: string;
  status?: number;
  createdById: string;
  createdByName: string;
  updatedById: string;
  updatedByName: string;
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
    const { name, permissionsId } = accessProfileData;

    if (name.length < 3) throw new AppError(EAccessProfileError.NameTooShort);
    if (name.length > 35) throw new AppError(EAccessProfileError.NameTooLong);
    if (!permissionsId) throw new AppError(EPermissionError.IdIsRequired);

    const ids = permissionsId.split(',');
    const permissions = await this.permissionsRepository.findByIds(ids);

    if (!permissions) throw new AppError(EPermissionError.NotFound);

    const accessProfileExists = await this.accessProfilesRepository.findOne({
      name,
    });
    if (accessProfileExists)
      throw new AppError(EAccessProfileError.AlreadyExist);

    const accessProfile = await this.accessProfilesRepository.create({
      ...accessProfileData,
      permissions,
    });

    return accessProfile;
  }
}
