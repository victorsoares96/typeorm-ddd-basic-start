/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Router } from 'express';
import { AuthenticateUserService } from '@modules/users/services/AuthenticateService';

export const sessionsRouter = Router();

sessionsRouter.post('/sessions', async (request, response) => {
  const { username, password } = request.body;
  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    username,
    password,
  });

  // @ts-ignore
  delete user.password;

  return response.json({ user, token });
});
