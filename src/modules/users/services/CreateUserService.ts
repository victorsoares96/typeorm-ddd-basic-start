import { hash } from 'bcryptjs';
import { getCustomRepository, getRepository } from 'typeorm';

import { AppError } from '@shared/errors/AppError';
import { AccessProfileRepository } from '@modules/accessProfiles/infra/typeorm/repositories/AccessProfileRepository';
import { EAccessProfileError, EUserError } from '@shared/utils/enums/e-errors';

import { User } from '../infra/typeorm/entities/User';

export interface Request {
  firstName: string;
  lastName: string;
  status?: number;
  createdById?: string;
  createdByName?: string;
  updatedById?: string;
  updatedByName?: string;
  deletionDate?: string;
  lastAccess?: string;
  accessProfileId: string;
  unityId: string;
  departmentId: string;
  responsibilityId: string;
  avatar?: string;
  username: string;
  email: string;
  phoneNumber?: string;
  mobileNumber: string;
  password: string;
}

export class CreateUserService {
  public async execute(userData: Request): Promise<User> {
    const { email, username, password, accessProfileId } = userData;

    const usersRepository = getRepository(User);
    const accessProfileRepository = getCustomRepository(
      AccessProfileRepository,
    );

    if (!accessProfileId) throw new AppError(EAccessProfileError.IsRequired);

    const userExists = await usersRepository.findOne({
      where: [{ email }, { username }],
    });

    if (userExists) throw new AppError(EUserError.AlreadyExist);

    const accessProfile = await accessProfileRepository.findOne({
      where: { id: accessProfileId },
    });
    if (!accessProfile) throw new AppError(EAccessProfileError.NotFound);

    const hashPassword = await hash(password, 8);

    const user = usersRepository.create({
      ...userData,
      accessProfile,
      password: hashPassword,
    });
    await usersRepository.save(user);

    return user;
  }
}
