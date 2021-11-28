import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { CreatePermissionService } from '@modules/permissions/services/CreatePermissionService';
import { AppError } from '@shared/errors/AppError';
import { FakeAccessProfileRepository } from '../repositories/fakes/FakeAccessProfilesRepository';
import { EAccessProfileError } from '../utils/enums/e-errors';
import { EAccessProfileStatus } from '../utils/enums/e-status';
import { CreateAccessProfileService } from './CreateAccessProfileService';
import { InactiveAccessProfileService } from './InactiveAccessProfileService';
import { RecoverAccessProfileService } from './RecoverAccessProfileService';

let fakeAccessProfilesRepository: FakeAccessProfileRepository;
let inactiveAccessProfile: InactiveAccessProfileService;
let recoverAccessProfile: RecoverAccessProfileService;
let createAccessProfile: CreateAccessProfileService;

describe('RecoverAccessProfile', () => {
  beforeEach(async () => {
    const fakePermissionsRepository = new FakePermissionsRepository();
    const createPermission = new CreatePermissionService(
      fakePermissionsRepository,
    );
    await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });

    fakeAccessProfilesRepository = new FakeAccessProfileRepository();
    inactiveAccessProfile = new InactiveAccessProfileService(
      fakeAccessProfilesRepository,
    );
    recoverAccessProfile = new RecoverAccessProfileService(
      fakeAccessProfilesRepository,
    );
    createAccessProfile = new CreateAccessProfileService(
      fakeAccessProfilesRepository,
      fakePermissionsRepository,
    );
  });

  it('should not be able to recover the access profile if the id is not provided', async () => {
    await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    await inactiveAccessProfile.execute({
      ids: '1',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    expect(
      recoverAccessProfile.execute({
        ids: '',
        updatedById: '1',
        updatedByName: 'Foo',
      }),
    ).rejects.toEqual(new AppError(EAccessProfileError.IdIsRequired));
  });

  it('should not be able to recover the access profile if it is not found', async () => {
    await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    await inactiveAccessProfile.execute({
      ids: '1',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    expect(
      recoverAccessProfile.execute({
        ids: '2',
        updatedById: '1',
        updatedByName: 'Foo',
      }),
    ).rejects.toEqual(new AppError(EAccessProfileError.NotFound));
  });

  it('should be able to recover a access profile', async () => {
    const accessProfile = await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    await inactiveAccessProfile.execute({
      ids: '1',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    await recoverAccessProfile.execute({
      ids: '1',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    expect(accessProfile.status).toBe(EAccessProfileStatus.Active);
  });
});
