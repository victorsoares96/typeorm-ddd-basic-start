import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';
import { AccessProfileRepository } from '@modules/accessProfiles/infra/typeorm/repositories/AccessProfileRepository';
import { EAccessProfileError } from '@shared/utils/enums/e-errors';

interface Request {
  id: string;
}

interface IServiceOptions {
  softRemove?: boolean;
}

export class RemoveAccessProfileService {
  private softRemove = false;

  constructor(options?: IServiceOptions) {
    if (options) {
      this.softRemove = options.softRemove ?? false;
    }
  }

  public async execute({ id }: Request): Promise<AccessProfile> {
    const accessProfileRepository = getCustomRepository(
      AccessProfileRepository,
    );

    const accessProfile = await accessProfileRepository.findOne(id);

    if (!accessProfile) throw new AppError(EAccessProfileError.NotFound);

    if (this.softRemove) {
      await accessProfileRepository.softRemove(accessProfile);
    } else await accessProfileRepository.remove(accessProfile);

    return accessProfile;
  }
}
