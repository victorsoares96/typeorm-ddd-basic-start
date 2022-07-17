import { User } from '../infra/typeorm/entities/User';

export interface CreateRefreshTokenDTO {
  user: User;
}
