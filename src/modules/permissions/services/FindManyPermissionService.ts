import { injectable, inject } from 'tsyringe';
import { FindManyPermissionDTO } from '../dtos/FindManyPermissionDTO';

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
export class FindManyPermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: PermissionsRepositoryMethods,
  ) {}

  public async execute(
    filters: FindManyPermissionDTO,
  ): Promise<[Permission[], number]> {
    const permissions = await this.permissionsRepository.findMany(filters);

    return permissions;
  }
}
