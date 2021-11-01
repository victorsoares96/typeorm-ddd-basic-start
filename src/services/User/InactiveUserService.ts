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

export class InactiveUserService {
  public async execute({
    id,
    updatedById,
    updatedByName,
  }: Request): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) throw new AppError(EUserError.NotFound);

    user.status = EUserStatus.Inactive;
    user.updatedById = updatedById;
    user.updatedByName = updatedByName;

    await usersRepository.save(user);
  }
}
