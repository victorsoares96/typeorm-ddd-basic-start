import { getRepository, ILike } from 'typeorm';
import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';

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

export class FindAccessProfileService {
  public async execute(
    accessProfileData: Request,
  ): Promise<[AccessProfile[], number]> {
    const {
      name = '',
      description = null,
      isDeleted = false,
      offset = 0,
      isAscending = false,
      limit = 20,
    } = accessProfileData;

    const accessProfilesRepository = getRepository(AccessProfile);

    const filters = Object.entries(accessProfileData).filter(
      ([, value]) => value,
    );
    const query = Object.fromEntries(filters) as Request;

    delete query.isDeleted;
    delete query.offset;
    delete query.isAscending;
    delete query.limit;

    const accessProfiles = await accessProfilesRepository.findAndCount({
      where: [
        {
          ...query,
          name: ILike(`%${name}%`),
          description: description ? ILike(`%${description}%`) : null,
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
