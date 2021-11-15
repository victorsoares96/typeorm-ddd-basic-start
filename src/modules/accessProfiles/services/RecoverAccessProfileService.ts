/* eslint-disable no-param-reassign */
import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { EAccessProfileStatus } from '@modules/accessProfiles/utils/enums/e-status';
import { AccessProfilesRepositoryMethods } from '../repositories/AccessProfilesRepositoryMethods';
import { EAccessProfileError } from '../utils/enums/e-errors';

export interface Request {
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

    const accessProfiles = await this.accessProfilesRepository.findByIds(
      accessProfilesIds,
      {
        withDeleted: true,
      },
    );

    if (!accessProfiles) throw new AppError(EAccessProfileError.NotFound);

    accessProfiles.forEach(accessProfile => {
      accessProfile.status = EAccessProfileStatus.Active;
      accessProfile.updatedById = updatedById;
      accessProfile.updatedByName = updatedByName;
    });

    await this.accessProfilesRepository.update(accessProfiles);

    await this.accessProfilesRepository.recover(accessProfiles);
  }
}
