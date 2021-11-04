import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { EAuthenticateError } from '@shared/utils/enums/e-errors';

import { User } from '../infra/typeorm/entities/User';

interface Request {
  username: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export class AuthenticateUserService {
  public async execute({ username, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { username } });

    if (!user)
      throw new AppError(
        EAuthenticateError.IncorrectUsernamePasswordCombination,
        401,
      );

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched)
      throw new AppError(
        EAuthenticateError.IncorrectUsernamePasswordCombination,
        401,
      );

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ name: user.fullName }, secret, {
      subject: String(user.id),
      expiresIn,
    });

    user.lastAccess = new Date().toISOString();
    await usersRepository.save(user);

    return { user, token };
  }
}
