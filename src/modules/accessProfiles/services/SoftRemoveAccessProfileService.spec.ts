import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { CreatePermissionService } from '@modules/permissions/services/CreatePermissionService';
import { AppError } from '@shared/errors/AppError';
import { AccessProfile } from '../infra/typeorm/entities/AccessProfile';
import { FakeAccessProfileRepository } from '../repositories/fakes/FakeAccessProfilesRepository';
import { EAccessProfileError } from '../utils/enums/e-errors';
import { EAccessProfileStatus } from '../utils/enums/e-status';
import { CreateAccessProfileService } from './CreateAccessProfileService';
import { FindOneAccessProfileService } from './FindOneAccessProfileService';
import { SoftRemoveAccessProfileService } from './SoftRemoveAccessProfileService';

let fakeAccessProfilesRepository: FakeAccessProfileRepository;
let createAccessProfile: CreateAccessProfileService;
let softRemoveAccessProfile: SoftRemoveAccessProfileService;
let findOneAccessProfile: FindOneAccessProfileService;

describe('SoftRemoveAccessProfile', () => {
  beforeEach(async () => {
    const fakePermissionsRepository = new FakePermissionsRepository();
    const createPermission = new CreatePermissionService(
      fakePermissionsRepository,
    );
    await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });

    fakeAccessProfilesRepository = new FakeAccessProfileRepository();
    createAccessProfile = new CreateAccessProfileService(
      fakeAccessProfilesRepository,
      fakePermissionsRepository,
    );
    softRemoveAccessProfile = new SoftRemoveAccessProfileService(
      fakeAccessProfilesRepository,
    );
    findOneAccessProfile = new FindOneAccessProfileService(
      fakeAccessProfilesRepository,
    );
  });

  it('should not be able to recover the access profile if the id is not provided', async () => {
    expect(
      softRemoveAccessProfile.execute({
        ids: '',
      }),
    ).rejects.toEqual(new AppError(EAccessProfileError.IdIsRequired));
  });

  it('should not be able to recover the access profile if it is not found', async () => {
    expect(
      softRemoveAccessProfile.execute({
        ids: '1',
      }),
    ).rejects.toEqual(new AppError(EAccessProfileError.NotFound));
  });

  it('should be able to soft remove a access profile', async () => {
    await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    await softRemoveAccessProfile.execute({
      ids: '1',
    });

    const accessProfile = (await findOneAccessProfile.execute({
      name: 'Admin',
    })) as AccessProfile;

    expect(accessProfile.status).toBe(EAccessProfileStatus.Deleted);
  });
});
