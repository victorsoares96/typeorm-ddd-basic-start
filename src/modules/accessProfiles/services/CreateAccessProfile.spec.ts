import { FakePermissionsRepository } from '@modules/permissions/repositories/fakes/FakePermissionsRepository';
import { container } from 'tsyringe';
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
  beforeAll(() => {
    container.registerSingleton(
      'PermissionsRepository',
      FakePermissionsRepository,
    );
    container.registerSingleton(
      'AccessProfilesRepository',
      FakeAccessProfileRepository,
    );
  });
  beforeEach(() => {
    container.clearInstances();
  });

  it('should be able to create a new access profile', async () => {
    const createAccessProfile = container.resolve(CreateAccessProfileService);

    const accessProfile = await createAccessProfile.execute({
      name: 'Admin',
      permissionsId: '1',
    });

    expect(accessProfile).toHaveProperty('id');
    expect(accessProfile.name).toBe('Admin');
  });
});
