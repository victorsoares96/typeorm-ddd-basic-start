import { container } from 'tsyringe';

import { PermissionsRepositoryMethods } from '@modules/permissions/repositories/PermissionsRepositoryMethods';
import { PermissionRepository } from '@modules/permissions/infra/typeorm/repositories/PermissionRepository';

import { AccessProfilesRepositoryMethods } from '@modules/accessProfiles/repositories/AccessProfilesRepositoryMethods';
import { AccessProfileRepository } from '@modules/accessProfiles/infra/typeorm/repositories/AccessProfileRepository';

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
  }
}
