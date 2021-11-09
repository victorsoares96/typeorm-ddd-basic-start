import { Router } from 'express';

import { PermissionsController } from '@modules/permissions/infra/http/controllers/PermissionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

export const permissionsRouter = Router();
const permissionsController = new PermissionsController();

permissionsRouter.use(ensureAuthenticated);

permissionsRouter.get('/permissions', permissionsController.index);

permissionsRouter.post('/permissions', permissionsController.create);
