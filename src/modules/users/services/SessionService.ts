/* eslint-disable @typescript-eslint/ban-ts-comment */
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import { AppError } from '@shared/errors/AppError';

import { User } from '../infra/typeorm/entities/User';
import { UsersRepositoryMethods } from '../repositories/UsersRepositoryMethods';
import { ESessionError } from '../utils/enums/e-errors';

export interface Request {
  username: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
export class SessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryMethods,
  ) {}

  public async execute({ username, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user)
      throw new AppError(
        ESessionError.IncorrectUsernamePasswordCombination,
        401,
      );

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched)
      throw new AppError(
        ESessionError.IncorrectUsernamePasswordCombination,
        401,
      );

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ name: user.fullName }, secret, {
      subject: String(user.id),
      expiresIn,
    });

    user.lastAccess = new Date().toISOString();
    await this.usersRepository.update([user]);

    // @ts-ignore
    delete user.password;

    return { user, token };
  }
}
