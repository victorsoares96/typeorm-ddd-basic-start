import { FakeAccessProfileRepository } from '@modules/accessProfiles/repositories/fakes/FakeAccessProfilesRepository';
import { CreateAccessProfileService } from '@modules/accessProfiles/services/CreateAccessProfileService';
import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { CreatePermissionService } from '@modules/permissions/services/CreatePermissionService';
import { AppError } from '@shared/errors/AppError';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { EUserError } from '../utils/enums/e-errors';
import { EUserStatus } from '../utils/enums/e-user';
import { CreateUserService } from './CreateUserService';
import { InactiveUserService } from './InactiveUserService';
import { RecoverUserService } from './RecoverUserService';

let createUser: CreateUserService;
let recoverUser: RecoverUserService;
let inactiveUser: InactiveUserService;

describe('RecoverUser', () => {
  beforeEach(async () => {
    const fakePermissionsRepository = new FakePermissionsRepository();
    const createPermission = new CreatePermissionService(
      fakePermissionsRepository,
    );
    await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });

    const fakeAccessProfilesRepository = new FakeAccessProfileRepository();
    const createAccessProfile = new CreateAccessProfileService(
      fakeAccessProfilesRepository,
      fakePermissionsRepository,
    );
    await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    const fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeAccessProfilesRepository,
    );
    recoverUser = new RecoverUserService(fakeUsersRepository);
    inactiveUser = new InactiveUserService(fakeUsersRepository);
  });

  it('should not be able to recover the user if the id is not provided', async () => {
    await createUser.execute({
      firstName: 'Foo',
      lastName: 'Bar',
      status: EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: '1',
      avatar: '',
      username: 'foobar',
      email: 'john@doe.com',
      password: 'Password123',
    });

    await recoverUser.execute({
      ids: '1',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    expect(
      await recoverUser
        .execute({
          ids: '',
          updatedById: '1',
          updatedByName: 'Foo',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EUserError.SomeNotFound));
  });

  it('should not be able to recover the user if it is not found', async () => {
    await createUser.execute({
      firstName: 'Foo',
      lastName: 'Bar',
      status: EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: '1',
      avatar: '',
      username: 'foobar',
      email: 'john@doe.com',
      password: 'Password123',
    });

    await recoverUser.execute({
      ids: '1',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    expect(
      await recoverUser
        .execute({
          ids: '2',
          updatedById: '1',
          updatedByName: 'Foo',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EUserError.SomeNotFound));
  });

  it('should be able to recover a user', async () => {
    const user = await createUser.execute({
      firstName: 'Foo',
      lastName: 'Bar',
      status: EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: '1',
      avatar: '',
      username: 'foobar',
      email: 'john@doe.com',
      password: 'Password123',
    });

    await inactiveUser.execute({
      ids: '1',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    await recoverUser.execute({
      ids: '1',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    expect(user.status).toBe(EUserStatus.Active);
  });
});
