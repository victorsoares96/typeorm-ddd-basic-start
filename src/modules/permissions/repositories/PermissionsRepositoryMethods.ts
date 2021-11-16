import { FindManyOptions } from 'typeorm';
import { Token } from 'typedi';
import { CreatePermissionDTO } from '@modules/permissions/dtos/CreatePermissionDTO';
import { Permission } from '../infra/typeorm/entities/Permission';

export const PermissionsRepositoryToken =
  new Token<PermissionsRepositoryMethods>('PermissionsRepositoryToken');
export interface PermissionsRepositoryMethods {
  create(data: CreatePermissionDTO): Promise<Permission>;
  findAndCount(options?: FindManyOptions): Promise<[Permission[], number]>;
  findByName(name: string): Promise<Permission | undefined>;
  findByIds(
    ids: any[],
    options?: FindManyOptions<Permission>,
  ): Promise<Permission[] | undefined>;
}
