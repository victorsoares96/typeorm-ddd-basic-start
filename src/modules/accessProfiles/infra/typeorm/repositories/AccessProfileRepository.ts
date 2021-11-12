import {
  FindManyOptions,
  FindOneOptions,
  getRepository,
  Repository,
} from 'typeorm';

import { AccessProfilesRepositoryMethods } from '@modules/accessProfiles/repositories/AccessProfilesRepositoryMethods';
import { CreateAccessProfileDTO } from '@modules/accessProfiles/dtos/CreateAccessProfileDTO';
import { UpdateAccessProfileDTO } from '@modules/accessProfiles/dtos/UpdateAccessProfileDTO';
import { RecoverAccessProfileDTO } from '@modules/accessProfiles/dtos/RecoverAccessProfileDTO';
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

  public async findOne(
    options?: FindOneOptions<AccessProfile>,
  ): Promise<AccessProfile | undefined> {
    const findAccessProfile = await this.ormRepository.findOne(options);

    return findAccessProfile;
  }

  public async findAndCount(
    options?: FindManyOptions<AccessProfile>,
  ): Promise<[AccessProfile[], number]> {
    const accessProfiles = await this.ormRepository.findAndCount(options);

    return accessProfiles;
  }

  public async findByName(name: string): Promise<AccessProfile | undefined> {
    const findAccessProfile = await this.ormRepository.findOne({
      where: { name },
    });

    return findAccessProfile;
  }

  public async update(data: UpdateAccessProfileDTO): Promise<AccessProfile> {
    const accessProfile = await this.ormRepository.save(data);
    return accessProfile;
  }

  public async recover(
    accessProfiles: RecoverAccessProfileDTO[],
  ): Promise<AccessProfile[]> {
    const accessProfile = await this.ormRepository.recover(accessProfiles);
    return accessProfile;
  }
}
