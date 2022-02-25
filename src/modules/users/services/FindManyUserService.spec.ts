import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { CreatePermissionService } from '@modules/permissions/services/CreatePermissionService';
import { CreateAccessProfileService } from '@modules/accessProfiles/services/CreateAccessProfileService';
import { FakeAccessProfileRepository } from '@modules/accessProfiles/repositories/fakes/FakeAccessProfilesRepository';
import { User } from '../infra/typeorm/entities/User';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { CreateUserService } from './CreateUserService';
import { FindManyUserService } from './FindManyUserService';
import { EUserStatus } from '../utils/enums/e-user';

let fakeUserRepository: FakeUsersRepository;
let createUser: CreateUserService;
let findUsers: FindManyUserService;
let users: User[] = [];

describe('FindManyUser', () => {
  beforeEach(async () => {
    const fakePermissionsRepository = new FakePermissionsRepository();
    const fakeAccessProfileRepository = new FakeAccessProfileRepository();
    const createPermission = new CreatePermissionService(
      fakePermissionsRepository,
    );
    await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });
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

    createUser = new CreateUserService(
      fakeUserRepository,
      fakeAccessProfileRepository,
    );
    findUsers = new FindManyUserService(fakeUserRepository);
  });

  afterEach(() => {
    users = [];
  });

  it('should be able to search a users', async () => {
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
    users.push(user);

    const [findManyUsers, countUsers] = await findUsers.execute({
      username: 'foobar',
    });

    const expectedUsers = users;
    expect(findManyUsers).toEqual(expectedUsers);
    expect(countUsers).toBe(1);
  });
});
