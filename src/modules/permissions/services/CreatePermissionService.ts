import { injectable, inject } from 'tsyringe';

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
    const permission = this.permissionsRepository.create({
      name,
    });

    return permission;
  }
}
