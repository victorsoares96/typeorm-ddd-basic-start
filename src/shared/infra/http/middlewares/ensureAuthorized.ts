import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import authConfig from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { AccessProfile } from '@modules/accessProfiles/infra/typeorm/entities/AccessProfile';
import { Permission } from '@modules/permissions/infra/typeorm/entities/Permission';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { EAuthenticateError } from '@shared/utils/enums/e-errors';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  name: string;
}

async function decoder(request: Request): Promise<AccessProfile | null> {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AppError(EAuthenticateError.MissingJWT, 401);

  const usersRepository = getRepository(User);
  const accessProfilesRepository = getRepository(AccessProfile);

  const [, token] = authHeader.split(' ');

  const decoded = verify(token, authConfig.jwt.secret);
  const { sub: id } = decoded as TokenPayload;

  const {
    accessProfile: { id: accessProfileId },
  } = await usersRepository.findOne(id, {
    relations: ['accessProfile'],
  });

  const accessProfilePermissions = await accessProfilesRepository.findOne(
    accessProfileId,
    {
      relations: ['permissions'],
    },
  );

  return accessProfilePermissions || null;
}

function is(routePermissions: string[]) {
  const ensureAuthorized = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const { permissions } = await decoder(request);

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
