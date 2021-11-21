import { AppError } from '@shared/errors/AppError';
import { CreatePermissionService } from './CreatePermissionService';
import { FakePermissionsRepository } from '../repositories/fakes/FakePermissionsRepository';

let fakePermissionsRepository: FakePermissionsRepository;
let createPermission: CreatePermissionService;

describe('CreatePermission', () => {
  beforeEach(() => {
    fakePermissionsRepository = new FakePermissionsRepository();
    createPermission = new CreatePermissionService(fakePermissionsRepository);
  });

  it('should be able to create a new permission', async () => {
    const permission = await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });

    expect(permission).toHaveProperty('id');
    expect(permission.name).toBe('CAN_CREATE_USER');
  });

  it('should not be able to create a new permission with same name', async () => {
    await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });

    expect(
      await createPermission
        .execute({ name: 'CAN_CREATE_USER' })
        .then(res => res)
        .catch(err => err),
    ).toBeInstanceOf(AppError);
  });

  it('should not be able to create a new permission with less than 3 characters', async () => {
    expect(
      await createPermission
        .execute({ name: 'A' })
        .then(res => res)
        .catch(err => err),
    ).toBeInstanceOf(AppError);
  });

  it('should not be able to create a new permission with more than 35 characters', async () => {
    expect(
      await createPermission
        .execute({ name: 'IS_THIS_A_VERY_LARGE_PHRASE_CREATED_FOR_TESTING' })
        .then(res => res)
        .catch(err => err),
    ).toBeInstanceOf(AppError);
  });
});
