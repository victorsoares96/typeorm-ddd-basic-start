import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { EUserError } from '@shared/utils/enums/e-errors';
import { UsersRepositoryMethods } from '../repositories/UsersRepositoryMethods';

interface Request {
  ids: string;
}

@injectable()
export class SoftRemoveUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryMethods,
  ) {}

  public async execute({ ids }: Request): Promise<void> {
    const usersId = ids.split(',');

    const users = await this.usersRepository.findByIds(usersId);

    if (!users) throw new AppError(EUserError.NotFound);

    await this.usersRepository.softRemove(users);
  }
}
