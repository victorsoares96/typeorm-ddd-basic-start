import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { AppError } from '@shared/errors/AppError';
import { FakeAccessProfileRepository } from '../repositories/fakes/FakeAccessProfilesRepository';
import { CreateAccessProfileService } from './CreateAccessProfileService';

jest.mock('typeorm', () => ({
  ...jest.requireActual('typeorm'),
  getRepository: () => ({
    findOne: jest.fn().mockResolvedValue(null),
  }),
}));

// const mockedTypeorm = typeorm as jest.Mocked<typeof typeorm>;

describe('CreateAccessProfile', () => {
  it('should be able to create a new access profile', async () => {
    const fakeAccessProfileRepository = new FakeAccessProfileRepository();
    const fakePermissionsRepository = new FakePermissionsRepository();
    const createAccessProfile = new CreateAccessProfileService(
      fakeAccessProfileRepository,
      fakePermissionsRepository,
    );

    const accessProfile = await createAccessProfile.execute({
      name: 'Admin',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    expect(accessProfile).toHaveProperty('id');
    expect(accessProfile.name).toBe('Admin');
  });

  it('should not be able to create a new permission with same name', async () => {
    const fakeAccessProfileRepository = new FakeAccessProfileRepository();
    const fakePermissionsRepository = new FakePermissionsRepository();
    const createAccessProfile = new CreateAccessProfileService(
      fakeAccessProfileRepository,
      fakePermissionsRepository,
    );

    await createAccessProfile.execute({
      name: 'Admin',
      permissionsId: '1',
      createdById: '1',
      createdByName: 'Foo',
      updatedById: '1',
      updatedByName: 'Foo',
    });

    expect(
      await createAccessProfile
        .execute({
          name: 'Admin',
          permissionsId: '1',
          createdById: '1',
          createdByName: 'Foo',
          updatedById: '1',
          updatedByName: 'Foo',
        })
        .then(res => res)
        .catch(err => err),
    ).toBeInstanceOf(AppError);
  });
});
