import { injectable, inject } from 'tsyringe';
import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';
import { FindManyAccessProfileDTO } from '@modules/accessProfiles/dtos/FindManyAccessProfileDTO';
import { AccessProfilesRepositoryMethods } from '../repositories/AccessProfilesRepositoryMethods';

/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

/**
 * Dependency Inversion (SOLID)
 */

@injectable()
export class FindManyAccessProfileService {
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
