"use strict";

var _AppError = require("../../../shared/errors/AppError");

var _CreatePermissionService = require("./CreatePermissionService");

var _FakePermissionsRepository = require("../repositories/fakes/FakePermissionsRepository");

let fakePermissionsRepository;
let createPermission;
describe('CreatePermission', () => {
  beforeEach(() => {
    fakePermissionsRepository = new _FakePermissionsRepository.FakePermissionsRepository();
    createPermission = new _CreatePermissionService.CreatePermissionService(fakePermissionsRepository);
  });
  it('should be able to create a new permission', async () => {
    const permission = await createPermission.execute({
      name: 'CAN_CREATE_USER'
    });
    expect(permission).toHaveProperty('id');
    expect(permission.name).toBe('CAN_CREATE_USER');
  });
  it('should not be able to create a new permission with same name', async () => {
    await createPermission.execute({
      name: 'CAN_CREATE_USER'
    });
    expect(await createPermission.execute({
      name: 'CAN_CREATE_USER'
    }).then(res => res).catch(err => err)).toBeInstanceOf(_AppError.AppError);
  });
  it('should not be able to create a new permission with less than 3 characters', async () => {
    expect(await createPermission.execute({
      name: 'A'
    }).then(res => res).catch(err => err)).toBeInstanceOf(_AppError.AppError);
  });
  it('should not be able to create a new permission with more than 35 characters', async () => {
    expect(await createPermission.execute({
      name: 'IS_THIS_A_VERY_LARGE_PHRASE_CREATED_FOR_TESTING'
    }).then(res => res).catch(err => err)).toBeInstanceOf(_AppError.AppError);
  });
});