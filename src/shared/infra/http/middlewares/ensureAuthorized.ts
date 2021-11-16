import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { injectable, inject, container } from 'tsyringe';

import authConfig from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { Permission } from '@modules/permissions/infra/typeorm/entities/Permission';
import { UsersRepositoryMethods } from '@modules/users/repositories/UsersRepositoryMethods';
import { AccessProfilesRepositoryMethods } from '@modules/accessProfiles/repositories/AccessProfilesRepositoryMethods';
import { ESessionError, EUserError } from '@modules/users/utils/enums/e-errors';
import { EAccessProfileError } from '@modules/accessProfiles/utils/enums/e-errors';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  name: string;
}

@injectable()
class Decoder {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryMethods,
    @inject('AccessProfilesRepository')
    private accessProfilesRepository: AccessProfilesRepositoryMethods,
  ) {}

  public async getPermissions(request: Request): Promise<Permission[]> {
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new AppError(ESessionError.MissingJWT, 401);

    const [, token] = authHeader.split(' ');

    const decoded = verify(token, authConfig.jwt.secret);
    const { sub: id } = decoded as TokenPayload;

    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['accessProfile'],
    });

    if (!user) throw new AppError(EUserError.NotFound);

    const accessProfile = await this.accessProfilesRepository.findOne({
      where: { id: user.accessProfile.id },
      relations: ['permissions'],
    });

    if (!accessProfile) throw new AppError(EAccessProfileError.NotFound);

    return accessProfile.permissions;
  }
}

function is(routePermissions: string[]) {
  const ensureAuthorized = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    return next();

    const decoder = container.resolve(Decoder);
    const permissions = await decoder.getPermissions(request);

    const userPermissions = permissions.map(
      (permission: Permission) => permission.name,
    );

    const isAuthorized = userPermissions.some(userPermission =>
      routePermissions.includes(userPermission),
    );

    if (isAuthorized) {
      return next();
    }

    throw new AppError(
      'You do not have permission to perform this action.',
      401,
    );
  };

  return ensureAuthorized;
}

export { is };
