import { FindManyOptions, getRepository, Repository } from 'typeorm';
import { validate } from 'class-validator';

import { CreatePermissionDTO } from '@modules/permissions/dtos/CreatePermissionDTO';
import { PermissionsRepositoryMethods } from '@modules/permissions/repositories/PermissionsRepositoryMethods';
import { AppError } from '@shared/errors/AppError';
import { Permission } from '../entities/Permission';

export class PermissionRepository implements PermissionsRepositoryMethods {
  private ormRepository: Repository<Permission>;

  constructor() {
    this.ormRepository = getRepository(Permission);
  }

  public async create({ name }: CreatePermissionDTO): Promise<Permission> {
    const permission = this.ormRepository.create({ name });

    const [error] = await validate(permission, {
      stopAtFirstError: true,
    });

    if (error && error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new AppError(message);
    }

    await this.ormRepository.save(permission);

    return permission;
  }

  public async findAndCount(
    options?: FindManyOptions<Permission>,
  ): Promise<[Permission[], number]> {
    const permissions = await this.ormRepository.findAndCount(options);

    return permissions;
  }

  public async findByName(name: string): Promise<Permission | undefined> {
    const findPermission = await this.ormRepository.findOne({
      where: { name },
    });

    return findPermission;
  }

  public async findByIdsOrFail(
    ids: any[],
    options?: FindManyOptions<Permission>,
  ): Promise<Permission[] | undefined> {
    const findPermissions = await this.ormRepository.findByIds(ids, options);
    if (findPermissions.length === ids.length) return findPermissions;
    return undefined;
  }
}
