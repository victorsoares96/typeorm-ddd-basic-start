"use strict";

var _FakePermissionsRepository = require("../../permissions/repositories/fakes/FakePermissionsRepository");

var _CreatePermissionService = require("../../permissions/services/CreatePermissionService");

var _eErrors = require("../../permissions/utils/enums/e-errors");

var _AppError = require("../../../shared/errors/AppError");

var _FakeAccessProfilesRepository = require("../repositories/fakes/FakeAccessProfilesRepository");

var _eErrors2 = require("../utils/enums/e-errors");

var _CreateAccessProfileService = require("./CreateAccessProfileService");

var _FindOneAccessProfileService = require("./FindOneAccessProfileService");

var _UpdateAccessProfileService = require("./UpdateAccessProfileService");

let fakeAccessProfileRepository;
let createAccessProfile;
let updateAccessProfile;
let findOneAccessProfile;
describe('UpdateAccessProfile', () => {
  beforeEach(async () => {
    const fakePermissionsRepository = new _FakePermissionsRepository.FakePermissionsRepository();
    const createPermission = new _CreatePermissionService.CreatePermissionService(fakePermissionsRepository);
    await createPermission.execute({
      name: 'CAN_CREATE_USER'
    });
    fakeAccessProfileRepository = new _FakeAccessProfilesRepository.FakeAccessProfileRepository();
    createAccessProfile = new _CreateAccessProfileService.CreateAccessProfileService(fakeAccessProfileRepository, fakePermissionsRepository);
    updateAccessProfile = new _UpdateAccessProfileService.UpdateAccessProfileService(fakeAccessProfileRepository, fakePermissionsRepository);
    findOneAccessProfile = new _FindOneAccessProfileService.FindOneAccessProfileService(fakeAccessProfileRepository);
  });
  it('should be able to update a access profile', async () => {
    await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    await updateAccessProfile.execute({
      id: '1',
      name: 'Admin 2',
      permissionsId: '1',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    const accessProfile = await findOneAccessProfile.execute({
      id: '1'
    });
    expect(accessProfile.name).toBe('Admin 2');
  });
  it('should not be able to update a access profile if the id are not informed', async () => {
    expect(await updateAccessProfile.execute({
      id: '',
      name: 'Admin 2',
      updatedById: '1',
      updatedByName: 'Foo'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors2.EAccessProfileError.IdIsRequired));
  });
  it('should not be able to update a access profile if the permission informed does not exist', async () => {
    await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    expect(await updateAccessProfile.execute({
      id: '1',
      name: 'Admin 2',
      permissionsId: '2',
      updatedById: '1',
      updatedByName: 'Foo'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EPermissionError.NotFound));
  });
  it('should not be able to update a access profile if name provided is less than three characters', async () => {
    expect(await updateAccessProfile.execute({
      id: '1',
      name: 'Ad',
      permissionsId: '1',
      updatedById: '1',
      updatedByName: 'Foo'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors2.EAccessProfileError.NameTooShort));
  });
  it('should not be able to update a access profile if name provided is more than thirty five characters', async () => {
    expect(await updateAccessProfile.execute({
      id: '1',
      name: 'NameVeryVeryLongCreatedSpecifyForThisTest',
      permissionsId: '1',
      updatedById: '1',
      updatedByName: 'Foo'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors2.EAccessProfileError.NameTooLong));
  });
  it('should not be able to update if this access profile is not exists', async () => {
    expect(await updateAccessProfile.execute({
      id: '1',
      name: 'Admin 2',
      permissionsId: '1',
      updatedById: '1',
      updatedByName: 'Foo'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors2.EAccessProfileError.NotFound));
  });
});