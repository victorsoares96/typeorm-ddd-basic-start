"use strict";

var _FakeAccessProfilesRepository = require("../../accessProfiles/repositories/fakes/FakeAccessProfilesRepository");

var _CreateAccessProfileService = require("../../accessProfiles/services/CreateAccessProfileService");

var _FakePermissionsRepository = require("../../permissions/repositories/fakes/FakePermissionsRepository");

var _CreatePermissionService = require("../../permissions/services/CreatePermissionService");

var _AppError = require("../../../shared/errors/AppError");

var _FakeHashProvider = require("../providers/HashProvider/fakes/FakeHashProvider");

var _FakeUsersRepository = require("../repositories/fakes/FakeUsersRepository");

var _eErrors = require("../utils/enums/e-errors");

var _eUser = require("../utils/enums/e-user");

var _CreateUserService = require("./CreateUserService");

var _ResetUserPasswordService = require("./ResetUserPasswordService");

var _SessionService = require("./SessionService");

let fakeUsersRepository;
let createUser;
let fakeHashProvider;
let sessionUser;
let resetPassword;
describe('ResetUserPassword', () => {
  beforeEach(async () => {
    const fakePermissionsRepository = new _FakePermissionsRepository.FakePermissionsRepository();
    const createPermission = new _CreatePermissionService.CreatePermissionService(fakePermissionsRepository);
    await createPermission.execute({
      name: 'CAN_CREATE_USER'
    });
    const fakeAccessProfileRepository = new _FakeAccessProfilesRepository.FakeAccessProfileRepository();
    const createAccessProfile = new _CreateAccessProfileService.CreateAccessProfileService(fakeAccessProfileRepository, fakePermissionsRepository);
    await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    fakeUsersRepository = new _FakeUsersRepository.FakeUsersRepository();
    createUser = new _CreateUserService.CreateUserService(fakeUsersRepository, fakeAccessProfileRepository);
    fakeHashProvider = new _FakeHashProvider.FakeHashProvider();
    sessionUser = new _SessionService.SessionService(fakeUsersRepository, fakeHashProvider);
    resetPassword = new _ResetUserPasswordService.ResetUserPasswordService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to reset password', async () => {
    const user = await createUser.execute({
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
    });
    await resetPassword.execute({
      id: user.id,
      currentPassword: 'Password123',
      newPassword: 'NewPassword123'
    });
    const response = await sessionUser.execute({
      username: 'foobar',
      password: 'NewPassword123'
    });
    expect(response).toHaveProperty('token');
  });
  it('should not be able to reset password if not provide a user id', async () => {
    expect(await resetPassword.execute({
      id: '',
      currentPassword: 'Password123',
      newPassword: 'NewPassword123'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EUserError.IsRequired));
  });
  it('should not be able to reset password if not provide a current password or new password', async () => {
    expect(await resetPassword.execute({
      id: '1',
      currentPassword: '',
      newPassword: ''
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EUserError.CurrentOrNewPasswordRequired));
  });
  it('should not be able to reset password if not found user', async () => {
    expect(await resetPassword.execute({
      id: '2',
      currentPassword: 'Password123',
      newPassword: 'NewPassword123'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EUserError.NotFound));
  });
});