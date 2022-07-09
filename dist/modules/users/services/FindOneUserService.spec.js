"use strict";

var _FakeAccessProfilesRepository = require("../../accessProfiles/repositories/fakes/FakeAccessProfilesRepository");

var _CreateAccessProfileService = require("../../accessProfiles/services/CreateAccessProfileService");

var _FakePermissionsRepository = require("../../permissions/repositories/fakes/FakePermissionsRepository");

var _CreatePermissionService = require("../../permissions/services/CreatePermissionService");

var _AppError = require("../../../shared/errors/AppError");

var _eErrors = require("../../../shared/utils/enums/e-errors");

var _FakeUsersRepository = require("../repositories/fakes/FakeUsersRepository");

var _eUser = require("../utils/enums/e-user");

var _CreateUserService = require("./CreateUserService");

var _FindOneUserService = require("./FindOneUserService");

let createUser;
let findUser;
describe('FindOneUser', () => {
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
    findUser = new _FindOneUserService.FindOneUserService(fakeUsersRepository);
    createUser = new _CreateUserService.CreateUserService(fakeUsersRepository, fakeAccessProfilesRepository);
  });
  it('should not allow the search if no filter is sent', async () => {
    expect(await findUser.execute({
      username: ''
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EGenericError.MissingFilters));
    expect(await findUser // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .execute({}).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EGenericError.MissingFilters));
  });
  it('should be able to search and return only one user', async () => {
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
    const userFound = await findUser.execute({
      username: 'foobar'
    });
    expect(userFound).toEqual(user);
  });
});