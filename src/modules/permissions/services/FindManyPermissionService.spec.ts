import { CreatePermissionService } from './CreatePermissionService';
import { FakePermissionsRepository } from '../repositories/fakes/FakePermissionsRepository';
import { FindManyPermissionService } from './FindManyPermissionService';

let fakePermissionsRepository: FakePermissionsRepository;
let createPermission: CreatePermissionService;
let findPermissions: FindManyPermissionService;

describe('FindManyPermission', () => {
  beforeEach(() => {
    fakePermissionsRepository = new FakePermissionsRepository();
    createPermission = new CreatePermissionService(fakePermissionsRepository);
    findPermissions = new FindManyPermissionService(fakePermissionsRepository);
  });

  it('should be able to search a permissions', async () => {
    const permission = await createPermission.execute({
      name: 'CAN_CREATE_USER',
    });

    const [permissions, countPermissions] = await findPermissions.execute({
      name: 'CAN_',
    });

    const expectedPermissions = [permission];
    expect(permissions).toEqual(expectedPermissions);
    expect(countPermissions).toBe(1);
  });
});
