import { injectable, inject } from 'tsyringe';
import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';
import { FindManyAccessProfileDTO } from '@modules/accessProfiles/dtos/FindManyAccessProfileDTO';
import { AppError } from '@shared/errors/AppError';
import { EGenericError } from '@shared/utils/enums/e-errors';
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
export class FindOneAccessProfileService {
  constructor(
    @inject('AccessProfilesRepository')
    private accessProfilesRepository: AccessProfilesRepositoryMethods,
  ) {}

  public async execute(
    filters: FindManyAccessProfileDTO,
  ): Promise<AccessProfile | undefined> {
    if (
      Object.keys(filters).length === 0 ||
      Object.values(filters).some(value => !value)
    )
      throw new AppError(EGenericError.MissingFilters);
    const accessProfiles = await this.accessProfilesRepository.findOne(filters);

    return accessProfiles;
  }
}
