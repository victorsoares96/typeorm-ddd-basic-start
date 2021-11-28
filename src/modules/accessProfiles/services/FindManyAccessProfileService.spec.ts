import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { CreatePermissionService } from '@modules/permissions/services/CreatePermissionService';
import { AccessProfile } from '../infra/typeorm/entities/AccessProfile';
import { FakeAccessProfileRepository } from '../repositories/fakes/FakeAccessProfilesRepository';
import { CreateAccessProfileService } from './CreateAccessProfileService';
import { FindManyAccessProfileService } from './FindManyAccessProfileService';

let fakeAccessProfileRepository: FakeAccessProfileRepository;
let createAccessProfile: CreateAccessProfileService;
let findAccessProfiles: FindManyAccessProfileService;
let accessProfiles: AccessProfile[] = [];

describe('FindManyAccessProfile', () => {
  beforeEach(async () => {
    const fakePermissionsRepository = new FakePermissionsRepository();
    const createPermission = new CreatePermissionService(
      fakePermissionsRepository,
    );
    await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });

    fakeAccessProfileRepository = new FakeAccessProfileRepository();
    createAccessProfile = new CreateAccessProfileService(
      fakeAccessProfileRepository,
      fakePermissionsRepository,
    );
    findAccessProfiles = new FindManyAccessProfileService(
      fakeAccessProfileRepository,
    );
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
      updatedByName: 'Foo',
    });
    accessProfiles.push(accessProfile);

    const [findManyAccessProfiles, countAccessProfiles] =
      await findAccessProfiles.execute({
        name: 'Admin',
      });

    const expectedAccessProfiles = accessProfiles;
    expect(findManyAccessProfiles).toEqual(expectedAccessProfiles);
    expect(countAccessProfiles).toBe(1);
  });
});
