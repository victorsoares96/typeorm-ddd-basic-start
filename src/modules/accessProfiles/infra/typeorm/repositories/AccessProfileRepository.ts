import { getRepository, Repository } from 'typeorm';

import { AccessProfilesRepositoryMethods } from '@modules/accessProfiles/repositories/AccessProfilesRepositoryMethods';
import { CreateAccessProfileDTO } from '@modules/accessProfiles/dtos/CreateAccessProfileDTO';
import { AccessProfile } from '../entities/AccessProfile';

export class AccessProfileRepository
  implements AccessProfilesRepositoryMethods
{
  private ormRepository: Repository<AccessProfile>;

  constructor() {
    this.ormRepository = getRepository(AccessProfile);
  }

  public async create({
    name,
    permissions,
    description,
    createdById,
    createdByName,
    updatedById,
    updatedByName,
  }: CreateAccessProfileDTO) {
    const accessProfile = this.ormRepository.create({
      name,
      description,
      permissions,
      createdById,
      createdByName,
      updatedById,
      updatedByName,
    });

    await this.ormRepository.save(accessProfile);
    return accessProfile;
  }

  public async findByName(name: string): Promise<AccessProfile | undefined> {
    const findAccessProfile = await this.ormRepository.findOne({
      where: { name },
    });

    return findAccessProfile;
  }
}
