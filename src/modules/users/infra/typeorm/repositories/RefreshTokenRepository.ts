import { EntityRepository, getRepository, Repository } from 'typeorm';

import { RefreshTokenRepositoryMethods } from '@modules/users/repositories/RefreshTokenRepositoryMethods';
import { CreateRefreshTokenDTO } from '@modules/users/dtos/CreateRefreshTokenDTO';
import dayjs from 'dayjs';
import { RefreshToken } from '../entities/RefreshToken';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository implements RefreshTokenRepositoryMethods {
  private ormRepository: Repository<RefreshToken>;

  constructor() {
    this.ormRepository = getRepository(RefreshToken);
  }

  public async create({ user }: CreateRefreshTokenDTO): Promise<RefreshToken> {
    const expiresIn = dayjs().add(15, 'second').unix();

    const refreshToken = this.ormRepository.create({
      user,
      expiresIn,
    });

    await this.ormRepository.save(refreshToken);

    return refreshToken;
  }
}
