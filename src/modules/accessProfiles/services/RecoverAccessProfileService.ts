import { getRepository } from 'typeorm';
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';
import { EAccessProfileStatus } from '@shared/utils/enums/e-access-profile';
import { EAccessProfileError } from '@shared/utils/enums/e-errors';
import { AccessProfilesRepositoryMethods } from '../repositories/AccessProfilesRepositoryMethods';

interface Request {
  ids: string;
  updatedById: string;
  updatedByName: string;
}

@injectable()
export class RecoverAccessProfileService {
  constructor(
    @inject('AccessProfilesRepository')
    private accessProfilesRepository: AccessProfilesRepositoryMethods,
  ) {}

  public async execute({
    ids,
    updatedById,
    updatedByName,
  }: Request): Promise<void> {
    const accessProfilesIds = ids.split(',');
    getRepository(AccessProfile).findByIds();
    const accessProfile = await this.accessProfilesRepository.findOne({
      where: { id },
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
