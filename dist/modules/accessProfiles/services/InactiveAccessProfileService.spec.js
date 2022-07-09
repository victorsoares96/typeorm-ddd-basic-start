"use strict";

var _FakePermissionsRepository = require("../../permissions/repositories/fakes/FakePermissionsRepository");

var _CreatePermissionService = require("../../permissions/services/CreatePermissionService");

var _AppError = require("../../../shared/errors/AppError");

var _FakeAccessProfilesRepository = require("../repositories/fakes/FakeAccessProfilesRepository");

var _eErrors = require("../utils/enums/e-errors");

var _eStatus = require("../utils/enums/e-status");

var _CreateAccessProfileService = require("./CreateAccessProfileService");

var _InactiveAccessProfileService = require("./InactiveAccessProfileService");

let fakeAccessProfilesRepository;
let createAccessProfile;
let inactiveAccessProfile;
describe('InactiveAccessProfile', () => {
  beforeEach(async () => {
    const fakePermissionsRepository = new _FakePermissionsRepository.FakePermissionsRepository();
    const createPermission = new _CreatePermissionService.CreatePermissionService(fakePermissionsRepository);
    await createPermission.execute({
      name: 'CAN_CREATE_USER'
    });
    fakeAccessProfilesRepository = new _FakeAccessProfilesRepository.FakeAccessProfileRepository();
    inactiveAccessProfile = new _InactiveAccessProfileService.InactiveAccessProfileService(fakeAccessProfilesRepository);
    createAccessProfile = new _CreateAccessProfileService.CreateAccessProfileService(fakeAccessProfilesRepository, fakePermissionsRepository);
  });
  it('should be able to inactive a access profile', async () => {
    const accessProfile = await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    await inactiveAccessProfile.execute({
      ids: '1',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    expect(accessProfile.status).toBe(_eStatus.EAccessProfileStatus.Inactive);
  });
  it('should not be able to inactive a access profile if the same not exists', async () => {
    expect(await inactiveAccessProfile.execute({
      ids: '1',
      updatedById: '1',
      updatedByName: 'Foo'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EAccessProfileError.NotFound));
  });
  it('should not be able to inactive a access profile if the same is already inactive', async () => {
    await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    await inactiveAccessProfile.execute({
      ids: '1',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    expect(await inactiveAccessProfile.execute({
      ids: '1',
      updatedById: '1',
      updatedByName: 'Foo'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EAccessProfileError.AlreadyInactive));
  });
});