import { container } from 'tsyringe';

import { PermissionsRepositoryMethods } from '@modules/permissions/repositories/PermissionsRepositoryMethods';
import { PermissionRepository } from '@modules/permissions/infra/typeorm/repositories/PermissionRepository';

container.registerSingleton<PermissionsRepositoryMethods>(
  'PermissionsRepository',
  PermissionRepository,
);
