import { getRepository } from 'typeorm';
import { AppError } from '../../errors/AppError';
import { User } from '../../models/User';
import { EUserError } from '../../utils/enums/e-errors';

interface Request {
  id: string;
}

interface IServiceOptions {
  softRemove?: boolean;
}
export class RemoveUserService {
  private softRemove = false;

  constructor(options?: IServiceOptions) {
    if (options) {
      this.softRemove = options.softRemove ?? false;
    }
  }

  public async execute({ id }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) throw new AppError(EUserError.NotFound);

    if (this.softRemove) {
      await usersRepository.softRemove(user);
    } else await usersRepository.remove(user);

    return user;
  }
}
