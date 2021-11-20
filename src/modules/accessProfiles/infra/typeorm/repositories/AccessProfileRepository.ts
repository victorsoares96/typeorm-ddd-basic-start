import { getRepository, ILike, Repository } from 'typeorm';

import { AccessProfilesRepositoryMethods } from '@modules/accessProfiles/repositories/AccessProfilesRepositoryMethods';
import { CreateAccessProfileDTO } from '@modules/accessProfiles/dtos/CreateAccessProfileDTO';
import { AccessProfileDTO } from '@modules/accessProfiles/dtos/AccessProfileDTO';
import { FindManyAccessProfileDTO } from '@modules/accessProfiles/dtos/FindManyAccessProfileDTO';
import { FindOneAccessProfileDTO } from '@modules/accessProfiles/dtos/FindOneAccessProfileDTO';
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
    filters: FindOneAccessProfileDTO,
  ): Promise<AccessProfile | undefined> {
    const { name = '', description = '', isDeleted = false } = filters;

    const onlyValueFilters = Object.entries(filters).filter(
      ([, value]) => value,
    );
    const query = Object.fromEntries(
      onlyValueFilters,
    ) as FindOneAccessProfileDTO;

    delete query.isDeleted;

    const accessProfile = await this.ormRepository.findOne({
      where: [
        {
          ...query,
          name: ILike(`%${name}%`),
          description: ILike(`%${description}%`),
        },
      ],
      loadEagerRelations: true,
      withDeleted: isDeleted,
    });

    return accessProfile;
  }

  public async findMany(
    filters: FindManyAccessProfileDTO,
  ): Promise<[AccessProfile[], number]> {
    const {
      name = '',
      description = '',
      isDeleted = false,
      offset = 0,
      isAscending = false,
      limit = 20,
    } = filters;

    const onlyValueFilters = Object.entries(filters).filter(
      ([, value]) => value,
    );
    const query = Object.fromEntries(
      onlyValueFilters,
    ) as FindManyAccessProfileDTO;

    delete query.isDeleted;
    delete query.offset;
    delete query.isAscending;
    delete query.limit;

    const accessProfiles = await this.ormRepository.findAndCount({
      where: [
        {
          ...query,
          name: ILike(`%${name}%`),
          description: ILike(`%${description}%`),
        },
      ],
      loadEagerRelations: true,
      withDeleted: isDeleted,
      take: limit,
      skip: offset,
      order: { name: isAscending ? 'ASC' : 'DESC' },
    });

    return accessProfiles;
  }

  public async findByIds(ids: string[]): Promise<AccessProfile[] | undefined> {
    const findAccessProfiles = await this.ormRepository.findByIds(ids);
    if (findAccessProfiles.length === ids.length) return findAccessProfiles;
    return undefined;
  }

  public async update(data: AccessProfileDTO[]): Promise<AccessProfile[]> {
    const accessProfiles = await this.ormRepository.save(data);
    return accessProfiles;
  }

  public async recover(data: AccessProfileDTO[]): Promise<AccessProfile[]> {
    const accessProfiles = await this.ormRepository.recover(data);
    return accessProfiles;
  }

  public async remove(data: AccessProfileDTO[]): Promise<AccessProfile[]> {
    const accessProfiles = await this.ormRepository.remove(data);
    return accessProfiles;
  }

  public async softRemove(data: AccessProfileDTO[]): Promise<AccessProfile[]> {
    const accessProfiles = await this.ormRepository.softRemove(data);
    return accessProfiles;
  }
}
