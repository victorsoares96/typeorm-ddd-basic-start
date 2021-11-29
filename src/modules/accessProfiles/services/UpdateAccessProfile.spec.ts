import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { CreatePermissionService } from '@modules/permissions/services/CreatePermissionService';
import { EPermissionError } from '@modules/permissions/utils/enums/e-errors';
import { AppError } from '@shared/errors/AppError';
import { AccessProfile } from '../infra/typeorm/entities/AccessProfile';
import { FakeAccessProfileRepository } from '../repositories/fakes/FakeAccessProfilesRepository';
import { EAccessProfileError } from '../utils/enums/e-errors';
import { CreateAccessProfileService } from './CreateAccessProfileService';
import { FindOneAccessProfileService } from './FindOneAccessProfileService';
import { UpdateAccessProfileService } from './UpdateAccessProfileService';

let fakeAccessProfileRepository: FakeAccessProfileRepository;
let createAccessProfile: CreateAccessProfileService;
let updateAccessProfile: UpdateAccessProfileService;
let findOneAccessProfile: FindOneAccessProfileService;

describe('UpdateAccessProfile', () => {
  beforeEach(async () => {
    const fakePermissionsRepository = new FakePermissionsRepository();
    const createPermission = new CreatePermissionService(
      fakePermissionsRepository,
    );
    await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });

    fakeAccessProfileRepository = new FakeAccessProfileRepository();
    createAccessProfile = new CreateAccessProfileService(
      fakeAccessProfileRepository,
      fakePermissionsRepository,
    );
    updateAccessProfile = new UpdateAccessProfileService(
      fakeAccessProfileRepository,
      fakePermissionsRepository,
    );
    findOneAccessProfile = new FindOneAccessProfileService(
      fakeAccessProfileRepository,
    );
  });

  it('should be able to update a access profile', async () => {
    await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    await updateAccessProfile.execute({
      id: '1',
      name: 'Admin 2',
      permissionsId: '1',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    const accessProfile = (await findOneAccessProfile.execute({
      id: '1',
    })) as AccessProfile;

    expect(accessProfile.name).toBe('Admin 2');
  });

  it('should not be able to update a access profile if the id are not informed', async () => {
    expect(
      await updateAccessProfile
        .execute({
          id: '',
          name: 'Admin 2',
          updatedById: '1',
          updatedByName: 'Foo',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EAccessProfileError.IdIsRequired));
  });

  it('should not be able to update a access profile if the permission informed does not exist', async () => {
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
      await updateAccessProfile
        .execute({
          id: '1',
          name: 'Admin 2',
          permissionsId: '2',
          updatedById: '1',
          updatedByName: 'Foo',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EPermissionError.NotFound));
  });

  it('should not be able to update a access profile if name provided is less than three characters', async () => {
    expect(
      await updateAccessProfile
        .execute({
          id: '1',
          name: 'Ad',
          permissionsId: '1',
          updatedById: '1',
          updatedByName: 'Foo',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EAccessProfileError.NameTooShort));
  });

  it('should not be able to update a access profile if name provided is more than thirty five characters', async () => {
    expect(
      await updateAccessProfile
        .execute({
          id: '1',
          name: 'NameVeryVeryLongCreatedSpecifyForThisTest',
          permissionsId: '1',
          updatedById: '1',
          updatedByName: 'Foo',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EAccessProfileError.NameTooLong));
  });

  it('should not be able to update if this access profile is not exists', async () => {
    expect(
      await updateAccessProfile
        .execute({
          id: '1',
          name: 'Admin 2',
          permissionsId: '1',
          updatedById: '1',
          updatedByName: 'Foo',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EAccessProfileError.NotFound));
  });
});
