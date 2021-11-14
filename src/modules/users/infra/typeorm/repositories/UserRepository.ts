import {
  EntityRepository,
  FindManyOptions,
  FindOneOptions,
  getRepository,
  Repository,
} from 'typeorm';

import { UsersRepositoryMethods } from '@modules/users/repositories/UsersRepositoryMethods';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { validate } from 'class-validator';
import { AppError } from '@shared/errors/AppError';
import { UpdateUserDTO } from '@modules/users/dtos/UpdateUserDTO';
import { RecoverUserDTO } from '@modules/users/dtos/RecoverUserDTO';
import { UserDTO } from '@modules/users/dtos/UserDTO';

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

  public async findOne(
    options?: FindOneOptions<User>,
  ): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne(options);

    return findUser;
  }

  public async findAndCount(
    options?: FindManyOptions<User>,
  ): Promise<[User[], number]> {
    const accessUsers = await this.ormRepository.findAndCount(options);

    return accessUsers;
  }

  public async findByIds(
    ids: any[],
    options?: FindManyOptions<User>,
  ): Promise<User[] | undefined> {
    const findUsers = await this.ormRepository.findByIds(ids, options);
    if (findUsers.length === ids.length) return findUsers;
    return undefined;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { username },
    });

    return findUser;
  }

  public async update(data: UpdateUserDTO[]): Promise<User[]> {
    const users = await this.ormRepository.save(data);
    return users;
  }

  public async recover(data: RecoverUserDTO[]): Promise<User[]> {
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
