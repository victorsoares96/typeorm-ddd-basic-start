import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { EAccessProfileStatus } from '@shared/utils/enums/e-access-profile';
import { EAccessProfileError } from '@shared/utils/enums/e-errors';
import { AccessProfilesRepositoryMethods } from '../repositories/AccessProfilesRepositoryMethods';

interface Request {
  id: string;
  updatedById: string;
  updatedByName: string;
}

@injectable()
export class InactiveAccessProfileService {
  constructor(
    @inject('AccessProfilesRepository')
    private accessProfilesRepository: AccessProfilesRepositoryMethods,
  ) {}

  public async execute({
    id,
    updatedById,
    updatedByName,
  }: Request): Promise<void> {
    const accessProfile = await this.accessProfilesRepository.findOne({
      where: { id },
    });

    if (!accessProfile) throw new AppError(EAccessProfileError.NotFound);

    accessProfile.status = EAccessProfileStatus.Inactive;
    accessProfile.updatedById = updatedById;
    accessProfile.updatedByName = updatedByName;

    await this.accessProfilesRepository.update(accessProfile);
  }
}
