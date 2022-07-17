import { CreateRefreshTokenDTO } from '../dtos/CreateRefreshTokenDTO';
import { RefreshToken } from '../infra/typeorm/entities/RefreshToken';

export interface RefreshTokenRepositoryMethods {
  create(data: CreateRefreshTokenDTO): Promise<RefreshToken>;
}
