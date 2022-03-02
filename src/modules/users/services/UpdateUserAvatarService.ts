import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { EUserError } from '@modules/users/utils/enums/e-errors';
import { StorageProviderMethods } from '@shared/container/providers/StorageProvider/models/StorageProviderMethods';
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
    @inject('StorageProvider')
    private storageProvider: StorageProviderMethods,
  ) {}

  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findOne({ id: userId });

    if (!user) throw new AppError(EUserError.NotFound);

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = fileName;

    await this.usersRepository.update([user]);

    return user;
  }
}
