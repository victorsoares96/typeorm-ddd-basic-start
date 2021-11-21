import { AppError } from '@shared/errors/AppError';
import { EGenericError } from '@shared/utils/enums/e-errors';
import { CreatePermissionService } from './CreatePermissionService';
import { FakePermissionsRepository } from '../repositories/fakes/FakePermissionsRepository';
import { FindOnePermissionService } from './FindOnePermissionService';

let fakePermissionsRepository: FakePermissionsRepository;
let createPermission: CreatePermissionService;
let findPermission: FindOnePermissionService;

describe('FindOnePermission', () => {
  beforeEach(() => {
    fakePermissionsRepository = new FakePermissionsRepository();
    createPermission = new CreatePermissionService(fakePermissionsRepository);
    findPermission = new FindOnePermissionService(fakePermissionsRepository);
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
