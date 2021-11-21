import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { CreatePermissionService } from '@modules/permissions/services/CreatePermissionService';
import { FakeAccessProfileRepository } from '../repositories/fakes/FakeAccessProfilesRepository';
import { CreateAccessProfileService } from './CreateAccessProfileService';
import { FindManyAccessProfileService } from './FindManyAccessProfileService';

let fakePermissionsRepository: FakePermissionsRepository;
let createPermission: CreatePermissionService;
let fakeAccessProfileRepository: FakeAccessProfileRepository;
let createAccessProfile: CreateAccessProfileService;
let findAccessProfiles: FindManyAccessProfileService;

describe('FindManyAccessProfile', () => {
  beforeEach(() => {
    fakePermissionsRepository = new FakePermissionsRepository();
    createPermission = new CreatePermissionService(fakePermissionsRepository);

    fakeAccessProfileRepository = new FakeAccessProfileRepository();
    createAccessProfile = new CreateAccessProfileService(
      fakeAccessProfileRepository,
      fakePermissionsRepository,
    );
    findAccessProfiles = new FindManyAccessProfileService(
      fakeAccessProfileRepository,
    );
  });

  it('should be able to search a accessProfiles', async () => {
    await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });

    const accessProfile = await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    const [accessProfiles, countAccessProfiles] =
      await findAccessProfiles.execute({
        name: 'Admin',
      });

    const expectedPermissions = [accessProfile];
    expect(accessProfiles).toEqual(expectedPermissions);
    expect(countAccessProfiles).toBe(1);
  });
});
