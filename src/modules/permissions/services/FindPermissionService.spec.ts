import { container } from 'tsyringe';
import { CreatePermissionService } from './CreatePermissionService';
import { FakePermissionsRepository } from '../repositories/fakes/FakePermissionsRepository';
import { FindPermissionService } from './FindPermissionService';

describe('FindPermission', () => {
  beforeEach(() => {
    container.clearInstances();

    container.registerSingleton(
      'PermissionsRepository',
      FakePermissionsRepository,
    );
  });

  it('should be able to search a permissions', async () => {
    const createPermission = container.resolve(CreatePermissionService);
    const findPermissions = container.resolve(FindPermissionService);

    await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });

    const [permissions, countPermissions] = await findPermissions.execute({
      name: '%CAN_%',
    });

    expect(permissions).toHaveLength(1);
    expect(countPermissions).toBe(1);
  });
});
