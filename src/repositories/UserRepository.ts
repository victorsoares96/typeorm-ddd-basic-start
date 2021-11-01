import { EntityRepository, FindManyOptions, Repository } from 'typeorm';

import { User } from '../models/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | null> {
    const findUser = await this.findOne({
      where: { name },
    });

    return findUser || null;
  }

  public async findByIdsOrFail(
    ids: any[],
    options?: FindManyOptions<User>,
  ): Promise<User[] | null> {
    const findUsers = await this.findByIds(ids, options);
    if (findUsers.length === ids.length) return findUsers;
    return null;
  }
}
