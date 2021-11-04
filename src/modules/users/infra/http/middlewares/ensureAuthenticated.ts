import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { EAuthenticateError } from '@shared/utils/enums/e-errors';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  name: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError(EAuthenticateError.MissingJWT, 401);

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, name } = decoded as TokenPayload;

    request.user = {
      id: sub,
      name,
    };

    return next();
  } catch {
    throw new AppError(EAuthenticateError.InvalidJWT, 401);
  }
}
