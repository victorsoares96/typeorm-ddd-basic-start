import { injectable, inject } from 'tsyringe';
import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';
import { FindManyAccessProfileDTO } from '@modules/accessProfiles/dtos/FindManyAccessProfileDTO';
import { AccessProfilesRepositoryMethods } from '../repositories/AccessProfilesRepositoryMethods';

@injectable()
export class FindAccessProfileService {
  constructor(
    @inject('AccessProfilesRepository')
    private accessProfilesRepository: AccessProfilesRepositoryMethods,
  ) {}

  public async execute(
    filters: FindManyAccessProfileDTO,
  ): Promise<[AccessProfile[], number]> {
    const accessProfiles = await this.accessProfilesRepository.findMany(
      filters,
    );

    return accessProfiles;
  }
}
