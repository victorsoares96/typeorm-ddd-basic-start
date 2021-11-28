import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { CreatePermissionService } from '@modules/permissions/services/CreatePermissionService';
import { EPermissionError } from '@modules/permissions/utils/enums/e-errors';
import { AppError } from '@shared/errors/AppError';
import { FakeAccessProfileRepository } from '../repositories/fakes/FakeAccessProfilesRepository';
import { EAccessProfileError } from '../utils/enums/e-errors';
import { CreateAccessProfileService } from './CreateAccessProfileService';

let fakePermissionsRepository: FakePermissionsRepository;
let createPermission: CreatePermissionService;
let fakeAccessProfileRepository: FakeAccessProfileRepository;
let createAccessProfile: CreateAccessProfileService;

describe('CreateAccessProfile', () => {
  beforeEach(async () => {
    fakePermissionsRepository = new FakePermissionsRepository();
    createPermission = new CreatePermissionService(fakePermissionsRepository);

    fakeAccessProfileRepository = new FakeAccessProfileRepository();
    createAccessProfile = new CreateAccessProfileService(
      fakeAccessProfileRepository,
      fakePermissionsRepository,
    );
  });

  it('should be able to create a new access profile', async () => {
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

  it('should not be able to create a access profile if the permissions ids are not informed', async () => {
    expect(
      await createAccessProfile
        .execute({
          name: 'Admin',
          description: 'Access profile for admins',
          permissionsId: '',
          createdById: '1',
          createdByName: 'Foo',
          updatedById: '1',
          updatedByName: 'Foo',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EPermissionError.IdIsRequired));
  });

  it('should not be able to create a access profile if the permission informed does not exist', async () => {
    expect(
      await createAccessProfile
        .execute({
          name: 'Admin',
          description: 'Access profile for admins',
          permissionsId: '1',
          createdById: '1',
          createdByName: 'Foo',
          updatedById: '1',
          updatedByName: 'Foo',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EPermissionError.NotFound));
  });

  it('should not be able to create a access profile if name provided is less than three characters', async () => {
    expect(
      await createAccessProfile
        .execute({
          name: 'Ad',
          description: 'Access profile for admins',
          permissionsId: '1',
          createdById: '1',
          createdByName: 'Foo',
          updatedById: '1',
          updatedByName: 'Foo',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EAccessProfileError.NameTooShort));
  });

  it('should not be able to create a access profile if name provided is more than thirty five characters', async () => {
    expect(
      await createAccessProfile
        .execute({
          name: 'NameVeryVeryLongoCreatedSpecifyForThisTest',
          description: 'Access profile for admins',
          permissionsId: '1',
          createdById: '1',
          createdByName: 'Foo',
          updatedById: '1',
          updatedByName: 'Foo',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EAccessProfileError.NameTooLong));
  });

  it('should not be able to create if this access profile is already exists', async () => {
    await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });

    await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
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
          description: 'Access profile for admins copy',
          permissionsId: '1',
          createdById: '1',
          createdByName: 'Foo',
          updatedById: '1',
          updatedByName: 'Foo',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EAccessProfileError.AlreadyExist));
  });
});
