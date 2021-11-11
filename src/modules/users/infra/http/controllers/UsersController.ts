import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  CreateUserService,
  Request as CreateRequest,
} from '@modules/users/services/CreateUserService';
import { EUserStatus } from '@shared/utils/enums/e-user';

export class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      avatar,
      accessProfileId,
    } = request.body as CreateRequest;

    // const { name, id } = request.user;
    const lastAccess = new Date().toISOString();

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      firstName,
      lastName,
      username,
      email,
      password,
      status: EUserStatus.Active,
      avatar,
      accessProfileId,
      createdById: '',
      createdByName: '',
      updatedById: '',
      updatedByName: '',
      lastAccess,
    });

    return response.json(user);
  }
}
