import { EntityRepository, getRepository, ILike, Repository } from 'typeorm';

import {
  FindOptions,
  UsersRepositoryMethods,
} from '@modules/users/repositories/UsersRepositoryMethods';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { validate } from 'class-validator';
import { AppError } from '@shared/errors/AppError';
import { UserDTO } from '@modules/users/dtos/UserDTO';
import { FindOneUserDTO } from '@modules/users/dtos/FindOneUserDTO';
import { FindManyUserDTO } from '@modules/users/dtos/FindManyUserDTO';

@EntityRepository(User)
export class UserRepository implements UsersRepositoryMethods {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    const [error] = await validate(user, {
      stopAtFirstError: true,
    });

    if (error && error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new AppError(message);
    }

    await this.ormRepository.save(user);

    return user;
  }

  public async findOne(filters: FindOneUserDTO): Promise<User | undefined> {
    const { isDeleted = false } = filters;

    const onlyValueFilters = Object.entries(filters).filter(
      ([, value]) => value,
    );
    const query = Object.fromEntries(onlyValueFilters) as FindOneUserDTO;

    delete query.isDeleted;

    const user = await this.ormRepository.findOne({
      where: [{ ...query }],
      loadEagerRelations: true,
      withDeleted: isDeleted,
    });

    return user;
  }

  public async findMany(filters: FindManyUserDTO): Promise<[User[], number]> {
    const {
      firstName = '',
      lastName = '',
      fullName = '',
      email = '',
      username = '',
      isDeleted = false,
      offset = 0,
      isAscending = false,
      limit = 20,
    } = filters;

    const onlyValueFilters = Object.entries(filters).filter(
      ([, value]) => value,
    );
    const query = Object.fromEntries(onlyValueFilters) as FindManyUserDTO;

    delete query.isDeleted;
    delete query.offset;
    delete query.isAscending;
    delete query.limit;

    const users = await this.ormRepository.findAndCount({
      where: [
        {
          ...query,
          firstName: ILike(`%${firstName}%`),
          lastName: ILike(`%${lastName}%`),
          fullName: ILike(`%${fullName}%`),
          email: ILike(`%${email}%`),
          username: ILike(`%${username}%`),
        },
      ],
      loadEagerRelations: true,
      withDeleted: isDeleted,
      take: limit,
      skip: offset,
      order: {
        createdAt: isAscending ? 'ASC' : 'DESC',
      },
    });

    return users;
  }

  public async findByIds(
    ids: string[],
    options?: FindOptions,
  ): Promise<User[] | undefined> {
    const findUsers = await this.ormRepository.findByIds(ids, {
      withDeleted: options ? options.withDeleted : false,
    });
    if (findUsers.length === ids.length) return findUsers;
    return undefined;
  }

  public async update(data: UserDTO[]): Promise<User[]> {
    const users = await this.ormRepository.save(data);
    return users;
  }

  public async recover(data: UserDTO[]): Promise<User[]> {
    const users = await this.ormRepository.recover(data);
    return users;
  }

  public async remove(data: UserDTO[]): Promise<User[]> {
    const users = await this.ormRepository.remove(data);
    return users;
  }

  public async softRemove(data: UserDTO[]): Promise<User[]> {
    const users = await this.ormRepository.softRemove(data);
    return users;
  }
}
