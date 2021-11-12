import { ILike } from 'typeorm';
import { injectable, inject } from 'tsyringe';
import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';
import { AccessProfilesRepositoryMethods } from '../repositories/AccessProfilesRepositoryMethods';

export interface Request {
  name: string;
  description: string;
  status: number;
  createdAt: Date;
  createdById: string;
  updatedAt: Date;
  updatedById: string;
  deletionDate: Date;
  isDeleted?: boolean;
  offset?: number;
  isAscending?: boolean;
  limit?: number;
}

@injectable()
export class FindAccessProfileService {
  constructor(
    @inject('AccessProfilesRepository')
    private accessProfilesRepository: AccessProfilesRepositoryMethods,
  ) {}

  public async execute(
    accessProfileData: Request,
  ): Promise<[AccessProfile[], number]> {
    const {
      name = '',
      description = '',
      isDeleted = false,
      offset = 0,
      isAscending = false,
      limit = 20,
    } = accessProfileData;

    const filters = Object.entries(accessProfileData).filter(
      ([, value]) => value,
    );
    const query = Object.fromEntries(filters) as Request;

    delete query.isDeleted;
    delete query.offset;
    delete query.isAscending;
    delete query.limit;

    const accessProfiles = await this.accessProfilesRepository.findAndCount({
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
}
