import { FindManyOptions, FindOneOptions } from 'typeorm';

import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { RecoverUserDTO } from '../dtos/RecoverUserDTO';
import { UserDTO } from '../dtos/UserDTO';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export interface UsersRepositoryMethods {
  create(data: CreateUserDTO): Promise<User>;
  findOne(options?: FindOneOptions<User>): Promise<User | undefined>;
  findAndCount(options?: FindManyOptions<User>): Promise<[User[], number]>;
  findByIds(
    ids: any[],
    options?: FindManyOptions<User>,
  ): Promise<User[] | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  update(data: UpdateUserDTO[]): Promise<User[]>;
  recover(data: RecoverUserDTO[]): Promise<User[]>;
  remove(data: UserDTO[]): Promise<User[]>;
  softRemove(data: UserDTO[]): Promise<User[]>;
}
