import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { AppError } from '@shared/errors/AppError';
import { EGenericError } from '@shared/utils/enums/e-errors';
import { FakeAccessProfileRepository } from '../repositories/fakes/FakeAccessProfilesRepository';
import { CreateAccessProfileService } from './CreateAccessProfileService';
import { FindOneAccessProfileService } from './FindOneAccessProfileService';

let fakePermissionsRepository: FakePermissionsRepository;
let fakeAccessProfilesRepository: FakeAccessProfileRepository;
let createAccessProfile: CreateAccessProfileService;
let findAccessProfile: FindOneAccessProfileService;

describe('FindOneAccessProfile', () => {
  beforeEach(() => {
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
    await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });
    await createPermission.execute({
      name: 'CAN_VIEW_USER',
    });

    expect(
      await findPermission
        .execute({
          name: '',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EGenericError.MissingFilters));
    expect(
      await findPermission
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .execute({})
        .then(res => res)
        .catch(err => err),
    ).toEqual(new AppError(EGenericError.MissingFilters));
  });

  it('should be able to search and return only one permission', async () => {
    await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });
    await createPermission.execute({
      name: 'CAN_VIEW_USER',
    });

    const permission = await findPermission.execute({
      name: 'CAN_VIEW_USER',
    });

    expect(permission).toHaveProperty('id');
    expect(permission?.name).toBe('CAN_VIEW_USER');
  });

  it('should return undefined if the search does not return any results', async () => {
    await createPermission.execute({
      name: 'CAN_VIEW_USER',
    });

    expect(
      await findPermission
        .execute({
          name: 'CAN_CREATE_USER',
        })
        .then(res => res)
        .catch(err => err),
    ).toEqual(undefined);
  });
});
