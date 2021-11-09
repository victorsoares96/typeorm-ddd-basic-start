import { FindManyOptions } from 'typeorm';
import { CreatePermissionDTO } from '@modules/permissions/dtos/CreatePermissionDTO';
import { Permission } from '../infra/typeorm/entities/Permission';

export interface PermissionsRepositoryMethods {
  create(data: CreatePermissionDTO): Promise<Permission>;
  findAndCount(options?: FindManyOptions): Promise<[Permission[], number]>;
  findByName(name: string): Promise<Permission | undefined>;
}
