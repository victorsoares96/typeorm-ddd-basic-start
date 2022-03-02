import { FakeAccessProfileRepository } from '@modules/accessProfiles/repositories/fakes/FakeAccessProfilesRepository';
import { CreateAccessProfileService } from '@modules/accessProfiles/services/CreateAccessProfileService';
import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { CreatePermissionService } from '@modules/permissions/services/CreatePermissionService';
import { AppError } from '@shared/errors/AppError';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { EUserError } from '../utils/enums/e-errors';
import { EUserStatus } from '../utils/enums/e-user';
import { CreateUserService } from './CreateUserService';
import { ResetUserPasswordService } from './ResetUserPasswordService';
import { SessionService } from './SessionService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;
let sessionUser: SessionService;
let resetPassword: ResetUserPasswordService;

describe('ResetUserPassword', () => {
  beforeEach(async () => {
    const fakePermissionsRepository = new FakePermissionsRepository();
    const createPermission = new CreatePermissionService(
      fakePermissionsRepository,
    );
    await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });

    const fakeAccessProfileRepository = new FakeAccessProfileRepository();
    const createAccessProfile = new CreateAccessProfileService(
      fakeAccessProfileRepository,
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

    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeAccessProfileRepository,
    );

    fakeHashProvider = new FakeHashProvider();
    sessionUser = new SessionService(fakeUsersRepository, fakeHashProvider);
    resetPassword = new ResetUserPasswordService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset password', async () => {
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

    await resetPassword.execute({
      id: user.id,
      currentPassword: 'Password123',
      newPassword: 'NewPassword123',
    });

    const response = await sessionUser.execute({
      username: 'foobar',
      password: 'NewPassword123',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to reset password if not provide a user id', async () => {
    expect(
      await resetPassword
        .execute({
          id: '',
          currentPassword: 'Password123',
          newPassword: 'NewPassword123',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EUserError.IsRequired));
  });

  it('should not be able to reset password if not provide a current password or new password', async () => {
    expect(
      await resetPassword
        .execute({
          id: '1',
          currentPassword: '',
          newPassword: '',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EUserError.CurrentOrNewPasswordRequired));
  });

  it('should not be able to reset password if not found user', async () => {
    expect(
      await resetPassword
        .execute({
          id: '2',
          currentPassword: 'Password123',
          newPassword: 'NewPassword123',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EUserError.NotFound));
  });
});
