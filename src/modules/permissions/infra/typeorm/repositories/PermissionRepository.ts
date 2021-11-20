import { getRepository, ILike, Repository } from 'typeorm';
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

  public async findByName(name: string): Promise<[Permission[], number]> {
    const findPermissions = await this.ormRepository.findAndCount({
      where: { name: ILike(`${name}`) },
    });

    return findPermissions;
  }

  public async findByIds(ids: string[]): Promise<Permission[] | undefined> {
    const findPermissions = await this.ormRepository.findByIds(ids);
    if (findPermissions.length === ids.length) return findPermissions;
    return undefined;
  }
}
