import { FindManyOptions } from 'typeorm';
import { CreatePermissionDTO } from '@modules/permissions/dtos/CreatePermissionDTO';
import { Permission } from '../infra/typeorm/entities/Permission';

export interface PermissionsRepositoryMethods {
  create(data: CreatePermissionDTO): Promise<Permission>;
  findByName(
    name: string,
    options?: FindManyOptions<Permission>,
  ): Promise<[Permission[], number]>;
  findByIds(
    ids: any[],
    options?: FindManyOptions<Permission>,
  ): Promise<Permission[] | undefined>;
}
