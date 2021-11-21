import { AppError } from '@shared/errors/AppError';
import { EGenericError } from '@shared/utils/enums/e-errors';
import { injectable, inject } from 'tsyringe';
import { FindOnePermissionDTO } from '../dtos/FindOnePermissionDTO';

import { Permission } from '../infra/typeorm/entities/Permission';
import { PermissionsRepositoryMethods } from '../repositories/PermissionsRepositoryMethods';

/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

/**
 * Dependency Inversion (SOLID)
 */

@injectable()
export class FindOnePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: PermissionsRepositoryMethods,
  ) {}

  public async execute(
    filters: FindOnePermissionDTO,
  ): Promise<Permission | undefined> {
    if (
      Object.keys(filters).length === 0 ||
      Object.values(filters).some(value => !value)
    )
      throw new AppError(EGenericError.MissingFilters);
    const permission = await this.permissionsRepository.findOne(filters);

    return permission;
  }
}
