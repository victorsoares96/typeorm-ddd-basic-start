import { EntityRepository, getRepository, Repository } from 'typeorm';

import { RefreshTokenRepositoryMethods } from '@modules/users/repositories/RefreshTokenRepositoryMethods';
import { CreateRefreshTokenDTO } from '@modules/users/dtos/CreateRefreshTokenDTO';
import { RefreshToken } from '../entities/RefreshToken';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository implements RefreshTokenRepositoryMethods {
  private ormRepository: Repository<RefreshToken>;

  constructor() {
    this.ormRepository = getRepository(RefreshToken);
  }

  public async create(data: CreateRefreshTokenDTO): Promise<RefreshToken> {
    const refreshToken = this.ormRepository.create(data);

    await this.ormRepository.save(refreshToken);

    return refreshToken;
  }
}
