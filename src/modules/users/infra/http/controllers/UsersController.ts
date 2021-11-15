/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  CreateUserService,
  Request as CreateRequest,
} from '@modules/users/services/CreateUserService';
import {
  FindUserService,
  Request as FindRequest,
} from '@modules/users/services/FindUserService';
import { EUserStatus } from '@modules/users/utils/enums/e-user';
import { InactiveUserService } from '@modules/users/services/InactiveUserService';
import { RecoverUserService } from '@modules/users/services/RecoverUserService';
import { SoftRemoveUserService } from '@modules/users/services/SoftRemoveUserService';
import { RemoveUserService } from '@modules/users/services/RemoveUserService';
import { UpdateUserService } from '@modules/users/services/UpdateUserService';
import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService';
import { AppError } from '@shared/errors/AppError';
import { EGenericError } from '@shared/utils/enums/e-errors';
import { ResetUserPasswordService } from '@modules/users/services/ResetUserPasswordService';

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

    const { name, id } = request.user;

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
      createdById: id,
      createdByName: name,
      updatedById: id,
      updatedByName: name,
      lastAccess: '',
    });

    return response.json(user);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const filters = request.body as FindRequest;

    const findUsers = container.resolve(FindUserService);
    const users = await findUsers.execute(filters);

    return response.json(users);
  }

  public async inactive(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { ids } = request.body;
    const { id: userId, name: userName } = request.user;

    const inactiveUsers = container.resolve(InactiveUserService);

    await inactiveUsers.execute({
      ids,
      updatedById: userId,
      updatedByName: userName,
    });

    return response.send();
  }

  public async recover(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { ids } = request.body;
    const { id: userId, name: userName } = request.user;

    const recoverUsers = container.resolve(RecoverUserService);

    await recoverUsers.execute({
      ids,
      updatedById: userId,
      updatedByName: userName,
    });

    return response.send();
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { ids } = request.body;

    const removeUsers = container.resolve(RemoveUserService);

    await removeUsers.execute({
      ids,
    });

    return response.send();
  }

  public async softRemove(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { ids } = request.body;

    const softRemoveUsers = container.resolve(SoftRemoveUserService);

    await softRemoveUsers.execute({
      ids,
    });

    return response.send();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id: userId, name: userName } = request.user;
    const { id, firstName, lastName, email, username, accessProfileId } =
      request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      firstName,
      lastName,
      email,
      username,
      accessProfileId,
      updatedById: userId,
      updatedByName: userName,
    });

    return response.json(user);
  }

  public async updateAvatar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    if (!request.file?.filename)
      throw new AppError(EGenericError.AvatarFilenameRequired, 401);

    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    // @ts-ignore
    delete user.password;

    return response.json(user);
  }

  public async resetPassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id, currentPassword, newPassword } = request.body;

    const resetPassword = container.resolve(ResetUserPasswordService);

    await resetPassword.execute({
      id,
      currentPassword,
      newPassword,
    });

    return response.send();
  }
}
