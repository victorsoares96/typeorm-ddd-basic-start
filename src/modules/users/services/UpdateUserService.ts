import { validate } from 'class-validator';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { AccessProfilesRepositoryMethods } from '@modules/accessProfiles/repositories/AccessProfilesRepositoryMethods';
import { EAccessProfileError } from '@modules/accessProfiles/utils/enums/e-errors';
import { UsersRepositoryMethods } from '../repositories/UsersRepositoryMethods';
import { EUserError } from '../utils/enums/e-errors';

export interface Request {
  id: string;
  firstName?: string;
  lastName?: string;
  status?: number;
  updatedById: string;
  updatedByName: string;
  email?: string;
  username?: string;
  accessProfileId?: string;
}

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryMethods,
    @inject('AccessProfilesRepository')
    private accessProfilesRepository: AccessProfilesRepositoryMethods,
  ) {}

  public async execute(userData: Request): Promise<User> {
    const { id, accessProfileId } = userData;

    if (!id) throw new AppError(EUserError.IdIsRequired);
    if (!accessProfileId) throw new AppError(EAccessProfileError.IdIsRequired);

    const user = await this.usersRepository.findOne({ id });
    if (!user) throw new AppError(EUserError.NotFound);

    const accessProfile = await this.accessProfilesRepository.findOne({
      id: accessProfileId,
    });
    if (!accessProfile) throw new AppError(EAccessProfileError.NotFound);

    delete userData.accessProfileId;

    const [error] = await validate(
      {
        ...user,
        ...userData,
        accessProfile,
      },
      {
        stopAtFirstError: true,
      },
    );
    if (error && error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new AppError(message);
    }

    const [updatedUser] = await this.usersRepository.update([
      {
        ...user,
        ...userData,
        accessProfile,
      },
    ]);

    return updatedUser;
  }
}
