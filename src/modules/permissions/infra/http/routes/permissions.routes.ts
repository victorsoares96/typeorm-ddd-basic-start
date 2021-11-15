import { Router } from 'express';

import { is } from '@shared/infra/http/middlewares/ensureAuthorized';
import { PermissionsController } from '@modules/permissions/infra/http/controllers/PermissionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import {
  CAN_CREATE_PERMISSION,
  CAN_VIEW_PERMISSIONS,
} from '@modules/permissions/utils/enums/e-access-permissions';

export const permissionsRouter = Router();
const permissionsController = new PermissionsController();

permissionsRouter.use(ensureAuthenticated);

permissionsRouter.get(
  '/permissions',
  is([CAN_VIEW_PERMISSIONS]),
  permissionsController.index,
);

permissionsRouter.post(
  '/permissions',
  is([CAN_CREATE_PERMISSION]),
  permissionsController.create,
);
