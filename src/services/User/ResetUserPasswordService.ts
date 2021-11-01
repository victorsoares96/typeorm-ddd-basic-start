import { compare, hash } from 'bcryptjs';
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';

import { AppError } from '../../errors/AppError';
import { User } from '../../models/User';
import { EUserError } from '../../utils/enums/e-errors';

interface Request {
  id: string;
  currentPassword: string;
  newPassword: string;
}

export class ResetUserPasswordService {
  public async execute({
    id,
    currentPassword,
    newPassword,
  }: Request): Promise<void> {
    const usersRepository = getRepository(User);

    if (!id) throw new AppError(EUserError.IsRequired);
    if (!currentPassword || !newPassword)
      throw new AppError(EUserError.CurrentOrNewPasswordRequired);

    const user = await usersRepository.findOne(id);

    if (!user) throw new AppError(EUserError.NotFound);

    const passwordMatched = await compare(currentPassword, user.password);

    if (!passwordMatched) throw new AppError(EUserError.IncorrectPassword, 401);

    const hashPassword = await hash(newPassword, 8);

    const updatedUser: User = {
      ...user,
      password: hashPassword,
    };

    const [error] = await validate(updatedUser, {
      stopAtFirstError: true,
    });
    if (error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new AppError(message);
    }

    await usersRepository.save(updatedUser);
  }
}
