import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { EAccessProfileError, EUserError } from '@shared/utils/enums/e-errors';

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
    const { email, username, password, accessProfileId } = data;

    // const usersRepository = getRepository(User).findOne();

    if (!accessProfileId) throw new AppError(EAccessProfileError.IsRequired);

    const userExists = await this.usersRepository.findOne({
      where: [{ email }, { username }],
    });

    if (userExists) throw new AppError(EUserError.AlreadyExist);

    const accessProfile = await this.accessProfilesRepository.findOne({
      where: { id: accessProfileId },
    });
    if (!accessProfile) throw new AppError(EAccessProfileError.NotFound);

    const hashPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      ...data,
      accessProfile,
      password: hashPassword,
    });

    return user;
  }
}
