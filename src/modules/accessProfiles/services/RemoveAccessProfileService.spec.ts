import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { CreatePermissionService } from '@modules/permissions/services/CreatePermissionService';
import { AppError } from '@shared/errors/AppError';
import { FakeAccessProfileRepository } from '../repositories/fakes/FakeAccessProfilesRepository';
import { EAccessProfileError } from '../utils/enums/e-errors';
import { CreateAccessProfileService } from './CreateAccessProfileService';
import { RemoveAccessProfileService } from './RemoveAccessProfileService';
import { FindOneAccessProfileService } from './FindOneAccessProfileService';

let removeAccessProfile: RemoveAccessProfileService;
let findOneAccessProfile: FindOneAccessProfileService;

describe('RemoveAccessProfile', () => {
  beforeEach(async () => {
    const fakePermissionsRepository = new FakePermissionsRepository();
    const createPermission = new CreatePermissionService(
      fakePermissionsRepository,
    );

    const fakeAccessProfilesRepository = new FakeAccessProfileRepository();
    const createAccessProfile = new CreateAccessProfileService(
      fakeAccessProfilesRepository,
      fakePermissionsRepository,
    );
    removeAccessProfile = new RemoveAccessProfileService(
      fakeAccessProfilesRepository,
    );
    findOneAccessProfile = new FindOneAccessProfileService(
      fakeAccessProfilesRepository,
    );

    await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });

    await createAccessProfile.execute({
      name: 'Admin',
      description: 'Access profile for admins',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
    });
  });

  it('should not be able to remove the access profile if the id is not provided', async () => {
    expect(removeAccessProfile.execute({ ids: '' })).rejects.toEqual(
      new AppError(EAccessProfileError.IdIsRequired),
    );
  });

  it('should not be able to remove the access profile if it is not found', async () => {
    expect(removeAccessProfile.execute({ ids: '2' })).rejects.toEqual(
      new AppError(EAccessProfileError.NotFound),
    );
  });

  it('should be able to remove a access profile', async () => {
    await removeAccessProfile.execute({ ids: '1' });

    expect(await findOneAccessProfile.execute({ name: 'Admin' })).toEqual(
      undefined,
    );
  });
});
