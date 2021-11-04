import { getRepository } from 'typeorm';

import { AppError } from '@shared/errors/AppError';
import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';
import { EAccessProfileStatus } from '@shared/utils/enums/e-access-profile';
import { EAccessProfileError } from '@shared/utils/enums/e-errors';

interface Request {
  id: string;
  updatedById: string;
  updatedByName: string;
}

export class RecoverAccessProfileService {
  public async execute({
    id,
    updatedById,
    updatedByName,
  }: Request): Promise<void> {
    const accessProfilesRepository = getRepository(AccessProfile);

    const accessProfile = await accessProfilesRepository.findOne(id, {
      withDeleted: true,
    });

    if (!accessProfile) throw new AppError(EAccessProfileError.NotFound);
    if (accessProfile.status === EAccessProfileStatus.Active)
      throw new AppError(EAccessProfileError.NotDisabled);

    accessProfile.status = EAccessProfileStatus.Active;
    accessProfile.updatedById = updatedById;
    accessProfile.updatedByName = updatedByName;

    await accessProfilesRepository.save(accessProfile);

    await accessProfilesRepository.recover(accessProfile);
  }
}
