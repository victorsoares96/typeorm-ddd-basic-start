import { CreatePermissionDTO } from '@modules/permissions/dtos/CreatePermissionDTO';
import { Permission } from '../infra/typeorm/entities/Permission';

export interface PermissionsRepositoryMethods {
  create(data: CreatePermissionDTO): Promise<Permission>;
  findByName(name: string): Promise<[Permission[], number]>;
  findByIds(ids: string[]): Promise<Permission[] | undefined>;
}
