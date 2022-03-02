import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { EUserError } from '@modules/users/utils/enums/e-errors';
import { UsersRepositoryMethods } from '../repositories/UsersRepositoryMethods';

interface Request {
  ids: string;
}

@injectable()
export class RemoveUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryMethods,
  ) {}

  public async execute({ ids }: Request): Promise<void> {
    if (!ids) {
      throw new AppError(EUserError.IdIsRequired);
    }

    const usersId = ids.split(',');

    const users = await this.usersRepository.findByIds(usersId);

    if (!users) throw new AppError(EUserError.NotFound);

    await this.usersRepository.remove(users);
  }
}
