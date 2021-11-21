import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { CreatePermissionService } from '@modules/permissions/services/CreatePermissionService';
import { AppError } from '@shared/errors/AppError';
import { EGenericError } from '@shared/utils/enums/e-errors';
import { FakeAccessProfileRepository } from '../repositories/fakes/FakeAccessProfilesRepository';
import { CreateAccessProfileService } from './CreateAccessProfileService';
import { FindOneAccessProfileService } from './FindOneAccessProfileService';

let fakePermissionsRepository: FakePermissionsRepository;
let createPermission: CreatePermissionService;
let fakeAccessProfilesRepository: FakeAccessProfileRepository;
let createAccessProfile: CreateAccessProfileService;
let findAccessProfile: FindOneAccessProfileService;

describe('FindOneAccessProfile', () => {
  beforeEach(() => {
    fakePermissionsRepository = new FakePermissionsRepository();
    createPermission = new CreatePermissionService(fakePermissionsRepository);
    fakeAccessProfilesRepository = new FakeAccessProfileRepository();
    createAccessProfile = new CreateAccessProfileService(
      fakeAccessProfilesRepository,
      fakePermissionsRepository,
    );
    findAccessProfile = new FindOneAccessProfileService(
      fakeAccessProfilesRepository,
    );
  });

  it('should not allow the search if no filter is sent', async () => {
    expect(
      await findAccessProfile
        .execute({
          name: '',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EGenericError.MissingFilters));
    expect(
      await findAccessProfile
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .execute({})
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EGenericError.MissingFilters));
  });

  it('should be able to search and return only one access profile', async () => {
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

    const accessProfileFound = await findAccessProfile.execute({
      name: 'Admin',
    });

    expect(accessProfileFound).toEqual(accessProfile);
  });

  it('should return undefined if the search does not return any results', async () => {});
});
