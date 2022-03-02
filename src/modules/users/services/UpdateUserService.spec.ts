import { FakeAccessProfileRepository } from '@modules/accessProfiles/repositories/fakes/FakeAccessProfilesRepository';
import { CreateAccessProfileService } from '@modules/accessProfiles/services/CreateAccessProfileService';
import { EAccessProfileError } from '@modules/accessProfiles/utils/enums/e-errors';
import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { CreatePermissionService } from '@modules/permissions/services/CreatePermissionService';
import { AppError } from '@shared/errors/AppError';
import { User } from '../infra/typeorm/entities/User';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { EUserError } from '../utils/enums/e-errors';
import { EUserStatus } from '../utils/enums/e-user';
import { CreateUserService } from './CreateUserService';
import { FindOneUserService } from './FindOneUserService';
import { UpdateUserService } from './UpdateUserService';

let createUser: CreateUserService;
let updateUser: UpdateUserService;
let findOneUser: FindOneUserService;

describe('UpdateUser', () => {
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
    updateUser = new UpdateUserService(
      fakeUsersRepository,
      fakeAccessProfilesRepository,
    );
    findOneUser = new FindOneUserService(fakeUsersRepository);
  });

  it('should be able to update a user', async () => {
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

    await updateUser.execute({
      id: '1',
      username: 'foobar_updated',
      accessProfileId: '1',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    const user = (await findOneUser.execute({
      id: '1',
    })) as User;

    expect(user.username).toBe('foobar_updated');
  });

  it('should not be able to update a user if the id are not informed', async () => {
    expect(
      await updateUser
        .execute({
          id: '',
          username: 'foobar_updated',
          updatedById: '1',
          updatedByName: 'Foo',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EUserError.IdIsRequired));
  });

  it('should not be able to update a user if the access profile informed does not exist', async () => {
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

    expect(
      await updateUser
        .execute({
          id: '1',
          username: 'foobar_updated',
          accessProfileId: '2',
          updatedById: '1',
          updatedByName: 'Foo',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EAccessProfileError.NotFound));
  });
});
