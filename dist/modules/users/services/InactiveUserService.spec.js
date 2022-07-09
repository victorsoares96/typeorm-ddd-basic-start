"use strict";

var _FakeAccessProfilesRepository = require("../../accessProfiles/repositories/fakes/FakeAccessProfilesRepository");

var _CreateAccessProfileService = require("../../accessProfiles/services/CreateAccessProfileService");

var _FakePermissionsRepository = require("../../permissions/repositories/fakes/FakePermissionsRepository");

var _CreatePermissionService = require("../../permissions/services/CreatePermissionService");

var _AppError = require("../../../shared/errors/AppError");

var _FakeUsersRepository = require("../repositories/fakes/FakeUsersRepository");

var _eErrors = require("../utils/enums/e-errors");

var _eUser = require("../utils/enums/e-user");

var _CreateUserService = require("./CreateUserService");

var _InactiveUserService = require("./InactiveUserService");

let createUser;
let inactiveUser;
describe('InactiveUser', () => {
  beforeEach(async () => {
    const fakePermissionsRepository = new _FakePermissionsRepository.FakePermissionsRepository();
    const createPermission = new _CreatePermissionService.CreatePermissionService(fakePermissionsRepository);
    await createPermission.execute({
      name: 'CAN_CREATE_USER'
    });
    const fakeAccessProfilesRepository = new _FakeAccessProfilesRepository.FakeAccessProfileRepository();
    const createAccessProfile = new _CreateAccessProfileService.CreateAccessProfileService(fakeAccessProfilesRepository, fakePermissionsRepository);
    await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    const fakeUsersRepository = new _FakeUsersRepository.FakeUsersRepository();
    createUser = new _CreateUserService.CreateUserService(fakeUsersRepository, fakeAccessProfilesRepository);
    inactiveUser = new _InactiveUserService.InactiveUserService(fakeUsersRepository);
  });
  it('should be able to inactive a user', async () => {
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
    await inactiveUser.execute({
      ids: '1',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    expect(user.status).toBe(_eUser.EUserStatus.Inactive);
  });
  it('should not be able to inactive a user if the same not exists', async () => {
    expect(await inactiveUser.execute({
      ids: '1',
      updatedById: '1',
      updatedByName: 'Foo'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EUserError.NotFound));
  });
  it('should not be able to inactive a access profile if the same is already inactive', async () => {
    await createUser.execute({
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
    await inactiveUser.execute({
      ids: '1',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    expect(await inactiveUser.execute({
      ids: '1',
      updatedById: '1',
      updatedByName: 'Foo'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EUserError.SomeAlreadyInactive));
  });
});