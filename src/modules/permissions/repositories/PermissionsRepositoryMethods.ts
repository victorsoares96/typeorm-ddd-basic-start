import { CreatePermissionDTO } from '@modules/permissions/dtos/CreatePermissionDTO';
import { Permission } from '../infra/typeorm/entities/Permission';

export interface PermissionsRepositoryMethods {
  create(data: CreatePermissionDTO): Promise<Permission>;
  findAndCount(): Promise<[Permission[], number]>;
  findByName(name: string): Promise<Permission | undefined>;
}
