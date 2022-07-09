"use strict";

var _FakePermissionsRepository = require("../../permissions/repositories/fakes/FakePermissionsRepository");

var _CreatePermissionService = require("../../permissions/services/CreatePermissionService");

var _AppError = require("../../../shared/errors/AppError");

var _FakeAccessProfilesRepository = require("../repositories/fakes/FakeAccessProfilesRepository");

var _eErrors = require("../utils/enums/e-errors");

var _CreateAccessProfileService = require("./CreateAccessProfileService");

var _RemoveAccessProfileService = require("./RemoveAccessProfileService");

var _FindOneAccessProfileService = require("./FindOneAccessProfileService");

let removeAccessProfile;
let findOneAccessProfile;
describe('RemoveAccessProfile', () => {
  beforeEach(async () => {
    const fakePermissionsRepository = new _FakePermissionsRepository.FakePermissionsRepository();
    const createPermission = new _CreatePermissionService.CreatePermissionService(fakePermissionsRepository);
    const fakeAccessProfilesRepository = new _FakeAccessProfilesRepository.FakeAccessProfileRepository();
    const createAccessProfile = new _CreateAccessProfileService.CreateAccessProfileService(fakeAccessProfilesRepository, fakePermissionsRepository);
    removeAccessProfile = new _RemoveAccessProfileService.RemoveAccessProfileService(fakeAccessProfilesRepository);
    findOneAccessProfile = new _FindOneAccessProfileService.FindOneAccessProfileService(fakeAccessProfilesRepository);
    await createPermission.execute({
      name: 'CAN_CREATE_USER'
    });
    await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    });
  });
  it('should not be able to remove the access profile if the id is not provided', async () => {
    expect(await removeAccessProfile.execute({
      ids: ''
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EAccessProfileError.IdIsRequired));
  });
  it('should not be able to remove the access profile if it is not found', async () => {
    expect(await removeAccessProfile.execute({
      ids: '2'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EAccessProfileError.NotFound));
  });
  it('should be able to remove a access profile', async () => {
    await removeAccessProfile.execute({
      ids: '1'
    });
    expect(await findOneAccessProfile.execute({
      name: 'Admin'
    })).toEqual(undefined);
  });
});