"use strict";

var _FakePermissionsRepository = require("../../permissions/repositories/fakes/FakePermissionsRepository");

var _CreatePermissionService = require("../../permissions/services/CreatePermissionService");

var _eErrors = require("../../permissions/utils/enums/e-errors");

var _AppError = require("../../../shared/errors/AppError");

var _FakeAccessProfilesRepository = require("../repositories/fakes/FakeAccessProfilesRepository");

var _eErrors2 = require("../utils/enums/e-errors");

var _CreateAccessProfileService = require("./CreateAccessProfileService");

let fakePermissionsRepository;
let createPermission;
let fakeAccessProfileRepository;
let createAccessProfile;
describe('CreateAccessProfile', () => {
  beforeEach(async () => {
    fakePermissionsRepository = new _FakePermissionsRepository.FakePermissionsRepository();
    createPermission = new _CreatePermissionService.CreatePermissionService(fakePermissionsRepository);
    fakeAccessProfileRepository = new _FakeAccessProfilesRepository.FakeAccessProfileRepository();
    createAccessProfile = new _CreateAccessProfileService.CreateAccessProfileService(fakeAccessProfileRepository, fakePermissionsRepository);
  });
  it('should be able to create a new access profile', async () => {
    await createPermission.execute({
      name: 'CAN_CREATE_USER'
    });
    const accessProfile = await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    expect(accessProfile).toHaveProperty('id');
    expect(accessProfile.name).toBe('Admin');
  });
  it('should not be able to create a access profile if the permissions ids are not informed', async () => {
    expect(await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EPermissionError.IdIsRequired));
  });
  it('should not be able to create a access profile if the permission informed does not exist', async () => {
    expect(await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EPermissionError.NotFound));
  });
  it('should not be able to create a access profile if name provided is less than three characters', async () => {
    expect(await createAccessProfile.execute({
      name: 'Ad',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors2.EAccessProfileError.NameTooShort));
  });
  it('should not be able to create a access profile if name provided is more than thirty five characters', async () => {
    expect(await createAccessProfile.execute({
      name: 'NameVeryVeryLongoCreatedSpecifyForThisTest',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors2.EAccessProfileError.NameTooLong));
  });
  it('should not be able to create if this access profile is already exists', async () => {
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
    expect(await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins copy',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors2.EAccessProfileError.AlreadyExist));
  });
});