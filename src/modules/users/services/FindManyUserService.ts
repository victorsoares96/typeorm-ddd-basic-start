import { injectable, inject } from 'tsyringe';
import { UsersRepositoryMethods } from '../repositories/UsersRepositoryMethods';
import { FindManyUserDTO } from '../dtos/FindManyUserDTO';
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
export class FindManyUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryMethods,
  ) {}

  public async execute(filters: FindManyUserDTO): Promise<[User[], number]> {
    const users = await this.usersRepository.findMany(filters);

    return users;
  }
}
