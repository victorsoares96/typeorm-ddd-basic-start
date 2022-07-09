"use strict";

var _FakePermissionsRepository = require("../../permissions/repositories/fakes/FakePermissionsRepository");

var _CreatePermissionService = require("../../permissions/services/CreatePermissionService");

var _CreateAccessProfileService = require("../../accessProfiles/services/CreateAccessProfileService");

var _FakeAccessProfilesRepository = require("../../accessProfiles/repositories/fakes/FakeAccessProfilesRepository");

var _FakeUsersRepository = require("../repositories/fakes/FakeUsersRepository");

var _CreateUserService = require("./CreateUserService");

var _FindManyUserService = require("./FindManyUserService");

var _eUser = require("../utils/enums/e-user");

let createUser;
let findUsers;
let users = [];
describe('FindManyUser', () => {
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
    const fakeUsersRepository = new _FakeUsersRepository.FakeUsersRepository();
    findUsers = new _FindManyUserService.FindManyUserService(fakeUsersRepository);
    createUser = new _CreateUserService.CreateUserService(fakeUsersRepository, fakeAccessProfileRepository);
  });
  afterEach(() => {
    users = [];
  });
  it('should be able to search a users', async () => {
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
    users.push(user);
    const [findManyUsers, countUsers] = await findUsers.execute({
      username: 'foobar'
    });
    const expectedUsers = users;
    expect(findManyUsers).toEqual(expectedUsers);
    expect(countUsers).toBe(1);
  });
});