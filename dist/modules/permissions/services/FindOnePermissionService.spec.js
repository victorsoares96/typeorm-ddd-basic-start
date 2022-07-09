"use strict";

var _AppError = require("../../../shared/errors/AppError");

var _eErrors = require("../../../shared/utils/enums/e-errors");

var _CreatePermissionService = require("./CreatePermissionService");

var _FakePermissionsRepository = require("../repositories/fakes/FakePermissionsRepository");

var _FindOnePermissionService = require("./FindOnePermissionService");

let fakePermissionsRepository;
let createPermission;
let findPermission;
describe('FindOnePermission', () => {
  beforeEach(() => {
    fakePermissionsRepository = new _FakePermissionsRepository.FakePermissionsRepository();
    createPermission = new _CreatePermissionService.CreatePermissionService(fakePermissionsRepository);
    findPermission = new _FindOnePermissionService.FindOnePermissionService(fakePermissionsRepository);
  });
  it('should not allow the search if no filter is sent', async () => {
    await createPermission.execute({
      name: 'CAN_CREATE_USER'
    });
    await createPermission.execute({
      name: 'CAN_VIEW_USER'
    });
    expect(await findPermission.execute({
      name: ''
    }).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EGenericError.MissingFilters));
    expect(await findPermission // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .execute({}).then(res => res).catch(err => err)).toEqual(new _AppError.AppError(_eErrors.EGenericError.MissingFilters));
  });
  it('should be able to search and return only one permission', async () => {
    await createPermission.execute({
      name: 'CAN_CREATE_USER'
    });
    await createPermission.execute({
      name: 'CAN_VIEW_USER'
    });
    const permission = await findPermission.execute({
      name: 'CAN_VIEW_USER'
    });
    expect(permission).toHaveProperty('id');
    expect(permission?.name).toBe('CAN_VIEW_USER');
  });
  it('should return undefined if the search does not return any results', async () => {
    await createPermission.execute({
      name: 'CAN_VIEW_USER'
    });
    expect(await findPermission.execute({
      name: 'CAN_CREATE_USER'
    }).then(res => res).catch(err => err)).toEqual(undefined);
  });
});