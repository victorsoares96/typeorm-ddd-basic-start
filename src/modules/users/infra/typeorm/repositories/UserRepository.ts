import { EntityRepository, Repository } from 'typeorm';

import { UsersRepositoryMethods } from '@modules/users/repositories/UsersRepositoryMethods';
import { User } from '../entities/User';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements UsersRepositoryMethods
{
  public async findByName(name: string): Promise<User | undefined> {
    const findUser = await this.findOne({
      where: { name },
    });

    return findUser;
  }

  public async findByIdsOrFail(ids: any[]): Promise<User[] | undefined> {
    const findUsers = await this.findByIds(ids);
    if (findUsers.length === ids.length) return findUsers;
    return undefined;
  }
}
