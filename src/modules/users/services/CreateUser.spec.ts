import { FakeAccessProfileRepository } from '@modules/accessProfiles/repositories/fakes/FakeAccessProfilesRepository';
import { CreateAccessProfileService } from '@modules/accessProfiles/services/CreateAccessProfileService';
import { EAccessProfileError } from '@modules/accessProfiles/utils/enums/e-errors';
import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { CreatePermissionService } from '@modules/permissions/services/CreatePermissionService';
import { AppError } from '@shared/errors/AppError';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { EUserError } from '../utils/enums/e-errors';
import { EUserStatus } from '../utils/enums/e-user';
import { CreateUserService } from './CreateUserService';

let fakePermissionsRepository: FakePermissionsRepository;
let createPermission: CreatePermissionService;
let fakeAccessProfileRepository: FakeAccessProfileRepository;
let createAccessProfile: CreateAccessProfileService;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(async () => {
    fakePermissionsRepository = new FakePermissionsRepository();
    createPermission = new CreatePermissionService(fakePermissionsRepository);

    fakeAccessProfileRepository = new FakeAccessProfileRepository();
    createAccessProfile = new CreateAccessProfileService(
      fakeAccessProfileRepository,
      fakePermissionsRepository,
    );
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeAccessProfileRepository,
    );
  });

  it('should be able to create a new user', async () => {
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

    const user = await createUser.execute({
      firstName: 'Foo',
      lastName: 'Bar',
      status: EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: accessProfile.id,
      avatar: '',
      username: 'foobar',
      email: 'john@doe.com',
      password: 'Password123',
    });

    expect(user).toHaveProperty('id');
    expect(user.firstName).toBe('Foo');
  });

  it('should not be able to create a user if the firstName is not provided', async () => {
    expect(
      await createUser
        .execute({
          firstName: '',
          lastName: 'Bar',
          status: EUserStatus.Active,
          createdById: '1',
          createdByName: 'Foo',
          updatedById: '1',
          updatedByName: 'Foo',
          lastAccess: '2020-01-01',
          accessProfileId: '',
          avatar: '',
          username: 'foo',
          email: '',
          password: '',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EUserError.FirstNameIsRequired));
  });

  it('should not be able to create a user if the lastName is not provided', async () => {
    expect(
      await createUser
        .execute({
          firstName: 'Foo',
          lastName: '',
          status: EUserStatus.Active,
          createdById: '1',
          createdByName: 'Foo',
          updatedById: '1',
          updatedByName: 'Foo',
          lastAccess: '2020-01-01',
          accessProfileId: '',
          avatar: '',
          username: 'foo',
          email: '',
          password: '',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EUserError.LastNameIsRequired));
  });

  it('should not be able to create a user if the username is not provided', async () => {
    expect(
      await createUser
        .execute({
          firstName: 'Foo',
          lastName: 'Bar',
          status: EUserStatus.Active,
          createdById: '1',
          createdByName: 'Foo',
          updatedById: '1',
          updatedByName: 'Foo',
          lastAccess: '2020-01-01',
          accessProfileId: '',
          avatar: '',
          username: '',
          email: '',
          password: '',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EUserError.UsernameIsRequired));
  });

  it('should not be able to create a user if the email is not provided', async () => {
    expect(
      await createUser
        .execute({
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
          username: 'foo',
          email: '',
          password: '',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EUserError.EmailIsRequired));
  });

  it('should not be able to create a user if the username length less than 5 characters', async () => {
    expect(
      await createUser
        .execute({
          firstName: 'Foo',
          lastName: 'Bar',
          status: EUserStatus.Active,
          createdById: '1',
          createdByName: 'Foo',
          updatedById: '1',
          updatedByName: 'Foo',
          lastAccess: '2020-01-01',
          accessProfileId: '',
          avatar: '',
          username: 'foo',
          email: 'john@doe.com',
          password: 'Password123',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EUserError.UsernameTooShort));
  });

  it('should not be able to create a user if the username length more than 15 characters', async () => {
    expect(
      await createUser
        .execute({
          firstName: 'Foo',
          lastName: 'Bar',
          status: EUserStatus.Active,
          createdById: '1',
          createdByName: 'Foo',
          updatedById: '1',
          updatedByName: 'Foo',
          lastAccess: '2020-01-01',
          accessProfileId: '',
          avatar: '',
          username: 'nameiswaytoolong',
          email: 'john@doe.com',
          password: 'Password123',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EUserError.UsernameTooLong));
  });

  it('should not be able to create a user if the email is not valid', async () => {
    expect(
      await createUser
        .execute({
          firstName: 'Foo',
          lastName: 'Bar',
          status: EUserStatus.Active,
          createdById: '1',
          createdByName: 'Foo',
          updatedById: '1',
          updatedByName: 'Foo',
          lastAccess: '2020-01-01',
          accessProfileId: '',
          avatar: '',
          username: 'foobar',
          email: 'johndoe.com',
          password: 'Password123',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EUserError.EmailIsInvalid));
  });

  it('should not be able to create a user if password is not valid', async () => {
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

    expect(
      await createUser
        .execute({
          firstName: 'Foo',
          lastName: 'Bar',
          status: EUserStatus.Active,
          createdById: '1',
          createdByName: 'Foo',
          updatedById: '1',
          updatedByName: 'Foo',
          lastAccess: '2020-01-01',
          accessProfileId: accessProfile.id,
          avatar: '',
          username: 'foobar',
          email: 'john@doe.com',
          password: 'password123',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(
      new AppError(
        EUserError.PasswordMustBeAtLeastEightCharsOneUpperCaseAndOneNumber,
      ),
    );
  });

  it('should not be able to create a user if the access profile id is not informed', async () => {
    expect(
      await createUser
        .execute({
          firstName: 'Foo',
          lastName: 'Bar',
          status: EUserStatus.Active,
          createdById: '1',
          createdByName: 'Foo',
          updatedById: '1',
          updatedByName: 'Foo',
          lastAccess: '2020-01-01',
          accessProfileId: '',
          avatar: '',
          username: 'foobar',
          email: 'john@doe.com',
          password: 'Password123',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EAccessProfileError.IsRequired));
  });

  it('should not be able to create a user if the access profile informed does not exist', async () => {
    expect(
      await createUser
        .execute({
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
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EAccessProfileError.NotFound));
  });

  it('should not be able to create a user if these user already exist', async () => {
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

    await createUser.execute({
      firstName: 'Foo',
      lastName: 'Bar',
      status: EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: accessProfile.id,
      avatar: '',
      username: 'foobar',
      email: 'john@doe.com',
      password: 'Password123',
    });

    expect(
      await createUser
        .execute({
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
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EUserError.AlreadyExist));
  });
});
