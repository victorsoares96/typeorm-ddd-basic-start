import { validate } from 'class-validator';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { EAccessProfileError, EUserError } from '@shared/utils/enums/e-errors';
import { UsersRepositoryMethods } from '../repositories/UsersRepositoryMethods';

export interface Request {
  id: string;
  firstName?: string;
  lastName?: string;
  status?: number;
  updatedById: string;
  updatedByName: string;
  email?: string;
  accessProfileId?: string;
}

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryMethods,
    @inject('AccessProfilesRepository')
    private accessProfilesRepository: UsersRepositoryMethods,
  ) {}

  public async execute(userData: Request): Promise<User> {
    const { id, accessProfileId } = userData;

    if (!id) throw new AppError(EUserError.IsRequired);
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new AppError(EUserError.NotFound);
    if (!accessProfileId) throw new AppError(EAccessProfileError.IdIsRequired);

    const accessProfile = await this.accessProfilesRepository.findOne({
      where: { id: accessProfileId },
    });
    if (!accessProfile) throw new AppError(EAccessProfileError.NotFound);

    const updatedUser = {
      ...user,
      ...userData,
      ...accessProfile,
    };

    const [error] = await validate(updatedUser, {
      stopAtFirstError: true,
    });
    if (error && error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new AppError(message);
    }

    console.log(updatedUser);

    await this.usersRepository.update([updatedUser]);

    return updatedUser;
  }
}
