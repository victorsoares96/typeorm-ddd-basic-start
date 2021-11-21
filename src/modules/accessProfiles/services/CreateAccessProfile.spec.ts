import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { CreatePermissionService } from '@modules/permissions/services/CreatePermissionService';
import { AppError } from '@shared/errors/AppError';
import { container } from 'tsyringe';
import { FakeAccessProfileRepository } from '../repositories/fakes/FakeAccessProfilesRepository';
import { CreateAccessProfileService } from './CreateAccessProfileService';

describe('CreateAccessProfile', () => {
  beforeAll(() => {
    container.registerSingleton(
      'PermissionsRepository',
      FakePermissionsRepository,
    );
    container.registerSingleton(
      'AccessProfilesRepository',
      FakeAccessProfileRepository,
    );
  });
  beforeEach(() => {
    container.clearInstances();
  });

  it('should be able to create a new access profile', async () => {
    const createAccessProfile = container.resolve(CreateAccessProfileService);
    const createPermission = container.resolve(CreatePermissionService);

    await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });
    const accessProfile = await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    expect(accessProfile).toHaveProperty('id');
    expect(accessProfile.name).toBe('Admin');
  });

  /* it('should not be able to create a new permission with same name', async () => {
    const createAccessProfile = container.resolve(CreateAccessProfileService);

    await createAccessProfile.execute({
      name: 'Admin',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    expect(
      await createAccessProfile
        .execute({
          name: 'Admin',
          permissionsId: '1',
          createdById: '1',
          createdByName: 'Foo',
          updatedById: '1',
          updatedByName: 'Foo',
        })
        .then(res => res)
        .catch(err => err),
    ).toBeInstanceOf(AppError);
  }); */
});
