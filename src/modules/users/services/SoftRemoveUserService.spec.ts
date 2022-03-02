import { FakeAccessProfileRepository } from '@modules/accessProfiles/repositories/fakes/FakeAccessProfilesRepository';
import { CreateAccessProfileService } from '@modules/accessProfiles/services/CreateAccessProfileService';
import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { CreatePermissionService } from '@modules/permissions/services/CreatePermissionService';
import { AppError } from '@shared/errors/AppError';
import { User } from '../infra/typeorm/entities/User';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { EUserError } from '../utils/enums/e-errors';
import { EUserStatus } from '../utils/enums/e-user';
import { CreateUserService } from './CreateUserService';
import { FindOneUserService } from './FindOneUserService';
import { SoftRemoveUserService } from './SoftRemoveUserService';

let softRemoveUser: SoftRemoveUserService;
let findOneUser: FindOneUserService;

describe('SoftRemoveAccessProfile', () => {
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
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeAccessProfilesRepository,
    );
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

    softRemoveUser = new SoftRemoveUserService(fakeUsersRepository);
    findOneUser = new FindOneUserService(fakeUsersRepository);
  });

  it('should not be able to recover the user if the id is not provided', async () => {
    expect(
      await softRemoveUser
        .execute({
          ids: '',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EUserError.NotFound));
  });

  it('should not be able to recover the user if it is not found', async () => {
    expect(
      await softRemoveUser
        .execute({
          ids: '2',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EUserError.NotFound));
  });

  it('should be able to soft remove a user', async () => {
    await softRemoveUser.execute({
      ids: '1',
    });

    const user = (await findOneUser.execute({
      username: 'foobar',
    })) as User;

    expect(user.status).toBe(EUserStatus.Deleted);
  });
});
