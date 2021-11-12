import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { EAccessProfileError } from '@shared/utils/enums/e-errors';

import { AccessProfilesRepositoryMethods } from '@modules/accessProfiles/repositories/AccessProfilesRepositoryMethods';
import { User } from '../infra/typeorm/entities/User';
import { UsersRepositoryMethods } from '../repositories/UsersRepositoryMethods';

export interface Request {
  firstName: string;
  lastName: string;
  status: number;
  createdById: string;
  createdByName: string;
  updatedById: string;
  updatedByName: string;
  lastAccess: string;
  accessProfileId: string;
  avatar: string;
  username: string;
  email: string;
  password: string;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryMethods,
    @inject('AccessProfilesRepository')
    private accessProfilesRepository: AccessProfilesRepositoryMethods,
  ) {}

  public async execute(data: Request): Promise<User> {
    const { accessProfileId } = data;

    if (!accessProfileId) throw new AppError(EAccessProfileError.IsRequired);

    const accessProfile = await this.accessProfilesRepository.findOne({
      where: { id: accessProfileId },
    });
    if (!accessProfile) throw new AppError(EAccessProfileError.NotFound);

    const user = this.usersRepository.create({
      ...data,
      accessProfile,
    });

    return user;
  }
}
