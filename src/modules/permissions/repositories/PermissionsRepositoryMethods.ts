import { FindOneAccessProfileDTO } from '@modules/accessProfiles/dtos/FindOneAccessProfileDTO';
import { CreatePermissionDTO } from '@modules/permissions/dtos/CreatePermissionDTO';
import { FindManyPermissionDTO } from '../dtos/FindManyPermissionDTO';
import { Permission } from '../infra/typeorm/entities/Permission';

export interface PermissionsRepositoryMethods {
  create(data: CreatePermissionDTO): Promise<Permission>;
  findOne(data: FindOneAccessProfileDTO): Promise<Permission | undefined>;
  findMany(data: FindManyPermissionDTO): Promise<[Permission[], number]>;
  findByIds(ids: string[]): Promise<Permission[] | undefined>;
}
