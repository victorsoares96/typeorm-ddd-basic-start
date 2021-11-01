import { validate } from 'class-validator';
import { getRepository } from 'typeorm';

import { AppError } from '../../errors/AppError';
import { AccessProfile } from '../../models/AccessProfile';
import { User } from '../../models/User';
import { EAccessProfileError, EUserError } from '../../utils/enums/e-errors';

export interface Request {
  id: string;
  firstName?: string;
  lastName?: string;
  status?: number;
  updatedById: string;
  updatedByName: string;
  email?: string;
  phoneNumber?: string;
  mobileNumber?: string;
  unityId?: string;
  departmentId?: string;
  responsibilityId?: string;
  accessProfileId?: string;
}

export class UpdateUserService {
  public async execute(userData: Request): Promise<User> {
    const { id, accessProfileId } = userData;

    const usersRepository = getRepository(User);

    if (!id) throw new AppError(EUserError.IsRequired);
    const user = await usersRepository.findOne(id);

    if (!user) throw new AppError(EUserError.NotFound);
    if (!accessProfileId) throw new AppError(EAccessProfileError.IdIsRequired);

    const accessProfilesRepository = getRepository(AccessProfile);

    const accessProfile = await accessProfilesRepository.findOne(
      accessProfileId,
    );
    if (!accessProfile) throw new AppError(EAccessProfileError.NotFound);

    const updatedUser = {
      ...user,
      ...userData,
      ...accessProfile,
    };

    const [error] = await validate(updatedUser, {
      stopAtFirstError: true,
    });
    if (error.constraints) {
      const [message] = Object.values(error.constraints);
      throw new AppError(message);
    }

    await usersRepository.save(updatedUser);

    return updatedUser;
  }
}
