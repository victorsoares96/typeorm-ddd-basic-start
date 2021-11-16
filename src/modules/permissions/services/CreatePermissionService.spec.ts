import { container } from 'tsyringe';
import { CreatePermissionService } from './CreatePermissionService';
import { FakePermissionsRepository } from '../repositories/fakes/FakePermissionsRepository';

describe('CreatePermission', () => {
  beforeEach(() => {
    container.clearInstances();

    container.registerSingleton(
      'PermissionsRepository',
      FakePermissionsRepository,
    );
  });

  it('should be able to create a new permission', async () => {
    const createPermission = container.resolve(CreatePermissionService);

    const permission = await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });

    expect(permission).toHaveProperty('id');
    expect(permission.name).toBe('CAN_CREATE_USER');
  });
});
