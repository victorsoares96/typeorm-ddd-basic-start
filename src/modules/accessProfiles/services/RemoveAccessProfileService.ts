import { injectable, inject } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { AccessProfilesRepositoryMethods } from '../repositories/AccessProfilesRepositoryMethods';
import { EAccessProfileError } from '../utils/enums/e-errors';

export interface Request {
  ids: string;
}

@injectable()
export class RemoveAccessProfileService {
  constructor(
    @inject('AccessProfilesRepository')
    private accessProfilesRepository: AccessProfilesRepositoryMethods,
  ) {}

  public async execute({ ids }: Request): Promise<void> {
    const accessProfilesIds = ids.split(',');

    const accessProfiles = await this.accessProfilesRepository.findByIds(
      accessProfilesIds,
    );

    if (!accessProfiles) throw new AppError(EAccessProfileError.NotFound);

    await this.accessProfilesRepository.remove(accessProfiles);
  }
}
