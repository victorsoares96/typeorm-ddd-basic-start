import { FindManyOptions, FindOneOptions } from 'typeorm';

import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export interface UsersRepositoryMethods {
  create(data: CreateUserDTO): Promise<User>;
  findOne(options?: FindOneOptions<User>): Promise<User | undefined>;
  findByIdsOrFail(
    ids: any[],
    options?: FindManyOptions<User>,
  ): Promise<User[] | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  update(data: UpdateUserDTO): Promise<User>;
}
