import { getRepository } from 'typeorm';

import { AppError } from '../../errors/AppError';
import { User } from '../../models/User';
import { EUserError } from '../../utils/enums/e-errors';
import { EUserStatus } from '../../utils/enums/e-user';

interface Request {
  id: string;
  updatedById: string;
  updatedByName: string;
}

export class RecoverUserService {
  public async execute({
    id,
    updatedById,
    updatedByName,
  }: Request): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id, {
      withDeleted: true,
    });

    if (!user) throw new AppError(EUserError.NotFound);
    if (user.status === EUserStatus.Active)
      throw new AppError(EUserError.NotDisabled);

    user.status = EUserStatus.Active;
    user.updatedById = updatedById;
    user.updatedByName = updatedByName;

    await usersRepository.save(user);

    await usersRepository.recover(user);
  }
}
