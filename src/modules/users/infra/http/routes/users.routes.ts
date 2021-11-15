import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import {
  CAN_REMOVE_USER,
  CAN_SOFT_REMOVE_USER,
  CAN_UPDATE_USER,
  CAN_UPDATE_USER_AVATAR,
  CAN_VIEW_USER,
  CAN_RECOVER_USER,
} from '@modules/users/utils/enums/e-access-permissions';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { is } from '@shared/infra/http/middlewares/ensureAuthorized';
import { UsersController } from '../controllers/UsersController';

export const usersRouter = Router();
const usersController = new UsersController();

const upload = multer(uploadConfig);

usersRouter.get(
  '/users',
  ensureAuthenticated,
  is([CAN_VIEW_USER]),
  usersController.index,
);

usersRouter.post('/users', ensureAuthenticated, usersController.create);

usersRouter.put(
  '/users',
  ensureAuthenticated,
  is([CAN_UPDATE_USER]),
  usersController.update,
);

usersRouter.patch(
  '/users/avatar',
  ensureAuthenticated,
  is([CAN_UPDATE_USER_AVATAR]),
  upload.single('avatar'),
  usersController.updateAvatar,
);

usersRouter.delete(
  '/users/softRemove',
  ensureAuthenticated,
  is([CAN_SOFT_REMOVE_USER]),
  usersController.softRemove,
);

usersRouter.delete(
  '/users/remove',
  ensureAuthenticated,
  is([CAN_REMOVE_USER]),
  usersController.remove,
);

usersRouter.patch(
  '/users/recover',
  ensureAuthenticated,
  is([CAN_RECOVER_USER]),
  usersController.recover,
);

usersRouter.patch(
  '/users/inactive',
  ensureAuthenticated,
  is([CAN_RECOVER_USER]),
  usersController.inactive,
);

usersRouter.patch('/users/password', usersController.resetPassword);
