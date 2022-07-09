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

var _FindOneUserService = require("./FindOneUserService");

var _UpdateUserService = require("./UpdateUserService");

let createUser;
let updateUser;
let findOneUser;
describe('UpdateUser', () => {
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
    updateUser = new _UpdateUserService.UpdateUserService(fakeUsersRepository, fakeAccessProfilesRepository);
    findOneUser = new _FindOneUserService.FindOneUserService(fakeUsersRepository);
  });
  it('should be able to update a user', async () => {
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
    await updateUser.execute({
      id: '1',
      username: 'foobar_updated',
      accessProfileId: '1',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    const user = await findOneUser.execute({
      id: '1'
    });
    expect(user.username).toBe('foobar_updated');
  });
  it('should not be able to update a user if the id are not informed', async () => {
    expect(await updateUser.execute({
      id: '',
      username: 'foobar_updated',
      updatedById: '1',
      updatedByName: 'Foo'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors2.EUserError.IdIsRequired));
  });
  it('should not be able to update a user if the access profile informed does not exist', async () => {
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
    expect(await updateUser.execute({
      id: '1',
      username: 'foobar_updated',
      accessProfileId: '2',
      updatedById: '1',
      updatedByName: 'Foo'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EAccessProfileError.NotFound));
  });
});