import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import { AppError } from '@shared/errors/AppError';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { EUserError } from '@modules/users/utils/enums/e-errors';
import { UsersRepositoryMethods } from '../repositories/UsersRepositoryMethods';

interface Request {
  userId: string;
  avatarFilename: string;
}

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryMethods,
  ) {}

  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findOne({ id: userId });

    if (!user) throw new AppError(EUserError.NotFound);

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFilename;

    await this.usersRepository.update([user]);

    return user;
  }
}
