import { getCustomRepository } from 'typeorm';
import { AppError } from '../../errors/AppError';
import { AccessProfile } from '../../models/AccessProfile';
import { AccessProfileRepository } from '../../repositories/AccessProfileRepository';
import { EAccessProfileError } from '../../utils/enums/e-errors';

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
