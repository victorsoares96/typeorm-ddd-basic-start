import { User } from '../infra/typeorm/entities/User';

export interface UsersRepositoryMethods {
  findByName(name: string): Promise<User | undefined>;
  findByIdsOrFail(ids: any[]): Promise<User[] | undefined>;
}
