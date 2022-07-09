"use strict";

var _FakePermissionsRepository = require("../../permissions/repositories/fakes/FakePermissionsRepository");

var _CreatePermissionService = require("../../permissions/services/CreatePermissionService");

var _AppError = require("../../../shared/errors/AppError");

var _FakeAccessProfilesRepository = require("../repositories/fakes/FakeAccessProfilesRepository");

var _eErrors = require("../utils/enums/e-errors");

var _eStatus = require("../utils/enums/e-status");

var _CreateAccessProfileService = require("./CreateAccessProfileService");

var _FindOneAccessProfileService = require("./FindOneAccessProfileService");

var _SoftRemoveAccessProfileService = require("./SoftRemoveAccessProfileService");

let fakeAccessProfilesRepository;
let createAccessProfile;
let softRemoveAccessProfile;
let findOneAccessProfile;
describe('SoftRemoveAccessProfile', () => {
  beforeEach(async () => {
    const fakePermissionsRepository = new _FakePermissionsRepository.FakePermissionsRepository();
    const createPermission = new _CreatePermissionService.CreatePermissionService(fakePermissionsRepository);
    await createPermission.execute({
      name: 'CAN_CREATE_USER'
    });
    fakeAccessProfilesRepository = new _FakeAccessProfilesRepository.FakeAccessProfileRepository();
    createAccessProfile = new _CreateAccessProfileService.CreateAccessProfileService(fakeAccessProfilesRepository, fakePermissionsRepository);
    softRemoveAccessProfile = new _SoftRemoveAccessProfileService.SoftRemoveAccessProfileService(fakeAccessProfilesRepository);
    findOneAccessProfile = new _FindOneAccessProfileService.FindOneAccessProfileService(fakeAccessProfilesRepository);
  });
  it('should not be able to recover the access profile if the id is not provided', async () => {
    expect(await softRemoveAccessProfile.execute({
      ids: ''
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EAccessProfileError.IdIsRequired));
  });
  it('should not be able to recover the access profile if it is not found', async () => {
    expect(await softRemoveAccessProfile.execute({
      ids: '1'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EAccessProfileError.NotFound));
  });
  it('should be able to soft remove a access profile', async () => {
    await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    await softRemoveAccessProfile.execute({
      ids: '1'
    });
    const accessProfile = await findOneAccessProfile.execute({
      name: 'Admin'
    });
    expect(accessProfile.status).toBe(_eStatus.EAccessProfileStatus.Deleted);
  });
});