import { validate } from 'class-validator';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { EUserError } from '@modules/users/utils/enums/e-errors';
import { UsersRepositoryMethods } from '../repositories/UsersRepositoryMethods';
import { HashProviderMethods } from '../providers/HashProvider/models/HashProviderMethods';

interface Request {
  id: string;
  currentPassword: string;
  newPassword: string;
}

@injectable()
export class ResetUserPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryMethods,
    @inject('HashProvider')
    private hashProvider: HashProviderMethods,
  ) {}

  public async execute({
    id,
    currentPassword,
    newPassword,
  }: Request): Promise<void> {
    if (!id) throw new AppError(EUserError.IsRequired);
    if (!currentPassword || !newPassword)
      throw new AppError(EUserError.CurrentOrNewPasswordRequired);

    const user = await this.usersRepository.findOne({ id });

    if (!user) throw new AppError(EUserError.NotFound);

    const passwordMatched = await this.hashProvider.compareHash(
      currentPassword,
      user.password,
    );

    if (!passwordMatched) throw new AppError(EUserError.IncorrectPassword, 401);

    const hashPassword = await this.hashProvider.generateHash(newPassword);

    const updatedUser: User = {
      ...user,
      password: hashPassword,
    };

    const [error] = await validate(updatedUser, {
      stopAtFirstError: true,
    });
    if (error && error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new AppError(message);
    }

    await this.usersRepository.update([updatedUser]);
  }
}
