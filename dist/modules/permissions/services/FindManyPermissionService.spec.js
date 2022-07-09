"use strict";

var _CreatePermissionService = require("./CreatePermissionService");

var _FakePermissionsRepository = require("../repositories/fakes/FakePermissionsRepository");

var _FindManyPermissionService = require("./FindManyPermissionService");

let fakePermissionsRepository;
let createPermission;
let findPermissions;
describe('FindManyPermission', () => {
  beforeEach(() => {
    fakePermissionsRepository = new _FakePermissionsRepository.FakePermissionsRepository();
    createPermission = new _CreatePermissionService.CreatePermissionService(fakePermissionsRepository);
    findPermissions = new _FindManyPermissionService.FindManyPermissionService(fakePermissionsRepository);
  });
  it('should be able to search a permissions', async () => {
    const permission = await createPermission.execute({
      name: 'CAN_CREATE_USER'
    });
    const [permissions, countPermissions] = await findPermissions.execute({
      name: 'CAN_'
    });
    const expectedPermissions = [permission];
    expect(permissions).toEqual(expectedPermissions);
    expect(countPermissions).toBe(1);
  });
});