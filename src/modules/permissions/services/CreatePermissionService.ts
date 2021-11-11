import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { EPermissionError } from '@shared/utils/enums/e-errors';

import { Permission } from '../infra/typeorm/entities/Permission';
import { PermissionsRepositoryMethods } from '../repositories/PermissionsRepositoryMethods';

export interface Request {
  name: string;
}

@injectable()
export class CreatePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: PermissionsRepositoryMethods,
  ) {}

  public async execute({ name }: Request): Promise<Permission> {
    const permissionWithSameName = await this.permissionsRepository.findByName(
      name,
    );

    if (permissionWithSameName)
      throw new AppError(EPermissionError.AlreadyExist);

    const permission = this.permissionsRepository.create({
      name,
    });

    return permission;
  }
}
