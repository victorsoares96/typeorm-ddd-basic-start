import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { EUserError } from '@shared/utils/enums/e-errors';
import { EUserStatus } from '@shared/utils/enums/e-user';
import { UsersRepositoryMethods } from '../repositories/UsersRepositoryMethods';

interface Request {
  ids: string;
  updatedById: string;
  updatedByName: string;
}

@injectable()
export class RecoverUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryMethods,
  ) {}

  public async execute({
    ids,
    updatedById,
    updatedByName,
  }: Request): Promise<void> {
    const usersId = ids.split(',');

    const users = await this.usersRepository.findByIds(usersId, {
      withDeleted: true,
    });

    if (!users) throw new AppError(EUserError.SomeNotFound);

    users.forEach(user => {
      user.status = EUserStatus.Active;
      user.updatedById = updatedById;
      user.updatedByName = updatedByName;
    });

    await this.usersRepository.update(users);

    await this.usersRepository.recover(users);
  }
}
