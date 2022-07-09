"use strict";

var _FakePermissionsRepository = require("../../permissions/repositories/fakes/FakePermissionsRepository");

var _CreatePermissionService = require("../../permissions/services/CreatePermissionService");

var _AppError = require("../../../shared/errors/AppError");

var _eErrors = require("../../../shared/utils/enums/e-errors");

var _FakeAccessProfilesRepository = require("../repositories/fakes/FakeAccessProfilesRepository");

var _CreateAccessProfileService = require("./CreateAccessProfileService");

var _FindOneAccessProfileService = require("./FindOneAccessProfileService");

let fakeAccessProfilesRepository;
let createAccessProfile;
let findAccessProfile;
describe('FindOneAccessProfile', () => {
  beforeEach(async () => {
    const fakePermissionsRepository = new _FakePermissionsRepository.FakePermissionsRepository();
    const createPermission = new _CreatePermissionService.CreatePermissionService(fakePermissionsRepository);
    await createPermission.execute({
      name: 'CAN_CREATE_USER'
    });
    fakeAccessProfilesRepository = new _FakeAccessProfilesRepository.FakeAccessProfileRepository();
    createAccessProfile = new _CreateAccessProfileService.CreateAccessProfileService(fakeAccessProfilesRepository, fakePermissionsRepository);
    findAccessProfile = new _FindOneAccessProfileService.FindOneAccessProfileService(fakeAccessProfilesRepository);
  });
  it('should not allow the search if no filter is sent', async () => {
    expect(await findAccessProfile.execute({
      name: ''
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EGenericError.MissingFilters));
    expect(await findAccessProfile // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .execute({}).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EGenericError.MissingFilters));
  });
  it('should be able to search and return only one access profile', async () => {
    const accessProfile = await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    const accessProfileFound = await findAccessProfile.execute({
      name: 'Admin'
    });
    expect(accessProfileFound).toEqual(accessProfile);
  });
});