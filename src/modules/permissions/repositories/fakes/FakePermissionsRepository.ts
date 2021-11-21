import { validate } from 'class-validator';

import { CreatePermissionDTO } from '@modules/permissions/dtos/CreatePermissionDTO';
import { PermissionsRepositoryMethods } from '@modules/permissions/repositories/PermissionsRepositoryMethods';
import { AppError } from '@shared/errors/AppError';
import { Permission } from '@modules/permissions/infra/typeorm/entities/Permission';

export class FakePermissionsRepository implements PermissionsRepositoryMethods {
  private permissions: Permission[] = [];

  public async create({ name }: CreatePermissionDTO): Promise<Permission> {
    const permission = new Permission();

    Object.assign(permission, { id: '1', name });

    const [error] = await validate(permission, {
      stopAtFirstError: true,
    });

    if (error && error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new AppError(message);
    }

    this.permissions.push(permission);

    return permission;
  }

  public async findByName(name: string): Promise<[Permission[], number]> {
    let findPermissions: Permission[] = [];

    const containLikeOperator =
      name[0] === '%' && name[name.length - 1] === '%';

    const removeLikeOperator = (str: string) => str.replace(/%/g, '');

    if (containLikeOperator) {
      findPermissions = this.permissions.filter(permission =>
        permission.name.includes(removeLikeOperator(name)),
      );
    } else {
      findPermissions = this.permissions.filter(
        permission => permission.name === removeLikeOperator(name),
      );
    }

    return [findPermissions, findPermissions.length];
  }

  public async findByIds(ids: string[]): Promise<Permission[] | undefined> {
    const findPermissions = ids.map(id =>
      this.permissions.find(permission => permission.id === id),
    );
    if (findPermissions.some(el => !el)) return undefined;
    return findPermissions as Permission[];
  }
}
