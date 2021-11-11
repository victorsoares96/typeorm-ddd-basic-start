import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  SessionService,
  Request as SessionRequest,
} from '@modules/users/services/SessionService';

export class SessionController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body as SessionRequest;

    const createSession = container.resolve(SessionService);
    const session = await createSession.execute({
      username,
      password,
    });

    return response.json(session);
  }
}
