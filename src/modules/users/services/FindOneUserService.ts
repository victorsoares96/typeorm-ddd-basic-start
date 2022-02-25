import { injectable, inject } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { EGenericError } from '@shared/utils/enums/e-errors';
import { UsersRepositoryMethods } from '../repositories/UsersRepositoryMethods';
import { FindOneUserDTO } from '../dtos/FindOneUserDTO';
import { User } from '../infra/typeorm/entities/User';

/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

/**
 * Dependency Inversion (SOLID)
 */

@injectable()
export class FindOneUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryMethods,
  ) {}

  public async execute(filters: FindOneUserDTO): Promise<User | undefined> {
    if (
      Object.keys(filters).length === 0 ||
      Object.values(filters).some(value => !value)
    )
      throw new AppError(EGenericError.MissingFilters);
    const user = await this.usersRepository.findOne(filters);

    return user;
  }
}
