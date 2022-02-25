import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { FindManyUserDTO } from '../dtos/FindManyUserDTO';
import { FindOneUserDTO } from '../dtos/FindOneUserDTO';
import { UserDTO } from '../dtos/UserDTO';
import { User } from '../infra/typeorm/entities/User';

export interface FindOptions {
  withDeleted?: boolean;
}
export interface UsersRepositoryMethods {
  create(data: CreateUserDTO): Promise<User>;
  findOne(data: FindOneUserDTO): Promise<User | undefined>;
  findMany(data: FindManyUserDTO): Promise<[User[], number]>;
  findByIds(ids: string[], options?: FindOptions): Promise<User[] | undefined>;
  update(data: UserDTO[]): Promise<User[]>;
  recover(data: UserDTO[]): Promise<User[]>;
  remove(data: UserDTO[]): Promise<User[]>;
  softRemove(data: UserDTO[]): Promise<User[]>;
}
