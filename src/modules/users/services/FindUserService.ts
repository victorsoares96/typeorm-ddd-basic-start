import { injectable, inject } from 'tsyringe';
import { ILike } from 'typeorm';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { UsersRepositoryMethods } from '../repositories/UsersRepositoryMethods';

export interface Request {
  firstName: string;
  lastName: string;
  fullName: string;
  status: number;
  createdAt: Date;
  createdById: string;
  deletionDate: Date;
  lastAccess: string;
  username: string;
  email: string;
  isDeleted?: boolean;
  offset?: number;
  isAscending?: boolean;
  limit?: number;
}

@injectable()
export class FindUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryMethods,
  ) {}

  public async execute(userData: Request): Promise<[User[], number]> {
    const {
      firstName = '',
      lastName = '',
      fullName = '',
      username = '',
      email = '',
      isDeleted = false,
      offset = 0,
      isAscending = false,
      limit = 20,
    } = userData;

    const filters = Object.entries(userData).filter(([, value]) => value);
    const query = Object.fromEntries(filters) as Request;

    delete query.isDeleted;
    delete query.offset;
    delete query.isAscending;
    delete query.limit;

    const users = await this.usersRepository.findAndCount({
      where: [
        {
          ...query,
          firstName: ILike(`%${firstName}%`),
          lastName: ILike(`%${lastName}%`),
          fullName: ILike(`%${fullName}%`),
          username: ILike(`%${username}%`),
          email: ILike(`%${email}%`),
        },
      ],
      loadEagerRelations: true,
      withDeleted: isDeleted,
      take: limit,
      skip: offset,
      order: { fullName: isAscending ? 'ASC' : 'DESC' },
    });

    return users;
  }
}
