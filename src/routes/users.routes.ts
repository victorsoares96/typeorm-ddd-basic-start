import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import {
  CreateUserService,
  Request as CreateRequest,
} from '../services/User/CreateUserService';
import {
  FindUserService,
  Request as FindRequest,
} from '../services/User/FindUserService';
import UpdateUserAvatarService from '../services/User/UpdateUserAvatarService';
import {
  UpdateUserService,
  Request as UpdateRequest,
} from '../services/User/UpdateUserService';
import { RemoveUserService } from '../services/User/RemoveUserService';
import { ResetUserPasswordService } from '../services/User/ResetUserPasswordService';

import { is } from '../middlewares/ensureAuthorized';
import {
  CAN_REMOVE_USER,
  CAN_SOFT_REMOVE_USER,
  CAN_UPDATE_USER,
  CAN_UPDATE_USER_AVATAR,
  CAN_VIEW_USER,
} from '../utils/enums/e-access-permissions';

export const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get(
  '/users',
  ensureAuthenticated,
  is([CAN_VIEW_USER]),
  async (request, response) => {
    const {
      firstName,
      lastName,
      fullName,
      status,
      createdAt,
      createdById,
      updatedAt,
      updatedById,
      deletionDate,
      lastAccess,
      username,
      email,
      phoneNumber,
      mobileNumber,
      isDeleted,
      offset,
      isAscending,
      limit,
    } = request.body as FindRequest;

    const findUsers = new FindUserService();
    const users = await findUsers.execute({
      firstName,
      lastName,
      fullName,
      status,
      createdAt,
      createdById,
      updatedAt,
      updatedById,
      deletionDate,
      lastAccess,
      username,
      email,
      phoneNumber,
      mobileNumber,
      isDeleted,
      offset,
      isAscending,
      limit,
    });

    return response.json(users);
  },
);

usersRouter.post('/users', async (request, response) => {
  const {
    firstName,
    lastName,
    status,
    accessProfileId,
    unityId,
    departmentId,
    responsibilityId,
    avatar,
    username,
    email,
    phoneNumber,
    mobileNumber,
    password,
  } = request.body as CreateRequest;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    firstName,
    lastName,
    status,
    accessProfileId,
    unityId,
    departmentId,
    responsibilityId,
    avatar,
    username,
    email,
    phoneNumber,
    mobileNumber,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.put(
  '/users',
  ensureAuthenticated,
  is([CAN_UPDATE_USER]),
  async (request, response) => {
    const {
      id,
      firstName,
      lastName,
      status,
      email,
      phoneNumber,
      mobileNumber,
      unityId,
      departmentId,
      responsibilityId,
      accessProfileId,
    } = request.body as UpdateRequest;
    const { id: userId, name: userName } = request.user;

    const updateUser = new UpdateUserService();
    const user = await updateUser.execute({
      id,
      firstName,
      lastName,
      status,
      email,
      phoneNumber,
      mobileNumber,
      unityId,
      departmentId,
      responsibilityId,
      accessProfileId,
      updatedById: userId,
      updatedByName: userName,
    });

    return response.json(user);
  },
);

usersRouter.patch(
  '/users/avatar',
  ensureAuthenticated,
  is([CAN_UPDATE_USER_AVATAR]),
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

usersRouter.delete(
  '/users/softRemove',
  ensureAuthenticated,
  is([CAN_SOFT_REMOVE_USER]),
  async (request, response) => {
    const { id } = request.body;

    const removeUser = new RemoveUserService({
      softRemove: true,
    });

    const user = await removeUser.execute({
      id,
    });

    return response.json(user);
  },
);

usersRouter.delete(
  '/users/remove',
  ensureAuthenticated,
  is([CAN_REMOVE_USER]),
  async (request, response) => {
    const { id } = request.body;

    const removeUser = new RemoveUserService();

    const user = await removeUser.execute({
      id,
    });

    return response.json(user);
  },
);

usersRouter.patch('/users/password', async (request, response) => {
  const { id, currentPassword, newPassword } = request.body;

  const resetPassword = new ResetUserPasswordService();

  await resetPassword.execute({
    id,
    currentPassword,
    newPassword,
  });

  return response.send();
});
