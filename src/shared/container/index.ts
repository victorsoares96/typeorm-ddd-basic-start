import { container } from 'tsyringe';

import { PermissionsRepositoryMethods } from '@modules/permissions/repositories/PermissionsRepositoryMethods';
import { PermissionRepository } from '@modules/permissions/infra/typeorm/repositories/PermissionRepository';

import { AccessProfilesRepositoryMethods } from '@modules/accessProfiles/repositories/AccessProfilesRepositoryMethods';
import { AccessProfileRepository } from '@modules/accessProfiles/infra/typeorm/repositories/AccessProfileRepository';

import { UsersRepositoryMethods } from '@modules/users/repositories/UsersRepositoryMethods';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';

export class Tsyringe {
  constructor() {
    container.registerSingleton<PermissionsRepositoryMethods>(
      'PermissionsRepository',
      PermissionRepository,
    );

    container.registerSingleton<AccessProfilesRepositoryMethods>(
      'AccessProfileRepository',
      AccessProfileRepository,
    );

    container.registerSingleton<UsersRepositoryMethods>(
      'UsersRepository',
      UserRepository,
    );
  }
}
