"use strict";

var _FakePermissionsRepository = require("../../permissions/repositories/fakes/FakePermissionsRepository");

var _CreatePermissionService = require("../../permissions/services/CreatePermissionService");

var _FakeAccessProfilesRepository = require("../repositories/fakes/FakeAccessProfilesRepository");

var _CreateAccessProfileService = require("./CreateAccessProfileService");

var _FindManyAccessProfileService = require("./FindManyAccessProfileService");

let fakeAccessProfileRepository;
let createAccessProfile;
let findAccessProfiles;
let accessProfiles = [];
describe('FindManyAccessProfile', () => {
  beforeEach(async () => {
    const fakePermissionsRepository = new _FakePermissionsRepository.FakePermissionsRepository();
    const createPermission = new _CreatePermissionService.CreatePermissionService(fakePermissionsRepository);
    await createPermission.execute({
      name: 'CAN_CREATE_USER'
    });
    fakeAccessProfileRepository = new _FakeAccessProfilesRepository.FakeAccessProfileRepository();
    createAccessProfile = new _CreateAccessProfileService.CreateAccessProfileService(fakeAccessProfileRepository, fakePermissionsRepository);
    findAccessProfiles = new _FindManyAccessProfileService.FindManyAccessProfileService(fakeAccessProfileRepository);
  });
  afterEach(() => {
    accessProfiles = [];
  });
  it('should be able to search a accessProfiles', async () => {
    const accessProfile = await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo'
    });
    accessProfiles.push(accessProfile);
    const [findManyAccessProfiles, countAccessProfiles] = await findAccessProfiles.execute({
      name: 'Admin'
    });
    const expectedAccessProfiles = accessProfiles;
    expect(findManyAccessProfiles).toEqual(expectedAccessProfiles);
    expect(countAccessProfiles).toBe(1);
  });
});