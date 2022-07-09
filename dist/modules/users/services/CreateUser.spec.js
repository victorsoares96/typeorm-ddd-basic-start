"use strict";

var _FakeAccessProfilesRepository = require("../../accessProfiles/repositories/fakes/FakeAccessProfilesRepository");

var _CreateAccessProfileService = require("../../accessProfiles/services/CreateAccessProfileService");

var _eErrors = require("../../accessProfiles/utils/enums/e-errors");

var _FakePermissionsRepository = require("../../permissions/repositories/fakes/FakePermissionsRepository");

var _CreatePermissionService = require("../../permissions/services/CreatePermissionService");

var _AppError = require("../../../shared/errors/AppError");

var _FakeUsersRepository = require("../repositories/fakes/FakeUsersRepository");

var _eErrors2 = require("../utils/enums/e-errors");

var _eUser = require("../utils/enums/e-user");

var _CreateUserService = require("./CreateUserService");

let fakePermissionsRepository;
let createPermission;
let fakeAccessProfileRepository;
let createAccessProfile;
let fakeUsersRepository;
let createUser;
describe('CreateUser', () => {
  beforeEach(async () => {
    fakePermissionsRepository = new _FakePermissionsRepository.FakePermissionsRepository();
    createPermission = new _CreatePermissionService.CreatePermissionService(fakePermissionsRepository);
    fakeAccessProfileRepository = new _FakeAccessProfilesRepository.FakeAccessProfileRepository();
    createAccessProfile = new _CreateAccessProfileService.CreateAccessProfileService(fakeAccessProfileRepository, fakePermissionsRepository);
    fakeUsersRepository = new _FakeUsersRepository.FakeUsersRepository();
    createUser = new _CreateUserService.CreateUserService(fakeUsersRepository, fakeAccessProfileRepository);
  });
  it('should be able to create a new user', async () => {
    await createPermission.execute({
      name: 'CAN_CREATE_USER'
    });
    const accessProfile = await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    const user = await createUser.execute({
      firstName: 'Foo',
      lastName: 'Bar',
      status: _eUser.EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: accessProfile.id,
      avatar: '',
      username: 'foobar',
      email: 'john@doe.com',
      password: 'Password123'
    });
    expect(user).toHaveProperty('id');
    expect(user.firstName).toBe('Foo');
  });
  it('should not be able to create a user if the firstName is not provided', async () => {
    expect(await createUser.execute({
      firstName: '',
      lastName: 'Bar',
      status: _eUser.EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: '',
      avatar: '',
      username: 'foo',
      email: '',
      password: ''
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors2.EUserError.FirstNameIsRequired));
  });
  it('should not be able to create a user if the lastName is not provided', async () => {
    expect(await createUser.execute({
      firstName: 'Foo',
      lastName: '',
      status: _eUser.EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: '',
      avatar: '',
      username: 'foo',
      email: '',
      password: ''
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors2.EUserError.LastNameIsRequired));
  });
  it('should not be able to create a user if the username is not provided', async () => {
    expect(await createUser.execute({
      firstName: 'Foo',
      lastName: 'Bar',
      status: _eUser.EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: '',
      avatar: '',
      username: '',
      email: '',
      password: ''
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors2.EUserError.UsernameIsRequired));
  });
  it('should not be able to create a user if the email is not provided', async () => {
    expect(await createUser.execute({
      firstName: 'Foo',
      lastName: 'Bar',
      status: _eUser.EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: '1',
      avatar: '',
      username: 'foo',
      email: '',
      password: ''
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors2.EUserError.EmailIsRequired));
  });
  it('should not be able to create a user if the username length less than 5 characters', async () => {
    expect(await createUser.execute({
      firstName: 'Foo',
      lastName: 'Bar',
      status: _eUser.EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: '',
      avatar: '',
      username: 'foo',
      email: 'john@doe.com',
      password: 'Password123'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors2.EUserError.UsernameTooShort));
  });
  it('should not be able to create a user if the username length more than 15 characters', async () => {
    expect(await createUser.execute({
      firstName: 'Foo',
      lastName: 'Bar',
      status: _eUser.EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: '',
      avatar: '',
      username: 'nameiswaytoolong',
      email: 'john@doe.com',
      password: 'Password123'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors2.EUserError.UsernameTooLong));
  });
  it('should not be able to create a user if the email is not valid', async () => {
    expect(await createUser.execute({
      firstName: 'Foo',
      lastName: 'Bar',
      status: _eUser.EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: '',
      avatar: '',
      username: 'foobar',
      email: 'johndoe.com',
      password: 'Password123'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors2.EUserError.EmailIsInvalid));
  });
  it('should not be able to create a user if password is not valid', async () => {
    await createPermission.execute({
      name: 'CAN_CREATE_USER'
    });
    const accessProfile = await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    expect(await createUser.execute({
      firstName: 'Foo',
      lastName: 'Bar',
      status: _eUser.EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: accessProfile.id,
      avatar: '',
      username: 'foobar',
      email: 'john@doe.com',
      password: 'password123'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors2.EUserError.PasswordMustBeAtLeastEightCharsOneUpperCaseAndOneNumber));
  });
  it('should not be able to create a user if the access profile id is not informed', async () => {
    expect(await createUser.execute({
      firstName: 'Foo',
      lastName: 'Bar',
      status: _eUser.EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: '',
      avatar: '',
      username: 'foobar',
      email: 'john@doe.com',
      password: 'Password123'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EAccessProfileError.IsRequired));
  });
  it('should not be able to create a user if the access profile informed does not exist', async () => {
    expect(await createUser.execute({
      firstName: 'Foo',
      lastName: 'Bar',
      status: _eUser.EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: '1',
      avatar: '',
      username: 'foobar',
      email: 'john@doe.com',
      password: 'Password123'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EAccessProfileError.NotFound));
  });
  it('should not be able to create a user if these user already exist', async () => {
    await createPermission.execute({
      name: 'CAN_CREATE_USER'
    });
    const accessProfile = await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    await createUser.execute({
      firstName: 'Foo',
      lastName: 'Bar',
      status: _eUser.EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: accessProfile.id,
      avatar: '',
      username: 'foobar',
      email: 'john@doe.com',
      password: 'Password123'
    });
    expect(await createUser.execute({
      firstName: 'Foo',
      lastName: 'Bar',
      status: _eUser.EUserStatus.Active,
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
      lastAccess: '2020-01-01',
      accessProfileId: '1',
      avatar: '',
      username: 'foobar',
      email: 'john@doe.com',
      password: 'Password123'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors2.EUserError.AlreadyExist));
  });
});