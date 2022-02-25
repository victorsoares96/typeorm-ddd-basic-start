/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-restricted-syntax */
import { FindManyAccessProfileDTO } from '@modules/accessProfiles/dtos/FindManyAccessProfileDTO';
import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { EUserStatus } from '@modules/users/utils/enums/e-user';
import { FindOneUserDTO } from '@modules/users/dtos/FindOneUserDTO';
import { UserDTO } from '@modules/users/dtos/UserDTO';
import { UsersRepositoryMethods } from '../UsersRepositoryMethods';

export class FakeUsersRepository implements UsersRepositoryMethods {
  private users: User[] = [];

  public async create(userData: CreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: '1',
      status: EUserStatus.Active,
      ...userData,
    });

    this.users.push(user);

    return user;
  }

  public findOne(filters: FindOneUserDTO): Promise<User | undefined> {
    return new Promise(resolve => {
      const user = this.users.find(item => {
        for (const filter in filters) {
          if (
            // @ts-ignore
            item[filter] === undefined ||
            // @ts-ignore
            !item[filter].includes(filters[filter])
          )
            return false;
        }
        return true;
      });

      resolve(user);
    });
  }

  public findMany(
    filters: FindManyAccessProfileDTO,
  ): Promise<[User[], number]> {
    return new Promise(resolve => {
      const users = this.users.filter(item => {
        for (const filter in filters) {
          if (
            // @ts-ignore
            item[filter] === undefined ||
            // @ts-ignore
            !item[filter].includes(filters[filter])
          )
            return false;
        }
        return true;
      });

      resolve([users, users.length]);
    });
  }

  public async findByIds(ids: string[]): Promise<User[] | undefined> {
    const findUsers = ids.map(id => this.users.find(user => user.id === id));
    if (findUsers.some(el => !el)) return undefined;
    return findUsers as User[];
  }

  public async update(data: UserDTO[]): Promise<User[]> {
    const users = data;

    users.forEach(user => {
      const index = this.users.findIndex(item => item.id === user.id);

      this.users[index] = user;
    });

    return this.users;
  }

  public async recover(data: UserDTO[]): Promise<User[]> {
    const users = data;

    users.forEach(user => {
      const index = this.users.findIndex(item => item.id === user.id);

      this.users[index] = {
        ...this.users[index],
        status: EUserStatus.Active,
      };
    });

    return this.users;
  }

  public async remove(data: User[]): Promise<User[]> {
    const usersId = data.map(user => user.id);
    const users = this.users.filter(user => !usersId.includes(user.id));

    this.users = users;
    return data;
  }

  public async softRemove(data: UserDTO[]): Promise<User[]> {
    const usersId = data.map(user => user.id);
    const findUsers = this.users.filter(user => usersId.includes(user.id));
    const softRemoveUsers = findUsers.map(user => {
      return { ...user, status: EUserStatus.Deleted };
    });

    this.users = softRemoveUsers;
    return softRemoveUsers;
  }
}
