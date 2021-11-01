import { hash } from 'bcryptjs';
import { getCustomRepository, getRepository } from 'typeorm';
import { AppError } from '../../errors/AppError';
import { User } from '../../models/User';
import { AccessProfileRepository } from '../../repositories/AccessProfileRepository';
import { EAccessProfileError, EUserError } from '../../utils/enums/e-errors';

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
